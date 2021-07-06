import React from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

const GOOGLE_MAPS_APIKEY = 'AIzaSyCMk_hCEpkLNxb7TYGaGXN39n017YDYOXU';

const RouteMap = ({ origin, destination }) => {

//   const originLoc = {
//     latitude: origin.details.geometry.location.lat,
//     longitude: origin.details.geometry.location.lng,
//   };

//   const destinationLoc = {
//     latitude: destination.details.geometry.location.lat,
//     longitude: destination.details.geometry.location.lng,
//   };
  const originLoc = {
    latitude: 28.450627,
    longitude: -16.263045,
  };

  const destinationLoc = {
    latitude: 28.456312,
    longitude: -16.252929,
  };

  return (
    <MapView
      style={{width: '100%', height: '100%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: 28.450627,
        longitude: -16.263045,
        latitudeDelta: 0.0222,
        longitudeDelta: 0.0121,
      }}>
      <MapViewDirections
        origin={originLoc}
        destination={destinationLoc}
        apikey={GOOGLE_MAPS_APIKEY}
        strokeWidth={5}
        strokeColor="black"
      />
      <Marker
        coordinate={originLoc}
        // coordinate={{latitude: car.latitude, longitude: car.longitude}}
        title={'Origin'}
      />
      <Marker
        coordinate={destinationLoc}
        title={"Destination"}
      />
    </MapView>
  );
};

export default RouteMap;
