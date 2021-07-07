import React, { Component } from 'react'

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';

import Navigators from './src/navigations/Navigators';

export default class App extends React.Component {

  render(){
    return(
      <NavigationContainer>
        <NavigatorsDrawer/>
      </NavigationContainer>
    )
  }
}
