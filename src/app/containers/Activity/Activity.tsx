import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View, StatusBar, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content } from "native-base"
import styles from "./styles";
import _ from "lodash";
import HomeFooter from './HomeFooter';
import { ActivityItem } from '../../models/models'
const { width } = Dimensions.get('window');


import { data, datapost } from '../onboarding/data';
import axios from "axios";
import { format } from 'date-fns';

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
    popup: boolean,
}

type event = {
    createdAt: string,
    eventDescription: string,
    eventName: string,
    updatedAt: string,
    _eventEndTime: string,
    _eventStartTime: string,
    _id: string,
}

export class Activity extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            listActivities:[               
            ],
            popup: false,
        };
    }

    dataget=()=>{
            // event

    axios({
        method: 'GET',
        url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/events',
        // data: datapost,
        headers: {
            'Authorization': data.Token
        }
    }).then((response) => {
            response.data.forEach((arrss: event) => {


                var pic = "";
                axios({
                    method: 'GET',
                    url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/files/entities?entityType=EVENT&entity=" + arrss._id + "",
                    headers: {
                        'Authorization': data.Token
                    }
                })
                    .then((imgresponse) => {
                        console.log(imgresponse)
                        if (imgresponse.data.length > 0) {
                            console.log(imgresponse.data[0].fileUrl);
                            pic = imgresponse.data[0].fileUrl;

                        }
                        else {
                            pic = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo469VtmD8F7-XVn2i6boJrdfdWIogcMwv1XWs-8cIFy6qAFDa";
                        }


                        const eachevent = {
                            id: arrss._id,
                            title: arrss.eventName,
                            location: "Circuit of Americas",
                            inPeriod: format(arrss._eventStartTime, 'MMM, DD') + " - " + format(arrss._eventEndTime, 'MMM, DD'),
                            beginHour: "7.30 AM",
                            image: pic,
                        }

                        // this.state.itemarr.push(eachevent);     
                        this.state.listActivities.push(eachevent);

                        // this.setState({ routes: routedup });
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            });

            const ar = this.state.listActivities;
            this.setState({ listActivities: ar });

            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    }

    like = (id: string, type: string) => {
        axios({
            method: 'POST',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/userinterests',
            data: {
                "interaction": "LIKED",
                "type": "EVENT",
                "entity": id
            },
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
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
                    
                {/* ACTIVITY */}


                {this.state.listActivities.map((item, index) =>
                    <View style={{ flexDirection: 'column', alignItems: 'center', width: width }}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10 }}>
                            <Text style={{ paddingLeft: 20, fontSize: 20, width: width / 4 * 3, fontStyle: 'italic', color: 'black' }}>{item.title}</Text>
                            <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 5 }}>ACTIVITY</Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, width: '100%' }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={place} style={[styles.smallIcon, { tintColor: 'grey', marginRight: 5 }]} />
                                <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 - 50 }]}>{item.location}</Text>
                            </View>


                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={appointment} style={[styles.smallIcon, { tintColor: 'grey' }]} />
                                <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 - 50 }]}>{item.inPeriod}</Text>
                            </View>
                        </View>

                        <View style={{ width: '100%', height: (width - 10) / 344 * 150 + 50, backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
                            <View style={styles.posImgContainer}>
                                <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={{uri:item.image}} />
                                <View style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    position: 'absolute',
                                    top: 0, right: 0,
                                    padding: 5,
                                    backgroundColor: 'rgb(158, 149, 254)',
                                    borderTopRightRadius: 5,
                                    borderBottomLeftRadius: 5
                                }}>
                                    <Image source={clock} style={[styles.smallIcon, { tintColor: 'white' }]} />
                                    <Text
                                        style={[styles.smallText, { color: 'white' }]}>{item.beginHour}</Text>
                                </View>
                            </View>
                            <TouchableOpacity activeOpacity={0.8}
                                style={[{ marginTop: -20 }, styles.iconContainer]}
                                onPress={() => {
                                    this.setState({ popup: true });
                                    console.log(item.id);
                                    this.like(item.id, "ACTIVITY");
                                }}>
                                <Image source={like} style={styles.iconImg} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}
                                style={[{ marginTop: -40, alignSelf: 'flex-end' }, styles.iconContainer]}>
                                <Image source={send} style={styles.iconImg} />
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
                {/* ACTIVITY END*/}
                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content>

                <HomeFooter navigation={this.props.navigation} />
            </Container>
        );
    }
}

export default Activity;
