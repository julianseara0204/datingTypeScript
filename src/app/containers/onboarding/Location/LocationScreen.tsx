import React, { Component } from "react";
import { Text, View, Image, TouchableOpacity } from "react-native";
import styles from "./styles";
import Button from ".././OBTabScreen/Button";
// import MapView from 'react-native-maps'
import { data } from './../data'

// Images
const map = require('../../../../assets/map.png');
const pick = require('../../../../assets/pick_position.png');

type ComponentProps = {

}

class LocationScreen extends Component<ComponentProps> {
componentDidCatch(){}
    render() {
        
        return (
            <View style={styles.container}>

                <View style={styles.mapContainer}>
                    {/* <Image source={map} style={styles.map} /> */}
                    {/* <MapView        style={{flex: 1}}        region={{          latitude: 42.882004,          longitude: 74.582748,          latitudeDelta: 0.0922,          longitudeDelta: 0.0421        }}        showsUserLocation={true}      /> */}

                    <TouchableOpacity style={[styles.shadowBoxBtn, { flexDirection: 'row', alignItems: 'center' }]} activeOpacity={0.8}>

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
                    <Button root={"Home"}/>
                    </View>
                    );
    }
}

export default LocationScreen;
