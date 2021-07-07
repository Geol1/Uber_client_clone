import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet, TouchableOpacity ,View,Image,Pressable} from 'react-native';
import {NativeBaseProvider,Box,Text,Heading,VStack,FormControl,Input,Button,Icon,Collapse,useToast} from 'native-base';
import * as ImagePicker from "react-native-image-picker";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import stringsoflanguages from "../langue/screenString";
import AlertController from "../components/AlertController"
import Toast from "../components/Toast"

const options = {
    mediaType:'mixed',
    includeBase64: true,
    maxHeight: 200,
    maxWidth: 200,
  };
  
export default function Profil({navigation}){
    const [show, setShow] = useState(false);
    const toast = useToast();
    const toastIdRef = useRef();
    
    const [Img,setImg]=useState(require('../assets/ic_newCon.jpg'))
    const [alert, setAlert] = useState({title:"Deconnexion",status:"warning",description:"Etes-vous sur de vouloir vous deconnecter?"})
    const [id , setId] = useState("");
    const [isEdit, setIsEdit]=useState(false);
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [user, setUser] = useState( {username:"",telephone:"+237 ********",image: require('../assets/ic_newCon.jpg'),email: "mail"} );
    const getId = async () => {
        try {
          const value = await AsyncStorage.getItem('userId')
          if(value !== null){ setId(value); setId(value) }
        }  catch (e){console.error(e);}
    }
    const state = {
      avatar:Img
    }
    
   const openPicker =()=>{
        
        launchCamera(options, (response) => { 
        
        if (response.didCancel) {
            console.log('User cancelled image picker');
        } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
        } else {
            setImg({uri:  "data:image/gif;base64,"+response.assets[0].base64})
        }
        });
    }
    const openGallery =()=>{
        launchImageLibrary(
            {
                mediaType:'photo',
                includeBase64: true,
            },
            (response) => {
                if (response.didCancel) {
                    console.log('User cancelled image picker');
                } else if (response.error) {
                    console.log('ImagePicker Error: ', response.error);
                } else if (response.customButton) {
                    console.log('User tapped custom button: ', response.customButton);
                } else {
                    setImg({uri:  "data:image/gif;base64,"+response.assets[0].base64})
                }
                //   console.log(response);
            },
            )
        
        
    }
    function toaster() {
      toastIdRef.current = toast.show({
        title: "Hi, Nice to see you ( ´ ∀ ` )ﾉ",
      })
    }
    
    const CurrentUser=() => {
         getId().then(
         firestore().collection('user').doc(id).get().then(documentSnapshot => {
            const refImage = storage().ref(documentSnapshot.data().image)
            refImage.getDownloadURL().then(function(url) {
              setImg({uri: url});
              setUser({username:documentSnapshot.data().username,telephone:documentSnapshot.data().telephone,image: {uri: url},email: documentSnapshot.data().email})
            })
          })
          )
    }

    const UpdateProfil=()=>{
      firestore().collection('user').doc(id)
        .update({username:formData.name,telephone:formData.telephone})
        .then(() => {
           var imageRef= storage().ref("ImageUserProfil/"+id);
            imageRef.delete().then(() => {
              let fileUri = decodeURI(Img.uri)
              imageRef.putString(fileUri,`data_url`).then(()=>{
                console.log(fileUri);
                console.log("File deleted successfully")
              })
              
            }).catch((error) => {
            });
        });
    }
    const EditProfil=()=>{
      setIsEdit(!isEdit)
      UpdateProfil()
    }
    const LogOut=()=>{
      auth().signOut().then(() => navigation.navigate('Authentification'));
      setShow(false) 
    }
    const validate = () => {
      if (formData.name === undefined || formData.telephone === undefined ) {
        setErrors({ ...errors, telephone: 'Svp veuiller remplir tous les champs.' });
        return false;
      }else if(formData.telephone.length < 6){
        setErrors({ ...errors, telephone: 'Informations Invalide.' });
        return false;
      }
      return true;
    };
    useEffect(() => CurrentUser(),[id]);
     const onSubmit = () => {
      validate() ? EditProfil() : console.log("validation failled");
    };
    return(
      <NativeBaseProvider>
        <AlertController show={show} alert={alert} setShow={setShow} LogOut={LogOut}/>
        {/* <Toast/> */}
        <Box flex={1} p={2}  w="90%" mx='auto' >
          {    <View style={styles.container}>
            <View style={styles.topContainer}>
              <View style={styles.metaContainer}>
              <TouchableOpacity  style={styles.touchableOpacity} onPress={openPicker} disabled={!isEdit}> 
                      <Image style={styles.avatar} source={state.avatar} />
              </TouchableOpacity>
                <Pressable  style={styles.button} onPress={ openGallery } disabled={!isEdit}>
                  <Text style={styles.buttonText}>{stringsoflanguages.avatar.text5}  <Ionicons name={'cloud-circle-outline'} size={30} /> </Text>
                </Pressable>

              <VStack space={2} mt={5}>
                <FormControl isRequired isInvalid={'telephone' in errors}>
                  <FormControl.Label _text={{color: '#FFF', fontSize: 'sm', fontWeight: 600}}>
                      {stringsoflanguages.name} 
                  </FormControl.Label>
                  <Input isDisabled={!isEdit}  defaultValue={user.username} onChangeText={(value) => setData({ ...formData, name: value })}/>
                </FormControl>
                <FormControl isRequired isInvalid={'telephone' in errors}>
                  <FormControl.Label  _text={{color:'#FFF', fontSize: 'sm', fontWeight: 600}}>
                  {stringsoflanguages.telephone} <Ionicons name={'call-outline'} color={'#FFF'} size={20} /> 
                  </FormControl.Label>
                  <Input isDisabled={!isEdit} defaultValue={user.telephone} onChangeText={(value) => setData({ ...formData, telephone: value })}/>
                  {'telephone' in errors ?
                    <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.password}</FormControl.ErrorMessage>
            :
                    <FormControl.HelperText _text={{fontSize: 'xs'}}>{stringsoflanguages.profil.description1}</FormControl.HelperText>
                  }
                </FormControl>
                <FormControl>
                  <FormControl.Label  _text={{color:'#FFF', fontSize: 'sm', fontWeight: 600}}>
                  {stringsoflanguages.mail}   <Ionicons name={'mail'}  color={'#FFF'} size={20} />  
                  </FormControl.Label>
                  <Input defaultValue={user.email} isDisabled />
                </FormControl>
              
              </VStack>
              </View>
            <Collapse isOpen={isEdit}>
              <Button.Group variant="solid" isAttached space={6} mx={{ base: "auto", md: 0, }} mt={5} >
                <Button endIcon={<Icon as={Ionicons} name="pencil-sharp" size={4} />} colorScheme="primary" mr={2} 
                  onPress={onSubmit}>{stringsoflanguages.profil.btn1}
                </Button>
                <Button  onPress={() => setIsEdit(!isEdit)} colorScheme="dark" _text={{ color: "white" }} >{stringsoflanguages.profil.btn4}</Button>
              </Button.Group>
              </Collapse>
            </View>
          </View>}
          <Collapse isOpen={!isEdit}>
            <Button.Group variant="solid" isAttached space={6} mx={{ base: "auto", md: 0, }} mt={5}>
              
              <Button endIcon={<Icon as={Ionicons} name="person" size={4} />} mr={2} 
              onPress={()=>{setData({ ...formData, name: user.username,telephone:user.telephone }), setIsEdit(!isEdit) }}>{stringsoflanguages.profil.btn1}</Button>
       
              <Button colorScheme="dark" mr={2} onPress={()=>{navigation.navigate('Parametre')}}>{stringsoflanguages.profil.btn2}</Button>
              <Button  onPress={() => setShow(true)} colorScheme="teal" _text={{ color: "white" }} 
              endIcon={<Icon as={Ionicons} name="power" size={4} />}>{stringsoflanguages.profil.btn3}</Button>
            </Button.Group>
          </Collapse>
        </Box>
      </NativeBaseProvider>
    )
  
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#22d3ee',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'center',
        width: 375,
        maxWidth: '100%',
      },
      avatar: {
        height: 150,
        width: 150,
        borderRadius: 100,
      },
      buttonText: {
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 14,
      }
})



