import React from 'react';
import {View, Text} from 'react-native';

import HomeMap from '../../components/HomeMap';
import Message from '../../components/Message';
import HomeSearch from '../../components/HomeSearch';


const HomeScreen = (props ) => {
  return(
    <View>
      <HomeMap/>
      

      {/*  covidMesssage */}
        <Message/>


      {/*  Bottom Comp+ */}

      <HomeSearch/>

    </View>
  );
};
  

export default HomeScreen;
