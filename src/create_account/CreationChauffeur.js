import React, {useState, useEffect} from 'react'
import {NativeBaseProvider,Box,Text,Heading,VStack,FormControl,Input,Link,Button,Center} from 'native-base';
import Avatar from '../components/Avatar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
export default function CreateChauffeur({navigation}) {

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [id , setId] = useState("");
  const validate = () => {
    if (formData.name === undefined || formData.email === undefined || formData.password === undefined) {
      setErrors({ ...errors, password: 'Svp veuiller remplir tous les champs.' });
      return false;
    }else if(formData.email.length < 12 || formData.password.length < 6){
      setErrors({ ...errors, password: 'Informations Invalide.' });
      return false;
    }
    return true;
  };
  const getId = async () => {
    try {
        
      const value = await AsyncStorage.getItem('userId')
      if(value !== null){ setId(value); setId(value) }
    }  catch (e){handleButtonPress("aucun id trouve")}
    console.log("ok "+id);
}
  const Create=()=>{
    console.log(formData);
    getId().then((resp) => {
      var IdCreation=id
      console.log(IdCreation);
        firestore().doc(`chauffeur/${IdCreation}`).set({
          username:formData.name,
          email:formData.email,
          telephone: formData.password,
          id: IdCreation,
          statut: "chauffeur",
        })
      
      navigation.navigate('Transaction')
      handleButtonPress('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      handleButtonPress('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      handleButtonPress('That email address is invalid!');
    }
    handleButtonPress(error.code)
    // console.error(error);
  });
  }
  
  const [visibleToast, setvisibleToast] = useState(false);
  const [toastM,setToastM]=useState("youpi")
  useEffect(() => setvisibleToast(false), [visibleToast]);

  const handleButtonPress = (message) => {
    setToastM(message)
    setvisibleToast(true);
  };
  useEffect(() => getId(), []);
  useEffect(() => getId(), [id]);
  const onSubmit = () => {
    validate() ? Create() : handleButtonPress("validation failled");
  };

 return (
      <NativeBaseProvider>
          <Center>
          <Toast visible={visibleToast} message={toastM} />
      <Box  p={2} w="90%" mx='auto' mt={50} >
        
        <VStack space={0} mt={0}>
          <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label _text={{bold: true}}>{stringsoflanguages.name}</FormControl.Label>
                <Input placeholder={stringsoflanguages.placeholderName} onChangeText={(value) => setData({ ...formData, name: value })} />
                
            </FormControl>
            <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label _text={{bold: true}}>{stringsoflanguages.email}</FormControl.Label>
                <Input placeholder={stringsoflanguages.placeholderEmail} onChangeText={(value) => setData({ ...formData, email: value })} />
               
            </FormControl>
            <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label _text={{bold: true}}>Telephone</FormControl.Label>
                <Input placeholder="+237 675552209" onChangeText={(value) => setData({ ...formData, password: value })} />
                {'password' in errors ?
                <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.password}</FormControl.ErrorMessage>
        :
                <FormControl.HelperText _text={{fontSize: 'xs'}}>{stringsoflanguages.nouveau_compte.description}</FormControl.HelperText>
                }
            </FormControl>
          
          <Button onPress={onSubmit} mt={5} colorScheme="cyan" _text={{color: 'white' }}>{stringsoflanguages.nouveau_compte.btn1}</Button>
          
          <Heading size="lg" color='primary.500'>
          {stringsoflanguages.nouveau_compte.text}
          </Heading>

        </VStack>
      </Box>
      </Center>
    </NativeBaseProvider>
  );
}