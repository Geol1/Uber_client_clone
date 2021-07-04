import React from 'react';

import MapViewDirections from 'react-native-maps-directions';

import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';

const GOOGLE_MAPS_APIKEY='AIzaSyDF4qNdlGlnjynejny8uRTnxJOuyj2r6bw';
//const GOOGLE_MAPS_APIKEY='AIzaSyAyTzROc_wrO-16oCrvH07HLDXPMT9jigI';

const RouteMap = (props ) => {


const origin ={
    latitude: 28.450627,
    longitude: -16.263045,
}


const destination ={
    latitude: 28.460127,
    longitude: -16.269045,
}

  return(

      <MapView
       style={ { height:' 100%', width: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}  
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
     strokeWidth={5}
        strokeColor="black"
  />
  <Marker 
  
  coordinate={ origin}
  title={' origin'}
   
  />
<Marker 
  
  coordinate={ destination }
  title={'Destination'}
    
  />
   </MapView>
  );
};
  

export default RouteMap;