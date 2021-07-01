import React from 'react';
import {View,Pressable , Text} from 'react-native';


import UberTypeRow from '../UberTypeRow';

import typesData from '../../assets/data/types';

const UberTypes = (props ) => {

  const confirm = ( )=>{
    console.warn( data = 'confirm');
  }

    return(
      <View>


      {typesData.map(type => <UberTypeRow type={type}/> )}
        
     
     
     <Pressable onPress={confirm} style={{
        backgroundColor: 'black',
        padding: 10,
        margin: 10,
        alignItems: 'center',
      }}>
       <Text style={{color: 'white', fontWeight: 'bold'}}>
         Confirme Uber
       </Text>
     </Pressable>
        
      </View>
    );
  };
    
  
  export default UberTypes;
  