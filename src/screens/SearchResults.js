import React, { useState,useEffect } from 'react';
import {View, Dimensions, Alert} from 'react-native';
import RouteMap from "../components/RouteMap";
import UberTypes from "../components/UberTypes";

import { useRoute, useNavigation } from '@react-navigation/native';

const SearchResults = (props) => {
  const typeState = useState(null);

  const route = useRoute();
  const navigation = useNavigation();
  const [distances,setDistance]=useState(0)
  const [durees,setDuree]=useState(0)
  const {originPlace, destinationPlace} = route.params

  const getCommandeDetail=(distance,duree)=>{
    setDistance(distance)
    setDuree(duree)
  }
  
  const onSubmit = async () => {
    try {
      navigation.navigate('SuiviEnTempsReel', {origin: originPlace.details.geometry.location ,destination: destinationPlace.details.geometry.location } );
    } catch (e) {
      console.error(e);
    }
  }
  useEffect(() => { console.log(durees);}, [distances])
  return (
    <View style={{display: 'flex', justifyContent: 'space-between'}}>
      <View style={{height: Dimensions.get('window').height - 300}}>
        <RouteMap origin={originPlace} destination={destinationPlace}  getCommandeDetail={getCommandeDetail}/>
      </View>

      <View style={{height: 220}}>
        <UberTypes typeState={typeState} onSubmit={onSubmit}  distances={distances} durees={durees}/>
      </View>
    </View>
  );
};

export default SearchResults;
