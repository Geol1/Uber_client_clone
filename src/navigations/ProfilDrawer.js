import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect,useRef} from 'react'
import { StyleSheet, TouchableOpacity ,Image,Pressable} from 'react-native';
import { View, Text } from "react-native";
import {DrawerContentScrollView, DrawerItemList} from '@react-navigation/drawer';
// import { Auth } from 'aws-amplify';
import { useNavigation } from '@react-navigation/native';
import ProfilUser from "../profil_user/ProfilUser";
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import stringsoflanguages from "../langue/screenString";

const CustomDrawer = (props) => {

    const navigation = useNavigation();
    const [Img,setImg]=useState(require('../assets/ic_newCon.jpg'))
    const [id , setId] = useState("");
    const [user, setUser] = useState( {username:"Geol",telephone:"+237 ********",image: require('../assets/ic_newCon.jpg'),email: "mail"} );
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
    getId().then(
     firestore().collection('user').doc(id).get().then(documentSnapshot => {
       const refImage = storage().ref(documentSnapshot.data().image)
       refImage.getDownloadURL().then(function(url) {
         setImg({uri: url});
         setUser({username:documentSnapshot.data().username,telephone:documentSnapshot.data().telephone,image: {uri: url},email: documentSnapshot.data().email})
       })
     })
     )
}
useEffect(() => CurrentUser(),[id]);
  return (
    <DrawerContentScrollView {...props}>
      <View style={{backgroundColor: '#212121', padding: 15}}>

        <View style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Image style={styles.avatar} source={state.avatar} />
          
        </View>

        <Pressable
          onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: '#dddddd', paddingVertical: 5, marginVertical: 10}}>{user.username}</Text>
        </Pressable>

        <Pressable onPress={() => {console.warn('Make Money Driving')}}>
          <Text style={{color: 'white', paddingVertical: 5,  marginVertical: 10}}>Tel: {user.telephone}</Text>
        </Pressable>
        <View style={{ borderBottomWidth: 1,borderBottomColor: '#919191',borderTopWidth: 1,borderTopColor: '#919191',paddingVertical: 5,marginVertical: 10, }}>
          <Pressable
            onPress={() => {navigation.navigate("ProfilUser")}}>
            <Text style={{color: '#dddddd', paddingVertical: 5,}}>PROFILE</Text>
          </Pressable>
        </View>

      </View>

      <DrawerItemList {...props} />

      <Pressable onPress={() => { Auth.signOut() }}>
        <Text style={{padding: 5, paddingLeft: 20}}>Logout</Text>
      </Pressable>
    </DrawerContentScrollView>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
    avatar: {
      height: 150,
      width: 150,
      borderRadius: 100,
    }
})
