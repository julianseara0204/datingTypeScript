import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Content } from "native-base";
import { Route } from "../../../models/models"
import styles from "./styles";
import _ from "lodash";



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

        this.see();
        // this.like();
    }


    see = () => {
        ConnectyCube.createSession((error: any, session: any) => {
            this.login();
        });
    }


    login = () => {
        var userCredential = { login: data.id, password: data.id };

        ConnectyCube.login(userCredential, (error: any, user: any) => {
            if (user) {
                console.log("user")
                console.log(user)
                this.setState({ userid: user.id })
                this.like();
            } else {
                console.log("user error")
                console.log(error)
            }
        });


    }


    connectchat = () => {
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


                dialogs.items.forEach((item: any) => {
                    
                var dialog: any = this.state.dialogs;
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

                this.setState({ dialogs: dialog });
                })

                console.log(this.state.dialogs);

            } else {
                console.log("dialogs error")
                console.log(error)
            }
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


    like = () => {
        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/chat',
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {


                response.data.forEach(async(item: any) => {


                    var dialog: any = this.state.dialogs;
                    var id = item.userAccounts[0].connectyCubeId == this.state.userid ? item.userAccounts[1]._id : item.userAccounts[0]._id;
                  
                    dialog.push({
                        dialogid: item.connectyCubeId,
                        lastmsg: "",
                        name:  await this.getname(id),
                        time: new Date(),
                        opponentId: item.userAccounts[0].cognitoId == data.id ? item.userAccounts[1].connectyCubeId : item.userAccounts[0].connectyCubeId,
                        type: 2,
                        Avast: await this.getimg(id, "USER_ACCOUNT"),
                    });


                    this.setState({ dialogs: dialog });

                })


                console.log(this.state.dialogs)

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
                    console.log("User Picure", response);
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


                {this.state.dialogs.map((item, index) =>
                    <TouchableOpacity key={index} activeOpacity={0.8}
                        onPress={() => { this.props.navigation.navigate('ChatBox', { dialoagid: item.dialogid, opponentId: item.opponentId, type: item.type, name: item.name }) }}
                        style={styles.itemContainer}>
                        <View style={styles.itemSubContainer}>
                            <View style={styles.photoContainer}>
                                <Image source={{ uri: item.Avast }} style={styles.photo} />
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
