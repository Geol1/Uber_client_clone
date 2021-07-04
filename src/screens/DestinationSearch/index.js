import React, {useState, useEffect} from 'react';
import {View, Text,Pressable, SafeAreaView} from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { useNavigation } from '@react-navigation/native';

import styles from './styles.js';
import PlaceRow from "./PlaceRow";

import {useNavigation} from '@react-navigation/native';

const homePlace = {
  description: 'Home',
  geometry: { location: { lat: 48.8152937, lng: 2.4597668 } },
};
const workPlace = {
  description: 'Work',
  geometry: { location: { lat: 48.8496818, lng: 2.2940881 } },
};

const DestinationSearch = (props) => {
  const [originPlace, setOriginPlace] = useState(null);
  const [destinationPlace, setDestinationPlace] = useState(null);

   const navigation = useNavigation();

  // const checkNavigation = () => {
  //   if (originPlace && destinationPlace) {
  //     navigation.navigate('SearchResult', {
  //       originPlace,
  //       destinationPlace,
  //     })
  //   }
  // }
 // useEffect(() => {
  //   checkNavigation();
  // }, [originPlace, destinationPlace]);
  // const confirm = () => {
  //   navigation.navigate('SearchResult')
  // }
  return (
    <SafeAreaView>
      <View style={styles.container}>

        <GooglePlacesAutocomplete
          placeholder="Where from?"
          onPress={(data, details = null) => {
            setOriginPlace({data, details});
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          currentLocation={true}
          currentLocationLabel='Current location'
          styles={{
            textInput: styles.textInput,
            container: styles.autocompleteContainer,
            listView: styles.listView,
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDF4qNdlGlnjynejny8uRTnxJOuyj2r6bw',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
          renderDescription={(data) => data.description || data.vicinity}
          predefinedPlaces={[homePlace, workPlace]}
        />

        <GooglePlacesAutocomplete
          placeholder="Where to?"
          onPress={(data, details = null) => {
            setDestinationPlace({data, details});
          }}
          enablePoweredByContainer={false}
          suppressDefaultStyles
          styles={{
            textInput: styles.textInput,
            container: {
              ...styles.autocompleteContainer,
              top: 55,
            },
            separator: styles.separator,
          }}
          fetchDetails
          query={{
            key: 'AIzaSyDF4qNdlGlnjynejny8uRTnxJOuyj2r6bw',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
        />

        {/* Circle near Origin input */}
        <View style={styles.circle} />

        {/* Line between dots */}
        <View style={styles.line} />

        {/* Square near Destination input */}
        <View style={styles.square} />

{/* 
        <Pressable onPress={confirm} style={{
        backgroundColor: 'black',
        padding: 5,
        margin: 5,
        top:300,
      }}>
       <Text style={{color: 'white', fontWeight: 'bold'}}>
         Confirme Uber
       </Text>
     </Pressable> */}
     
      </View>
    </SafeAreaView>
  );
};

export default DestinationSearch;