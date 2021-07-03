import React from 'react';

import MapViewDirections from 'react-native-maps-directions';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

const GOOGLE_MAPS_APIKEY='AIzaSyDF4qNdlGlnjynejny8uRTnxJOuyj2r6bw';
const RouteMap = (props ) => {


const origin ={
    latitude: 28.40627,
    longitude: -16.263045,
}


const destination ={
    latitude: 28.450127,
    longitude: -16.269045,
}

  return(

      <MapView
       style={ { height:' 100%', width: '100%'}}
      provider={PROVIDER_GOOGLE}  
    initialRegion={{
      latitude: 28.40627,
      longitude: -16.263045,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }}
  >
    
    <MapViewDirections
    origin={origin}
    destination={destination}
    apikey={GOOGLE_MAPS_APIKEY}
  />

   </MapView>
  );
};
  

export default RouteMap;