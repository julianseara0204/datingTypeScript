import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View, StatusBar, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content } from "native-base"
import styles from "./styles";
import _ from "lodash";
import HomeFooter from './HomeFooter';
import { ActivityItem } from '../../models/models'
const { width } = Dimensions.get('window');

// Images
const clock = require('../../../assets/clock.png');
const place = require('../../../assets/place.png');
const appointment = require('../../../assets/appointment.png');
const back = require('../../../assets/back.png');
const like = require('../../../assets/like.png');
const send = require('../../../assets/send.png');
const filter = require('../../../assets/filter.png');

type ComponentState = {
    listActivities: ActivityItem []
}

export class Activity extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            listActivities:[
                {
                    title: "I want to go for hiking in the Rocky Mountain1",
                    location: "Circuit of Americas",
                    inPeriod: "Apr.12-Apr.14",
                    beginHour: "7.30 AM",
                    image: back
                },
                {
                    title: "I want to go for hiking in the Rocky Mountain2",
                    location: "Circuit of Americas",
                    inPeriod: "Apr.12-Apr.14",
                    beginHour: "7.30 AM",
                    image: back
                },
                {
                    title: "I want to go for hiking in the Rocky Mountain3",
                    location: "Circuit of Americas",
                    inPeriod: "Apr.12-Apr.14",
                    beginHour: "7.30 AM",
                    image: back
                },
                {
                    title: "I want to go for hiking in the Rocky Mountain4",
                    location: "Circuit of Americas",
                    inPeriod: "Apr.12-Apr.14",
                    beginHour: "7.30 AM",
                    image: back
                },
                {
                    title: "I want to go for hiking in the Rocky Mountain5",
                    location: "Circuit of Americas",
                    inPeriod: "Apr.12-Apr.14",
                    beginHour: "7.30 AM",
                    image: back
                },
                 {
                    title: "I want to go for hiking in the Rocky Mountain6",
                    location: "Circuit of Americas",
                    inPeriod: "Apr.12-Apr.14",
                    beginHour: "7.30 AM",
                    image: back
                }
            ]
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
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>ACTIVITY</Text>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.navigate('Filter'); }}
                        activeOpacity={0.8}>
                        <Image source={filter} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <Content>
                    {this.state.listActivities.map((item, index) => (
                        <View style={styles.activityContainerItem} key={index}>

                            <View style={styles.activityTitleContainer}>
                                <Text style={styles.activityTitleText}>{item.title}</Text>
                            </View>

                            <View style={styles.activityItemBody}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={place} style={[styles.smallIcon, { tintColor: 'grey' }]} />
                                    <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 - 50 }]}>{item.location}</Text>
                                </View>


                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Image source={appointment} style={[styles.smallIcon, { tintColor: 'grey' }]} />
                                    <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 - 50 }]}>{item.inPeriod}</Text>
                                </View>
                            </View>

                            <View style={{ width: '100%', height: (width - 10) / 344 * 150 + 50, backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
                                <View style={styles.posImgContainer}>
                                    <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={back} />
                                    <View style={styles.activityItemBeginHour}>
                                        <Image source={clock} style={[styles.smallIcon, { tintColor: 'white' }]} />
                                        <Text
                                            style={[styles.smallText, { color: 'white' }]}>{item.beginHour}</Text>
                                    </View>
                                </View>
                                <TouchableOpacity activeOpacity={0.8}
                                    style={[{ marginTop: -20 }, styles.iconContainer]}>
                                    <Image source={like} style={styles.iconImg} />
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8}
                                    style={[{ marginTop: -40, alignSelf: 'flex-end' }, styles.iconContainer]}>
                                    <Image source={send} style={styles.iconImg} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content>

                <HomeFooter navigation={this.props.navigation} />
            </Container>
        );
    }
}

export default Activity;
