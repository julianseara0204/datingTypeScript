import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text, ImageSourcePropType, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content, Icon } from "native-base"
import styles from "./styles";
import _ from "lodash";
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
    Picture:string,
    index:number,
    routes:any,
    popup:boolean,
    tabbarMenu: tabbarMenuItem[],
    Name:string,
    id:string,
    Location:string,
    picture:string,
    listActivities: ActivityItem[],
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
    id:string
    title: string,
    location: string,
    inPeriod: string,
    beginHour: string,
    image: any,
    
}

export class InvitedProfile extends Component<NavigationScreenProps,CompoentState> {
    static navigationOptions = {
        header: null
    };
    
    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
            Picture:"",            
            Name: props.navigation.state.params.name,
            id: props.navigation.state.params.dialoagid,
            Location:"ENGLAND",
            picture:"",
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
            listActivities:[],
        };
        this.getinfo();
    }


    getuserimage = (id: string, type: string) => {


        const routedup = this.state.routes;

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
                    console.log(response.data[response.data.length-1].fileUrl);
                    this.setState({ Picture: response.data[response.data.length-1].fileUrl })
                }
                else {
                    if (type == "USER_ACCOUNT") {
                        this.setState({ Picture: 'https://media.idownloadblog.com/wp-content/uploads/2016/03/Generic-profile-image-002.png' })
                    }
                    else if (type == "EVENTS") {
                        this.setState({ Picture: '../../../../assets/back.png' })
                    }
                }

            })
            .catch((error) => {
                console.log(error);
            });



    }

    
getinfo=()=>{
    axios({
        method: 'GET',
        url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile/filter?gender=MAN',
        headers: {
            'Authorization': data.Token
        }
    })
        .then((response) => {

            // this.setState({ responsedata: response.data.profileEntries })


            const alltabbarMenuDup:any = {}
            const alname: any = {}
            var indexno: number = -1;

                indexno = indexno + 1;

                var no: number = 200;

                const tabbarMenuDup:any = [];

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

                this.getuserimage(response.data[0].userAccount, "USER_ACCOUNT");

                alname[response.data[0].userAccount] = {Name:"",Location:"TORONTO"}

                response.data[0].profileEntries.forEach((item: arr) => {

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

                        case "JOB_TITLE":
                            break;


                        case "NAME":
                            alname[response.data[0].userAccount]['Name'] = item.value;
                            this.setState({Name:item.value})
                            break;

                        case "WORK":
                            break;
                    }
                })

                
                alltabbarMenuDup[response.data[0].userAccount]=tabbarMenuDup;
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




        // Event


        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/events',
            // data: datapost,
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {


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

                            this.setState({ picture: back })

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
                        <Text style={[styles.name, { alignSelf: 'flex-end', fontSize: 20, marginRight: 20 }]}>Risa Kristy</Text>
                        <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>Mar. 16</Text>
                    </View>
                    <View
                        style={[styles.shadowBoxItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                        <Text style={[styles.desc, { width: width / 2 }]}>{this.state.Name} shown interest in your profile</Text>
                        <Image source={photo} style={styles.subImage} />

                        <View style={[styles.photoContainer, { position: 'absolute', top: -width / 10, left: 10 }]}>
                            <Image source={{uri:this.state.Picture}} style={styles.photo} />
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
                    <View style={styles.descRow}>
                        <Image source={portfolio} style={styles.smallIcon} />
                        <Text
                            style={styles.smallText}>{'Information Security @ Tech Mahindra'}</Text>
                    </View>
                    <View style={styles.descRow}>
                        <Image source={education} style={styles.smallIcon} />
                        <Text
                            style={styles.smallText}>{'The Ontario College of Art and Design University'}</Text>
                    </View>
                    <View style={styles.descRow}>
                        <Image source={houseOutline} style={styles.smallIcon} />
                        <Text
                            style={styles.smallText}>{'Pennsylvania'}</Text>
                    </View>
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
                            onPress={()=>{this.props.navigation.navigate('InviteToActivity',{id:item.id,Name:item.title})}}
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

export default InvitedProfile;
