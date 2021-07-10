import React, { useState } from 'react';
import {View,Text, Dimensions, Alert} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { useRoute, useNavigation } from '@react-navigation/native';


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LatitudeDelta=  0.0922;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAyTzROc_wrO-16oCrvH07HLDXPMT9jigI';

const RouteMapping = ({ origin}) => {
    console.log(origin);
    const originLoc = {
      latitude: origin.details.geometry.location.lat,
      longitude: origin.details.geometry.location.lng,
    };
  
    return (
      <MapView
        style={{width: '100%', height: '100%'}}
        provider={PROVIDER_GOOGLE}
        showsUserLocation={true}
        initialRegion={{
            latitude: originLoc.latitude,
            longitude: originLoc.longitude,
            latitudeDelta:  0.0922,
            longitudeDelta: LatitudeDelta * ASPECT_RATIO,
        }}>
        {/* <MapViewDirections
          origin={originLoc}
          destination={destinationLoc}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={5}
          strokeColor="black"
        /> */}
        <Marker
          coordinate={originLoc}
          title={'Origin'}
        />
        
      </MapView>
    );
  };
  
//   export default RouteMapping;


const MySearch = (props) => {

  const route = useRoute();
    // console.log(route.params);
  const {originPlace} = route.params

  return (
    <View style={{display: 'flex', justifyContent: 'space-between'}}>
      <View style={{height: Dimensions.get('window').height - 1}}>
          {/* <Text> bonjour</Text> */}
        <RouteMapping origin={originPlace}/>
        
      </View>

    </View>
  );
};

export default MySearch;
