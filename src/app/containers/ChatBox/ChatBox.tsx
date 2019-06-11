import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View, StatusBar, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Icon } from "native-base"
import styles from "./styles";
import _ from "lodash";
import { GiftedChat, Send, Bubble, Message, Avatar } from "react-native-gifted-chat";
import { MessageItem } from '../../models/models'
const { width } = Dimensions.get('window');

// Images
const arrow = require('../../../assets/arrow_back.png');
const menu = require('../../../assets/menu.png');
const photo = require('../../../assets/photo.png');

type CompenentState = {
    messages: MessageItem[]
}

export class ChatBox extends Component<NavigationScreenProps, CompenentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            messages: [
                {
                    _id: 4,
                    text: "I am fine thanks",
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: "React Native",
                        avatar: {url:"https://placeimg.com/140/140/any" } 
                    }
                },
                {
                    _id: 3,
                    text: "How are you feeling now?",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native",
                        avatar: "https://placeimg.com/140/140/any"
                    }
                },
                {
                    _id: 2,
                    text: "Hello John",
                    createdAt: new Date(),
                    user: {
                        _id: 1,
                        name: "React Native",
                        avatar: "https://placeimg.com/140/140/any"
                    }
                },
                {
                    _id: 1,
                    text: "Hello Lisa",
                    createdAt: new Date(),
                    user: {
                        _id: 2,
                        name: "React Native",
                        avatar: "https://placeimg.com/140/140/any"
                    }
                }
            ]
        };
    }
    onSend(messages = []) {
        this.setState(previousState => ({
            messages: GiftedChat.append(previousState.messages, messages)
        }));
    }
    componentWillMount() {
        // TODO: Load here message for this converstion
        // this.setState({
            
        // });
    }
    renderSend(props: any) {
        return (
            <View style={{ flexDirection: 'row', height: '100%', alignContent: 'center', paddingRight: 10 }}>
                <Icon name='plus' type='FontAwesome5' style={styles.inputIcon} />
                <Send {...props}>
                    <View style={{ flexDirection: 'row', height: '100%', alignContent: 'center' }}>
                        <Icon name='send-o' type='FontAwesome' style={styles.inputIcon} />
                    </View>
                </Send>
            </View>
        );
    }
    renderActions(props: any) {
        return (
            <View style={{ marginLeft: 10, flexDirection: 'row', height: 40, width: 40, borderRadius: 25, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgb(223, 222, 222)' }}>
                <Icon name='keyboard-o' type='FontAwesome' style={[styles.inputIcon, { paddingHorizontal: 0, alignSelf: 'center' }]} />
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
            </View >
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
            </View >
        );
    }
    renderMessage(props: any) {
        return (
            <View style={{ flexDirection: 'column', alignContent: 'center', paddingRight: 10 }}>
                <Message {...props} />
            </View >
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
                        onPress={() => { this.props.navigation.pop(); }}
                        activeOpacity={0.8}>
                        <Image source={arrow} style={{ tintColor: 'black', width: 30, height: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <View style={{ width: 10, height: 10, borderRadius: 5, backgroundColor: 'rgb(95, 199, 108)', marginRight: 5 }} />
                        <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>Lisa Kristy</Text>
                    </View>
                    <TouchableOpacity
                        onPress={() => { }}
                        activeOpacity={0.8}>
                        <Image source={menu} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <GiftedChat
                    messages={this.state.messages}
                    onSend={(messages: any) => this.onSend(messages)}
                    user={{
                        _id: 1
                    }}
                    showUserAvatar={false}
                    renderBubble={this.renderBubble}
                    renderAvatar={this.renderAvatar}
                    renderMessage={this.renderMessage}
                    // renderCustomView={this.renderCustomView}
                    // renderMessageText={this.renderMessage}
                    renderSend={this.renderSend}
                    renderActions={this.renderActions} />
                {/* <Content>
                    <View style={{ flexDirection: 'column', alignItems: 'center', width: width }}>

                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 10 }}>
                            <Text style={{ paddingLeft: 20, paddingRight: 20, fontSize: 20, width: width, fontStyle: 'italic', color: 'black' }}>I want to go for hiking in the Rocky Mountain</Text>
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
                                style={[{ marginTop: -20 }, styles.iconContainer]}>
                                <Image source={like} style={styles.iconImg} />
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8}
                                style={[{ marginTop: -40, alignSelf: 'flex-end' }, styles.iconContainer]}>
                                <Image source={send} style={styles.iconImg} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content> */}

                {/* <HomeFooter navigation={this.props.navigation} /> */}
            </Container>
        );
    }
}

export default ChatBox;
