import React ,{useState,useEffect} from 'react';
import {View, TextInput,SafeAreaView} from 'react-native';


import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


import styles from './styles.js';

const DestinationSearch = (props ) => {

    

const[originPlace, setOriginPlace]= useState(null);
const[destinationPlace, setdestinationPlace]= useState(null);

useEffect(() => {
 
}, [originPlace, destinationPlace]);

  return(
  <SafeAreaView> 
    <View style={styles.container}>
    

    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        setdestinationPlace( value= {data, details});
        
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      styles={{
        textInput: styles.TextInput,
      }}
      fetchDetails
      query={{
        key: 'AIzaSyDF4qNdlGlnjynejny8uRTnxJOuyj2r6bw',
        language: 'en',
      }}
    />


<GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        setdestinationPlace( value= {data, details});
        
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      styles={{
        textInput: styles.TextInput,
      }}
      fetchDetails
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
