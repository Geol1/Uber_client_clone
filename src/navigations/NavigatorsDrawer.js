import React from "react";
import { createDrawerNavigator } from '@react-navigation/drawer';

import Home from "../components/Home";
import Authentification from "../authentification/Authentification";
import CreateAccount from "../create_account/CreateAccount";


const Drawer = createDrawerNavigator();

export default function Navigators() {
  return (
    
        <Drawer.Navigator>
         <Drawer.Screen name="Home" component={ Home } />
         <Drawer.Screen name="Authentification" component={ Authentification } />
         <Drawer.Screen name="CreateAccount" component={CreateAccount} />
      </Drawer.Navigator>
    
  );
}