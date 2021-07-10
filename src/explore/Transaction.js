import * as React from 'react';
import {NativeBaseProvider,Center,VStack,FormControl,Input,Button} from 'native-base';
import {  StyleSheet, Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

function Validation() {
  
  const navigation = useNavigation();
      const [formData, setData] = React.useState({});
      const [errors, setErrors] = React.useState({});
      const validate = () => {
        if (formData.email === undefined) {
          setErrors({
            ...errors,
            email: 'Numero de telephone requis',
          });
          return false;
        } else if (formData.email.length < 9) {
          setErrors({
            ...errors,
            email: 'Dois contenir au moins 9 caracteres',
          });
          return false;
        }
        return true;
      };

      const send =()=>{
        if (formData.email) {
          navigation.navigate('HistoriqueTransaction',formData.email)
        }
      }
    
      const onSubmit = () => {
        validate() ? send() : alert('Echec de validation, verifier vos informations svp');
      };
    
      return (
            <VStack width="90%" mx={3}>
            <FormControl isRequired isInvalid={'email' in errors}>
                <FormControl.Label _text={{bold: true}}>Telephone</FormControl.Label>
                <Input placeholder="Telephone" onChangeText={(value) => setData({ ...formData, email: value })} />
                {'email' in errors ?
                <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.email}</FormControl.ErrorMessage>
        :
                <FormControl.HelperText _text={{fontSize: 'xs'}}>Veuiller entrer de bonne donnees merci. </FormControl.HelperText>
                }
            </FormControl>
             <Button onPress={onSubmit} mt={5} p={2} colorScheme="cyan">Voir Mon Profil</Button>
             <Button onPress={
              () => navigation.navigate('CreationChauffeur')
            } mt={5} p={2} colorScheme="cyan">Creer un Chauffeur</Button>
             <Button onPress={
              () => navigation.navigate('ListeChauffeur')
            } mt={5} p={2} colorScheme="cyan">Liste des Chauffeurs</Button>
            </VStack>
      );
    }
export default function ForgotPassword() {
      return (
        <NativeBaseProvider>
        <Center flex={1}>
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