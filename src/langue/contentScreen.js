import React, { Component } from 'react'
import { Text, View,ScrollView } from 'react-native';
import stringsoflanguages from "./screenString";


export default class contentScreen extends Component {

    static navigationOptions = ({navigation})=>{
        return{
            title: navigation.getParam("Title", "Default Title"),
        };
    };

    componentDidMount(){
        var that=this;
        var heading="";
        // if(this.props.navigation.state.params.JSON_Clicked_Item="en"){
        //     heading= "select Language English";
        // } else if(this.props.navigation.state.params.JSON_Clicked_Item="fr"){
        //     heading= "select Language Francais";
        // }
    }

    render() {
        return (
            <View>
                <Text> {stringsoflanguages.profil.description1} </Text>
                <Text> {stringsoflanguages.name} </Text>
            </View>
        )
    }
}
