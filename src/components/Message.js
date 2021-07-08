import React from "react";
import { View, Text } from "react-native";


export default function Message ({distance}) {

  return (
    <View style={styles.container}>
      <Text style={styles.learnMore}>{distance.distance}</Text>
      <Text style={styles.title}>{distance.duree}</Text>
      {/* <Text style={styles.text}> 12Km </Text> */}
    </View>
  );
};



import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    padding: 5,
    marginHorizontal: 30,
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    color: '#22d3ee',
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  text: {
    color: '#22d3ee',
    fontSize: 15,
    // marginBottom: 10,
  },
  learnMore: {
    color: '#22d3ee',
    fontSize: 20,
    fontWeight: 'bold',
  }
});


