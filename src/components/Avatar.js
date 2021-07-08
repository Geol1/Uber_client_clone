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
  import { ToastAndroid } from "react-native";
  const Toast = ({ visible, message }) => {
    if (visible) {
      ToastAndroid.showWithGravityAndOffset(
        message,
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50
      );
      return null;
    }
    return null;
  };
export default function Avatar({Img,setImg,Img1,setImg1}){

    const state = {
      avatar: Img
    }
 const openPicker =()=>{
    
    launchCamera(options, (response) => { 
    
      if (response.didCancel) {
       handleButtonPress('User cancelled image picker');
      } else if (response.error) {
       handleButtonPress('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
       handleButtonPress('User tapped custom button: ', response.customButton);
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
               handleButtonPress('User cancelled image picker');
              } else if (response.error) {
               handleButtonPress('ImagePicker Error: ', response.error);
              } else if (response.customButton) {
               handleButtonPress('User tapped custom button: ', response.customButton);
              } else {
                setImg({uri:  "data:image/gif;base64,"+response.assets[0].base64})
              }
        },
        )}
      const [visibleToast, setvisibleToast] = useState(false);
      const [toastM,setToastM]=useState("youpi")
      useEffect(() => setvisibleToast(false), [visibleToast]);

      const handleButtonPress = (message) => {
        setToastM(message)
        setvisibleToast(true);
      };  
    return(
        <View style={styles.container}>
          <Toast visible={visibleToast} message={toastM} />
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

