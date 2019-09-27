import styles from "./styles";
import React, { Component } from "react";
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View, Dimensions, Platform, StatusBar, Alert, AsyncStorage, ToastAndroid } from "react-native";
import { Button } from 'react-native-elements';
import { Container, Content } from "native-base"
import { NavigationScreenProps } from "react-navigation";
const { width, height } = Dimensions.get('window');

import { data, datapost } from './../onboarding/data.js'

const FBSDK = require("react-native-fbsdk");
const { LoginButton, LoginManager, AccessToken } = FBSDK;

import axios from "axios";
const BACKEND_URL = 'http://ec2-3-90-122-176.compute-1.amazonaws.com:8004';

// import Auth from '@aws-amplify/auth';
import amplify, { Auth } from 'aws-amplify';

import awsconfig from '../../../aws-exports';
Auth.configure(awsconfig);

type CompenentState = {
    name: string,
    number: string,
    email: string,
    password: string,
    loading: boolean,
    showAlert: boolean
}

class RegisterScreen extends Component<NavigationScreenProps, CompenentState> {

    constructor(props: any) {
        super(props);
        this.state = {
            name: '',
            number: '',
            email: '',
            password: '',
            loading: false,
            showAlert: false
        }
    }

    ValidatePassword(password: string) {
        if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password)) {
            return true;
        }
        return false
    }

    showAlert = () => {
        this.setState({
            showAlert: true
        });
    };

    hideAlert = () => {
        this.setState({
            showAlert: false
        });
    };



    async getstarted() {

        this.setState({ loading: true })

        console.log("signup");

        var name = this.state.name;
        var number = this.state.number;
        var password = this.state.password
        var email = this.state.email

        console.log("usernnn ", name, number, password);

        if (this.state.password == '' || this.state.name == '' || this.state.number == '') {
            Alert.alert("", "Fields can't be empty");
            this.setState({
                loading: false
            })
            return this.showAlert();

        } else if (!this.state.password) {
            Alert.alert("", "Please Enter Password");
            // this.state.dialogTitle = "ERROR"
            this.setState({
                loading: false
            })
            return this.showAlert();
        } else if (!this.state.number) {
            Alert.alert("", "Please Enter Number");
            this.setState({
                loading: false
            })
        } else if (!this.state.name) {
            Alert.alert("", "Please Enter Name");
            this.setState({
                loading: false
            })
        }
        else if (this.state.password.length < 8) {
            Alert.alert("", "Minimum Password length must be 8 characters");
            // this.state.dialogTitle = "ERROR"
            this.setState({
                loading: false
            })
            return this.showAlert();
        } else if (!this.ValidatePassword(this.state.password)) {
            Alert.alert("", "Password Format: 1 Numeric Value, 1 Charcter, 1 Uppercase, 1 Lowercase");
            this.setState({
                loading: false
            })
        }
        else {

            // rename variable to conform with Amplify Auth field phone attribute
            Auth.signUp({
                "username": number.trim(),
                "password": password.trim(),
                attributes: { "email": email.trim(), "phone_number": number.trim(), "name": name.trim() }

            })
                .then((user) => {
                    this.setState({ loading: false })

                    console.log('sign up successful! ', user)
                    // Alert.alert(user)
                    // datapost.profile[5].value=this.state.name
                    // data.NAME=this.state.name
                    this.props.navigation.navigate("OtpScreen", { data: number.trim(), password: password.trim(), name: this.state.name })

                })
                .catch(err => {
                    this.setState({ loading: false })

                    if (!err.message) {
                        console.log('Error when signing up: ', err)
                        Alert.alert('Error when signing up: ', err)
                    } else {
                        console.log('Error when signing up: ', err.message)
                        Alert.alert('Error when signing up: ', err.message)
                    }
                })
        }
    }




    addFbUser = (data: any) => {
        console.log("Url >>>>> ", BACKEND_URL + "/api/User/facebookLogin");

        axios.post(BACKEND_URL + "/api/User/facebookLogin", {
            facebookAccessToken: data.accessToken,
            facebookApplicationId: data.applicationID,
            facebookUserId: data.userID,
            facebookLogin: true
        })
            .then(response => {
                if (response.status == 201) {
                    AsyncStorage.setItem("@facebookdata:", JSON.stringify(response));
                    AsyncStorage.setItem("isLoggedIn", "true").then(() => {
                        this.props.navigation.navigate("OBTabScreen");
                    });
                }
            })
            .catch(error => {
                console.log("Serverv Error >>>>> ", error);
                ToastAndroid.show("Internal server error", ToastAndroid.SHORT);
            });
    };


    // getAWSCredentials(response: any) {
    //     const { accessToken, expiresIn } = response;
    //     const date = new Date();
    //     const expires_at = expiresIn * 1000 + date.getTime();
    //     if (!accessToken) {
    //         return;
    //     }

    //     const fb = window.FB;
    //     fb.api('/me', { fields: 'name,email' }, response => {
    //         const user = {
    //             name: response.name,
    //             email: response.email
    //         };

    //         Auth.federatedSignIn('facebook', { token: accessToken, expires_at }, user)
    //             .then(credentials => {
    //                 console.log(credentials);
    //             });
    //     });
    // }



    loginWithFacebook = () => {
        // if (Platform.OS === "android") {
        //     LoginManager.setLoginBehavior("web_only")
        // }
        LoginManager.logInWithReadPermissions([
            "public_profile",
            "email",
            "name",
            //Regarding login by facebook, we should request needed persmissions
            // "user_birthday",
            // "user_location",
            // "user_likes",
            // "user_photos",
            // "user_friends",
            // //"user_about_me",
            // "user_posts",
            // //"user_education_history",
            // "user_events"
        ]).then((result: any) => {
            console.log("result", result);

            // AWS.config.credentials = new AWS.CognitoIdentityCredentials({
            //     IdentityPoolId: 'IDENTITY_POOL_ID',
            //     Logins: {
            //       'graph.facebook.com': result.authResponse.accessToken
            //     }
            //   });



            const { accessToken, expirationTime } = result;
            const date = new Date();
            const expires_at = expirationTime * 1000 + date.getTime();

            // const user = {
            //     name: result.name,
            //     email: result.email
            // };
            // Auth.federatedSignIn('facebook', { token: accessToken, expires_at }, user)
            // .then(credentials => {
            //     console.log(credentials);
            // });
            const user = {
                name: "HANZALA",
                email: "hanzala@gmail.com"
            };
            Auth.federatedSignIn('facebook', { token: accessToken, expires_at }, { name: 'Hanzala'})
            .then(credentials => {
                console.log(credentials);
            });

            if (result.isCancelled) {
                // alert("Login cancelled");
            } else {
                AccessToken.getCurrentAccessToken().then((data: any) => {
                    console.log("data", data);
                    this.addFbUser(data);
                });
            }
        },
            (error: any) => {
                console.log("Error", error);

                // alert("Login fail with error: " + error);
            }
        );
    }

    render() {

        return (
            <Container style={{ width: width, height: height }}>
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
                    <View style={styles.headerContainer}>
                        <TouchableOpacity
                            style={{ width: 35 }}
                            onPress={() => {
                                this.props.navigation.navigate("Landing")
                            }}>
                            <Image source={require('../../../assets/arrow_back.png')} style={styles.backButton} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitile}>{'REGISTER WITH PHONE'}</Text>

                    </View>
                    <View style={styles.items}>

                        <Text style={styles.label}>{'Your name'}</Text>
                        <TextInput
                            placeholder={'Your Display Name'}
                            placeholderTextColor={'#000'}
                            onChangeText={(text) => { this.setState({ name: text }) }}
                            style={styles.text} />

                        {/* <Text style={styles.label}>{'Email Address'}</Text> */}

                        <Text style={styles.label}>{'Mobile Number'}</Text>
                        <TextInput style={styles.text}
                            placeholder={'Add Mobile Number'}
                            keyboardType={'phone-pad'}
                            placeholderTextColor={'#000'}
                            onChangeText={(text) => { this.setState({ number: text }) }}
                        >{}</TextInput>

                        <Text style={styles.label}>{'Email'}</Text>
                        <TextInput style={styles.text}
                            placeholder={'Add Email'}
                            placeholderTextColor={'#000'}
                            onChangeText={(text) => { this.setState({ email: text }) }}
                        >{}</TextInput>

                        <Text style={styles.label}>{'Password'}</Text>
                        <TextInput
                            style={styles.text}
                            placeholder={'Enter Password'}
                            placeholderTextColor={'#000'}
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({ password: text }) }}

                        ></TextInput>

                        <View style={{ flex: 1, alignSelf: "center", marginTop: '7%' }}>
                            <Button
                                title="GET STARTED"
                                // disabled={this.state.isLoading}
                                onPress={() => { this.getstarted() }}
                                loading={this.state.loading}
                                type="outline"
                                // containerStyle={{ marginTop: 30, padding: '5%' }}
                                buttonStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 5, width: 200 }}
                            />
                        </View>


                        <View style={styles.orContainer}>
                            <View style={styles.layer9} />
                            <Text style={{ padding: 5 }}>{'or'}</Text>
                            <View style={styles.layer9} />

                        </View>


                        {/* <TouchableOpacity>

                            <ImageBackground source={require('../../../assets/loginwithfb.png')}
                                style={styles.facebookStyleButton}
                            >
                                <Text style={styles.buttonText}>{'Login with Facebook'}</Text>
                            </ImageBackground>

                        </TouchableOpacity> */}

                        <TouchableOpacity
                            onPress={() => {
                                this.loginWithFacebook();
                            }}>
                            <ImageBackground source={require('../../../assets/loginwithfb.png')}
                                style={styles.facebookStyleButton}>
                                <Text
                                    style={styles.buttonText}>{'Login with Facebook'}</Text>
                            </ImageBackground>
                        </TouchableOpacity>

                    </View>
                </Content>
                <Image source={require('../../../assets/bottom_image.png')}
                    style={styles.bottmimage} />


            </Container >

        );
    }
}


export default RegisterScreen;
