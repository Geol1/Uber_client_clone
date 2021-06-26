import React from 'react';
import {StatusBar} from 'react-native';

// import DestinationSearch from './src/screens/DestinationSearch/index';

import HomeScreen from './src/screens/HomeScreen/index';




const App = () => {
  return(
    <>
     <StatusBar barStyle="dark-content" />
     <HomeScreen/>
    </>
  );
};
  

export default App;
