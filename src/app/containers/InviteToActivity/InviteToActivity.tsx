import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content } from "native-base"
import styles from "./styles";
import _ from "lodash";
import HomeFooter from './HomeFooter';
const { width, height } = Dimensions.get('window');

const photo = require('../../../assets/photo.png');
const search = require('../../../assets/search.png');

export class InviteToActivity extends Component<NavigationScreenProps> {
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
                <View style={{ flexDirection: 'row', width: width, padding: 20, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>INVITE TO ACTIVITY</Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Image source={search} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <Content>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={[styles.itemContainer, { borderBottomWidth: 1 }]}>
                        <View style={styles.itemSubContainer}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                <Image source={photo} style={styles.photo} />
                            </TouchableOpacity>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>John Doe</Text>
                                <Text style={styles.desc}>Sent invitation for "River Rofting"</Text>
                            </View>
                        </View>
                        <CheckBox />
                    </View>
                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content>

                <HomeFooter navigation={this.props.navigation} />
            </Container>
        );
    }
}

export default InviteToActivity;
