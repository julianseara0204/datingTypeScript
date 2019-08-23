import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, Platform, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content } from "native-base"
import styles from "./styles";
import _ from "lodash";
import HomeFooter from './HomeFooter';
const { width, height } = Dimensions.get('window');
import { forEach } from "../../../../types/lodash";


import Footerstyles from "./HomeFooter/styles";

import { data, datapost } from '../onboarding/data';
import axios from "axios";

const photo = require('../../../assets/photo.png');
const search = require('../../../assets/search.png');
const send = require("../../../assets/send.png");

type arr = {
    _id: string,
    entryType: string,
    value: string,
    privacy: string
}

type CompenentState = {
    id: string
    Name: string,
    Allname: any,
    checkuser: any
}
export class InviteToActivity extends Component<NavigationScreenProps, CompenentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        console.log(props);
        this.state = {
            Name: props.navigation.state.params.Name,
            id: props.navigation.state.params.id,
            Allname: [],
            checkuser: {}
        };
        this.dataput();

    }

    getimg = (id: string, name: string) => {

        this.state.checkuser[id] = false;

        const alname: any = this.state.Allname;
        const eachdata = { id: id, Name: "Known", Eventid: this.state.id, EventName: this.state.Name, Picture: "" }
        eachdata['Name'] = name != "" ? name : "Known";
        axios({
            method: 'GET',
            url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/files/entities?entityType=USER_ACCOUNT&entity=" + id + "",
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {
                console.log(response);
                if (response.data.length > 0) {
                    console.log(response.data[response.data.length - 1].fileUrl);
                    eachdata['Picture'] = response.data[response.data.length - 1].fileUrl;

                    console.log(eachdata)
                    alname.push(eachdata);
                    this.setState({ Allname: alname });
                }
                else {
                    eachdata['Picture'] = 'https://media.idownloadblog.com/wp-content/uploads/2016/03/Generic-profile-image-002.png'

                    console.log(eachdata)
                    alname.push(eachdata);
                    this.setState({ Allname: alname });
                }

            })
            .catch((error) => {
                console.log(error);
            });
    }


    usercheckbox = (id: string) => {
        this.state.checkuser[id] = this.state.checkuser[id] == false ? this.state.checkuser[id] = true : this.state.checkuser[id] = false;
    }

    share=()=>{
        for (var key in this.state.checkuser) {
            if (this.state.checkuser.hasOwnProperty(key)) {
                if (this.state.checkuser[key] == true) {
                    var value = this.state.checkuser[key];
                    console.log(value + key);
                    // this.invite(key);
                }
            }
        }
        Alert.alert("Successfully invited to all users")
    }

    invite=(userid:any)=>{

        var postdata={
            "event":  this.state.id,
            "message": "",
            "invitee": userid,
          };
          
        axios({
            method: 'POST',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/events/invite',
            headers: {
                'Authorization': data.Token
            }, 
            data: postdata,
        }).then((response) => {
                console.log(response);               
                console.log(this.state.checkuser);
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
                console.log(response);
                for (var index in response.data) {
                    var name = ""
                    response.data[index].profileEntries.forEach((item: arr) => {
                        switch (item.entryType) {
                            case "NAME":
                                name = item.value;
                                break;
                        }
                    })
                    this.getimg(response.data[index].userAccount, name);
                }
                console.log(this.state.checkuser);
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
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>INVITE TO ACTIVITY</Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Image source={search} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <Content>



                    {this.state.Allname.map((item: any, index: any) =>
                        <View style={[styles.itemContainer, { borderBottomWidth: 1 }]}>
                            <View style={styles.itemSubContainer}>
                                <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                    <Image source={{ uri: item.Picture }} style={styles.photo} />
                                </TouchableOpacity>
                                <View style={styles.descGroup}>
                                    <Text style={styles.name}>{item.Name}</Text>
                                    <Text style={styles.desc}>{this.state.Name}</Text>
                                </View>
                            </View>
                            <CheckBox onChange={() => { this.usercheckbox(item.id) }} />
                        </View>

                    )}
                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content>

                {/* <HomeFooter navigation={this.props.navigation} /> */}
                <View style={Footerstyles.container}>
                    <Text>Share</Text>
                    <TouchableOpacity activeOpacity={0.8}
                    onPress={()=>{this.share()}}
                        style={[{ marginTop: -60, alignSelf: 'flex-end' }, Footerstyles.iconContainer]}>
                        <Image source={send} style={Footerstyles.iconImg} />
                    </TouchableOpacity>
                </View>
            </Container>
        );
    }
}

export default InviteToActivity;
