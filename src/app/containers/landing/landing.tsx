import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, Platform, StatusBar, AsyncStorage, ToastAndroid} from "react-native";
import { NavigationScreenProps } from "react-navigation";
import styles from "./styles";
import colors from '../../../Colors'
import axios from "axios";
const ProgressBarAnimated = require('react-native-progress-bar-animated');
const FBSDK = require("react-native-fbsdk")
const { width, height } = Dimensions.get('window');
const { LoginButton, LoginManager, AccessToken } = FBSDK;
const BACKEND_URL = 'http://ec2-3-90-122-176.compute-1.amazonaws.com:8004';

import Auth from '@aws-amplify/auth';

import awsconfig from '../../../aws-exports';
Auth.configure(awsconfig);

type CompenentState = {
    progress: number,
    progressWithOnComplete: number,
    progressCustomized: number,
    facebookAccesstoken: any,
    facebookapplicationID: any,
    facebookuserID: any,
    facebookLogin: boolean,
    error: any,
    username: string,
    password: string,
    isLoading: boolean
}

export class Landing extends Component<NavigationScreenProps, CompenentState> {

    static navigationOptions = {
        header: null
    };
    constructor(props: any) {
        super(props);

        this.state = {
            progress: 30,
            progressWithOnComplete: 0,
            progressCustomized: 0,
            facebookAccesstoken: undefined,
            facebookapplicationID: undefined,
            facebookuserID: undefined,
            facebookLogin: false,
            error: null,
            username: '',
            password: '',
            isLoading:false
        };
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
    loginWithFacebook = () => {
        LoginManager.logInWithReadPermissions([
            "public_profile",
            "email"
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

        const barWidth = Dimensions.get('screen').width - 150;


        return (
            <View style={styles.container}>

               
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
                    <StatusBar/>
                </View>
                <Image source={require('../../../assets/logo.png')} style={styles.logoImage} />
                <Text style={styles.topLogoContiner}>{'Event Dating'}</Text>

                <ProgressBarAnimated
                    {...styles.progressCustomStyles}
                    width={barWidth}
                    value={this.state.progress}
                    backgroundColorOnComplete={colors.periwinkleBlue}
                />

                <View style={styles.boottmView}>



                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { this.props.navigation.navigate("LoginScreen") }}
                        style={styles.phoneContainer}>
                        <Text style={styles.phoneStyle}>{'Login with Phone Number'}</Text>
                        <View style={styles.layer9} />
                    </TouchableOpacity> 



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
 

                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => { this.props.navigation.navigate("RegisterScreen") }}
                        style={styles.phoneContainer}>
                        <Text style={styles.phoneStyle}>{'Register Here'}</Text>
                        <View style={styles.layer9} />
                    </TouchableOpacity>
                    <Text
                        style={styles.infoText}>{'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s,'}</Text>

                </View>


            </View>


        );
    }
}

export default Landing;
