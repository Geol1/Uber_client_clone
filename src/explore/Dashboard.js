import * as React from 'react';
import {Dimensions,Button,View,Text,SafeAreaView } from 'react-native';


import HomeMap from '../components/HomeMap';
// import CovidMessage from '../components/Message';
import HomeSearch from '../components/HomeSearch';
const FirstPage = ({ navigation }) => {
  return (

    <View>
      <View style={{height: Dimensions.get('window').height - 300}}>
        <HomeMap />
      </View>

      {/* <CovidMessage /> */}

      {/*  Bottom Comp*/}
      <View style={{height: 220}}>
      <HomeSearch />
    </View>
    </View>
    
  );
}

export default FirstPage;