import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import Home from "../components/Home";
import Authentification from "../authentification/Authentification";
import CreateAccount from "../create_account/CreateAccount";
import ForgotPassword from "../forgot_pass/ForgotPassword";



const Stack = createStackNavigator();

export default function Navigators() {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Authentification" component={Authentification} />
        <Stack.Screen name="CreateAccount" component={CreateAccount} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}