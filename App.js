import React from 'react';
import {StatusBar} from 'react-native';

import DestinationSearch from './src/screens/DestinationSearch/index';



const App = () => {
  return(
    <>
     <StatusBar barStyle="dark-content" />
     <DestinationSearch/>
    </>
  );
};
  

export default App;
