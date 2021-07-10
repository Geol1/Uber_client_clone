import React, { Component } from 'react';
import {Platform, StyleSheet, Text, View,Dimensions,Image} from 'react-native';
import MapView, {Marker, Polyline,PROVIDER_GOOGLE} from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import PubNubReact from 'pubnub-react';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const GOOGLE_MAPS_APIKEY = 'AIzaSyAyTzROc_wrO-16oCrvH07HLDXPMT9jigI';
const LATITUDE_DELTA = 0.222;
const LONGITUDE_DELTA = 0.121;
const LATITUDE = 18.7934829;
const LONGITUDE = 98.9867401;
export default class SuiviEnTempsReel extends Component {

    constructor(props) {
        super(props);
        this.state = {
            latitude: this.props.route.params.origin.lat,
            longitude:this.props.route.params.origin.lng,
            error: null,
            routeCoordinates: [],
            distanceTravelled: 0, 
            valueprevLatLng: {},
            coordinates:[{
                latitude: this.props.route.params.origin.lat,
                longitude: this.props.route.params.origin.lng,
                statut: "origin"
              },{
                latitude: this.props.route.params.destination.lat,
                longitude: this.props.route.params.destination.lng,
                statut: "destination"
              }]
        }
        
       }
      

       getMapRegion = () => ({
        latitude: this.state.latitude,
        longitude: this.state.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA
       });

       componentDidMount() {
        navigator.geolocation.getCurrentPosition(
         position => {
           this.setState({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
           error: null
          });
        },
        error => this.setState({ error: error.message }),
         { enableHighAccuracy: true, timeout: 20, maximumAge: 1000 }
         );
         this.watchLocation();
       }

    //    composantWillUnmount () {
    //     navigator.geolocation.clearWatch (this.watchID);
    //   }
     getImage = (types) => {
        if (types === 'origin') {
          return require('../assets/images/UberXL.jpeg');
        }else  {
          return require('../assets/ic_newCon.jpg');
        }
      }
      watchLocation = () => {
        navigator.geolocation.watchPosition(
            position => {
             const { latitude, longitude } = position.coords;
             const { routeCoordinates,distanceTravelled  } = this.state;
             const newCoordinate = {
              latitude,
              longitude
             };
             this.setState({
              latitude,
              longitude,
              routeCoordinates: routeCoordinates.concat([newCoordinate]),
              distanceTravelled: distanceTravelled ,
            //   + this.calcDistance(newCoordinate),
              prevLatLng: newCoordinate
             });
          })
      };
       
    render() {
        return (
            <View style={styles.container}>
            <MapView style={styles.map} provider={PROVIDER_GOOGLE} region={this.getMapRegion()} >
                <Polyline coordinates={this.state.routeCoordinates} strokeWidth={5} />
            <Marker coordinate={this.state.coordinates[0]} >
                     <Image  style={styles.image}source={require('../assets/images/UberXL.jpeg')}/>
             </Marker>
            {this.state.coordinates.map((coordinate, index) =>
                <Marker key={`coordinate_${index}`} coordinate={coordinate} >
                     <Image style={styles.image} source={this.getImage(coordinate.statut)} />
                </Marker>
                )}
                {/* <Polyline coordinates={this.getMapRegion()} strokeWidth={2} /> */}
                <MapViewDirections
                    apikey={GOOGLE_MAPS_APIKEY}
                    origin={this.state.coordinates[0]}
                        destination={this.state.coordinates[this.state.coordinates.length-1]}
                        apikey={GOOGLE_MAPS_APIKEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                        onStart={(params) => {
                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                        // getCommandeDetail(result.distance,result.duration)
                        }}
                        onError={(errorMessage) => {
                        // console.log('GOT AN ERROR');
                        }}
                />
            </MapView>
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        ... StyleSheet.absoluteFillObject,
        alignItems: "center"
      },
      map: {
        ... StyleSheet.absoluteFillObject
      },image: {
        height: 40,
        width: 45,
        resizeMode: 'contain',
      }
  });
