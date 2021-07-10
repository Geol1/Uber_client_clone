import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet, TouchableOpacity ,View,Image,Pressable} from 'react-native';
import {NativeBaseProvider,Box,Text,Heading,VStack,FormControl,Input,Button,Icon,Collapse,useToast} from 'native-base';
import Ionicons from "react-native-vector-icons/Ionicons";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import { useRoute, useNavigation } from '@react-navigation/native';
import stringsoflanguages from "../langue/screenString";

import { ToastAndroid } from "react-native";
const Toast = ({ visible, message }) => {
  if (visible) {
    ToastAndroid.showWithGravityAndOffset(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
      25,
      50
    );
    return null;
  }
  return null;
};
export default function Profil({navigation}){
    const route = useRoute();
    
    const [telephone , setTelephone] = useState(route.params);
    const [id , setId] = useState("");
    const [isEdit, setIsEdit]=useState(false);
    const [formData, setData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [user, setUser] = useState( {username:"",telephone:"+237 ********",email: "mail"} );
    const getId = async () => {
        try {
          const value = await AsyncStorage.getItem('userId')
          if(value !== null){ setId(value); setId(value) }
        }  catch (e){}
    }
    const CurrentUser=() => {
         getId().then(
         firestore().collection('user').doc(id).get().then(documentSnapshot => {
            setUser({username:documentSnapshot.data().username,telephone: telephone,email: documentSnapshot.data().email})
            
          })
          )
    }
    const EditProfil=()=>{
      setIsEdit(!isEdit)
      UpdateProfil()
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
    const [visibleToast, setvisibleToast] = useState(false);
  const [toastM,setToastM]=useState("youpi")
  useEffect(() => setvisibleToast(false), [visibleToast]);

  const handleButtonPress = (message) => {
    setToastM(message)
    setvisibleToast(true);
  };
     const onSubmit = () => {
      validate() ? EditProfil() : handleButtonPress("validation failled");
    };
    return(
      <NativeBaseProvider>
        <Toast visible={visibleToast} message={toastM} />
        <Box flex={1} p={2}  w="90%" mx='auto' >
          {    <View style={styles.container}>
            <View style={styles.topContainer}>
              <View style={styles.metaContainer}>

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
                  <Input isDisabled={!isEdit} defaultValue={telephone} onChangeText={(value) => setData({ ...formData, telephone: value })}/>
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
              <Button colorScheme="dark" mr={2} onPress={()=>{navigation.navigate('Transaction')}}>Go Back</Button>
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



