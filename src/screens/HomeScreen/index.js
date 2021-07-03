import React from 'react';
import {View, Dimensions} from 'react-native';

import HomeMap from '../../components/HomeMap';
import Message from '../../components/Message';
import HomeSearch from '../../components/HomeSearch';


const HomeScreen = (props ) => {
  return(
    <View>

     <View style={{height:Dimensions.get('window').height - 400}}>
      <HomeMap/>
      
      </View>
      {/*  covidMesssage */}
        <Message/>


      {/*  Bottom Comp+ */}

      <HomeSearch/>

    </View>
  );
};
  

export default HomeScreen;
