import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Content } from "native-base";
import { Route } from "../../../models/models"
import styles from "./styles";
import _ from "lodash";

// Images
const message_heart = require('../../../../assets/message_heart.png');
const message_notification = require('../../../../assets/message_notification.png');
const search = require('../../../../assets/search.png');
const photo = require('../../../../assets/photo.png');

const { width } = Dimensions.get('window');

type ComponentState = {
    index: number,
    routes: Route[],
    popup: boolean,
}

export class DashboardMessage extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
            routes: [
                { title: 'Sample 1', type: 100 },
                { title: 'Sample 2', type: 200 },
                { title: 'Sample 3', type: 300 },
                { title: 'Sample 4', type: 400 },
                { title: 'Sample 5', type: 500 },
                { title: 'Sample 6', type: 600 },
                { title: 'Sample 7', type: 700 },
            ],
            popup: false
        };
    }
    render() {
        return (
            <Content>
                <View style={{ flexDirection: 'row', width: width, padding: 20, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>DM</Text>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => { }}>
                        <Image source={search} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <View style={styles.photoContainer}>
                            <Image source={photo} style={styles.photo} />
                            <TouchableOpacity activeOpacity={0.8} style={styles.tipContainer}>
                                <Image source={message_heart} style={[styles.smallIcon, { tintColor: 'white' }]} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>John Doe showed interest in your profile</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 2 }}>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('InvitedProfile') }}
                                    style={[styles.shadowBox, { alignItems: 'center', width: width / 5, borderRadius: 5 }]} activeOpacity={0.8}>
                                    <Text style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 10
                                    }}>{'Decline'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={[styles.shadowBox, { alignItems: 'center', width: width / 5, borderRadius: 5, backgroundColor: 'rgb(158, 149, 254)' }]} activeOpacity={0.8}>
                                    <Text style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 10
                                    }}>{'Message'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>11:48</Text>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <View style={styles.photoContainer}>
                            <Image source={photo} style={styles.photo} />
                            <TouchableOpacity activeOpacity={0.8} style={styles.tipContainer}>
                                <Image source={message_notification} style={[styles.smallIcon, { tintColor: 'white' }]} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>You have a new Activity Suggestion posted by Moris "Jungle Safari"</Text>
                            {/* <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 2 }}>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={[styles.shadowBox, { alignItems: 'center', width: width / 5, borderRadius: 5 }]} activeOpacity={0.8}>
                                    <Text style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 10
                                    }}>{'Decline'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={[styles.shadowBox, { alignItems: 'center', width: width / 5, borderRadius: 5, backgroundColor: 'rgb(158, 149, 254)' }]} activeOpacity={0.8}>
                                    <Text style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 10
                                    }}>{'Message'}</Text>
                                </TouchableOpacity>
                            </View> */}
                        </View>
                    </View>
                    <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>11:48</Text>
                </View>


                <View style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <View style={styles.photoContainer}>
                            <Image source={photo} style={styles.photo} />
                            <TouchableOpacity activeOpacity={0.8} style={styles.tipContainer}>
                                <Image source={message_notification} style={[styles.smallIcon, { tintColor: 'white' }]} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>Moris invited you to join "Night Pool Party" at Hotel Vilos</Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 2 }}>
                                <TouchableOpacity
                                    onPress={() => { this.props.navigation.navigate('InvitedEvent') }}
                                    style={[styles.shadowBox, { alignItems: 'center', width: width / 5, borderRadius: 5 }]} activeOpacity={0.8}>
                                    <Text style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 10
                                    }}>{'View'}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => { }}
                                    style={[styles.shadowBox, { alignItems: 'center', width: width / 5, borderRadius: 5, backgroundColor: 'rgb(158, 149, 254)' }]} activeOpacity={0.8}>
                                    <Text style={{
                                        color: '#000',
                                        fontWeight: 'bold',
                                        fontSize: 10
                                    }}>{'Message'}</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>Mar. 15</Text>
                </View>

                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => { this.props.navigation.navigate('ChatBox') }}
                    style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <View style={styles.photoContainer}>
                            <Image source={photo} style={styles.photo} />
                        </View>
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>Risa Kristy</Text>
                            <Text style={styles.desc}>Was very nice time with you</Text>
                        </View>
                    </View>
                    <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>Mar. 16</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => { this.props.navigation.navigate('ChatBox') }}
                    style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <View style={styles.photoContainer}>
                            <Image source={photo} style={styles.photo} />
                        </View>
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>Risa Kristy</Text>
                            <Text style={styles.desc}>Was very nice time with you</Text>
                        </View>
                    </View>
                    <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>Mar. 16</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => { this.props.navigation.navigate('ChatBox') }}
                    style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <View style={styles.photoContainer}>
                            <Image source={photo} style={styles.photo} />
                        </View>
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>John Doe showed interest in your profile</Text>
                            <Text style={styles.desc}>Was very nice time with you</Text>
                        </View>
                    </View>
                    <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>Mar. 16</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => { this.props.navigation.navigate('ChatBox') }}
                    style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <View style={styles.photoContainer}>
                            <Image source={photo} style={styles.photo} />
                        </View>
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>Risa Kristy</Text>
                            <Text style={styles.desc}>Was very nice time with you</Text>
                        </View>
                    </View>
                    <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>Mar. 16</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => { this.props.navigation.navigate('ChatBox') }}
                    style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <View style={styles.photoContainer}>
                            <Image source={photo} style={styles.photo} />
                        </View>
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>Risa Kristy</Text>
                            <Text style={styles.desc}>Was very nice time with you</Text>
                        </View>
                    </View>
                    <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>Mar. 16</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => { this.props.navigation.navigate('ChatBox') }}
                    style={[styles.itemContainer, { borderBottomWidth: 1 }]}>
                    <View style={styles.itemSubContainer}>
                        <View style={styles.photoContainer}>
                            <Image source={photo} style={styles.photo} />
                        </View>
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>Risa Kristy</Text>
                            <Text style={styles.desc}>Was very nice time with you</Text>
                        </View>
                    </View>
                    <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>Mar. 16</Text>
                </TouchableOpacity>

                <View style={{ height: 60, backgroundColor: 'white' }} />
            </Content>

        );
    }
}

export default DashboardMessage;
