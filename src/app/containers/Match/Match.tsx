import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View, StatusBar, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container } from "native-base"
import styles from "./styles";
import _ from "lodash";
import HomeFooter from './HomeFooter';
const { width } = Dimensions.get('window');

// Images
const match_back = require('../../../assets/match_back.png');
const card_cross = require('../../../assets/card_cross.png');
const photo = require('../../../assets/photo.png');

export class Match extends Component<NavigationScreenProps> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {

        };
    }

    render() {
        return (
            <Container style={styles.container}>
                <Image source={match_back} style={{ width: width, height: width / 4 * 3, resizeMode: 'contain', position: 'absolute', bottom: 0 }} />
                <View style={{
                    width: width,
                    ...Platform.select({
                        ios: {
                            height: 20,
                        },
                        android: {
                            height: 0,
                        },
                    }),
                }}>
                    <StatusBar />
                </View>
                <View>
                    <View style={{ flexDirection: 'row', width: width, padding: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black', alignSelf: 'center' }}>CONGRATES</Text>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => { this.props.navigation.pop(); }}
                            style={{ position: 'absolute', right: 20, alignSelf: 'center' }}>
                            <Image source={card_cross} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.desc, { width: '80%', fontSize: 15, textAlign: 'center', marginBottom: 20, alignSelf: 'center', fontWeight: 'bold' }]}>IT'S A MATCH</Text>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <View style={[styles.shadowBox, { width: width / 3, height: width / 3, padding: 0, borderRadius: width / 6, justifyContent: 'center', alignItems: 'center' }]}>
                            <Image source={photo}
                                style={{ width: width / 3, height: width / 3, borderRadius: width / 6, resizeMode: 'cover' }} />
                        </View>
                        <Text style={[styles.desc, { width: '80%', fontSize: 15, textAlign: 'center', fontStyle: 'italic' }]}>You and John Doe both have liked the same</Text>
                        <View style={[styles.shadowBox, { width: width / 3, height: width / 3, padding: 0, borderRadius: width / 6, justifyContent: 'center', alignItems: 'center' }]}>
                            <Image source={photo}
                                style={{ width: width / 3, height: width / 3, borderRadius: width / 6, resizeMode: 'cover' }} />
                        </View>
                    </View>
                </View>
                <HomeFooter navigation={this.props.navigation} />
            </Container>
        );
    }
}

export default Match;
