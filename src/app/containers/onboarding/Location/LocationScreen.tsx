import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity, Alert } from "react-native";
import styles from "./styles";
import Button from ".././OBTabScreen/Button";
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { datapost,data } from './../data'
import { NavigationScreenProps } from "react-navigation";
import { string } from "prop-types";

import axios from "axios";
// Images
const map = require('../../../../assets/map.png');
const pick = require('../../../../assets/pick_position.png');

type ComponentProps = {
    region: any
}

class LocationScreen extends Component<NavigationScreenProps, ComponentProps> {
    componentDidCatch() { }

    constructor(props: any) {
        super(props);
        this.state = {
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }
        }
        this.dataput();
    }

    

    dataput = () => {
        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile',
            // data: datapost,
            headers: {
                'Authorization': data.Token
            }
        })
            .then(async (response:any) => {


                response.data.profileEntries.forEach((arrss: any) => {
                    if (arrss.entryType === "GENDER") {
                        datapost.profile[0].value = arrss.value;
                    }
                    if (arrss.entryType === "HEIGHT") {
                        datapost.profile[1].value = arrss.value;
                    }
                    if (arrss.entryType === "DRINKING") {
                        datapost.profile[2].value = arrss.value;
                    }
                    if (arrss.entryType === "SMOKING") {
                        datapost.profile[3].value = arrss.value;
                    }
                    if (arrss.entryType === "EDUCATION_LEVEL") {
                        datapost.profile[4].value = arrss.value;
                    }
                    if (arrss.entryType === "WORK") {
                        datapost.profile[5].value = arrss.value;
                    }
                    if (arrss.entryType === "JOB_TITLE") {
                        datapost.profile[6].value = arrss.value;
                    }
                    if (arrss.entryType === "NAME") {
                        datapost.profile[7].value = arrss.value;
                    }
                });

                if(response.data.location.length>0)
                {
                    datapost.location.latitude=response.data.location[1];
                    datapost.location.longitude=response.data.location[0];
                var re= {
                    latitude: response.data.location[1],
                    longitude: response.data.location[0],
                    latitudeDelta: 0.015,
                    longitudeDelta: 0.0121,
                }

                this.setState({region:re});
                console.log(datapost);
            }
                // const name =response.data.profileEntries.filter((book:arritem) => (book.entryType === "NAME"? book.value :""));

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }


    getlocationname(latitude: any, longitude: any) {
        return new Promise((resolve) => {
            fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=AIzaSyB9JlyicFsDI-vQFHdWCEKTvj42LAQ92UU')
                .then((response) => response.json())
                .then((responseJson) => {

                    resolve({"Country":responseJson.results[0].address_components[8].long_name,City:responseJson.results[0].address_components[5].short_name,Area:responseJson.results[0].address_components[3].long_name})
                    // console.log(JSON.stringify(responseJson.results[0].address_components[3].long_name));
                    // console.log(JSON.stringify(responseJson.results[0].address_components[5].short_name));
                    // console.log(JSON.stringify(responseJson.results[0].address_components[8].long_name));
                })
        });
    }
    getLocationHandler = () => {
        navigator.geolocation.getCurrentPosition(async pos => {

            //  const coordsEvent ={ 
            //    nativeEvent :{
            //      coordinate : {
            //        latitude : pos.coords.latitude,
            //        longitude : pos.coords.longitude
            //      }
            //    }
            //  };

            const getlocation = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0121,
            }
            this.setState({ region: getlocation })
            datapost.location.latitude = pos.coords.latitude;
            datapost.location.longitude = pos.coords.longitude;

            const locationdata=await this.getlocationname(pos.coords.latitude,pos.coords.longitude);
            console.log(datapost);
            console.log(pos);

        },
            err => {
                console.log(err);
                Alert.alert("Fetching the position failed,Please pick one manually")
            })
    }

    render() {

        return (
            <View style={styles.container}>

                <View style={styles.mapContainer}>
                    <MapView
                        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                        style={styles.map}
                        region={this.state.region}
                    >
                    </MapView>

                    <TouchableOpacity style={[styles.shadowBoxBtn, { flexDirection: 'row', alignItems: 'center' }]} activeOpacity={0.8}
                        onPress={() => { this.getLocationHandler() }}
                    >

                        <Image source={pick}
                            style={{ height: 24, width: 24, resizeMode: 'contain', margin: 8 }} />
                        <Text style={{
                            color: '#000',
                            paddingLeft: 5,
                            paddingRight: 35,
                            fontWeight: 'bold',
                            fontSize: 15
                        }}>{'GO TO CURRENT LOCATION'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default LocationScreen;
