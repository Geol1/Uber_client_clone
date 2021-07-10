import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet, TouchableOpacity ,Image,Pressable} from 'react-native';
import { View, Text } from "react-native";
import { Avatar, Center, NativeBaseProvider,Button,Icon,ScrollView} from "native-base";

import Ionicons from "react-native-vector-icons/Ionicons";
// import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import ProfilUser from "../profil_user/ProfilUser";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import stringsoflanguages from "../langue/screenString";

export default function ListeVehicule() {
    const navigation = useNavigation();
    const [Img,setImg]=useState(require('../assets/ic_newCon.jpg'))
    const [id , setId] = useState("");
    const [visibleImg , setVisibleImg] = useState(2);
    const [user, setUser] = useState( [{username:"Geol",telephone:"+237 ********",email: "mail"}] );
    const getId = async () => {
      try {
        const value = await AsyncStorage.getItem('userId')
        if(value !== null){ setId(value); setId(value) }
      }  catch (e){}
  }
  const state = {
    avatar:Img
  }
  const CurrentUser=() => {
    getId().then()
    firestore()
    .collection('chauffeur')
    .onSnapshot((querySnapshot) => {
        var TabVehicule=[]
        setUser([])
        user.splice(0,1)
        querySnapshot.docs.forEach((doc)=>{
          TabVehicule.push(doc.data());
        })
        TabVehicule.map((element)=>{
          user.push({username:element.username,telephone:element.telephone,email:element.email})
        })
        setUser(user)
    })
    
}
useEffect(() => CurrentUser(),[id]);
  return (
<NativeBaseProvider>
  <ScrollView >
      <Button.Group   space={0} mx={{ base: "auto", md: 0, }} mt={0} mb={0}>
          <Button endIcon={<Icon as={Ionicons} name="car-sport-sharp" size={4} />} mb={0}
             onPress={() => {getId(); console.log((visibleImg));}} >Actualiser</Button>
      </Button.Group>
    <View >
    {user.map((type,index) => (
        
      <View style={{backgroundColor: '#000', padding: 5,marginVertical: 10}}>
        <View style={{flexDirection: 'row',alignItems: 'center',justifyContent: 'space-around'}}>
          {/* <Image style={styles.avatar} source={state.image} /> */}
        <View>
          <Text style={{color: '#dddddd',  marginVertical: 10}}>Nom: {type.username}</Text>
          <Text style={{color: 'white',   marginVertical: 10}}>Telephon: {type.telephone}</Text>
          <Text style={{color: 'white',   marginVertical: 10}}>Email: {type.email}</Text>
        </View>
        <View style={{ borderBottomWidth: 1,borderBottomColor: '#919191',borderTopWidth: 1,borderTopColor: '#919191',paddingVertical: 5,marginVertical: 10, }}></View>
        
        </View>
      </View>
    ))}
    </View>
  </ScrollView>
</NativeBaseProvider>
  );
};


const styles = StyleSheet.create({
    avatar: {
      height: 100,
      width: 100,
      borderRadius: 20,
    }
})
