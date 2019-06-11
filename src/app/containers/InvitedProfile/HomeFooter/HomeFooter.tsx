import React, { Component } from "react";
import { NavigationScreenProps } from "react-navigation";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

// Import 
const message_footer = require("../../../../assets/message_footer.png");

class HomeFooter extends Component<NavigationScreenProps> {

    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.8}
                    style={[{ marginTop: -60, alignSelf: 'flex-end' }, styles.iconContainer]}>
                    <Image source={message_footer} style={[styles.iconImg, {tintColor: 'white'}]} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomeFooter;
