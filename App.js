import React from 'react';
import {StatusBar} from 'react-native';

import SearchResult from './src/screens/SearchResult/index';

// import HomeScreen from './src/screens/HomeScreen/index';




const App = () => {
  return(
    <>
     <StatusBar barStyle="dark-content" />
     <SearchResult/>
    </>
  );
};
  

export default App;
