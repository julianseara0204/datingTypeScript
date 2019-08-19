
import React, { Component } from "react";
import { Alert,Image, ScrollView, Text, View, Dimensions, StatusBar, TouchableOpacity, Platform } from "react-native";
import styles from './styles';
import navigation,{ NavigationScreenProps } from "react-navigation";

export default  Button =({root})=>{

    return (  <TouchableOpacity
        style={[styles.shadowBoxNextBtn, { alignItems: 'center' }]}
        activeOpacity={0.8}
        onPress={() => {
            console.log("asdast data")
            // Alert.alert(dataa);
            this.props.navigation.navigate('Home');
            Alert.alert("asd");
            // data.NAME="Hanzala";data.AGE="20";data.DRUGS="Yes";
        }}>

        <Text style={{
            color: '#000',
            paddingLeft: 25,
            paddingRight: 25,
            fontWeight: 'bold',
            fontSize: 20
        }}>{root}</Text>
    </TouchableOpacity> );
 


} 