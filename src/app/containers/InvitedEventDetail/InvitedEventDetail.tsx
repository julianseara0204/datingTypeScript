import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content, Icon } from "native-base"
import styles from "./styles";
import _ from "lodash";
import { Pagination } from 'react-native-snap-carousel';
import HomeFooter from './HomeFooter';
import { Router } from '../../models/models';



import { data, datapost } from '../onboarding/data';
import axios from "axios";
import { format } from 'date-fns';


const { width } = Dimensions.get('window');

// Images
const clock = require('../../../assets/clock.png');
const card_cross = require('../../../assets/card_cross.png');
const place = require('../../../assets/place.png');
const appointment = require('../../../assets/appointment.png');
const photo = require('../../../assets/photo.png');
const back = require('../../../assets/back.png');
const like = require('../../../assets/like.png');
const send = require('../../../assets/send.png');
const heart_icon = require('../../../assets/heart.png');
const quote = require('../../../assets/quote.png');

type ComponentState = {
    index: number,
    routes: Router[],
    popup: boolean,
    UserName: string,
    UserPicture: string,
    EventName: string,
    EventPicture: string,
    EventDate: string,
    EventTime: string,
    listActivities: ActivityItem[],
    picture: string,
    EventID: string,
    UserID: String

}

type arr = {
    _id: string,
    entryType: string,
    value: string,
    privacy: string
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

type ActivityItem = {
    id: string
    title: string,
    location: string,
    inPeriod: string,
    beginHour: string,
    image: any,

}


export class InvitedEventDetail extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);

        this.state = {
            index: 0,
            EventID: props.navigation.state.params.eventid,
            UserID: props.navigation.state.params.userId,
            UserName: "",
            UserPicture: "",
            EventName: "",
            EventPicture: "",
            EventDate: "",
            EventTime: "",
            picture: "",
            routes: [
                { title: 'Sample 1', type: 100 },
                { title: 'Sample 2', type: 200 },
                { title: 'Sample 3', type: 300 },
                { title: 'Sample 4', type: 400 },
                { title: 'Sample 5', type: 500 },
                { title: 'Sample 6', type: 600 },
                { title: 'Sample 7', type: 700 },
            ],
            popup: false,
            listActivities: []
        };

        this.dataput();
        this.getsignleevent(this.state.EventID);

    }
    get pagination() {
        const { routes, index } = this.state;
        return (
            <Pagination
                dotsLength={routes.length}
                activeDotIndex={index}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                dotStyle={{
                    width: 10,
                    height: 10,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );

    }


    getlocationname(latitude: any, longitude: any) {
        return new Promise((resolve) => {

            if (latitude > 0 || longitude > 0) {
                fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=AIzaSyB9JlyicFsDI-vQFHdWCEKTvj42LAQ92UU')
                    .then((response) => response.json())
                    .then((responseJson) => {
                        const data = { Country: "", City: "", Area: "" };
                        if (responseJson.results.length > 0) {
                            data.Area = responseJson.results[0].formatted_address;
                        }
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
                        const pic = (response.data[response.data.length - 1].fileUrl != "") ? response.data[response.data.length - 1].fileUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRpFu3UHKhhUoMmO1VLXCha-fh3n39tC7KyNoCYUPtGKDzdKakc';
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



    dataput = () => {
        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile',
            headers: {
                'Authorization': data.Token
            }
        })
            .then(async(response) => {

                console.log(response);

                var name = "";

                response.data.profileEntries.forEach((item: arr) => {
                    switch (item.entryType) {
                        case "NAME":
                            this.setState({ UserName: item.value });;
                            break;
                    }
                })
                const c: any = await this.getuserimage(response.data[0].userAccount, "USER_ACCOUNT");

                this.setState({ UserPicture: c });



            })
            .catch((error) => {
                console.log(error);
            });



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

                    var pic = await this.getuserimage(arrss._id, "ACTIVITY");
                    console.log(pic);

                    const location: any = (arrss.hasOwnProperty("location")) ? await this.getlocationname(arrss.location["0"], arrss.location["1"]) : "";
                    console.log("location", location);
                    const eachevent = {
                        id: arrss._id,
                        title: arrss.eventName,
                        location: (arrss.hasOwnProperty("location")) ? location.Area : '',
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



    getsignleevent = (id: string) => {
        axios({
            method: 'GET',
            url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/events/" + id + "",
            headers: {
                'Authorization': data.Token
            }
        })
            .then(async (response) => {

                const arrss: any = response.data;

                var pic: any = "";
                pic = await this.getuserimage(arrss.id, "ACTIVITY");


                this.setState({ EventName: arrss.eventName })
                this.setState({ EventPicture: pic })
                this.setState({ EventDate: format(arrss._eventStartTime, 'MMM, DD') + " - " + format(arrss._eventEndTime, 'MMM, DD'), })
                this.setState({ EventTime: format(arrss._eventStartTime, 'h:mm') + " - " + format(arrss._eventEndTime, 'h:mm'), })

            })
            .catch((error) => {
                console.log(error);
            });
    }


    render() {
        return (
            <Container style={styles.container}>

                <Content>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.pop(); }}
                        activeOpacity={0.8}
                        style={[styles.iconContainer, { position: 'absolute', top: 20, right: 0, backgroundColor: '#dadada' }]}>
                        <Image source={card_cross} style={{ tintColor: 'white', width: 20, height: 20, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ width: width }} >
                        <View style={{ width: '100%', height: width / 361 * 297, backgroundColor: '#fff' }}>
                            <View style={[styles.posImgContainer, { borderRadius: 1 }]}>
                                <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={{ uri: this.state.EventPicture }} />
                            </View>
                        </View>
                    </View>


                    <View style={{ flexDirection: 'column', alignItems: 'center', width: width }}>

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, padding: 10 }}>
                            {/* <View style={{ flexDirection: 'column', width: (width - 20) / 4, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 5, color: 'rgb(158, 149, 254)' }}>24-25</Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 5, color: 'black' }}>April</Text>
                            </View> */}
                            <Text style={{ fontSize: 20, width: (width - 20) / 4 * 3, fontStyle: 'italic', color: 'grey' }}>{this.state.EventName}</Text>

                        </View>
                        <View style={[styles.descRow, { borderTopWidth: 1, borderTopColor: '#dadada' }]}>
                            <Image source={place} style={styles.smallIcon} />
                            <Text
                                style={styles.smallText}>{'Maha Creek, Texas, USA'}</Text>
                        </View>
                        <View style={styles.descRow}>
                            <Image source={appointment} style={styles.smallIcon} />
                            <Text
                                style={styles.smallText}>{this.state.EventDate}</Text>
                        </View>
                        <View style={[styles.descRow, { borderBottomWidth: 1, borderBottomColor: '#dadada' }]}>
                            <Image source={clock} style={styles.smallIcon} />
                            <Text
                                style={styles.smallText}>{this.state.EventTime}</Text>
                        </View>

                        <View style={{ alignItems: 'center', height: width / 4, width: width, alignContent: 'center', justifyContent: 'center' }}>
                            <View style={[styles.photoContainer, { position: 'absolute' }]}>
                                <Image source={{ uri: this.state.UserPicture }} style={styles.photo} />
                            </View>
                        </View>


                        <Text style={[styles.desc, { width: width - 40, textAlign: 'center', fontWeight: 'bold', color: 'black' }]}>{this.state.UserName} Invited you to join the activity</Text>
                        <Text style={[styles.desc, { width: width - 40, textAlign: 'center', marginTop: 10 }]}>show your interest by clicking the below Button or show your interest</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity activeOpacity={0.8}
                                    style={[styles.iconContainer]}
                                    onPress={() => {
                                        this.setState({ popup: true });
                                        this.like(this.state.EventID, "ACTIVITY");
                                    }}>
                                    <Image source={like} style={styles.iconImg} />
                                </TouchableOpacity>
                                <Text style={[styles.desc, { color: 'rgb(158, 149, 254)' }]}>43 Interested</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => { this.props.navigation.navigate('InviteToActivity', { id: this.state.EventID, Name: this.state.EventName }) }}
                                    style={[styles.iconContainer]}>
                                    <Image source={send} style={styles.iconImg} />
                                </TouchableOpacity>
                                <Text style={[styles.desc, { color: 'rgb(158, 149, 254)' }]}>43 Invites</Text>
                            </View>
                        </View>
                    </View>


                    <Text style={{
                        marginTop: 10, marginLeft: 10, color: 'black',
                        fontWeight: 'bold',
                        fontSize: 15
                    }}>{'SUGGESTED ACTIVITIES'}</Text>



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
                                    <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 }]}>{item.inPeriod}</Text>
                                </View>
                            </View>

                            <View style={{ width: '100%', height: (width - 10) / 344 * 150 + 50, backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
                                <View style={styles.posImgContainer}>
                                    <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={{ uri: item.image }} />
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
                <HomeFooter navigation={this.props.navigation} />
            </Container >
        );
    }
}

export default InvitedEventDetail;
