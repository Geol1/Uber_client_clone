import React, { Component } from 'react'
import { Text, View } from 'react-native'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import NavigatorsDrawer from './src/navigations/NavigatorsDrawer';
import Navigators from './src/navigations/Navigators';
import AsyncStorage from '@react-native-async-storage/async-storage';
import stringsoflanguages from "./src/langue/screenString";

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

  render(){
    return(
      <NavigationContainer>
        <Navigators getLang={this.getLang} />
      </NavigationContainer>
    )
  }
}

