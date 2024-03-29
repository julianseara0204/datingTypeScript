import styles from "./styles";
import React, { Component } from "react";
import axios from "axios";
import { Text, View, TextInput, Platform, Dimensions, StatusBar,TouchableOpacity,Image,Alert,AsyncStorage } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content } from "native-base"
import { Button } from 'react-native-elements';

const AmazonCognitoIdentity = require('amazon-cognito-identity-js');

const CognitoUser  = require('amazon-cognito-identity-js').CognitoUser;
import { data ,datapost} from '../onboarding/data'

// import Auth from '@aws-amplify/auth';
import amplify,{Auth} from 'aws-amplify';

import awsconfig from '../../../aws-exports';
Auth.configure(awsconfig);



const { width, height } = Dimensions.get('window');
class LoginScreen extends Component<NavigationScreenProps> {


    componentWillMount(){
         this.retrieveData();  
    }
    constructor(props: any) {
        super(props);
        // this.retrieveData();  
    }

    state = {
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
        loading:false,
        user: null,
        login:null,
        token:""
    };

    Getphone=()=>{
        axios.get("https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/phone?phoneNumber="+this.state.username, { params:{}, headers: { 'Authorization': this.state.token } }).then(response => {
            // If request is good...
            console.log(response.data);
          })
          .catch((error) => {
            console.log('error 3 ' + error);
          });
      }

      

    retrieveData = async () => {
        try {
          const value = await AsyncStorage.getItem('refreshToken');
          const id:any = await AsyncStorage.getItem('id');
          if (value !== null) { 
            console.log("AsyncStorage")
              console.log(value,id)
            data.id=id;
            this.getrefresh(value);
          }
        } catch (error) {          
            this.props.navigation.navigate('LoginScreen');
        }
      };



      async getrefresh(refreshToken:any){
        try {
            const cognitoUser = await Auth.currentAuthenticatedUser();
            const currentSession:any = await Auth.currentSession();
            console.log('cognitoUser',  cognitoUser);
            data.Token=cognitoUser.signInUserSession.idToken.jwtToken;                
            data.RefreshToken=cognitoUser.signInUserSession.refreshToken.token;
            data.id=cognitoUser.attributes.sub; 
            data.username=cognitoUser.attributes.name;                   
            this.props.navigation.navigate('Home');
            // cognitoUser.refreshSession(currentSession.refreshToken, (err:any, session:any) => {
            //     console.log('session',  session);
            //     const { idToken, refreshToken, accessToken } = session;
            //     data.Token=idToken;                
            //     data.RefreshToken=refreshToken;                
            //     this.props.navigation.navigate('Home');
            // });
        } catch (e) {
            console.log('Unable to refresh Token', e);            
            this.props.navigation.navigate('LoginScreen');
        }
    }

    async signin() {
        const { username, password } = this.state
        console.log("username", username, " ", password);

        this.setState({loading : true});

        await Auth.signIn({ "username": username, "password": password })
            .then(async (user) => {
                console.log('Signin in: ', user  );                
                // console.log(user.signInUserSession.idToken.jwtToken);
                this.state.token=user.signInUserSession.idToken.jwtToken;
                data.Token=user.signInUserSession.idToken.jwtToken;                
                data.RefreshToken=user.signInUserSession.refreshToken.token;
                data.id=user.attributes.sub;
       
                // this.Getphone();


                this.setState({loading : false});

                this.setState({ user })
                AsyncStorage.setItem('refreshToken',user.signInUserSession.refreshToken.token);
                AsyncStorage.setItem('id',user.attributes.sub);

                // const value = await AsyncStorage.getItem('refreshToken');
                // const id:any = await AsyncStorage.getItem('id');
                //     console.log(value,id)
                this.props.navigation.navigate('Home');

            })
            .catch(err => {
                this.setState({loading : false});

                console.log("err", err);
                if (!err.message) {
                    Alert.alert('Error when signing in: ', err);
                } else {
                    Alert.alert('Error when signing in: ', err.message);
                }
            })
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
                                // Landing Register
                            }}>
                            <Image source={require('../../../assets/arrow_back.png')} style={styles.backButton} />
                        </TouchableOpacity>
                        <Text style={styles.headerTitile}>{'LOGIN WITH PHONE'}</Text>

                    </View>
                    <View style={styles.items}>

                      
                        <Text style={styles.label}>{'Mobile Number'}</Text>
                        <TextInput style={styles.text}
                            placeholder={'Add Mobile Number'}
                            keyboardType={'phone-pad'}
                            placeholderTextColor={'#000'}
                            onChangeText={(text) => { this.state.username = text }}

                        >{""}</TextInput>

                        <Text style={styles.label}>{'Password'}</Text>
                        <TextInput
                            style={styles.text}
                            placeholder={'Enter Password'}
                            secureTextEntry={true}
                            placeholderTextColor={'#000'}
                            onChangeText={(text) => { this.state.password = text }}
                        ></TextInput>

                        <View style={{ flex: 1, alignSelf: "center", marginTop: '7%' }}>
                            <Button
                                title="Login"
                                 disabled={this.state.loading}
                                onPress={() => {this.signin() }}
                                loading={this.state.loading}
                                type="outline"
                                // containerStyle={{ marginTop: 30, padding: '5%' }}this.signin()
                                buttonStyle={{ borderWidth: 1, borderColor: 'black', borderRadius: 5, width: 200 }}
                            />
                        </View>
                    </View>
                </Content>
                <Image source={require('../../../assets/bottom_image.png')}
                    style={styles.bottmimage} />


            </Container >

        );
    }
}

export default LoginScreen;
