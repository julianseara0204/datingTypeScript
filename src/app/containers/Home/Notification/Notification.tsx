import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Content } from "native-base";
import { Route } from "../../../models/models"
import styles from "./styles";
import _ from "lodash";



const ConnectyCube = require('connectycube-reactnative');
import { data, datapost } from '../../onboarding/data';
import axios from "axios";
import { format } from 'date-fns';
import { toString } from "../../../../../types/lodash";

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
    eventdata: any,
}

type dialog = {
    dialogid: string,
    lastmsg: string,
    name: string,
    time: Date,
    opponentId: number
    Avast: string,
    type: number
}



export class Notification extends Component<NavigationScreenProps, ComponentState> {
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
            eventdata: [],
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

        this.getnotification();
        // this.see();
        // this.like();
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
                this.like();
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
        var dialogId = '5d3daf60ca8bf45ff71d9a9e';
        var filter = { opponentId: 160020, sort_desc: 'date_sent', limit: 100, skip: 0 };

        ConnectyCube.chat.dialog.list(dialogId, (error: any, dialogs: any) => {
            if (dialogs) {
                console.log("dialogs")
                console.log(dialogs)

                var dialog: any = []

                dialogs.items.forEach((item: any) => {
                    var eachdialog = {
                        dialogid: item._id,
                        lastmsg: item.last_message,
                        name: item.occupants_ids[0] == this.state.userid ? item.occupants_ids[1] : item.occupants_ids[0],
                        time: new Date(),
                        opponentId: item.occupants_ids[0] == this.state.userid ? item.occupants_ids[1] : item.occupants_ids[0],
                        type: item.type,
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

    getnotification() {

        // var s=await this.getimg(parse.event._id, "EVENT");
        axios({
            method: 'GET',
            url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/notifications",
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {
                console.log("notification", response);
                response.data.forEach(async (item: any) => {
                    
                const alldata: any = this.state.eventdata;
                    var parse = JSON.parse(item.data);
                    console.log("parse notification", parse);

                    const cc = (item.notificationType == "ACTIVITY_INVITE") ? await this.getimg(parse.event._id, "EVENT") : await this.getimg(parse.otherAccount._id, "USER_ACCOUNT");

                    const cname = (item.notificationType == "ACTIVITY_INVITE") ? await this.getname(parse.invitedByAccount._id) : await this.getname(parse.otherAccount._id);

                    alldata.push({
                        Picture: cc,
                        name: cname,
                        eventname: (item.notificationType == "ACTIVITY_INVITE") ? parse.event.eventName : "",
                        eventid: (item.notificationType == "ACTIVITY_INVITE") ? parse.event._id : parse.userAccount._id,
                        user_id: (item.notificationType == "ACTIVITY_INVITE") ? parse.invitedByAccount._id : parse.otherAccount._id,
                        type: item.notificationType
                    });

                    this.setState({ eventdata: alldata });
                })


                console.log("eventdata", this.state.eventdata);
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

    getimg(id: string, type: string): Promise<any> {

        return new Promise<any>(resolve => {
            axios({
                method: 'GET',
                url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/files/entities?entityType=" + type + "&entity=" + id + "",
                headers: {
                    'Authorization': data.Token
                }
            }).then((response) => {
                console.log("User Picure", response);
                if (response.data.length > 0) {
                    resolve(response.data[response.data.length - 1].fileUrl);
                }
                else {
                    resolve('https://media.idownloadblog.com/wp-content/uploads/2016/03/Generic-profile-image-002.png');
                }

            })
                .catch((error) => {
                    console.log(error);
                    resolve('https://media.idownloadblog.com/wp-content/uploads/2016/03/Generic-profile-image-002.png');

                });
        });
    }

    async msg(id: string) {
        var dialog: any = await this.createchat(id);
        var name = await this.getname(id);
        if (dialog != '') {
            this.props.navigation.navigate('ChatBox', { dialoagid: dialog, opponentId: id, type: 2, name: name })
        }
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
                    console.log(dialog,opid);
                    if (dialog != '') {
                        console.log("INN");
                        this.props.navigation.navigate('ChatBox', { dialoagid: dialog, opponentId: opid, type: 2, name: name })
                    }
                    resolve(response.data);
                }
                else
                {
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




    like = () => {
        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/chat',
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {

                var dialog: any = []

                response.data.forEach((item: any) => {
                    var id = item.userAccounts[0].connectyCubeId == this.state.userid ? item.userAccounts[1]._id : item.userAccounts[0]._id;
                    var img = "";
                    axios({
                        method: 'GET',
                        url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/files/entities?entityType=USER_ACCOUNT&entity=" + id + "",
                        headers: {
                            'Authorization': data.Token
                        }
                    })
                        .then((imgresponse) => {
                            console.log(imgresponse);
                            if (imgresponse.data.length > 0) {
                                console.log(response.data[imgresponse.data.length - 1].fileUrl);
                                img = imgresponse.data[imgresponse.data.length - 1].fileUrl;
                            }
                            else {
                                // this.state.routes.push({ id: id, Picture: 'https://media.idownloadblog.com/wp-content/uploads/2016/03/Generic-profile-image-002.png' })
                                img = "https://i.pinimg.com/originals/97/02/2f/97022fd71f8414d07660105f51c86999.jpg";
                            }
                        })
                        .catch((error) => {
                            console.log(error);
                        });



                    var eachdialog = {
                        dialogid: item.connectyCubeId,
                        lastmsg: "",
                        name: item.userAccounts[0].cognitoId == data.id ? item.userAccounts[1].connectyCubeId : item.userAccounts[0].connectyCubeId,
                        time: new Date(),
                        opponentId: item.userAccounts[0].cognitoId == data.id ? item.userAccounts[1].connectyCubeId : item.userAccounts[0].connectyCubeId,
                        type: 2,
                        Avast: img != "" && img != null ? img : "https://i.pinimg.com/originals/97/02/2f/97022fd71f8414d07660105f51c86999.jpg"
                    }
                    dialog.push(eachdialog);

                })

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
                {this.state.eventdata.map((item: any, index: any) => (item.type == "ACTIVITY_INVITE") ?
                    <View style={styles.itemContainer} key={index} >
                        <View style={styles.itemSubContainer}>
                            <View style={styles.photoContainer}>
                                <Image source={{ uri: item.Picture }} style={styles.photo} />
                                <TouchableOpacity activeOpacity={0.8} style={styles.tipContainer}>
                                    <Image source={message_notification} style={[styles.smallIcon, { tintColor: 'white' }]} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.descGroup}>
                                <Text style={styles.name} onPress={() => { this.props.navigation.navigate('InvitedEventDetail', { eventid: item.eventid, userId: item.user_id }) }}>You have a new Activity Suggestion posted by {item.name + " " + item.eventname}</Text>
                            </View>
                        </View>
                        <Text style={[styles.desc, { alignSelf: 'flex-end', fontSize: 15 }]}>11:48</Text>
                    </View>
                    :



                    <View style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <View style={styles.photoContainer}>
                                <Image source={{ uri: item.Picture }} style={styles.photo} />
                                <TouchableOpacity activeOpacity={0.8} style={styles.tipContainer}>
                                    <Image source={message_heart} style={[styles.smallIcon, { tintColor: 'white' }]} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.descGroup}>
                                <Text style={styles.name}>{item.name} showed interest in your profile</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: width / 2 }}>
                                    <TouchableOpacity
                                        onPress={() => { this.props.navigation.navigate('InvitedProfile', { id: item.user_id, Name: item.name }) }}
                                        style={[styles.shadowBox, { alignItems: 'center', width: width / 5, borderRadius: 5 }]} activeOpacity={0.8}>
                                        <Text style={{
                                            color: '#000',
                                            fontWeight: 'bold',
                                            fontSize: 10
                                        }}>{'Profile'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => { this.createchat(item.user_id); }}
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


                )}



                <View style={{ height: 60, backgroundColor: 'white' }} />
            </Content>

        );
    }
}

export default Notification;
