import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, ImageSourcePropType, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content } from "native-base"
import styles from "./styles";
import _ from "lodash";

import { data, datapost } from '../../onboarding/data';
import axios from "axios";

import Carousel from 'react-native-snap-carousel';
import { Route, ActivityItem } from '../../../models/models';
import { forEach } from "../../../../../types/lodash";
import { object, number, string } from "prop-types";
const { width } = Dimensions.get('window');

// Images
const clock = require('../../../../assets/clock.png');
const birthCake = require('../../../../assets/birthdayCakePiece.png');
const scale_icon = require('../../../../assets/scale.png');
const height_png = require('../../../../assets/height.png');
const cheers = require('../../../../assets/cheers.png');
const smoke = require('../../../../assets/smoke.png');
const education = require('../../../../assets/education.png');
const portfolio = require('../../../../assets/portfolio.png');
const question = require('../../../../assets/question.png');
const houseOutline = require('../../../../assets/houseOutline.png');
const quote = require('../../../../assets/quote.png');
const place = require('../../../../assets/place.png');
const appointment = require('../../../../assets/appointment.png');
const photo = require('../../../../assets/photo.png');
const back = require('../../../../assets/back.png');
const remove_icon = require('../../../../assets/remove.png');
const heart_icon = require('../../../../assets/heart.png');
const like = require('../../../../assets/like.png');
const send = require('../../../../assets/send.png');
const pos = require('../../../../assets/pos.png');

type tabbarMenuItem = {
    id: number,
    label: string,
    img: ImageSourcePropType
}
type personalInfoItem = {
    name: string,
    description: string,
    image: ImageSourcePropType
}

// type Respo = {
//     _id: string, 
//     entryType: string ,
//     value: string ,
//     privacy:string
// }

type arr = {
    entryType: string,
    value: string,
}

type CompoentState = {
    name:string,
    index: number,
    routes: Route[],
    popup: boolean,
    tabbarMenu: tabbarMenuItem[],
    personalInfo: personalInfoItem[],
    userDescription: string,
    listActivities: ActivityItem[],
    responsedata: arr[]
}


export class Dashboard extends Component<NavigationScreenProps, CompoentState> {
    static navigationOptions = {
        header: null
    };


    constructor(props: any) {
        super(props);
        this.state = {  
            name:"Hanzala",
            responsedata: [
                { entryType: "GENDER", value: "" },
                { entryType: "HEIGHT", value: "4 5" },
                { entryType: "DRINKING", value: "" },
                { entryType: "SMOKING", value: "" },
                { entryType: "EDUCATION_LEVEL", value: "" },
                { entryType: "SCHOOL", value: "KBCC" },
                { entryType: "JOB_TITLE", value: "Developer" },
                { entryType: "NAME", value: "Hanzala" },
                { entryType: "WORK", value: "Developer" },
            ],
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
            
            popup: false,
            tabbarMenu:[
                {
                    id: 100,
                    label: "32",
                    img: birthCake,
                },
                {
                    id: 200,
                    label: "64",
                    img: scale_icon,
                },
                {
                    id: 300,
                    label: "5\'3\"",
                    img: height_png,
                },
                {
                    id: 400,
                    label: "Drinks",
                    img: cheers,
                },
                {
                    id: 500,
                    label: "Smoke",
                    img: smoke,
                },
                {
                    id: 600,
                    label: "Education",
                    img: education,
                },
                {
                    id: 700,
                    label: "Question",
                    img: question,
                },
            ],
            personalInfo: [
                {
                    name: "work",
                    description: "Information Security @ Tech Mahindra",
                    image: portfolio
                },
                {
                    name: "study",
                    description: "The Ontario College of Art and Design University",
                    image: education
                },
                {
                    name: "home",
                    description: "Pennsylvania",
                    image: houseOutline
                }
            ],
            userDescription: "AFTER WORK, YOU CAN FIND ME",
            listActivities: [
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

        this.dataput();
    }



    dataput = () => {
        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile',
            data: datapost,
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {
                // this.setState({ responsedata: response.data.profileEntries });

                // response.data.profileEntries.forEach((arrss: arr) => {
                //     this.state.responsedata.push({ entryType: arrss.entryType, value: arrss.value })
                // });
                // this.state.tabbarMenu[2].label=response.data.profileEntries[1].value;
                // this.state.tabbarMenu[3].label=response.data.profileEntries[2].value;
                // this.state.tabbarMenu[4].label=response.data.profileEntries[3].value;
                // this.state.tabbarMenu[5].label=response.data.profileEntries[4].value;
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });

    }


    
    renderItem({ item, index }: { item: any, index: number }) {
        return (
            <View key={index} style={{ width: '100%', height: (width - 10) / 361 * 297, backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
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

            <Content>
                <View style={styles.headerContainer}>
                    <Text style={{
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: 25
                    }}>ALISA CRAIG</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            color: '#000',
                            fontSize: 15
                        }}>TORONTO</Text>
                        <Image source={pos} style={styles.posImg} />
                    </View>
                </View>
                <Carousel
                    data={this.state.routes}
                    renderItem={this.renderItem}
                    sliderWidth={width}
                    sliderHeight={(width - 10) / 361 * 297 + 20}
                    itemWidth={width - 10}
                    itemHeight={(width - 10) / 361 * 297 + 20}
                />
                <Text style={{
                    marginTop: 10, marginLeft: 10, color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15
                }}>{'ABOUT ME'}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingBottom: 10 }}>
                    {_.map(this.state.tabbarMenu, (item, index) => {
                        return (
                            <TouchableOpacity key={index} activeOpacity={0.8} style={[styles.shadowBox, { flexDirection: 'row', alignItems: 'center' }]} onPress={()=>console.log(this.state.tabbarMenu)}>

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
                {this.state.personalInfo.map((item, index) =>
                    <View key={index} style={styles.descRow}>
                        <Image source={item.image} style={styles.smallIcon} />
                        <Text style={[styles.smallText, { width: width - 50 }]}>{item.description}</Text>
                    </View>
                )}
                <Text style={{
                    marginTop: 10, marginLeft: 10, color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15
                }}>{this.state.userDescription}</Text>

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
                        <Text style={{ paddingLeft: 20, fontSize: 20, width: width / 4 * 3, fontStyle: 'italic', color: 'black' }}>I want to go for hiking in the Rocky Mountain</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 5 }}>ACTIVITY</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={place} style={[styles.smallIcon, { tintColor: 'grey', marginRight: 5 }]} />
                            <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 - 50 }]}>Circuit of Americas</Text>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={appointment} style={[styles.smallIcon, { tintColor: 'grey' }]} />
                            <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 - 50 }]}>Apr.12-Apr.14</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: (width - 10) / 344 * 150 + 50, backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
                        <View style={styles.posImgContainer}>
                            <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={back} />
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
                                    style={[styles.smallText, { color: 'white' }]}>{'7.30 AM'}</Text>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8}
                            style={[{ marginTop: -20 }, styles.iconContainer]}
                            onPress={() => {
                                this.setState({ popup: true });
                            }}>
                            <Image source={like} style={styles.iconImg} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                            style={[{ marginTop: -40, alignSelf: 'flex-end' }, styles.iconContainer]}>
                            <Image source={send} style={styles.iconImg} />
                        </TouchableOpacity>
                    </View>

                </View>

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
                        <Text style={{ paddingLeft: 20, fontSize: 20, width: width / 4 * 3, fontStyle: 'italic', color: 'black' }}>I want to go for hiking in the Rocky Mountain</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 5 }}>ACTIVITY</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={place} style={[styles.smallIcon, { tintColor: 'grey' }]} />
                            <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 - 50 }]}>Circuit of Americas</Text>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <Image source={appointment} style={[styles.smallIcon, { tintColor: 'grey' }]} />
                            <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 - 50 }]}>Apr.12-Apr.14</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: (width - 10) / 344 * 150 + 50, backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
                        <View style={styles.posImgContainer}>
                            <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={back} />
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
                                    style={[styles.smallText, { color: 'white' }]}>{'7.30 AM'}</Text>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8}
                            style={[{ marginTop: -20 }, styles.iconContainer]}
                            onPress={() => {
                                this.setState({ popup: true });
                            }}>
                            <Image source={like} style={styles.iconImg} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                            style={[{ marginTop: -40, alignSelf: 'flex-end' }, styles.iconContainer]}>
                            <Image source={send} style={styles.iconImg} />
                        </TouchableOpacity>
                    </View>

                </View>

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
                        <Text style={{ paddingLeft: 20, fontSize: 20, width: width / 4 * 3, fontStyle: 'italic', color: 'black' }}>I want to go for hiking in the Rocky Mountain</Text>
                        <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 5 }}>ACTIVITY</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10, width: '100%' }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={place} style={[styles.smallIcon, { tintColor: 'grey' }]} />
                            <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 - 50 }]}>Circuit of Americas</Text>
                        </View>


                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Image source={appointment} style={[styles.smallIcon, { tintColor: 'grey' }]} />
                            <Text style={[styles.smallText, { fontSize: 15, color: 'grey', width: width / 2 - 50 }]}>Apr.12-Apr.14</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', height: (width - 10) / 344 * 150 + 50, backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
                        <View style={styles.posImgContainer}>
                            <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={back} />
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
                                    style={[styles.smallText, { color: 'white' }]}>{'7.30 AM'}</Text>
                            </View>
                        </View>
                        <TouchableOpacity activeOpacity={0.8}
                            style={[{ marginTop: -20 }, styles.iconContainer]}
                            onPress={() => {
                                this.setState({ popup: true });
                            }}>
                            <Image source={like} style={styles.iconImg} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                            style={[{ marginTop: -40, alignSelf: 'flex-end' }, styles.iconContainer]}>
                            <Image source={send} style={styles.iconImg} />
                        </TouchableOpacity>
                    </View>

                </View>
                <View style={{ height: 60, backgroundColor: 'white' }} />
            </Content>

        );
    }
}

export default Dashboard;
