import React, {useState, useEffect} from 'react'
import { StyleSheet, TouchableOpacity ,state,View,Button,Text,Image,Pressable} from 'react-native';
import * as ImagePicker from "react-native-image-picker";
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import stringsoflanguages from "../langue/screenString";

const options = {
    mediaType:'mixed',
    includeBase64: true,
    maxHeight: 200,
    maxWidth: 200,
  };
  
  export default function Avatar({Img,setImg,Img1,setImg1}){

    const state = {
      avatar: Img
    }
 openPicker =()=>{
    
    launchCamera(options, (response) => { 
    
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        setImg({uri:  "data:image/gif;base64,"+response.assets[0].base64})
      }
    });
}
const openGallery =()=>{
    launchImageLibrary(
        {
            mediaType:'photo',
            includeBase64: true,
        },
        (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
              } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
              } else {
                console.log(response.assets[0].base64);
                // setImg1({uri:  response.assets[0].base64})
                setImg({uri:  "data:image/gif;base64,"+response.assets[0].base64})
              }
            //   console.log(response);
        },
        )
    
     
}
    return(
        <View style={styles.container}>
      <View style={styles.topContainer}>
        <View style={styles.metaContainer}>
          <View>
            <Text style={styles.timings}>{stringsoflanguages.avatar.text1}  </Text>
            <Text style={styles.timings}>{stringsoflanguages.avatar.text2} </Text>
            <Text style={styles.description}>{stringsoflanguages.avatar.text3}</Text>
            <Text style={styles.timings}>{stringsoflanguages.avatar.text4} </Text>
          </View>
          
          <Pressable  style={styles.button} onPress={ openGallery }>
            <Text style={styles.buttonText}>{stringsoflanguages.avatar.text5}</Text>
          </Pressable>
        </View>
        <TouchableOpacity  style={styles.touchableOpacity} onPress={openPicker}>
                <Image style={styles.avatar} source={state.avatar} />
         </TouchableOpacity>
      </View>
    </View>
    )
  
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#22d3ee',
        paddingVertical: 16,
        paddingHorizontal: 12,
        borderRadius: 5,
        alignSelf: 'center',
        width: 375,
        maxWidth: '100%',
      },
      timings: {
        color: '#fff',
        fontSize: 14,
      },
      metaContainer: {
        justifyContent: 'space-between',
      },
      topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      avatar: {
        height: 150,
        width: 150,
        borderRadius: 100,
      },
      description: {
        color: 'white',
        marginTop: 5,
        fontSize: 20,
      },
      button: {
        backgroundColor: '#0891b2',
        alignSelf: 'flex-start',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 3,
      },
      buttonText: {
        fontWeight: 'bold',
        color: 'white',
        textTransform: 'uppercase',
        fontSize: 14,
      }
})

