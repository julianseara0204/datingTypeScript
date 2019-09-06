import React, { Component } from "react";
import { NavigationScreenProps } from "react-navigation";
import { View, TouchableOpacity, Image } from "react-native";
import styles from "./styles";

// Images
const home_footer = require("../../../../assets/home_footer.png");
const message_footer = require("../../../../assets/message_footer.png");
const profile_footer = require("../../../../assets/profile_footer.png");
const message_notification = require('../../../../assets/message_notification.png');

type ComponentProps = {
    setPage: any
}

type ComponentState = {
    index: number
}

class HomeFooter extends Component<ComponentProps, ComponentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
        };
    }
    render() {
        return (
            <View style={styles.container}>

                <TouchableOpacity style={{ alignItems: 'center' }}
                    onPress={() => {
                        this.setState({ index: 0 });
                        this.props.setPage(0);
                    }}
                    activeOpacity={0.8}>
                    <Image source={home_footer} style={[styles.footerImg, this.state.index == 0 ? { tintColor: 'rgb(158, 149, 254)' } : { tintColor: 'black' }]} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }}
                    onPress={() => {
                        this.setState({ index: 1 });
                        this.props.setPage(1);
                    }}
                    activeOpacity={0.8}>
                    <Image source={message_footer} style={[styles.footerImg, this.state.index == 1 ? { tintColor: 'rgb(158, 149, 254)' } : { tintColor: 'black' }]} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }}
                    onPress={() => {
                        this.setState({ index: 2 });
                        this.props.setPage(2);
                    }}
                    activeOpacity={0.8}>
                    <Image source={message_notification} style={[styles.footerImg, this.state.index == 2 ? { tintColor: 'rgb(158, 149, 254)' } : { tintColor: 'black' }]} />
                </TouchableOpacity>
                <TouchableOpacity style={{ alignItems: 'center' }}
                    onPress={() => {
                        this.setState({ index: 3 });
                        this.props.setPage(3);
                    }}
                    activeOpacity={0.8}>
                    <Image source={profile_footer} style={[styles.footerImg, this.state.index == 3 ? { tintColor: 'rgb(158, 149, 254)' } : { tintColor: 'black' }]} />
                </TouchableOpacity>
            </View>
        );
    }
}

export default HomeFooter;
