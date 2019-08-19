import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View, StatusBar, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Icon } from "native-base"
import styles from "./styles";
import _ from "lodash";
import { GiftedChat, Send, Bubble, Message, Avatar } from "react-native-gifted-chat";
import { MessageItem } from '../../models/models'
import Reactotron from 'reactotron-react-native'

const { width } = Dimensions.get('window');


import ImagePicker from 'react-native-image-picker';

const ConnectyCube = require('connectycube-reactnative');
import { data, datapost } from '../onboarding/data';
import axios from "axios";
import { format } from 'date-fns';

// Images
const arrow = require('../../../assets/arrow_back.png');
const menu = require('../../../assets/menu.png');
const photo = require('../../../assets/photo.png');

type CompenentState = {
    messages: MessageItem[],
    userid: number;
    msg: string;
    pid: number;
    dialogid: string;
    opponentId: number,
    type: number,
    Name:string,
    Picdata: picdata
}

type picdata = {
    data: string,
    fileName: string,
    fileSize: number,
    height: number,
    isVertical: boolean,
    originalRotation: string,
    path: string,
    timestamp: string,
    type: string,
    uri: string,
    width: number
}


export class ChatBox extends Component<NavigationScreenProps, CompenentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            userid: 1,
            pid: 0,
            msg: "Hello dear!",
            messages: [],
            Name: props.navigation.state.params.name,
            dialogid: props.navigation.state.params.dialogid,
            // opponentId: props.navigation.state.params.opponentId,158492            
            opponentId: 160020,
            type: props.navigation.state.params.type,
            Picdata: {
                data: "string",
                fileName: "string",
                fileSize: 0,
                height: 0,
                isVertical: true,
                originalRotation: "string",
                path: "string",
                timestamp: "string",
                type: "number",
                uri: "boolean",
                width: 0
            },
        };


        Reactotron.log(props);
        // ConnectyCube.init({
        //     appId: 1009,
        //     authKey: 'yPeUCVOZDZPMVNA',
        //     authSecret: 'BjJBFynXkBkgurR'
        // });


        this.see();
    }


    see = () => {
        // axios({
        //     method: 'POST',
        //     url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/chat/session",
        //     headers: {
        //         'Authorization': data.Token
        //     }
        // })
        //     .then((response) => {
        //         console.log(response);


        // ConnectyCube.createSession((error:any, session:any)=> {
        this.login();
        // });
        // })
        // .catch((error) => {
        //     console.log(error);
        // });
    }


    login = () => {
        // var userCredential = { login: 'Hanzala', password: 'Hanzala123' };
        var userCredential = { login: data.id, password: data.id };

        ConnectyCube.login(userCredential, (error: any, user: any) => {
            if (user) {
                console.log("user")
                console.log(user)
                this.setState({ userid: user.id })
                this.connectchat();
            } else {
                console.log("user error")
                console.log(error)
            }
        });
    }

    addcontact=(userId:number)=>{
        // ConnectyCube.chat.contactlist.add(160020, function(error: any, contact: any) {
        //     if (contact) {
        //         console.log("contact")
        //         console.log(contact)
        //     } else {
        //         console.log("contact error")
        //         console.log(error)
        //     }
        // });

        ConnectyCube.chat.contactlist.get(function(error: any,contactlist:any) {
            if (contactlist) {
                        console.log("contact get")
                        console.log(contactlist)
                    } else {
                        console.log("contactget error")
                        console.log(error)
                    }
        });

    }

    connectgroup = () => {
        var dialogId = this.state.dialogid;
        Reactotron.log('connectgroup',this.state);
        Reactotron.log('jid',ConnectyCube.chat.helpers.getRoomJidFromDialogId(dialogId));
        ConnectyCube.chat.muc.join(ConnectyCube.chat.helpers.getRoomJidFromDialogId(dialogId), (error: any, group: any) => {
            if (group) {
                Reactotron.log("group",group)
            } else {
                Reactotron.log("group error",error)
                console.log(error)
            }
        });
    }

    leavegroup = () => {

        ConnectyCube.chat.muc.leave(this.state.dialogid, (error: any, leave: any) => {

            if (leave) {
                console.log("leave")
                console.log(leave)
            } else {
                console.log("leave error")
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
                    Reactotron.log("contactList")
                    Reactotron.log(contactList)
                    // this.connectgroup();
                    this.getmessage(100);
                    this.connectgroup();
                    this.onlistenermsg();
                    
                } else {
                    Reactotron.log("contactList error")
                    Reactotron.log(error)
                }
            }
        );
    }

    onlistenermsg=()=>{
        ConnectyCube.chat.onMessageListener = this.getonemsg.bind(this)
    }

    getonemsg=()=>{
        this.getmessage(1);
    }


    getmessage = (limit: number) => {
        var arr: any = this.state.messages;
        var dialogId = this.state.dialogid;
        var filter = { chat_dialog_id: dialogId, sort_desc: 'date_sent', limit: limit, skip: 0 };

        ConnectyCube.chat.message.list(filter, (error: any, messages: any) => {
            if (messages) {
                console.log("messages")
                console.log(messages)
                var id = 1000;
                messages.items.reverse().forEach((item: any) => {
                    id = this.state.messages.length;
                    var msg = {
                        _id: item._id,
                        text: item.message + "  " + id,
                        createdAt: item.created_at,
                        user: {
                            _id: item.sender_id,
                            name: "React Native",
                            avatar: { url: "https://placeimg.com/140/140/any" }
                        },
                        image: item.attachments.length>0  ? ConnectyCube.storage.privateUrl(item.attachments[0].uid):'',
                        
                        video: item.attachments.length>0 && item.attachments[0].type=="video"  ? ConnectyCube.storage.privateUrl(item.attachments[0].uid):'',
                        
                    }
                    if(this.state.messages.length>0 && this.state.messages[0].user._id!=item._id)
                    {                        
                    arr.unshift(msg);
                    this.setState({ messages: arr });
                    }
                    else if(this.state.messages.length==0)
                    {                        
                    arr.unshift(msg);
                    this.setState({ messages: arr });
                    }
                })
                console.log(arr);

            } else {
                console.log("messages error")
                console.log(error)
            }

        });


    }



    sendmessage = (msg: string) => {

        var dialog = { _id: this.state.dialogid, type: this.state.type };
        Reactotron.log('sendmessage',dialog);

        var message = {
            type: dialog.type === 3 ? 'chat' : 'groupchat',
            body: msg,
            extension: {
                save_to_history: 1,
                dialog_id: dialog._id,
            },
            markable: 1
        };

        var opponentId = dialog.type === 3 ? this.state.opponentId : ConnectyCube.chat.helpers.getRoomJidFromDialogId(dialog._id); //160020
        Reactotron.log('opponet',opponentId);
        let id = ConnectyCube.chat.send(opponentId, message);
        console.log(id);

        if(id!="")
        {
        this.getmessage(1);
        }
        function onMessage(userId: any, message: any) {
        }

        // this.getmessage();

    }


    selectPhotoTapped = () => {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 500,
            storageOptions: {
                skipBackup: true,
            },
        };

        ImagePicker.showImagePicker(options, response => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
                const data: any = response
                this.setState({ Picdata: data })
                const source = { uri: response.uri };

                var fileParams = { name: this.state.Picdata.fileName, file: this.state.Picdata, type: this.state.Picdata.type, size: this.state.Picdata.fileSize, public: false };
                ConnectyCube.storage.createAndUpload(fileParams,  (error:any, result:any)=> {
                    if (!error) {
                        var fileUID = result.uid;
                        console.log(result)
                        // prepare a message
                        var message = {
                            type: this.state.type === 3 ? 'chat' : 'groupchat',
                            body: 'attachment',
                            extension: {
                                save_to_history: 1,
                                dialog_id: this.state.dialogid,
                                attachments: [{ uid: fileUID, type: this.state.Picdata.type }]
                            }
                        };

                        let id = ConnectyCube.chat.send(this.state.opponentId, message);
                        console.log(id);

                        if(id!="")
                        {
                        this.getmessage(1);
                        }
                    }
                });
            }
        });
    }


    listUsers(params: any) {
        return new Promise((resolve, reject) => {
            ConnectyCube.users.get(params, (error: any, result: any) => {
                if (!error && result) {
                    resolve(result)
                } else if (error.code === 404) {
                    resolve({})
                } else {
                    reject(error)
                }
            })
        })
    }

    listUsersByIds(ids: string[]) {
        return new Promise((resolve, reject) => {
            this.listUsers({
                per_page: 100,
                filter: {
                    field: 'id',
                    param: 'in',
                    value: ids || '',
                },
            })
                .then(users => resolve(users))
                .catch(error => reject(error))
        })
    }

    onSend(messages = []) {
        this.sendmessage(messages[0]['text']);
        console.log(this.state.messages)
        this.setState({ messages: this.state.messages })
        console.log(messages[0]['text'])
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    }

    componentWillMount() {
        // TODO: Load here message for this converstion
        // this.setState({

        // });
    }


    renderSend = (props: any) => {
        return (
            <View style={{ flexDirection: 'row', height: '100%', alignContent: 'center', paddingRight: 10 }}>
                <Icon name='plus' type='FontAwesome5' style={styles.inputIcon} onPress={this.selectPhotoTapped}/>
                <Send {...props}>
                    <View style={{ flexDirection: 'row', height: '100%', alignContent: 'center' }}>
                        <Icon name='send-o' type='FontAwesome' style={styles.inputIcon} />
                    </View>
                </Send>
            </View>
        );
    }

    renderActions = (props: any) => {
        return (
            <View style={{
                marginLeft: 10,
                flexDirection: 'row',
                height: 40,
                width: 40,
                borderRadius: 25,
                alignSelf: 'center',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: 'rgb(223, 222, 222)'
            }}>
                <Icon name='keyboard-o' type='FontAwesome'
                    style={[styles.inputIcon, { paddingHorizontal: 0, alignSelf: 'center' }]} />
            </View>
        );
    }


    renderAvatar(props: any) {
        return null;
    }

    renderCustomView(props: any) {
        return (
            <View style={{ flexDirection: 'column', alignContent: 'center', paddingRight: 10 }}>
                <Avatar {...props} imageStyle={{ borderWidth: 2, borderColor: 'red' }} />
                <Bubble {...props} />
            </View>
        );
    }

    renderBubble(props: any) {
        const currentUserID = props.currentMessage.user._id;
        let previoustUserIDTemp = 0;
        if (props.previousMessage.user === undefined)
            previoustUserIDTemp = -1;
        else
            previoustUserIDTemp = props.previousMessage.user._id;
        const previoustUserID = previoustUserIDTemp;
        return (
            <View style={{ flexDirection: 'column', alignContent: 'center', paddingRight: 10 }}>
                <View
                    style={[styles.photoContainer,
                    currentUserID == previoustUserID ? { height: 0, marginBottom: 5, } : {},
                    currentUserID == 1 ? {
                        alignSelf: 'flex-end'
                    } : { alignSelf: 'flex-start' }]}>
                    <Image source={photo}
                        style={[styles.photo,
                        currentUserID == previoustUserID ? { height: 0 } : {}]} />
                </View>
                <Bubble {...props} />
            </View>
        );
    }

    renderMessage(props: any) {
        return (
            <View style={{ flexDirection: 'column', alignContent: 'center', paddingRight: 10 }}>
                <Message {...props} />
            </View>
        );
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
                        onPress={() => {
                            this.props.navigation.pop();
                        }}
                        activeOpacity={0.8}>
                        <Image source={arrow}
                            style={{ tintColor: 'black', width: 30, height: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{
                            width: 10,
                            height: 10,
                            borderRadius: 5,
                            backgroundColor: 'rgb(95, 199, 108)',
                            marginRight: 5,
                        }} />
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>{this.state.Name}</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => {
                        }}
                        activeOpacity={0.8}>
                        <Image source={menu} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages: any) => this.onSend(messages)}
                    user={{
                        _id: this.state.userid
                    }}
                    showUserAvatar={true}
                    renderBubble={this.renderBubble}
                    renderAvatar={this.renderAvatar}
                    renderMessage={this.renderMessage}
                    // renderCustomView={this.renderCustomView}
                    // renderMessageText={this.renderMessage}
                    renderSend={this.renderSend}
                    renderActions={this.renderActions} />

            </Container>
        );
    }
}

export default ChatBox;
