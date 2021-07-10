import React,{useState,useEffect} from "react";
import { View, Image, Text, Pressable ,StyleSheet} from "react-native";
import UberTypeRow from './UberTypeRow';
import { ScrollView, VStack, Center, NativeBaseProvider,Collapse,Button,Icon} from "native-base"
import typesData from '../assets/data/types';

import Ionicons from "react-native-vector-icons/Ionicons";
const UberTypes = ({ typeState, onSubmit, distances ,durees }) => {
  const [selectedType, setSelectedType] = typeState;
  
  const [heure, setHeure]=useState(new Date().getHours());
  const [minute, setMinute]=useState(new Date().getMinutes());
  const {type, onPress, isSelected} = typeState;
  const [isEdit, setIsEdit]=useState(false);
  const [choice, setChoice]=useState("Course")

  const getImage = (types) => {
    if (types === 'Course') {
      return require('../assets/images/UberXL.jpeg');
    }
    if (types === 'Depot') {
      return require('../assets/images/Comfort.jpeg');
    }
  }

  const getPrice=(types)=>{
    if(5<=heure && heure<=22 && types === 'Course'){
      return 2000*Math.ceil(distances);
    }else if(5<=heure && heure<=22 && types === 'Depot'){
      if(Math.round(distances)>8)return 2500*Math.ceil(distances)+ 100*Math.ceil(distances);
      else return 2500*durees;
    }else if(5>heure || heure>22 && types === 'course'){
      return 2500*Math.ceil(distances);
    }else{
      if(Math.round(distances)>8)return 2500*distances+ 200*Math.ceil(distances);
      else return 2500*Math.ceil(distances);
    }
  }

  useEffect(() => {getPrice()}, [])
  return (
    <NativeBaseProvider>
      <ScrollView >
      <View>
      {typesData.map((type) => (
        <View >
          <Pressable
          onPress={() => {console.log(type.type); setChoice(type.type)}}
          style={[styles.container, {
            backgroundColor: isSelected ? '#efefef' : 'white',
          }]}
        >
          <Image
            style={styles.image}
            source={getImage(type.type)}
          />

          <View style={styles.middleContainer}>
            <Text style={styles.type}>
              {type.type}{' '}
            </Text>
            <Text style={styles.time}>
            <Ionicons name={'person'} size={16} /> {heure}H {minute}min
            </Text>
            <Text style={styles.time}>
             Duree: {Math.ceil(durees/60)}h<Ionicons name={'time'} size={16} />
            </Text>
          </View>
          <View style={styles.rightContainer}>
            <Text style={styles.price}> {distances} Km</Text>
            <Ionicons name={'pricetag'} size={18} color={'#42d742'} />
            <Text style={styles.price}> {getPrice(type.type)} FCFA</Text>
          </View>
        </Pressable>
      </View>
      ))}
        <Collapse isOpen={isEdit}>
              <Button.Group variant="solid" isAttached space={6} mx={{ base: "auto", md: 0, }} mt={5} >
                <Button endIcon={<Icon as={Ionicons} name="arrow-forward-circle-sharp" size={4} />} colorScheme="primary" mr={2} 
                  onPress={onSubmit}>Commencer
                </Button>
                <Button  onPress={() => setIsEdit(!isEdit)} colorScheme="dark" _text={{ color: "white" }} >Annuler</Button>
              </Button.Group>
        </Collapse>
        <Collapse isOpen={!isEdit}>
          <Button.Group variant="solid" isAttached space={6} mx={{ base: "auto", md: 0, }} mt={5}>
            <Button endIcon={<Icon as={Ionicons} name="person" size={4} />} mr={2}
            onPress={()=>{setIsEdit(!isEdit) }}>{choice}</Button>
          </Button.Group>
          </Collapse>
    </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default UberTypes;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    height: 70,
    width: 80,
    resizeMode: 'contain',
  },
  middleContainer: {
    flex: 1,
    marginHorizontal: 10,
  },
  type: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
  time: {
    color: '#5d5d5d',
  },
  rightContainer: {
    width: 100,
    justifyContent: 'flex-end',
    alignItems:"center"
  },
  price: {
    fontWeight: 'bold',
    fontSize: 15,
    marginLeft: 5,
  },
});