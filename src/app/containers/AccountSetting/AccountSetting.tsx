// import React, { Component } from "react";
// import { Dimensions, Image, Text, TouchableOpacity, View, StatusBar, Platform } from "react-native";
// import { NavigationScreenProps } from "react-navigation";
// import { Container, Content, Input } from "native-base";
import {USERS_COGNITO, fetchLink} from "../../utils/endpoints"
// import styles from "./styles";
import strings from "./strings";
// import _ from "lodash";

import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content, Icon ,Input} from "native-base"
import styles from "./styles";
import _ from "lodash";


// import {ToggleSwitch} from 'toggle-switch-react-native';

const { width } = Dimensions.get('window');

// Images
const cross = require('../../../assets/card_cross.png');
const keyhole = require( '../../../assets/keyhole.png');
const termsOfServiceIcon = require( '../../../assets/termsOfServiceIcon.png');
const nounCookiesPolicies = require( '../../../assets/nounCookiesPolicies.png');
const danger = require( '../../../assets/danger.png');
const licenses = require( '../../../assets/licenses.png');
const arrow = require( '../../../assets/arrow.png');

type CompenentState = {
    pushNotification: boolean,
    phone: string,
    memberShip: string,
    instagram: boolean,
    facebook: boolean
}

export class AccountSetting extends Component<NavigationScreenProps, CompenentState> {
    static navigationOptions = {
        header: null
    };
    // TODO: Get parameters dynamic when login
    parameters = {
        cognitoId: "1"
    }

    constructor(props: any) {
        super(props);
        this.state = {
            phone: "0986543456",
            pushNotification: false,
            memberShip: "Trial",
            instagram: false,
            facebook: false
        };
    }

    componentDidMount(){
        fetchLink(USERS_COGNITO, "GET", {cognitoId: this.parameters.cognitoId})
            .then((response) => response.json())
            .then(response => {
            this.setState({
                // TODO: Update link to receive the rest of the data
                // pushNotification: response.pushNotification,
                // memberShip: "Trial",
                // instagram: false,
                // facebook: false
                phone: response.phoneNumber,
            })
            // TODO: Treat all errors and decide what error to show to user
          }).catch(error=>{
              console.log(error);
          });
    }

    handleChangeText = (parameterName: string) => {
        return (text: string) => {
            switch (parameterName){
                case "phone":
                    this.setState({phone: text});
                break;
                default: 
                // this.setState({[parameterName]: text});
            }
        } 
    }

    componentWillMount(){
        // Save the data when user will leave component
        // TODO Build endpoint to update userAccount
    }

    handleOnToggle = (parameterName: string) => {
        // for facebook and istagram handle popup or resend request
        return (isOn: boolean) => {
            switch (parameterName){
                case "pushNotification":
                    this.setState({pushNotification: isOn});
                break;
                case "facebook":
                    this.setState({facebook: isOn});
                break;
                case "instagram":
                    this.setState({instagram: isOn});
                break;
                default: 
                // this.setState({[parameterName]: isOn});
            } 
        }
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
                <View style={{ flexDirection: 'row', width: width, padding: 20, justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>ACCOUNT SETTING</Text>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => { this.props.navigation.pop(); }}>
                        <Image source={cross} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <Content>
                    {/* The model user don't have email */}
                    <View style={styles.items}>

                        <Text style={styles.label}>{'MOBILE NUMBER'}</Text>
                        <View style={styles.itemContainer}>
                            <Input
                                onChangeText={this.handleChangeText("phone")}
                                value={this.state.phone}
                                placeholder={'ADD MOBILE NUMBER'}
                                placeholderTextColor={'#000'}
                                style={styles.text} />
                        </View>
                        {/* The email will be removed */}
                        {/* <Text style={styles.label}>{'EMAIL ADDRESS'}</Text>
                        <View style={styles.itemContainer}>
                            <Input
                                onChangeText={}
                                placeholder={'example@mail.com'}
                                placeholderTextColor={'#000'}
                                style={styles.text} />
                        </View> */}
                        {/* <Text style={styles.label}>{'NOTIFICATION'}</Text>
                        <View style={styles.itemContainer}>
                            <Input
                                placeholder={'PUSH NOTIFICATION'}
                                placeholderTextColor={'#000'}
                                style={styles.text} />
                            <ToggleSwitch
                                isOn={this.state.pushNotification}
                                onColor='rgb(95, 199, 108)'
                                offColor='rgba(228, 228, 228, 0.7)'
                                // label='Example label'
                                // labelStyle={{ color: 'black', fontWeight: '900' }}
                                size='small'
                                onToggle={this.handleOnToggle("pushNotification")}
                            />
                        </View> */}
                        <Text style={styles.label}>{'MEMBERSHIP'}</Text>
                        <View style={styles.itemContainer}>
                            <Input
                                placeholder={this.state.memberShip}
                                placeholderTextColor={'#000'}
                                style={styles.text} />
                        </View>
                        <Text style={styles.label}>{'CONNECTED ACCOUNTS'}</Text>
                        {/* TODO: Do pop that will link the accont */}
                        <View style={styles.itemContainer}>
                            <Input
                                placeholder={'Facebook'}
                                placeholderTextColor={'#000'}
                                style={styles.text} />
                            {/* <ToggleSwitch
                                // isOn={this.state.facebook}
                                onColor='rgb(95, 199, 108)'
                                offColor='rgba(228, 228, 228, 0.7)'
                                // label='Example label'
                                // labelStyle={{ color: 'black', fontWeight: '900' }}
                                size='small'
                                // onToggle={this.handleOnToggle("facebook")}
                            /> */}
                        </View>
                        <View style={styles.itemContainer}>
                            <Input
                                placeholder={'Instagram'}
                                placeholderTextColor={'#000'}
                                style={styles.text}></Input>
                            {/* <ToggleSwitch
                                isOn={this.state.instagram}
                                onColor='rgb(95, 199, 108)'
                                offColor='rgba(228, 228, 228, 0.7)'
                                // label='Example label'
                                // labelStyle={{ color: 'black', fontWeight: '900' }}
                                size='small'
                                onToggle={this.handleOnToggle("instagram")}
                            /> */}
                        </View>
                        {/* TODO: Links to sections */}
                        <Text style={styles.label}>{strings.legal}</Text>
                        <View style={[styles.itemContainer, styles.itemContainerAditional]}>
                            <View style={styles.itemSubContainer}>
                                <Image source={keyhole} style={styles.iconImg} />
                                <View style={styles.descGroup}>
                                    <Text style={styles.name}>Privacy Policy</Text>
                                </View>
                            </View>
                            <Image source={arrow} style={styles.iconImg} />
                        </View>
                        <View style={[styles.itemContainer, styles.itemContainerAditional]}>
                            <View style={styles.itemSubContainer}>
                                <Image source={termsOfServiceIcon} style={styles.iconImg} />
                                <View style={styles.descGroup}>
                                    <Text style={styles.name}>Terms of Service</Text>
                                </View>
                            </View>
                            <Image source={arrow} style={styles.iconImg} />
                        </View>
                        <View style={[styles.itemContainer, styles.itemContainerAditional]}>
                            <View style={styles.itemSubContainer}>
                                <Image source={nounCookiesPolicies} style={styles.iconImg} />
                                <View style={styles.descGroup}>
                                    <Text style={styles.name}>Cookies Policy</Text>
                                </View>
                            </View>
                            <Image source={arrow} style={styles.iconImg} />
                        </View>
                        <View style={[styles.itemContainer, styles.itemContainerAditional]}>
                            <View style={styles.itemSubContainer}>
                                <Image source={danger} style={styles.iconImg} />
                                <View style={styles.descGroup}>
                                    <Text style={styles.name}>Safe Tips</Text>
                                </View>
                            </View>
                            <Image source={arrow} style={styles.iconImg} />
                        </View>
                        <View style={[styles.itemContainer, styles.itemContainerAditional]}>
                            <View style={styles.itemSubContainer}>
                                <Image source={licenses} style={styles.iconImg} />
                                <View style={styles.descGroup}>
                                    <Text style={styles.name}>Licenses</Text>
                                </View>
                            </View>
                            <Image source={arrow} style={styles.iconImg} />
                        </View>
                    </View>

                    <TouchableOpacity style={[styles.shadowBoxItemBtn, { backgroundColor: 'white', width: width - 40, alignSelf: 'center', justifyContent: 'center' }]} activeOpacity={0.8}>
                        <Text style={styles.logOut}>{strings.logOut}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.shadowBoxItemBtn, { backgroundColor: 'white', width: width - 40, alignSelf: 'center', justifyContent: 'center' }]} activeOpacity={0.8}>
                        <Text style={styles.deleteAccount}>{strings.deleteAccount}</Text>
                    </TouchableOpacity>
                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content>
            </Container>
        );
    }
}

export default AccountSetting;
