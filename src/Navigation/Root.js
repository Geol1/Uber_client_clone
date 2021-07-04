import React from "react";
import HomeScreen from "../screens/HomeScreen";
import { createStackNavigator } from '@react-navigation/stack'
import DestinationSearch from "../screens/DestinationSearch";
import SearchResult from "../screens/SearchResult";
import { NavigationContainer } from "@react-navigation/native";
// import OrderScreen from "../screens/OrderScreen";

const Stack = createStackNavigator();

const RoutNavigator = (props) => {
  return (
      <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name={"Home"} component={HomeScreen} />
      <Stack.Screen name={"DestinationSearch"} component={DestinationSearch} />
      <Stack.Screen name={"SearchResults"} component={SearchResult} />
      {/* <Stack.Screen name={"OrderPage"} component={OrderScreen} /> */}
    </Stack.Navigator> 
    </NavigationContainer>
  );
};

export default RoutNavigator;