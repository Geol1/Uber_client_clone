import React,{useEffect} from 'react';
import {StatusBar,PermissionsAndroid,Platform} from 'react-native';



//  import HomeScreen from './src/screens/HomeScreen/index';


 import Geolocation from '@react-native-community/geolocation';

 navigator.geolocation = require('@react-native-community/geolocation');
 import 'react-native-gesture-handler';

 import Router from './src/Navigation/Root.js';

const App = () => {
  const AndroidPermission= async()=>{
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Uber App needs access to your Location " +
            "so you can take awesome rides.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the Location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
 
  }

  useEffect(() => {
    if (Platform.OS === 'android') {
      AndroidPermission();
    } else {
      // IOS
      Geolocation.requestAuthorization();
    }
  }, [])
  return(
    <>

     <StatusBar barStyle="dark-content" />
     <Router/>

    </>


  );
};
  

export default App;
