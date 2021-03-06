import React, { Component } from "react";
import { NavigationScreenProps } from "react-navigation";
import { Text, View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";
import { CheckBox } from "native-base";

// Images
const send = require("../../../../assets/send.png");

class HomeFooter extends Component<NavigationScreenProps> {

    render() {
        return (
            <View style={styles.container}>
                <Text>Select All</Text>
                <CheckBox />
                <TouchableOpacity activeOpacity={0.8}
                    style={[{ marginTop: -60, alignSelf: 'flex-end' }, styles.iconContainer]}>
                    <Image source={send} style={styles.iconImg} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomeFooter;
