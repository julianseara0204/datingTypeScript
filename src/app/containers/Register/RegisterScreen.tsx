import styles from "./styles";
import React, { Component } from "react";
import { Image, ImageBackground, Text, TextInput, TouchableOpacity, View, Dimensions, Platform, StatusBar, Alert } from "react-native";
import { Button } from 'react-native-elements';
import { Container, Content } from "native-base"
import { NavigationScreenProps } from "react-navigation";
const { width, height } = Dimensions.get('window');

import Auth from '@aws-amplify/auth';

import awsconfig from '../../../aws-exports';
Auth.configure(awsconfig);

type CompenentState = {
    name: string,
    number: string,
    password: string,
    loading: boolean,
    showAlert: boolean
}

class RegisterScreen extends Component<NavigationScreenProps, CompenentState> {

    constructor(props: any){
        super(props);
        this.state = {
            name: '',
            number: '',
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

        console.log("usernnn ", name, number, password);

        if (this.state.password == '' || this.state.name == '' || this.state.number == '') {
            Alert.alert("","Fields can't be empty");
            this.setState({
                loading: false
            })
            return this.showAlert();

        } else if (!this.state.password) {
            Alert.alert("","Please Enter Password");
            // this.state.dialogTitle = "ERROR"
            this.setState({
                loading: false
            })
            return this.showAlert();
        } else if (!this.state.number) {
            Alert.alert("","Please Enter Number");
            this.setState({
                loading: false
            })
        } else if (!this.state.name) {
            Alert.alert("","Please Enter Name");
            this.setState({
                loading: false
            })
        }
        else if (this.state.password.length < 8) {
            Alert.alert("","Minimum Password length must be 8 characters");
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
            await Auth.signUp({
                "username": number.trim(),
                "password": password.trim(),
                attributes: { "name": name, "phone_number": number.trim() }
            })
                .then((user) => {
                    this.setState({ loading: false })

                    console.log('sign up successful! ', user)
                    this.props.navigation.navigate("OtpScreen", { data: number.trim() })

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
                            onChangeText={(text) => { this.setState({name: text})}}
                            style={styles.text} />

                        <Text style={styles.label}>{'Email Address'}</Text>

                        <Text style={styles.label}>{'Mobile Number'}</Text>
                        <TextInput style={styles.text}
                            placeholder={'Add Mobile Number'}
                            keyboardType={'phone-pad'}
                            placeholderTextColor={'#000'}
                            onChangeText={(text) => { this.setState({number: text}) }}
                        >{}</TextInput>

                        <Text style={styles.label}>{'Password'}</Text>
                        <TextInput
                            style={styles.text}
                            placeholder={'Enter Password'}
                            placeholderTextColor={'#000'}
                            secureTextEntry={true}
                            onChangeText={(text) => { this.setState({password: text}) }}

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


                         <TouchableOpacity>
                            
                            <ImageBackground source={require('../../../assets/loginwithfb.png')}
                                style={styles.facebookStyleButton}
                            >
                                <Text style={styles.buttonText}>{'Login with Facebook'}</Text>
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
