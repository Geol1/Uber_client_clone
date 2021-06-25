import * as React from 'react';
// import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons';
import {NativeBaseProvider,Center,Box,Text,Heading,VStack,FormControl,Input,Link,Button,Icon,IconButton,HStack,Divider } from 'native-base';


export default function ForgotPassword({ navigation }) {
   
      const [formData, setData] = React.useState({});
      const [errors, setErrors] = React.useState({});
      const validate = () => {
        if (formData.name === undefined) {
          setErrors({
            ...errors,
            name: 'Name is required',
          });
          return false;
        } else if (formData.name.length < 12) {
          setErrors({
            ...errors,
            name: 'Name is too short',
          });
          return false;
        }
        return true;
      };
    
      const onSubmit = () => {
        validate() ? console.log(formData.name) : console.log('Validation Failed');
      };
    
      return (
        <NativeBaseProvider>
            <VStack width="90%" mx={3}>
            <FormControl isRequired isInvalid={'name' in errors}>
                <FormControl.Label _text={{bold: true}}>Name</FormControl.Label>
                <Input placeholder="Oldrich" onChangeText={(value) => setData({ ...formData, name: value })} />
                {'name' in errors ?
                <FormControl.ErrorMessage _text={{fontSize: 'xs', color: 'error.500', fontWeight: 500}}>{errors.name}</FormControl.ErrorMessage>
        :
                <FormControl.HelperText _text={{fontSize: 'xs'}}> Name should contain atleast 3 character. </FormControl.HelperText>
                }
            </FormControl>
             <Button  onPress={onSubmit} mt={5} colorScheme="cyan"> Submit </Button>
            </VStack>
        </NativeBaseProvider>
      );
    }
function Validation() {
      return (
        <NativeBaseProvider>
        <Center flex={1}>
          <BuildingAFormExample />
          </Center>
        </NativeBaseProvider>
      );
    }