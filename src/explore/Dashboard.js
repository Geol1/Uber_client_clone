import * as React from 'react';
import {Dimensions,Button,View,Text,SafeAreaView } from 'react-native';


import HomeMap from '../components/HomeMap';
// import CovidMessage from '../../components/CovidMessage';
import HomeSearch from '../components/HomeSearch';
const FirstPage = ({ navigation }) => {
  return (

    <View>
      <View style={{height: Dimensions.get('window').height - 400}}>
        <HomeMap />
      </View>

      {/*  Covid Message*/}
      {/* <CovidMessage /> */}

      {/*  Bottom Comp*/}
      <HomeSearch />
    </View>

    // <SafeAreaView style={{ flex: 1 }}>
    //   <View style={{ flex: 1 , padding: 16}}>
    //     <View
    //       style={{
    //         flex: 1,
    //         alignItems: 'center',
    //         justifyContent: 'center',
    //       }}>
    //       <Text
    //         style={{
    //           fontSize: 25,
    //           textAlign: 'center',
    //           marginBottom: 16
    //         }}>
    //         This is the First Page under First Page Option
    //       </Text>
    //       <Button
    //         onPress={
    //           () => navigation.navigate('SecondPage')
    //         }
    //         title="Go to Second Page"
    //       />
    //       <Button
    //         onPress={
    //           () => navigation.navigate('ThirdPage')
    //         }
    //         title="Go to Third Page"
    //       />
    //     </View>
    //     <Text
    //       style={{
    //         fontSize: 18,
    //         textAlign: 'center',
    //         color: 'grey'
    //       }}>
    //       React Navigate Drawer
    //     </Text>
    //     <Text
    //       style={{
    //         fontSize: 16,
    //         textAlign: 'center',
    //         color: 'grey'
    //       }}>
    //       www.aboutreact.com
    //     </Text>
    //   </View>
    // </SafeAreaView>
  );
}

export default FirstPage;