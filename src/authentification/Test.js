
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import LanguageSelectionScreen from "../langue/languageSelectionScreen"
import ContentScreen from "../langue/contentScreen"



const Stack = createStackNavigator();

export default function Parametre() {
  return (
    <Stack.Navigator  screenOptions={{ 
            headerStyle: { backgroundColor: '#000'},
            headerTintColor: '#FFF', 
            headerTitleStyle: { fontWeight: 'bold' }
      }}>
     
        <Stack.Screen options={{headerShown: false}} name="LanguageSelectionScreen" component={LanguageSelectionScreen} />
        <Stack.Screen options={{headerShown: false}}  name="ContentScreen" component={ContentScreen} />
    </Stack.Navigator>
  );
}
