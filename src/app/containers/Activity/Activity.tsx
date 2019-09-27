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
import { thisTypeAnnotation } from "@babel/types";

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
        this.dataget();
    }

    
    
    
    getlocationname(latitude: any, longitude: any) {
        return new Promise((resolve) => {

            if (latitude > 0 || longitude > 0) {
                fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=AIzaSyB9JlyicFsDI-vQFHdWCEKTvj42LAQ92UU')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        const data = { Country: "", City: "", Area: "" };
                       
                        if (responseJson.results[0].address_components.length > 0) {
                            // resolve({ "Country": responseJson.results[0].address_components[7].long_name, City: responseJson.results[0].address_components[5].short_name, Area: responseJson.results[0].address_components[3].long_name })
                            responseJson.results[0].address_components.forEach((item: any) => {
                                switch (item.types[0]) {
                                    case "country":
                                        data.Country = item.long_name;
                                        break;
                                    case "administrative_area_level_2":
                                        data.City = item.long_name;
                                        break;
                                    default:
                                }
                                resolve(data);
                            })
                        }
                        else {
                            resolve("");
                        }
                    })
            }
            else {
                resolve("");
            }
        });

    }

    // image

    
    getuserimage = (id: string, type: string) => {
        
        console.log(id);
        return new Promise((resolve) => {
            axios({
                method: 'GET',
                url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/files/entities?entityType=" + type + "&entity=" + id + "",
                headers: {
                    'Authorization': data.Token
                }
            })
                .then((response) => {
                    // console.log(response);
                    if (response.data.length > 0) {
                        console.log(id);
                        const pic=(response.data[response.data.length - 1].fileUrl!="")?response.data[response.data.length - 1].fileUrl:'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRpFu3UHKhhUoMmO1VLXCha-fh3n39tC7KyNoCYUPtGKDzdKakc';
                        resolve(pic);
                    }
                    else {
                        resolve('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRpFu3UHKhhUoMmO1VLXCha-fh3n39tC7KyNoCYUPtGKDzdKakc');
                        // if (type == "USER_ACCOUNT") {
                        //     resolve('https://media.idownloadblog.com/wp-content/uploads/2016/03/Generic-profile-image-002.png');
                        // }
                        // else if (type == "ACTIVITY") {
                        //     resolve('../../../../assets/back.png');
                        // }
                    }
                })
                .catch((error) => {
                    resolve('../../../../assets/back.png');
                    console.log(error);
                });

        });

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
        })
            .then((response) => {


                response.data.forEach(async (arrss: any) => {

                    const ar = this.state.listActivities;

                    var pic = await this.getuserimage(arrss._id,"ACTIVITY");
                    console.log(pic);

                    const location: any = (arrss.hasOwnProperty("location")) ? await this.getlocationname(arrss.location["1"], arrss.location['0']) : "";
                    console.log("location", location);
                    const eachevent = {
                        id: arrss._id,
                        title: arrss.eventName,
                        location: (arrss.hasOwnProperty("location")) ? location.Country : '',
                        inPeriod: format(arrss._eventStartTime, 'MMM, DD') + " - " + format(arrss._eventEndTime, 'MMM, DD'),
                        beginHour: format(arrss._eventStartTime, 'hh: mm'),
                        image: pic,
                    }

                    // this.state.itemarr.push(eachevent);     
                    ar.push(eachevent);

                    this.setState({ listActivities: ar });

                });


                console.log(response);
                console.log(this.state.listActivities);
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
                    
 
                {/* activity */}

                {this.state.listActivities.map((item, index) =>
                    <View key={index} style={{ flexDirection: 'column', alignItems: 'center', width: width }}>
                        {/* 
                        <View style={{ flexDirection: 'column', padding: 10, width: width }}>
                            <Image source={quote} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                <Text style={{ paddingLeft: 20, fontSize: 20, width: width / 4 * 3 }}>Painting Screens</Text>
                                <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer}>
                                    <Image source={heart_icon} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                </TouchableOpacity>
                            </View>
                        </View> */}

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
                                <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2  }]}>{item.inPeriod}</Text>
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
                                    console.log(item.id);
                                    this.like(item.id, "ACTIVITY");
                                }}>
                                <Image source={like} style={styles.iconImg} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => { this.props.navigation.navigate('InviteToActivity', { id: item.id, Name: item.title }) }}
                                style={[{ marginTop: -40, alignSelf: 'flex-end' }, styles.iconContainer]}>
                                <Image source={send} style={styles.iconImg} />
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
                {/* ACTIVITY END*/}

                
                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content>

                {/* <HomeFooter navigation={this.props.navigation} /> */}
            </Container>
        );
    }
}

export default Activity;
