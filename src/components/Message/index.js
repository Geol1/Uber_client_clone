import React from 'react';
import {View, Text} from 'react-native';



import styles from './styles';

const Messsage = (props ) => {
  return(
    <View style={styles.container}>
     
   <Text style={styles.title}> be care full on the road</Text>
      
   <Text style={styles.text}> Now, when someone presses the button, onPress will fire, calling the setIsHungry(false). This sets the state variable</Text>
   
   <Text style={styles.learnMore}>learn more  </Text>
    </View>
  );
};
  

export default Messsage;
