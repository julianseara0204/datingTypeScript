import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text, ImageSourcePropType, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, Platform, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content, Icon } from "native-base"
import styles from "./styles";
import _ from "lodash";
const message_footer = require("../../../assets/message_footer.png");
const clock = require('../../../assets/clock.png');
const birthCake = require('../../../assets/birthdayCakePiece.png');
const scale_icon = require('../../../assets/scale.png');
const height_png = require('../../../assets/height.png');
const cheers = require('../../../assets/cheers.png');
const smoke = require('../../../assets/smoke.png');
const education = require('../../../assets/education.png');
const portfolio = require('../../../assets/portfolio.png');
const question = require('../../../assets/question.png');
const houseOutline = require('../../../assets/houseOutline.png');
const quote = require('../../../assets/quote.png');
const place = require('../../../assets/place.png');
const appointment = require('../../../assets/appointment.png');
const photo = require('../../../assets/photo.png');
const back = require('../../../assets/back.png');
const remove_icon = require('../../../assets/remove.png');
const heart_icon = require('../../../assets/heart.png');
const like = require('../../../assets/like.png');
const send = require('../../../assets/send.png');
const pos = require('../../../assets/pos.png');
const arrow = require('../../../assets/arrow.png');


import { Route, ActivityItem } from '../../models/models';


import { data, datapost } from '../onboarding/data';
import axios from "axios";


import { format } from 'date-fns';

// import ProgressBarAnimated from 'react-native-progress-bar-animated';
import colors from '../../../Colors';
import Carousel from 'react-native-snap-carousel';
import HomeFooter from './HomeFooter';
// import PopupSendLike from './PopupSendLike';
import { GiftedChat, Send, Composer, Actions, Bubble, Message, Avatar } from "react-native-gifted-chat";
const { width, height } = Dimensions.get('window');
// const TabbarMenu = [
//     {
//         id: 100,
//         label: "32",
//         img: birthCake,

//     },
//     {
//         id: 200,
//         label: "64",
//         img: scale_icon,

//     },
//     {
//         id: 300,
//         label: "5\'3\"",
//         img: height_png,

//     },
//     {
//         id: 400,
//         label: "Drinks",
//         img: cheers,

//     },
//     {
//         id: 500,
//         label: "Smoke",
//         img: smoke,

//     },
//     {
//         id: 600,
//         label: "Education",
//         img: education,

//     },
//     {
//         id: 700,
//         label: "Question",
//         img: question,
//     },
// ];

type CompoentState = {
    Picture: string,
    index: number,
    routes: any,
    popup: boolean,
    tabbarMenu: tabbarMenuItem[],
    Name: string,
    id: string,
    Location: any,
    picture: string,
    listActivities: ActivityItem[],
    profileid: string,
    personalInfo: any,
    userpic: any
}

type tabbarMenuItem = {
    id: number,
    label: string,
    img: ImageSourcePropType
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

export type ActivityItem = {
    id: string
    title: string,
    location: string,
    inPeriod: string,
    beginHour: string,
    image: any,

}

export class InvitedProfile extends Component<NavigationScreenProps, CompoentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
            Picture: "",
            Name: props.navigation.state.params.name,
            id: props.navigation.state.params.dialoagid,
            profileid: props.navigation.state.params.id,
            Location: "",
            picture: "",
            userpic: "",
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

            tabbarMenu: [
            ],
            listActivities: [],
            personalInfo: [

            ],
        };
        this.getinfo();
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
                        const pic = (response.data[response.data.length - 1].fileUrl != "") ? response.data[response.data.length - 1].fileUrl : 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRpFu3UHKhhUoMmO1VLXCha-fh3n39tC7KyNoCYUPtGKDzdKakc';
                        resolve(pic);
                    }
                    else {
                        resolve('https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRpFu3UHKhhUoMmO1VLXCha-fh3n39tC7KyNoCYUPtGKDzdKakc');
                    }
                })
                .catch((error) => {
                    resolve('../../../../assets/back.png');
                    console.log(error);
                });

        });

    }


    getinfo = () => {
        console.log("Userid", this.state.profileid)
        axios({
            method: 'GET',
            url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile/users?user=" + this.state.profileid + "",
            headers: {
                'Authorization': data.Token
            }
        })
            .then(async (response) => {

                // this.setState({ responsedata: response.data.profileEntries })


                const alltabbarMenuDup: any = {}
                const alname: any = {}
                var indexno: number = -1;

                indexno = indexno + 1;

                var no: number = 200;

                const tabbarMenuDup: any = [];

                const info: any = [];


                tabbarMenuDup.push({
                    id: 100,
                    label: "32",
                    img: birthCake,
                },
                    {
                        id: 200,
                        label: "64",
                        img: scale_icon,
                    })

                const pic: any = await this.getuserimage(response.data.userAccount._id, "USER_ACCOUNT");
                const locationdata: any = await this.getlocationname(response.data.location[1], response.data.location[0]);
                alname[response.data.userAccount] = { Name: "", Location: locationdata.Country };
                this.setState({ Picture: pic }); this.setState({ Location: locationdata.Country });

                info.push({
                    name: "home",
                    description: locationdata.City,
                    image: houseOutline
                });
                response.data.profileEntries.forEach((item: arr) => {

                    switch (item.entryType) {
                        case "GENDER":
                            no = no + 100;
                            break;

                        case "HEIGHT":
                            no = no + 100;
                            tabbarMenuDup.push({
                                id: no,
                                label: item.value,
                                img: height_png,
                            });
                            break;

                        case "DRINKING":
                            no = no + 100;
                            tabbarMenuDup.push({
                                id: no,
                                label: item.value,
                                img: cheers,
                            });
                            break;
                        case "SMOKING":
                            no = no + 100;
                            tabbarMenuDup.push({
                                id: no,
                                label: item.value,
                                img: smoke,
                            });
                            break;

                        case "EDUCATION_LEVEL":
                            no = no + 100;
                            tabbarMenuDup.push({
                                id: no,
                                label: item.value,
                                img: education,
                            });
                            break;

                        case "NAME":
                            alname[response.data.userAccount]['Name'] = item.value;
                            this.setState({ Name: item.value })
                            break;

                        case "JOB_TITLE":
                            info.push({
                                name: "study",
                                description: item.value,
                                image: education
                            });
                            break;

                        case "WORK":
                            info.push({
                                name: "work",
                                description: item.value,
                                image: portfolio
                            });
                            break;
                    }

                    this.setState({ personalInfo: info })
                })


                alltabbarMenuDup[response.data.userAccount] = tabbarMenuDup;
                // alltabbarMenuDup.push(tabbarMenuDup);
                if ('0' == '0') {
                    this.setState({ tabbarMenu: tabbarMenuDup });
                }



                console.log(this.state.tabbarMenu);
                // this.setState({ ALLtabbarMenu: alltabbarMenuDup });
                console.log(response);

            })
            .catch((error) => {
                console.log(error);
            });



        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile',
            // data: datapost,
            headers: {
                'Authorization': data.Token
            }
        })
            .then(async (response) => {

                console.log(response.data.userAccount._id);
                this.setState({ id: response.data.userAccount._id })

                const pic: any = await this.getuserimage(response.data.userAccount._id, "USER_ACCOUNT");
                this.setState({ userpic: pic })

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

        // Event

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



    getname(id: any) {

        return new Promise<any>(resolve => {
            axios({
                method: 'GET',
                url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile/users?user=" + id + "",
                headers: {
                    'Authorization': data.Token
                }
            })
                .then((response) => {
                    var name = "";
                    // console.log("User Picure", response);
                    response.data.profileEntries.forEach((arrss: any) => {
                        if (arrss.entryType === "NAME") {
                            name = arrss.value;
                        }
                    });

                    resolve(name);
                })
                .catch((error) => {
                    console.log(error);
                    // return error;
                    resolve(error);
                });
        });
    }


    chkchat = (id: string) => {
        return new Promise<any>(resolve => {
            axios({
                method: 'GET',
                url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/chat",
                data: {
                    "otherAccount": id
                },
                headers: {
                    'Authorization': data.Token
                }
            }).then(async (response) => {
                console.log(response);
                if (response.data.length == 1) {

                    var dialog = response.data[0].connectyCubeId;
                    var name = await this.getname(id);
                    var opid = response.data[0].userAccounts[0].cognitoId == data.id ? response.data[0].userAccounts[1].connectyCubeId : response.data[0].userAccounts[0].connectyCubeId;
                    console.log(dialog, opid);
                    if (dialog != '') {
                        console.log("INN");
                        this.props.navigation.navigate('ChatBox', { dialoagid: dialog, opponentId: opid, type: 2, name: name })
                    }
                    resolve(response.data);
                }
                else {
                    resolve(response.data);
                }
            })
                .catch((error) => {

                });
        });
    }


    async createchat(id: string) {
        const chatget: any = await this.chkchat(id);

        if (chatget.length == 0) {
            axios({
                method: 'POST',
                url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/chat",
                data: {
                    "otherAccount": id
                },
                headers: {
                    'Authorization': data.Token
                }
            }).then(async (response) => {
                console.log(response);
                var dialog = response.data.connectyCubeId;
                var name = await this.getname(id);
                var opid = response.data.userAccounts[0].cognitoId == data.id ? response.data.userAccounts[1].connectyCubeId : response.data.userAccounts[0].connectyCubeId;
                if (dialog != '') {
                    this.props.navigation.navigate('ChatBox', { dialoagid: dialog, opponentId: opid, type: 2, name: name })
                }
            })
                .catch((error) => {

                });
        }
    }



    _renderItem({ item, index }: { item: any, index: number }) {
        return (
            <View style={{ width: '100%', height: (width - 10) / 361 * 297, backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
                <View style={styles.posImgContainer}>
                    <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={photo} />
                </View>
                <TouchableOpacity activeOpacity={0.8}
                    style={[{ marginTop: -20 }, styles.iconContainer]}>
                    <Image source={remove_icon} style={styles.iconImg} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}
                    style={[{ marginTop: -40, alignSelf: 'flex-end' }, styles.iconContainer]}>
                    <Image source={heart_icon} style={styles.iconImg} />
                </TouchableOpacity>
            </View>);
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
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.pop(); }}
                        activeOpacity={0.8}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={arrow} style={{ tintColor: 'black', width: 30, height: 30, resizeMode: 'contain' }} />
                            <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>LIKES</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <Content>
                    <View
                        style={{ flexDirection: 'row', alignSelf: 'center', justifyContent: 'flex-end', width: width - 40 }}>
                        {/* <Text style={[styles.name, { alignSelf: 'flex-end', fontSize: 20, marginRight: 20 }]}>Risa Kristy</Text> */}
                        <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>Mar. 16</Text>
                    </View>
                    <View
                        style={[styles.shadowBoxItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                        <Text style={[styles.desc, { width: width / 2 }]}>{this.state.Name} shown interest in your profile</Text>
                        <Image source={{ uri: this.state.userpic }} style={styles.subImage} />

                        <View style={[styles.photoContainer, { position: 'absolute', top: -width / 10, left: 10 }]}>
                            <Image source={{ uri: this.state.Picture }} style={styles.photo} />
                        </View>
                    </View>


                    <View style={styles.headerContainer}>
                        <Text style={{
                            color: '#000',
                            fontWeight: 'bold',
                            fontSize: 25
                        }}>{this.state.Name}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={{
                                color: '#000',
                                fontSize: 15
                            }}>{this.state.Location}</Text>
                            <Image source={pos} style={styles.posImg} />
                        </View>
                    </View>
                    {/* <Carousel
                        data={this.state.routes}
                        renderItem={this._renderItem}
                        sliderWidth={width}
                        sliderHeight={(width - 10) / 361 * 297 + 20}
                        itemWidth={width - 10}
                        itemHeight={(width - 10) / 361 * 297 + 20}
                    /> */}
                    <Text style={{
                        marginTop: 10, marginLeft: 10, color: 'black',
                        fontWeight: 'bold',
                        fontSize: 15
                    }}>{'ABOUT ME'}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingBottom: 10 }}>
                        {_.map(this.state.tabbarMenu, (item, index) => {
                            return (
                                <TouchableOpacity activeOpacity={0.8} key={item.id} style={[styles.shadowBox, { flexDirection: 'row', alignItems: 'center' }]}>

                                    <Image source={item.img}
                                        style={{ height: 20, width: 20, resizeMode: 'contain', margin: 2, tintColor: 'black' }} />
                                    <View
                                        style={{ backgroundColor: '#dadada', width: 1, height: 30 }}
                                    />
                                    <Text style={{
                                        color: 'black',
                                        paddingLeft: 5,
                                        paddingRight: 5,
                                        fontWeight: 'bold',
                                        fontSize: 15
                                    }}>{item.label}</Text>
                                </TouchableOpacity>

                            );
                        })}
                    </ScrollView>
                    {this.state.personalInfo.map((item: any, index: any) =>
                        <View key={index} style={styles.descRow} >
                            <Image source={item.image} style={styles.smallIcon} />
                            <Text style={[styles.smallText, { width: width - 50 }]}>{item.description}</Text>
                        </View>
                    )}
                    <Text style={{
                        marginTop: 10, marginLeft: 10, color: 'black',
                        fontWeight: 'bold',
                        fontSize: 15
                    }}>{'AFTER WORK, YOU CAN FIND ME'}</Text>




                    {/* ACTIVITY */}


                    {this.state.listActivities.map((item, index) =>
                        <View style={{ flexDirection: 'column', alignItems: 'center', width: width }}>

                            <View style={{ flexDirection: 'column', padding: 10, width: width }}>
                                <Image source={quote} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                                <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between' }}>
                                    <Text style={{ paddingLeft: 20, fontSize: 20, width: width / 4 * 3 }}>Painting Screens</Text>
                                    <TouchableOpacity activeOpacity={0.8} style={styles.iconContainer}>
                                        <Image source={heart_icon} style={{ height: 20, width: 20, resizeMode: 'contain' }} />
                                    </TouchableOpacity>
                                </View>
                            </View>

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
                                        this.setState({ popup: true });
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
                <View style={styles.container2}>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => { this.createchat(this.state.profileid); }}
                        style={[{ marginTop: -60, alignSelf: 'flex-end' }, styles.iconContainer2]}>
                        <Image source={message_footer} style={[styles.iconImg2, { tintColor: 'white' }]} />
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

export default InvitedProfile;
