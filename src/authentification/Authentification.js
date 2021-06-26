
import React , {useState} from 'react';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {NativeBaseProvider,Box,Text,Heading,VStack,FormControl,Input,Link,Button,Icon,IconButton,HStack,Divider } from 'native-base';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Authentification({ navigation }) {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [id , setId] = useState("");
  const validate = () => {
    if (formData.email === undefined || formData.password === undefined) {
      setErrors({ ...errors, password: 'Svp veuiller remplir tous les champs.' });
      return false;
    }else if(formData.email.length < 12 || formData.password.length < 6){
      setErrors({ ...errors, password: 'Informations Invalide.' });
      return false;
    }
    return true;
  };

  const save= ()=>{
    console.log(formData);
    auth()
    .signInWithEmailAndPassword(formData.email, formData.password)
    .then((result) => {
      if(result.user.emailVerified){ 
        navigation.navigate('Home'); 
        add(result.user.uid)
        setId(result.user.uid)}
      else alert("Allez verifier vos mailsvotre email n'as pas ete activer")
     
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

  const add = async (uid)=>{
    try {
      await AsyncStorage.setItem('userId',uid)
    }
    catch (e){
      console.error(e);
    }
  }
  
  // const get = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('userId')
  //     console.log(value);
  //     if(value !== null) {
  //       console.log("ok");
  //         setId(value);
  //     }
  //   }  catch (e){
  //     console.error(e);
  //   }
  // }

  const onSubmit = () => {
    validate() ? save() : alert("validation failled");
  };
 return (
      <NativeBaseProvider>
      <Box flex={1} p={2} w="90%" mx='auto' >
        <Heading size="lg" color='primary.500'> Welcome </Heading>
        <Heading color="muted.400" size="xs"> Sign in to continue!</Heading>

        <VStack space={2} mt={5}>
          <FormControl>
          
            <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label _text={{bold: true}}>Email</FormControl.Label>
                <Input placeholder="example@gmail.com" onChangeText={(value) => setData({ ...formData, email: value })} />
               
            </FormControl>
            <FormControl isRequired isInvalid={'password' in errors}>
                <FormControl.Label _text={{bold: true}}>Password</FormControl.Label>
                <Input placeholder="*******" onChangeText={(value) => setData({ ...formData, password: value })} />
                {'password' in errors ?
                <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.password}</FormControl.ErrorMessage>
        :
                <FormControl.HelperText _text={{fontSize: 'xs'}}>Entrer un mot de passe d'au moins 6 caracteres. </FormControl.HelperText>
                }
            </FormControl>
          
         

            <Link _text={{ fontSize: 'xs', fontWeight: '700', color:'cyan.500' }} alignSelf="flex-end" mt={1}
              onPress={ () => navigation.navigate('ForgotPassword') }>
              Forget Password?
            </Link>
          </FormControl>
          <VStack  space={2}>
          <Button  onPress={onSubmit} mt={5} colorScheme="cyan" _text={{color: 'white' }}> Login  😊 </Button>
          

<HStack justifyContent="center" alignItem='center'>
          
          </HStack>
          </VStack>
          <HStack justifyContent="center">
            <Text fontSize='sm' color='muted.700' fontWeight={400}>I'm a new user. </Text>
            <Link _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }}
            onPress={
              () => navigation.navigate('CreateAccount')
            }>
              Sign Up  😊
            </Link>
          </HStack>
        </VStack>
      <Button onPress={() => navigation.navigate('Home')} > Home</Button>
      </Box>

    </NativeBaseProvider>
  );
}