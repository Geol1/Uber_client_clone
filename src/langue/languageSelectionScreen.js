import React, { Component } from 'react';
import { View,ScrollView } from 'react-native';
import stringsoflanguages from "./screenString";
import AsyncStorage from '@react-native-async-storage/async-storage';

import {VStack, Box, Divider,NativeBaseProvider,Text, Body,useToast,Button,Toast,Icon} from 'native-base';


export default class languageSelectionScreen extends Component {
   
    constructor(props){
        super(props)
        const lang=[
            {shortform: "en", longform: stringsoflanguages.params.en},
            {shortform: "fr", longform: stringsoflanguages.params.fr}
        ];
        // toast = useToast();
        global.lang=lang;
    }
   
    settext(value){
        AsyncStorage.setItem('lang',value)
        stringsoflanguages.setLanguage(value);
        // this.props.children.getLang()
        this.props.navigation.navigate("Home", {JSON_Clicked_Item:value})
    }

    render() {
        return (
        <NativeBaseProvider>
        <Box border={1} borderRadius='md'>
            <VStack space={4} divider={<Divider />}>
                <Box px={4} pt={4}>
                {stringsoflanguages.params.description}
                </Box>
                <Box px={4} >
                
                <ScrollView >
                    {global.lang.map((item,key)=>{
                        return (
                            <VStack key={key} >
                                <Text ref={item.shortform} px={4} pt={4}
                                onPress={()=>  this.settext(item.shortform) }>
                                    {item.longform}
                                </Text>
                            </VStack>
                        ) 
                    })}   
                    </ScrollView>
                </Box>
                <Box px={4} pb={8} pt={8}>
                {stringsoflanguages.params.theme}
                </Box>
            </VStack>
        </Box>
              <View>
                  </View>
                  <Button
                    //   onPress={() => {
                    //     toast.show({
                    //       title: 'Wrong password',
                    //       placement: 'bottom',
                    //       status: 'warning',
                    //     });
                    //   }}
                    >
                    Button
                    </Button>
            </NativeBaseProvider>
          );
    }
}
