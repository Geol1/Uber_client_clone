import React ,{useState} from 'react';
import {View, TextInput,SafeAreaView} from 'react-native';


import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import styles from './styles.js';

const DestinationSearch = (props ) => {

    const [fromText, setfromText] = useState( );
    const [destinationText, setDestinationText] = useState( );


  return(
  <SafeAreaView> 
    <View>
    
<TextInput 

value={fromText}
onTextChange={setfromText}
onChangeText ={styles.TextInput}
 placeholder="Form"/> 

 <TextInput 
 value={destinationText}
 onChangeText={setDestinationText} 
 style ={styles.TextInput} 
 placeholder="where to?"/>

<GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: 'AIzaSyDF4qNdlGlnjynejny8uRTnxJOuyj2r6bw',
        language: 'en',
      }}
    />

    </View>
    </SafeAreaView>
  );
};
  

export default DestinationSearch;
