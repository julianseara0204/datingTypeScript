import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import styles from "./styles";

import {datapost} from './../data'

type ComponentProps = {

}

type ComponentState = {
    index: number
}

class DrinkScreen extends Component<ComponentProps, ComponentState> {

    constructor(props: any) {
        super(props);
        console.log("Prop");
        this.state = {
            index: 0,
        };
    }
    
    render() {
        return (
            <View style={styles.container}>
                <View style={{ flexDirection: 'column', position: 'absolute', top: 20, alignItems: 'center' }}>

                    <TouchableOpacity
                        onPress={() => { this.setState({ index: 0 });datapost.profile[2].value="YES" }}
                        style={[styles.shadowBoxItemBtn, {}]} activeOpacity={0.8}>
                        <Text
                            style={[{
                                color: '#000',
                                paddingLeft: 25,
                                paddingRight: 25,
                                fontWeight: 'bold',
                                fontSize: 20
                            },
                            this.state.index == 0 ? { color: 'rgb(158, 149, 254)' } : { color: 'black' }]}>{'YES'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.setState({ index: 1 });datapost.profile[2].value="SOMETIMES" }}
                        style={[styles.shadowBoxItemBtn, {}]} activeOpacity={0.8}>
                        <Text
                            style={[{
                                color: '#000',
                                paddingLeft: 25,
                                paddingRight: 25,
                                fontWeight: 'bold',
                                fontSize: 20
                            },
                            this.state.index == 1 ? { color: 'rgb(158, 149, 254)' } : { color: 'black' }]}>{'SOMETIMES'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => { this.setState({ index: 2 });datapost.profile[2].value="NO" }}
                        style={[styles.shadowBoxItemBtn, {}]} activeOpacity={0.8}>
                        <Text
                            style={[{
                                color: '#000',
                                paddingLeft: 25,
                                paddingRight: 25,
                                fontWeight: 'bold',
                                fontSize: 20
                            },
                            this.state.index == 2 ? { color: 'rgb(158, 149, 254)' } : { color: 'black' }]}>{'NO'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default DrinkScreen;
