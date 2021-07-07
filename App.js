import React, { Component } from 'react'
import { Text, View } from 'react-native'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import NavigatorsDrawer from './src/navigations/NavigatorsDrawer';
import Navigators from './src/navigations/Navigators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stringsoflanguages from "./src/langue/screenString";
import MapView from 'react-native-maps';

import {StatusBar, PermissionsAndroid, Platform} from 'react-native';
import Geolocation from '@react-native-community/geolocation';

navigator.geolocation = require('@react-native-community/geolocation');

export default class App extends React.Component {
  constructor(props){
    super(props)
  }

  state = {  
    lang: "fr",
    statut: "connecte"
  }

  componentDidMount(){
    this.getLang().then(stringsoflanguages.setLanguage(this.state.lang));

    if (Platform.OS === 'android') {
      this.androidPermission();
      console.log("map")
    } else {
      // IOS
      console.log("map ios")
      Geolocation.requestAuthorization();
    }
  }
  getLang = async () => {
    try {
      const value = await AsyncStorage.getItem('lang')
      if(value !== null){ this.setState({lang: value});stringsoflanguages.setLanguage(this.state.lang) ; console.log(this.state.lang);}
    }  catch (e){console.error(e);}
  }
  // getStatut = async () => {
  //   try {
  //     const value = await AsyncStorage.getItem('statut')
  //     if(value !== null){ this.setState({statut: value}); if(value==="deconnecte"){this.props.navigation.navigate("Home")}; console.log(this.state.statut);}
  //     else{console.log(this.state.statut); AsyncStorage.setItem('statut',"deconnecte")} 
  //   }  catch (e){console.error(e); }
  // }

  androidPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Uber App Camera Permission",
          message:
            "Uber App needs access to your location " +
            "so you can take awesome rides.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the location");
      } else {
        console.log("Location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  }



  render(){
    return(
      <NavigationContainer>
        <Navigators getLang={this.getLang} />
      </NavigationContainer>
    )
  }
}

