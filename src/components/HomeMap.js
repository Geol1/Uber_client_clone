import React, { useState, useEffect } from "react";
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useNavigation } from '@react-navigation/native';
import PlaceRow from "../components/PlaceRow";
import Ionicons from "react-native-vector-icons/Ionicons";
import {View,StyleSheet,Image,TouchableOpacity} from 'react-native';
import cars from '../assets/data/cars';
const carss=cars

const HomeMap = (props) => {
  const [cars, setCars] = useState(carss);
  const [error, setError]=useState(null)
  const [location, setLocation] = useState({latitude: 3.866667,longitude: 11.516667,latitudeDelta: 0.222,longitudeDelta: 0.121 ,error: error});
  const [originPlace, setOriginPlace] = useState(null);
  const navigation = useNavigation();
  const [search,setSearch]=useState(false)
  const [sizeScreen,setSizeScreen]=useState({bar: "30%",carte: "80%"})
  const checkNavigation = () => {
    if (originPlace ) {
      setSearch(!search)
        navigation.navigate('MySearch', {originPlace,})
    }
  }
  const Searching = () => {
    if (search==false ) {
      setSizeScreen({bar: "0%",carte: "100%"})
    }else  setSizeScreen({bar: "30%",carte: "80%"})
  }

  useEffect(() => {
    checkNavigation();
  }, [originPlace]);

  useEffect(() => {
    Searching();
  }, [search]);

  const goToSearch = () => {
    navigation.navigate('Destination')
  }
  const inittialPosition=()=>{
    console.log("current");
    navigator.geolocation.getCurrentPosition(
      position => {
        setLocation({
         latitude: position.coords.latitude,
         longitude: position.coords.longitude,
         latitudeDelta: 0.222,
        longitudeDelta: 0.121,
        error: null
       });
     },
     error => setError( error.message ),
      { enableHighAccuracy: true, timeout: 200000, maximumAge: 1000 }
      );
  }
  useEffect(() => {inittialPosition() }, [])
  const getImage = (type) => {
    if (type === 'UberX') {
      return require('../assets/images/top-UberX.png');
    }
    if (type === 'Comfort') {
      return require('../assets/images/top-Comfort.png');
    }
    return require('../assets/images/top-UberXL.png');
  };

  return (
    <View>
      <View style={{width: '100%', height: sizeScreen.bar}}>
      
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
            key: 'AIzaSyAyTzROc_wrO-16oCrvH07HLDXPMT9jigI',
            language: 'en',
          }}
          renderRow={(data) => <PlaceRow data={data} />}
        />
     
        </View>
    <MapView
      style={{width: '100%', height: sizeScreen.carte}}
      provider={PROVIDER_GOOGLE}
      showsUserLocation={true}
      initialRegion={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: location.latitudeDelta,
        longitudeDelta: location.longitudeDelta,
      }}>
      {cars.map((car) => (
        <Marker key={car.id}
          coordinate={{latitude: car.latitude, longitude: car.longitude}}>
          <Image style={{width: 20,height: 20,resizeMode: 'contain',transform: [{rotate: `${car.heading}deg`}]}}
            source={getImage(car.type)}/>
        </Marker>
      ))}
      
      {/* <Marker coordinate={{latitude: originPlace.latitude, longitude: originPlace.longitude}}>
         <Ionicons name={'location'} size={26} style={styles.floatingButtonStyle}/>
      </Marker> */}

    </MapView>
    <TouchableOpacity
          activeOpacity={0.8}
          onPress={goToSearch}
          style={styles.touchableOpacityStyle}>
         <Ionicons name={'walk-sharp'} size={46} style={styles.floatingButtonStyle}/>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=> setSearch(!search)}
          style={styles.touchableOpacityStyle1}>
         <Ionicons name={"search-circle"} size={46} style={styles.floatingButtonStyle}/>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={()=> inittialPosition()}
          style={styles.touchableOpacityStyle2}>
         <Ionicons name={'locate'} size={36} style={styles.floatingButtonStyle}/>
        </TouchableOpacity>
    </View>
  );
};

export default HomeMap;

const styles = StyleSheet.create({
  
  touchableOpacityStyle: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 1,
    bottom: 1,
  },
  touchableOpacityStyle1: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 5,
    bottom: 100,
  },
  touchableOpacityStyle2: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 1,
    bottom: 50,
  },
  floatingButtonStyle: {
    resizeMode: 'contain',
    width: 50,
    height: 50,
    // backgroundColor:'#E4E4E4'
  },
  container: {
    marginTop:20,
    padding: 10,
    height: '100%',
  },
  textInput: {
    padding: 10,
    backgroundColor: '#707070',
    marginVertical: 5,
    marginLeft: 20,
    borderRadius:50,
  },
  separator: {
    backgroundColor: '#efefef',
    height: 1,
  }
});
