import React from "react";
import { View, Image, Text, Pressable ,StyleSheet} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";

const UberTypeRow = (props) => {
  const {type, onPress, isSelected} = props;

  const getImage = () => {
    if (type.type === 'UberX') {
      return require('../assets/images/UberX.jpeg');
    }
    if (type.type === 'Comfort') {
      return require('../assets/images/Comfort.jpeg');
    }
    return require('../assets/images/UberXL.jpeg');
  }

  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, {
        backgroundColor: isSelected ? '#efefef' : 'white',
      }]}
    >
      <Image
        style={styles.image}
        source={getImage()}
      />

      <View style={styles.middleContainer}>
        <Text style={styles.type}>
          {type.type}{' '}
          <Ionicons name={'person'} size={16} />
          3
        </Text>
        <Text style={styles.time}>
          8:03PM drop off
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Ionicons name={'pricetag'} size={18} color={'#42d742'} />
        <Text style={styles.price}> {type.price} FCFA</Text>
      </View>
    </Pressable>
  );
};

export default UberTypeRow;

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
    flexDirection: 'row',
  },
  price: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 5,
  },
});
