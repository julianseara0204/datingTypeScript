import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, AsyncStorage } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content } from "native-base"
import styles from "./styles";
import _ from "lodash";

const { width } = Dimensions.get('window');

const clock = require('../../../../assets/clock.png');
const gear = require('../../../../assets/gear.png');
const plus = require('../../../../assets/plus.png');
const pencil = require('../../../../assets/pencil.png');
const option = require('../../../../assets/option.png');
const diamond = require('../../../../assets/diamond.png');
const refer = require('../../../../assets/refer.png');
const arrow = require('../../../../assets/arrow.png');
const place = require('../../../../assets/place.png');
const appointment = require('../../../../assets/appointment.png');
const photo = require('../../../../assets/photo.png');
const back = require('../../../../assets/back.png');
const like = require('../../../../assets/like.png');
const send = require('../../../../assets/send.png');
const logout = require('../../../../assets/keyhole.png');

type ComponentState = {
    userEmail: string,
    userName: string,
    userPrivilege: string
}

export class MyProfile extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            userEmail: "example@mail.com",
            userName: "ALISA CRAIG",
            userPrivilege: "Privilege Membership"
        };
    }

    logout=()=>{
        AsyncStorage.clear();this.props.navigation.navigate('LoginScreen');
    }

    render() {
        return (
            <Content>
                <View style={{ flexDirection: 'row', width: width, padding: 20, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>MY PROFILE</Text>
                    <View style={{ flexDirection: 'row' }}>
                        
                    <TouchableOpacity activeOpacity={0.8}
                            onPress={() => { AsyncStorage.clear();this.props.navigation.navigate('LoginScreen'); }}>
                            <Image source={logout} style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10 }} />
                        </TouchableOpacity>


                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => { this.props.navigation.navigate('AccountSetting'); }}>
                            <Image source={gear} style={{ width: 30, height: 30, resizeMode: 'contain', marginRight: 10 }} />
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8}
                            onPress={() => { this.props.navigation.navigate('MyPreferences'); }}>
                            <Image source={option} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <View style={[styles.shadowBox, { width: width / 3, height: width / 3, padding: 0, borderRadius: width / 6, justifyContent: 'center', alignItems: 'center' }]}>
                        <Image source={photo}
                            style={{ width: width / 3, height: width / 3, borderRadius: width / 6, resizeMode: 'cover' }} />
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { this.props.navigation.navigate('EditProfile'); }}
                        style={[styles.shadowBox,
                        { width: 40, height: 40, padding: 0, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginTop: -25 }]}>
                        <Image source={pencil} style={{ width: 40, height: 40, borderRadius: 20, resizeMode: 'contain' }} />
                    </TouchableOpacity>

                    <Text style={[styles.name, { fontSize: 25, marginTop: 10, marginBottom: 5 }]}>{this.state.userName}</Text>
                    <Text style={[styles.name, { marginBottom: 20 }]}>{this.state.userEmail}</Text>
                </View>
                <View style={styles.itemContainer}>
                    <View style={styles.itemSubContainer}>
                        <Image source={diamond} style={styles.iconImg} />
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>Privilege Membership</Text>
                        </View>
                    </View>
                    <Image source={arrow} style={styles.iconImg} />
                </View>
                <View style={[styles.itemContainer, { borderBottomWidth: 1 }]}>
                    <View style={styles.itemSubContainer}>
                        <Image source={refer} style={styles.iconImg} />
                        <View style={styles.descGroup}>
                            <Text style={styles.name}>Refer or Share App</Text>
                        </View>
                    </View>
                    <Image source={arrow} style={styles.iconImg} />
                </View>

                <View style={styles.itemRoot}>

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
                                <Text style={[styles.smallText, { color: 'white' }]}>{'7.30 AM'}</Text>
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
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('Activity'); }}
                    style={[styles.shadowBox, { alignItems: 'center', marginBottom: 10 }]} activeOpacity={0.8}>
                    <Text style={{
                        color: '#000',
                        paddingLeft: 25,
                        paddingRight: 25,
                        fontWeight: 'bold',
                        fontSize: 20
                    }}>{'VIEW ALL'}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => { this.props.navigation.navigate('PlanAnActivity'); }}
                    activeOpacity={0.8}
                    style={[styles.iconContainer, { marginTop: 10, marginBottom: 20, alignSelf: 'flex-end', backgroundColor: 'rgb(158, 149, 254)', width: 50, height: 50, borderRadius: 25 }]}>
                    <Image source={plus} style={[styles.iconImg, { width: 30, height: 30, resizeMode: 'contain' }]} />
                </TouchableOpacity>
                <View style={{ height: 60, backgroundColor: 'white' }} />
            </Content>
        );
    }
}

export default MyProfile;
