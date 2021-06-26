import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity ,state,View,Image,Pressable} from 'react-native';
import {NativeBaseProvider,Box,Text,Heading,VStack,FormControl,Input,Link,Button,Icon,IconButton,HStack,Divider} from 'native-base';
import * as ImagePicker from "react-native-image-picker";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

const options = {
    mediaType:'mixed',
    includeBase64: true,
    maxHeight: 200,
    maxWidth: 200,
  };
  
export default function Profil(){
    const [data , setdata] = useState("");
    const [id , setId] = useState("");
    const email= "delano@gmail.com"

    const [Img, setImg] = useState(require('../assets/ic_newCon.jpg'));
    const [user, setUser] = useState( {nom:"Geol",telephone:"+237 675155255",Img: require('../assets/ic_newCon.jpg')} );
    const getId = async () => {
        try {
        const value = await AsyncStorage.getItem('userId')
        console.log(value);
        if(value !== null) {
            console.log("ok");
            setId(value);
        }
        }  catch (e){
        console.error(e);
        }
    }
    const state = {
      avatar: Img
    }
    openPicker =()=>{
        
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
     useEffect(() => {
         getId()
          const subscriber = firestore()
            .collection('user')
            .doc(id)
            .onSnapshot(documentSnapshot => {
              console.log('User data: ', documentSnapshot.data());
            //   setUser(documentSnapshot.data())
            });
      
          // Stop listening for updates when no longer required
          return () => subscriber();
        });
      
   const getUser= ()=>{
        firestore.collection('user/').get().subscribe(images => {
            this.tabDisc=[]
            var TabUserDiscuss=[]
            images.docs.forEach((doc)=>{
              TabUserDiscuss.push(doc.data());
            })
            TabUserDiscuss.map((element)=>{
              const refImage = storage.ref(element.image)
              refImage.getDownloadURL().subscribe(imgUrl => {
                if(element.id!=localStorage.getItem("userId")){
                    const contact={
                      nom: element.username,
                      email: element.email,
                      id: element.id,
                      Img: imgUrl,
                      telephone: element.telephone,
                    }
                  this.nbrContact++;
                  this.tabDisc.push(contact)
                  return this.tabDisc
                }
              });
            })
          });
    }
    return(
        <NativeBaseProvider>
          
      <Box flex={1} p={2}  w="90%" mx='auto' >
        <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.metaContainer}>
        <TouchableOpacity  style={styles.touchableOpacity} onPress={openPicker}>
                <Image style={styles.avatar} source={state.avatar} />
         </TouchableOpacity>
          <Pressable  style={styles.button} onPress={ openGallery }>
            <Text style={styles.buttonText}>Ouvrir La Gallery</Text>
          </Pressable>

        <VStack space={2} mt={5}>
          <FormControl>
            <FormControl.Label _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                Nom 
            </FormControl.Label>
            <Input placeholder={user.nom} />
          </FormControl>
          <FormControl>
            <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
                Telephone
            </FormControl.Label>
            <Input placeholder={user.telephone}  />
          </FormControl>
          <FormControl>
            <FormControl.Label  _text={{color: 'muted.700', fontSize: 'sm', fontWeight: 600}}>
               Email    
            </FormControl.Label>
            <Input placeholder={email} />
          </FormControl>
         
        </VStack>
   
        </View>
         <View style={styles.container}>
        <Text style={styles.text}>{data}</Text>
        <View style={styles.button} >
          <Button
            onPress={getId}
          >Editer le profile</Button>
        </View>
        <View style={styles.button} >
          {/* <Button
            onPress={CurrentUser}
          > get user</Button> */}
        </View>
</View>
      </View>
    </View>
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



