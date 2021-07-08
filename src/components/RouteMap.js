import React,{useState,useRef} from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';

import {Button,View,Text,SafeAreaView } from 'react-native';

// import Message from './Message';
import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LatitudeDelta=  0.0922;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAyTzROc_wrO-16oCrvH07HLDXPMT9jigI';

const RouteMap = ({ origin, destination }) => {

  const [distance,setDistance]=useState({distance:"0 km",duree:"0 min"})
  const mapView = useRef(null);
  const [coordinates, setCoordinates] = useState([{
    latitude: origin.details.geometry.location.lat,
    longitude: origin.details.geometry.location.lng,
  },{
    latitude: destination.details.geometry.location.lat,
    longitude: destination.details.geometry.location.lng,
  }])

  return (
    <View  style={{width: '100%', height: '100%'}}>
    <MapView
      style={{width: '100%', height: '90%'}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: coordinates[0].latitude,
        longitude: coordinates[0].longitude,
        latitudeDelta:  0.0922,
        longitudeDelta: LatitudeDelta * ASPECT_RATIO,
      }}
      style={StyleSheet.absoluteFill}
        ref={mapView }
        >
        {coordinates.map((coordinate, index) =>
          <Marker key={`coordinate_${index}`} coordinate={coordinate} />
        )}
      <MapViewDirections
        apikey={GOOGLE_MAPS_APIKEY}
        origin={coordinates[0]}
            // waypoints={ (coordinates.length > 2) ? coordinates.slice(1, -1): null}
            destination={coordinates[coordinates.length-1]}
            apikey={GOOGLE_MAPS_APIKEY}
            strokeWidth={3}
            strokeColor="hotpink"
            optimizeWaypoints={true}
            onStart={(params) => {
              console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
            }}
            onReady={result => {
              setDistance({distance:result.distance,duree:result.duration})
              console.log(`Distance: ${result.distance} km`)
              console.log(`Duration: ${result.duration} min.`)

              // mapView.fitToCoordinates(result.coordinates, {
              //   edgePadding: {
              //     right: (width / 20),
              //     bottom: (height / 20),
              //     left: (width / 20),
              //     top: (height / 20),
              //   }
              // });
            }}
            onError={(errorMessage) => {
              console.log('GOT AN ERROR');
            }}
      />
    </MapView>
    {/* <Message  distance={distance}/> */}
    <View style={styles.container}>
      <Text style={styles.learnMore}>{distance.distance} Km</Text>
      <Text style={styles.title}>{distance.duree} min</Text>
    </View>
    </View>
  );
};

export default RouteMap;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 5,
    marginHorizontal: 30,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  },
  learnMore: {
    color: '#000',
    fontSize: 20,
    fontWeight: 'bold',
  }
});
