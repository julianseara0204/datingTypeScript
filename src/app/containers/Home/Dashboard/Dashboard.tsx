import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, ImageSourcePropType, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content } from "native-base"
import styles from "./styles";
import _ from "lodash";

import { data, datapost } from '../../onboarding/data';
import axios from "axios";

import { format } from 'date-fns';
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

type interset = {
    WORK: string,
    JOB_TITLE: string,
    SCHOOL: string,
    EDUCATION_LEVEL: string,
    RELIGIOUS_BELIEFS: string,
    POLITICS: string,
    NAME: string,
    GENDER: string,
    AGE: string,
    HEIGHT: string,
    KIDS: string,
    FAMILY_PLANS: string,
    DRINKING: string,
    SMOKING: string,
    MARIKUANA: string,
    DRUGS: string

}





type CompoentState = {
    name: string,
    Allname: any
    picture: string,
    index: number,
    routes: Route[],
    popup: boolean,
    tabbarMenu: tabbarMenuItem[],
    ALLtabbarMenu: any,
    personalInfo: personalInfoItem[],
    userDescription: string,
    listActivities: ActivityItem[],
    responsedata: arr[],
    itemarr: ActivityItem[],
    intersetvalue: interset,
    Location:string
}


export class Dashboard extends Component<NavigationScreenProps, CompoentState> {

    _carousel: any = React.createRef()

    static navigationOptions = {
        header: null
    };


    constructor(props: any) {
        super(props);
        this.state = {
            name: "Hanzala",
            Location:"",
            Allname: {},
            picture: photo,
            itemarr: [],
            responsedata: [
                { _id: "", entryType: "GENDER", value: "", privacy: "" },
            ],
            index: 0,
            routes: [
            ],

            intersetvalue: {
                WORK: "",
                JOB_TITLE: "",
                SCHOOL: "",
                EDUCATION_LEVEL: "",
                RELIGIOUS_BELIEFS: "",
                POLITICS: "",
                NAME: "",
                GENDER: "",
                AGE: "",
                HEIGHT: "",
                KIDS: "",
                FAMILY_PLANS: "",
                DRINKING: "",
                SMOKING: "asd",
                MARIKUANA: "",
                DRUGS: "",
            },


            popup: false,
            tabbarMenu: [
            ],

            ALLtabbarMenu: {},
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
            ]
        };

        this.dataput();
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
                    console.log(id);
                    console.log(response.data[response.data.length-1].fileUrl);
                    this.state.routes.push({ id: id, Picture: response.data[response.data.length-1].fileUrl })
                    this.setState({ picture: response.data[response.data.length-1].fileUrl })
                }
                else {
                    if (type == "USER_ACCOUNT") {
                        this.state.routes.push({ id: id, Picture: 'https://media.idownloadblog.com/wp-content/uploads/2016/03/Generic-profile-image-002.png' })
                    }
                    else if (type == "EVENTS") {
                        this.state.routes.push({ id: id, Picture: '../../../../assets/back.png' })
                    }
                }

                // this.setState({ routes: routedup });
            })
            .catch((error) => {
                console.log(error);
            });



    }


    dataput = () => {
        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile/filter?gender=MAN',
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {

                this.setState({ responsedata: response.data.profileEntries })


                const alltabbarMenuDup:any = {}
                const alname: any = {}
                var indexno: number = -1;

                for (var index in response.data) {
                    indexno = indexno + 1;

                    var no: number = 200;

                    const tabbarMenuDup = [];

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

                    this.getuserimage(response.data[index].userAccount, "USER_ACCOUNT");

                    alname[response.data[index].userAccount] = {Name:"",Location:"TORONTO"}

                    response.data[index].profileEntries.forEach((item: arr) => {

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
                                alname[response.data[index].userAccount]['Name'] = item.value;
                                break;

                            case "WORK":
                                break;
                        }
                    })

                    
                    alltabbarMenuDup[response.data[index].userAccount]=tabbarMenuDup;
                    // alltabbarMenuDup.push(tabbarMenuDup);
                    if (index == '0') {
                        this.setState({ tabbarMenu: tabbarMenuDup });
                    }
                }


                console.log(this.state.routes);
                this.setState({ Allname: alname });
                this.setState({ ALLtabbarMenu: alltabbarMenuDup });
                this.setState({ name: this.state.Allname[0] });
                console.log(this.state.Allname);
                console.log(response);

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

    getuserinterest=(id:any)=>{
        axios({
            method: 'GET',
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

    useriddd = (id: string) => {
        Alert.alert(id)
    }

    onPressShowCurrentIndex = (index: number) => {        
        this.setState({ tabbarMenu: this.state.ALLtabbarMenu[this._carousel.current.props.data[index].id] })
        this.setState({ name: this.state.Allname[this._carousel.current.props.data[index].id]['Name'] });
        this.setState({ Location: this.state.Allname[this._carousel.current.props.data[index].id]['Location'] });
    }


    renderItem({ item, index }: { item: any, index: number }) {
        return (
            <View key={index} style={{ width: '100%', height: (width - 10) / 361 * 297, backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
                <View style={styles.posImgContainer}>
                    <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={{ uri: item.Picture }} />
                </View>
                <TouchableOpacity activeOpacity={0.8}
                    style={[{ marginTop: -20 }, styles.iconContainer]}>
                    <Image source={remove_icon} style={styles.iconImg} />
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8}
                    onPress={() => {
                        console.log(item.id);
                        axios({
                            method: 'POST',
                            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/userinterests',
                            data: {
                                "interaction": "LIKED",
                                "type": "USER_ACCOUNT",
                                "entity": item.id
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
                    }}
                    style={[{ marginTop: -40, alignSelf: 'flex-end' }, styles.iconContainer]}>
                    <Image source={heart_icon} style={styles.iconImg} />
                    {/* <Text style={[styles.smallText, { width: width - 50 }]}>{item.type}</Text> */}
                </TouchableOpacity>
            </View>);
    }
    render() {
        return (

            <Content >
                <View style={styles.headerContainer}>
                    <Text style={{
                        color: '#000',
                        fontWeight: 'bold',
                        fontSize: 25
                    }}>{this.state.name}</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{
                            color: '#000',
                            fontSize: 15
                        }}>{this.state.Location}</Text>
                        <Image source={pos} style={styles.posImg} />
                    </View>
                </View>
                <Carousel
                    ref={this._carousel}
                    data={this.state.routes}
                    renderItem={this.renderItem}
                    sliderWidth={width}
                    sliderHeight={(width - 10) / 361 * 297 + 20}
                    itemWidth={width - 10}
                    itemHeight={(width - 10) / 361 * 297 + 20}
                    // onScrollEndDrag={this.onPressShowCurrentIndex}
                    onSnapToItem={(index) => {
                        this.onPressShowCurrentIndex(index);
                    }}
                />
                <Text style={{
                    marginTop: 10, marginLeft: 10, color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15
                }}>{'ABOUT ME'}</Text>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{ paddingBottom: 10 }}>
                    {_.map(this.state.tabbarMenu, (item, index) => {
                        return (
                            <TouchableOpacity key={index} activeOpacity={0.8} style={[styles.shadowBox, { flexDirection: 'row', alignItems: 'center' }]} onPress={() => console.log(this.state.tabbarMenu)}>

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
                    <View key={index} style={styles.descRow} >
                        <Image source={item.image} style={styles.smallIcon} />
                        <Text style={[styles.smallText, { width: width - 50 }]}>{item.description}</Text>
                    </View>
                )}
                <Text style={{
                    marginTop: 10, marginLeft: 10, color: 'black',
                    fontWeight: 'bold',
                    fontSize: 15
                }}>{this.state.userDescription}</Text>



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

        );
    }
}

export default Dashboard;
