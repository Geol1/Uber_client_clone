import React from "react";
import { View, Text, Pressable } from "react-native";
import UberTypeRow from './UberTypeRow';
import { ScrollView, VStack, Center, NativeBaseProvider } from "native-base"
import typesData from '../assets/data/types';

const UberTypes = ({ typeState, onSubmit }) => {
  const [selectedType, setSelectedType] = typeState;

  return (
    <NativeBaseProvider>
      <ScrollView >
      <View>
      {typesData.map((type) => (
        <UberTypeRow
          type={type}
          key={type.id}
          isSelected={type.type === selectedType}
          onPress={() => setSelectedType(type.type)}
        />
      ))}

      <Pressable 
      onPress={onSubmit} 
      style={{
        backgroundColor: 'black',
        padding: 10,
        margin: 10,
        alignItems: 'center',
      }}
      >
        <Text style={{color: 'white', fontWeight: 'bold'}}>
          Confirm Uber
        </Text>
      </Pressable>
    </View>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default UberTypes;
