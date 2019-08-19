import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Content } from "native-base";
import { Route } from "../../../models/models"
import styles from "./styles";
import _ from "lodash";
import Reactotron from 'reactotron-react-native'



const ConnectyCube = require('connectycube-reactnative');
import { data, datapost } from '../../onboarding/data';
import axios from "axios";
import { format } from 'date-fns';

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
    userid: number,
    pid: number,
    dialogs: dialog[],  
}

type dialog = {
    dialogid: string,
    lastmsg: string,
    name: string,
    time: Date,
    opponentId:number
    Avast: string,
    type:number
}



export class DashboardMessage extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
            userid: 1,
            pid: 0,
            dialogs: [],
            routes: [

            ],
            popup: false
        };

        console.log(ConnectyCube);
        ConnectyCube.init({
            appId: 1009,
            authKey: 'yPeUCVOZDZPMVNA',
            authSecret: 'BjJBFynXkBkgurR'
        });

        this.see();
        this.like();
    }


    see = () => {
        ConnectyCube.createSession((error: any, session: any) => {
            this.login();
        });
    }


    login = () => {
        // var userCredential = { login: 'Hanzala', password: 'Hanzala123' };
        var userCredential = { login: data.id, password: data.id };

        ConnectyCube.login(userCredential, (error: any, user: any) => {
            if (user) {
                console.log("user")
                console.log(user)
                this.setState({ userid: user.id })
                // this.getdialog();
            } else {
                console.log("user error")
                console.log(error)
            }
        });


    }


    connectchat = () => {
        // var userCredentials = {userId: 159714,password: 'Hassan123'};
        var userCredentials = { userId: this.state.userid, password: data.id };

        ConnectyCube.chat.connect(
            userCredentials,
            (error: any, contactList: any) => {
                if (contactList) {
                    console.log("contactList")
                    console.log(contactList);
                } else {
                    console.log("contactList error")
                    console.log(error)
                }
            }
        );
    }



    getdialog = () => {
        // var dialogId = '5d3c6cf7ca8bf402721ea536';
        var dialogId = '5d3daf60ca8bf45ff71d9a9e';
        var filter = { opponentId: 160020, sort_desc: 'date_sent', limit: 100, skip: 0 };

        ConnectyCube.chat.dialog.list(dialogId, (error: any, dialogs: any) => {
            if (dialogs) {
                console.log("dialogs")
                Reactotron.log(dialogs);

                var dialog: any = []

                dialogs.items.forEach((item: any) => {
                    var eachdialog = {
                        dialogid: item._id,
                        lastmsg: item.last_message,
                        name: item.name,
                        time: new Date(),  
                        opponentId:item.occupants_ids[1],
                        type:item.type,
                        Avast: "https://i.pinimg.com/originals/97/02/2f/97022fd71f8414d07660105f51c86999.jpg"
                    }
                    dialog.push(eachdialog);
                    
                })

                this.setState({ dialogs: dialog })

                console.log(this.state.dialogs)

            } else {
                console.log("dialogs error")
                console.log(error)
            }
        });
    }



    like = () => {
        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/chat',
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {

                var dialog: any = [];
                response.data.forEach((item: any) => {
                    var eachdialog = {
                        dialogid: item.connectyCubeId,
                        lastmsg: "",
                        name: item.userAccounts[0].cognitoId==data.id?item.userAccounts[1].connectyCubeId:item.userAccounts[0].connectyCubeId,
                        time: new Date(),  
                        opponentId: item.userAccounts[0].cognitoId==data.id?item.userAccounts[1].connectyCubeId:item.userAccounts[0].connectyCubeId,
                        type:2,
                        Avast: "https://i.pinimg.com/originals/97/02/2f/97022fd71f8414d07660105f51c86999.jpg"
                    }
                    dialog.push(eachdialog);
                    
                })
                Reactotron.log(dialog);


                this.setState({ dialogs: dialog })

                console.log(this.state.dialogs)

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
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
                                    onPress={() => { this.props.navigation.navigate('InvitedProfile',{id:"1",Name:"Hanzala"}) }}
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
                        </View>
                    </View>
                    <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>11:48</Text>
                </View>


                {this.state.dialogs.map((item, index) =>

                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => { this.props.navigation.navigate('ChatBox',{dialogid:item.dialogid,opponentId:item.opponentId,type:item.type,name:item.name}) }}
                        style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <View style={styles.photoContainer}>
                                <Image source={{uri:item.Avast}} style={styles.photo} />
                            </View>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.desc}>{item.lastmsg}</Text>
                            </View>
                        </View>
                        <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>Mar. 16</Text>
                    </TouchableOpacity>


                )}

                <View style={{ height: 60, backgroundColor: 'white' }} />
            </Content>

        );
    }
}

export default DashboardMessage;
