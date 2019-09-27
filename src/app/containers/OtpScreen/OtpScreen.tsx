import styles from "./styles";
import React, { Component } from "react";
import { Alert, Image, Text, TouchableOpacity, View, Dimensions, Platform, StatusBar, AsyncStorage } from "react-native";
import { Button } from 'react-native-elements';

import { NavigationScreenProps } from "react-navigation";
import CodeInput from 'react-native-confirmation-code-input';
import { Container, Content } from "native-base";
const { width, height } = Dimensions.get('window');

import axios from "axios";


import { data, datapost } from '../onboarding/data'

import Auth from '@aws-amplify/auth';
import awsconfig from '../../../aws-exports';
Auth.configure(awsconfig);

class OtpScreen extends Component<NavigationScreenProps> {

    state = {
        code: '',
        name: '',
        username: '',
        password: '',
        token: '',
        loading: false
    };

    constructor(props: any) {
        super(props);

        this.state.username = props.navigation.state.params.data;
        this.state.password = props.navigation.state.params.password;
        this.state.name = props.navigation.state.params.name;
        console.log("prop-otp", props)

    }

    async signin() {

        this.setState({ loading: true });

        await Auth.signIn({ "username": this.state.username, "password": this.state.password })
            .then(user => {
                console.log('Signin in: ', user);
                console.log(user.signInUserSession.idToken.jwtToken);
                this.state.token = user.signInUserSession.idToken.jwtToken;
                data.Token = user.signInUserSession.idToken.jwtToken;
                data.RefreshToken = user.signInUserSession.refreshToken.token;
                Alert.alert("Token" + data.Token);
                this.setState({ loading: false });

                //                 var token = new CognitoRefreshToken({ RefreshToken: refreshToken })
                // cognitoUser.refreshSession(token, (err, session) => { ... }); 


                this.setState({ user })
                AsyncStorage.setItem('IsLogin', user.signInUserSession.idToken.jwtToken);

                this.dataput();
            })
            .catch(err => {
                this.setState({ loading: false });

                console.log("err", err);
                if (!err.message) {
                    Alert.alert('Error when signing in: ', err);
                } else {
                    Alert.alert('Error when signing in: ', err.message);
                }
            })
    }

    // Confirm users and redirect them to the SignIn page
    async confirmSignUp() {
        this.setState({ loading: true })


        const username = this.state.username;
        const authCode = this.state.code;

        console.log("username ", username, authCode);

        await Auth.confirmSignUp(username, authCode)
            .then((res) => {
                this.setState({ loading: false })

                this.signin();
                console.log('Confirm sign up successful', res)
                Alert.alert('Number verified please login.')
                this.props.navigation.navigate("OBTabScreen")


            })
            .catch(err => {
                this.setState({ loading: false })

                if (!err.message) {
                    console.log('Error when entering confirmation code: ', err)
                    Alert.alert('Error when entering confirmation code: ', err)
                } else {
                    console.log('Error when entering confirmation code: ', err.message)
                    Alert.alert('Error when entering confirmation code: ', err.message)
                }
            })
    }

    dataput = () => {

        console.log(data.Token);
        console.log(datapost);
        axios({
            method: 'POST',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile',
            data: {
                "profile": [
                    {
                        "entryType": "NAME",
                        "privacy": "PUBLIC",
                        "value": this.state.name
                    }
                ]
            },
            headers: {
                'Authorization': data.Token
            }
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }



    _onFinishCheckingCode2(isValid: boolean, code?: string) {
        console.log("valid  ", isValid);
        this.setState({ code: isValid });
    }

    render() {
        return (
            <Container style={{ width: width, height: height, flex: 1 }}>
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
                <Content>
                    <Text style={styles.headerTitile}>{'VERIFY YOUR ACCOUNT'}</Text>
                    <View style={styles.items}>
                        <Text style={styles.text}>{'Please enter your verification code'}</Text>
                        <Text style={styles.text}>{'sent to your Phone Number'}</Text>
                        <View style={styles.headerContainer}>
                            <CodeInput
                                ref="codeInputRef2"
                                secureTextEntry
                                keyboardType="numeric"
                                activeColor='#000000'
                                inactiveColor='#000000'
                                autoFocus={false}
                                ignoreCase={true}
                                inputPosition='center'
                                size={50}
                                codeLength={6}
                                onFulfill={(isValid: boolean) => this._onFinishCheckingCode2(isValid)}
                                containerStyle={{ marginTop: 30, }}
                                onChangeText={(otp) => { this.state.code = otp }}
                                codeInputStyle={styles.pinViewInput}
                            />
                        </View>
                        <View style={styles.line}></View>
                        <Text style={styles.label}>{'Resend again?'}</Text>

                        {/* <TouchableOpacity style={styles.buttonStyle}
                            onPress={() => {
                                this.confirmSignUp();
                                // this.props.navigation.navigate('OBTabScreen');
                            }}>
                            <Text style={styles.getStartButton}>{'VERIFY'}</Text>
                        </TouchableOpacity> */}

                        {/* <View style={{ flex: 1 }}>
                            <Spinner visible={this.state.isLoading} textContent={"verifying..."} textStyle={{ color: '#FFF' }} />
                        </View> */}

                        <View style={{ flex: 1, alignSelf: "center", marginTop: '7%' }}>
                            <Button
                                title="VERIFY"
                                // disabled={this.state.isLoading}
                                onPress={() => { this.confirmSignUp() }}
                                loading={this.state.loading}
                                type="outline"
                                // containerStyle={{ marginTop: 30, padding: '5%' }}
                                buttonStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 5, width: 100 }}
                            />
                        </View>



                    </View>
                </Content>
                <Image source={require('../../../assets/bottom_image.png')}
                    style={{ top: height / 3 * 2, resizeMode: 'contain', width: width, position: 'absolute', height: width / 956 * 945 }} />
            </Container>
        );
    }
}

export default OtpScreen;
