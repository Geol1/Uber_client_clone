import * as React from 'react';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {NativeBaseProvider,Center,VStack,FormControl,Input,Button} from 'native-base';
import {  StyleSheet, Image} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import stringsoflanguages from "../langue/screenString";

function Validation() {
  
  const navigation = useNavigation();
      const [formData, setData] = React.useState({});
      const [errors, setErrors] = React.useState({});
      const validate = () => {
        if (formData.email === undefined) {
          setErrors({
            ...errors,
            email: 'Email is required',
          });
          return false;
        } else if (formData.email.length < 12) {
          setErrors({
            ...errors,
            email: 'Email is incorrect',
          });
          return false;
        }
        return true;
      };

      const send =()=>{
         auth().sendPasswordResetEmail(formData.email).then(()=>{})
  
      if (formData.email) {
        alert('Veuiller consulter vos mails et suivre les instructions');
        navigation.navigate('Authentification')
      }
     
      }
    
      const onSubmit = () => {
        validate() ? send() : alert('Echec de validation, verifier vos informations svp');
      };
    
      return (
            <VStack width="90%" mx={3}>
            <FormControl isRequired isInvalid={'email' in errors}>
                <FormControl.Label _text={{bold: true}}>{stringsoflanguages.email}</FormControl.Label>
                <Input placeholder={stringsoflanguages.placeholderEmail} onChangeText={(value) => setData({ ...formData, email: value })} />
                {'email' in errors ?
                <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.email}</FormControl.ErrorMessage>
        :
                <FormControl.HelperText _text={{fontSize: 'xs'}}>{stringsoflanguages.reinit.description}</FormControl.HelperText>
                }
            </FormControl>
             <Button onPress={onSubmit} mt={5} p={0} colorScheme="cyan"> {stringsoflanguages.reinit.button1} </Button>
            </VStack>
      );
    }
export default function ForgotPassword() {
      return (
        <NativeBaseProvider>
        <Center flex={1}>
        <Image source ={require('../assets/ic_newCon.jpg')}
                    style={styles.avatar}
                />
          <Validation />
          </Center>
        </NativeBaseProvider>
      );
    }

    const styles = StyleSheet.create({
        avatar: {
            height: 200,
            width: 200,
            borderRadius: 100,
          }
    })