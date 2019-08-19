import React, { Component } from "react";
import { Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, Platform, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content } from "native-base"
import styles from "./styles";
import _ from "lodash";
import HomeFooter from './HomeFooter';
const { width, height } = Dimensions.get('window');
import { forEach } from "../../../../types/lodash";


import { data, datapost } from '../onboarding/data';
import axios from "axios";

const photo = require('../../../assets/photo.png');
const search = require('../../../assets/search.png');

type arr = {
    _id: string,
    entryType: string,
    value: string,
    privacy: string
}

type CompenentState = {
    id: string
    Name: string,
    Allname: any
}
export class InviteToActivity extends Component<NavigationScreenProps, CompenentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        console.log(props);
        this.state = {
            Name: "props.navigation.state.params.Name",
            id: "props.navigation.state.params.id",
            Allname: []
        };
        this.dataput();

    }

    getimg=(id:string,name:string)=>{

        
        const alname: any = this.state.Allname;
        const eachdata={ id: id, Name: "Known", Eventid: this.state.id, EventName: this.state.Name, Picture: "" }
        eachdata['Name']=name;
        axios({
            method: 'GET',
            url: "https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/files/entities?entityType=USRER_ACCOUNT&entity=" + id + "",
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {
                // console.log(response);
                if (response.data.length > 0) {
                    console.log(response.data[response.data.length - 1].fileUrl);
                    eachdata['Picture']= response.data[response.data.length - 1].fileUrl;
                }
                else {
                    eachdata['Picture']= 'https://media.idownloadblog.com/wp-content/uploads/2016/03/Generic-profile-image-002.png'
                 }

            })
            .catch((error) => {
                console.log(error);
            });

            alname.push(data);

            
            this.setState({ Allname: alname });
    }
    


    dataput = () => {
        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile/filter?gender=MAN',
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {

                console.log(response);
                for (var index in response.data) {

                    var name=""

                    response.data[index].profileEntries.forEach((item: arr) => {
                        switch (item.entryType) {
                            case "NAME":
                                name = item.value;
                                break;
                        }
                    })
                    this.getimg(response.data[index].userAccount,name);

                }


                console.log(this.state.Allname);

            })
            .catch((error) => {
                console.log(error);
            });
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
                <View style={{ flexDirection: 'row', width: width, padding: 20, justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>INVITE TO ACTIVITY</Text>
                    <TouchableOpacity activeOpacity={0.8}>
                        <Image source={search} style={{ width: 30, height: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <Content>



                    {this.state.Allname.map((item: any, index: any) =>
                        <View style={[styles.itemContainer, { borderBottomWidth: 1 }]}>
                            <View style={styles.itemSubContainer}>
                                <TouchableOpacity activeOpacity={0.8} style={styles.photoContainer}>
                                    <Image source={{uri:item.Picture}} style={styles.photo} />
                                </TouchableOpacity>
                                <View style={styles.descGroup}>
                                    <Text style={styles.name}>{item.Name}</Text>
                                    <Text style={styles.desc}>{this.state.Name}</Text>
                                </View>
                            </View>
                            <CheckBox onChange={() => { console.log(item) }} />
                        </View>

                    )}
                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content>

                <HomeFooter navigation={this.props.navigation} />
            </Container>
        );
    }
}

export default InviteToActivity;
