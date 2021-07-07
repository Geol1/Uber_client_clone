import 'react-native-gesture-handler';

import * as React from 'react';
import {Button,View,Text,TouchableOpacity,Image} from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Dashboard from '../explore/Dashboard';
import Transaction from '../explore/Transaction';
import HistoriqueTransaction from '../explore/HistoriqueTransaction';
import ProfilUser from "../profil_user/ProfilUser"
import Destination from "../screens/Destination"
import SearchResults from "../screens/SearchResults"
import ProfilDrawer from "../navigations/ProfilDrawer"

import Parametre from "../profil_user/Parametre"
import stringsoflanguages from "../langue/screenString";


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const NavigationDrawerStructure = (props)=> {
  //Structure for the navigatin Drawer
  const toggleDrawer = () => {
    //Props to open/close the drawer
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={{ flexDirection: 'row' }}>
      <TouchableOpacity onPress={()=> toggleDrawer()}>
        {/*Donute Button Image */}
        <Image
          source={{uri: 'https://raw.githubusercontent.com/AboutReact/sampleresource/master/drawerWhite.png'}}
          style={{
            width: 25,
            height: 25,
            marginLeft: 5
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

function firstScreenStack({ navigation }) {
  return (
      <Stack.Navigator initialRouteName="Dashboard" 
      screenOptions={{
        headerLeft: ()=>
          <NavigationDrawerStructure navigationProps={navigation}/>,
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#FFF', 
        headerTitleStyle: {fontWeight: 'bold' }
      }}>
        <Stack.Screen
          name={stringsoflanguages.home.dashboard}
          component={Dashboard}
          options={{
            title: stringsoflanguages.home.dashboardTitle }}
        />
        <Stack.Screen
        name={stringsoflanguages.home.destination}
        component={Destination}
        options={{
          title: stringsoflanguages.home.destination, //Set Header Title
        }}/>
        <Stack.Screen
        name={stringsoflanguages.home.search}
        component={SearchResults}
        options={{
          title: stringsoflanguages.home.searchTitle, //Set Header Title
        }}/>
      </Stack.Navigator>
  );
}

function secondScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Transaction"
      screenOptions={{
        headerLeft: ()=>
          <NavigationDrawerStructure navigationProps={navigation}/>,
        headerStyle: { backgroundColor: '#000' },
        headerTintColor: '#FFF', //Set Header text color
        headerTitleStyle: {fontWeight: 'bold' }
      }}>
      <Stack.Screen
        name={stringsoflanguages.home.transaction}
        component={Transaction}
        options={{
          title: stringsoflanguages.home.transactionTitle, //Set Header Title
        }}/>
      <Stack.Screen
        name={stringsoflanguages.home.historique}
        component={HistoriqueTransaction}
        options={{
          title: stringsoflanguages.home.historiqueTitle, //Set Header Title
        }}/>
    </Stack.Navigator>
  );
}

function thirdsScreenStack({ navigation }) {
  return (
    <Stack.Navigator
      initialRouteName="Parametre"
      screenOptions={{
        headerLeft: ()=>
          <NavigationDrawerStructure
            navigationProps={navigation}
          />,
        headerStyle: {
          backgroundColor: '#000'
        },
        headerTintColor: '#FFF',
        headerTitleStyle: {
          fontWeight: 'bold'
        }
      }}>
      <Stack.Screen
        name="Parametre"
        component={Parametre}
        options={{
          title: stringsoflanguages.home.setting, //Set Header Title
        }}/>
      <Stack.Screen
        name="HistoriqueTransaction"
        component={HistoriqueTransaction}
        options={{
          title:  stringsoflanguages.home.historiqueTitle, //Set Header Title
        }}/>
    </Stack.Navigator>
  );
}

function Home() {
  return (
    
      <Drawer.Navigator
        drawerContentOptions={{
          activeTintColor: '#000',
          itemStyle: { marginVertical: 5 },
        }}
        drawerContent={
          (props) => (
            <ProfilDrawer {...props} />)
        }>

        <Drawer.Screen
          name={stringsoflanguages.home.dashboard}
          options={{ drawerLabel: stringsoflanguages.home.dashboardTitle }}
          component={firstScreenStack} />
        <Drawer.Screen
          name={stringsoflanguages.home.transaction}
          options={{ drawerLabel: stringsoflanguages.home.transactionTitle }}
          component={secondScreenStack} />
        <Drawer.Screen
          name={stringsoflanguages.home.setting}
          options={{ drawerLabel: stringsoflanguages.home.setting }}
          component={thirdsScreenStack} />
      </Drawer.Navigator>
    
  );
}

export default Home;