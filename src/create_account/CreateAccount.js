import React, {useState, useEffect} from 'react'
import {NativeBaseProvider,Box,Text,Heading,VStack,FormControl,Input,Link,Button,Icon,IconButton,HStack,Divider} from 'native-base';
import Avatar from '../components/Avatar';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import stringsoflanguages from "../langue/screenString";

export default function CreateAccount({navigation}) {

  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [Img, setImg] = useState(require('../assets/ic_newCon.jpg'));
  
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

  const save=()=>{
    console.log(formData);
    auth()
  .createUserWithEmailAndPassword(formData.email, formData.password)
  .then((resp) => {
      resp.user.sendEmailVerification();
      console.log("okjn");
      var IdCreation=resp.user.uid;
      console.log(IdCreation);
      const fileStoragePath = "ImageUserProfil/"+resp.user.uid;
      const imageRef= storage().ref(fileStoragePath);
      let fileUri = decodeURI(Img.uri)
      imageRef.putString(fileUri,`data_url`).then(()=>{
         console.log(fileUri);
        firestore().doc(`user/${IdCreation}`).set({
          username:formData.name,
          email:formData.email,
          password:formData.password,
          image: fileStoragePath,
          id: IdCreation,
          telephone:'',
          statut: "client",
        })
      })
      firestore().doc(`clients/${IdCreation}`).set({
        username:formData.name,
        id: IdCreation,
        listeChauffeur: ""
      })
      navigation.navigate('Authentification')
    console.log('User account created & signed in!');
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      console.log('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      console.log('That email address is invalid!');
    }

    console.error(error);
  });
  }

  const onSubmit = () => {
    validate() ? save() : console.log("validation failled");
  };

 return (
      <NativeBaseProvider>
        <Avatar
        setImg={setImg}
        Img={Img}/>
      <Box  p={2} w="90%" mx='auto' >
        
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
                <FormControl.Label _text={{bold: true}}>{stringsoflanguages.pass}</FormControl.Label>
                <Input placeholder="*******" onChangeText={(value) => setData({ ...formData, password: value })} />
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
    </NativeBaseProvider>
  );
}