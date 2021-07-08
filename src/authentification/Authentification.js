import React , {useState,useEffect} from 'react';
import {NativeBaseProvider, Center,useToast,Box,Text,Heading,VStack,FormControl,Input,Link,Button,Icon,IconButton,HStack,Divider } from 'native-base';
import { View, StyleSheet, ToastAndroid, StatusBar } from "react-native";
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stringsoflanguages from "../langue/screenString";

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
export default function Authentification({route, navigation }) {
  const [formData, setData] = React.useState({});
  const [errors, setErrors] = React.useState({});
  const [id , setId] = useState("");
  const [lang ,setLang]=useState("en")
  const [statut,setStatut]=useState("deconnecte")
  // const { langue} = route.params;
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

  const login= ()=>{
    console.log(formData);
    auth()
    .signInWithEmailAndPassword(formData.email, formData.password)
    .then((result) => {
      if(result.user.emailVerified){ 
        navigation.navigate('Home'); 
        handleButtonPress("Authentification success :)")
        add(result.user.uid)
        setId(result.user.uid)}
      else alert("Allez verifier vos mailsvotre email n'as pas ete activer")
     
  })
  .catch(error => {
    if (error.code === 'auth/email-already-in-use') {
      handleButtonPress('That email address is already in use!');
    }

    if (error.code === 'auth/invalid-email') {
      handleButtonPress('That email address is invalid!');
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

  const getStatut = async () => {
    try {
      const value = await AsyncStorage.getItem('statut')
      if(value !== null){ setStatut({statut: value}); if(value==="connecte"){navigation.navigate("Home")}; console.log(statut);}
      else{console.log(statut); AsyncStorage.setItem('statut',"deconnecte")} 
    }  catch (e){console.error(e); }
  }
  const getLang = async () => {
    try {
      const value = await AsyncStorage.getItem('lang')
      if(value !== null){ setLang({lang: value});stringsoflanguages.setLanguage(lang);console.log("ok"); }
    }  catch (e){console.error(e);}
  }
  useEffect(() => getLang().then(getStatut()),[]);
  const [visibleToast, setvisibleToast] = useState(false);
  const [toastM,setToastM]=useState("youpi")
  useEffect(() => setvisibleToast(false), [visibleToast]);

  const handleButtonPress = (message) => {
    setToastM(message)
    setvisibleToast(true);
  };
  // useEffect(() => getLang().then(getStatut()),[langue]);
  const onSubmit = () => {
    validate() ? login() : alert("validation failled");
  };
 return (
      <NativeBaseProvider>
         <View >
      <Toast visible={visibleToast} message={toastM} />
    </View>
        <Toast />
      <Box flex={1} p={2} w="90%" mx='auto' >
        <Heading size="lg" color='primary.500'>{stringsoflanguages.authentification.title} </Heading>
        <Heading color="muted.400" size="xs">{stringsoflanguages.authentification.subtitle}</Heading>

        <VStack space={2} mt={5}>
          <FormControl>
          
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
                <FormControl.HelperText _text={{fontSize: 'xs'}}>{stringsoflanguages.authentification.description} </FormControl.HelperText>
                }
            </FormControl>
          
         

            <Link _text={{ fontSize: 'xs', fontWeight: '700', color:'cyan.500' }} alignSelf="flex-end" mt={1}
              onPress={ () => {navigation.navigate('ForgotPassword'),handleButtonPress("Entrer votre address mail")} }>
              {stringsoflanguages.authentification.oublie}
            </Link>
          </FormControl>
          <VStack  space={2}>
          <Button small  onPress={onSubmit} mt={5} colorScheme="cyan" _text={{color: 'white' }}>{stringsoflanguages.authentification.btn2}</Button>
          

<HStack justifyContent="center" alignItem='center'>
          
          </HStack>
          </VStack>
          <HStack justifyContent="center">
            <Text fontSize='sm' color='muted.700' fontWeight={400}>{stringsoflanguages.authentification.text1} </Text>
            <Link _text={{ color: 'cyan.500', bold: true, fontSize: 'sm' }}
            onPress={
              () =>{ navigation.navigate('CreateAccount'),handleButtonPress("Bien vouloir remplir le formulaire")}
            }>
              {stringsoflanguages.authentification.newAccount}  😊
            </Link>
          </HStack>
        </VStack>
        <Center>
      <Button   onPress={
              () => {navigation.navigate('Home'),handleButtonPress("nccavigation suuccess")}
            }> Home</Button>
            </Center>
      </Box>

    </NativeBaseProvider>
  );
}