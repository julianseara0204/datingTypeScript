import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, TextInput, Platform, Alert } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content, Input } from "native-base";
import { Category } from "../../models/models";
import styles from "./styles";
import _ from "lodash";
import DateTimePicker from 'react-native-modal-datetime-picker';
import { format } from 'date-fns';

import ImagePicker from 'react-native-image-picker';

import { data, datapost } from '../onboarding/data';
import axios from "axios";
import { thisTypeAnnotation } from "@babel/types";

// Images
const cross = require('../../../assets/card_cross.png');
const bike_riding = require('../../../assets/bike_riding.png');
const trekking = require('../../../assets/trekking.png');
const party = require('../../../assets/party.png');
const addPhoto = require('../../../assets/AddPhoto.png');
const place = require('../../../assets/place.png');
const appointment = require('../../../assets/appointment.png');
const photo = require('../../../assets/photo.png');

const { width } = Dimensions.get('window');

const Photoes = [
    {
        img: bike_riding,
    },
    {
        img: trekking,
    },
    {
        img: party,
    }
];

type ComponentState = {
    categories: Category[],
    startDate: string,
    endDate: string,
    endTime: string,
    startTime: string,
    selectedInput: string,
    selectDateTime: "date" | "time" | "datetime",
    isDateTimePickerVisible: boolean,
    Name: string,
    filereqdata: filereq,
    avatarSource: picget,
    Picdata: picdata

}

type filereq = {

    "entityType": string,
    "name": string,
    "entity": string,
    "type": string,

}

type picget = {
    uri: string
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

interface Ivalue {
    value: string;
}




export class PlanAnActivity extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            startDate: 'ADD DATE & TIME',
            startTime: '',
            endDate: 'ADD DATE & TIME',
            endTime: '',
            isDateTimePickerVisible: false,
            selectedInput: 'startDate',
            selectDateTime: 'date',
            avatarSource: { uri: "https://unpkg.com/react-native-image-crop-picker@0.21.1/svg.svg" },
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
            filereqdata: {
                "entityType": "ACTIVITY",
                "name": "2.jpg",
                "type": "image/jpeg",
                "entity": "5d2de40698dcbd77030364f8"
            },
            categories: [
                {
                    id: 100,
                    label: "Bike Riding",
                    img: bike_riding,
                },
                {
                    id: 200,
                    label: "Trekking",
                    img: trekking,
                },
                {
                    id: 300,
                    label: "Weekend Party",
                    img: party,
                }
            ],
            Name: 'Car Racing Competition',
        };


    }



    onadd = () => {
        console.log(this.state.endDate + "T" + this.state.endTime);
        axios({
            method: 'POST',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/events',
            data: {
                "eventDescription": "none",
                "eventEndTime": this.state.endDate + "T" + this.state.endTime,
                "eventName": this.state.Name,
                "eventStartTime": this.state.startDate + "T" + this.state.startTime,
                "location": {
                    "latitude": 12.24560,
                    "longitude": 15.65460
                },
                "eventType": "EVENT_BRITE",
            },
            headers: {
                'Authorization': data.Token
            }
        })
            .then((response) => {
                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    putbtn = (uri: string, fileName: any, type: any) => {

        axios({
            method: 'POST',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/files/requestUpload',
            data: this.state.filereqdata,
            headers: {
                'Authorization': data.Token,
            }
        })
            .then((response) => {

                console.log(response.data.fileUploadUrl);

                const form_data = new FormData();
                form_data.append("image", {
                    uri: uri,
                    name: fileName,
                });
                axios({
                    method: 'PUT',
                    url: response.data.fileUploadUrl,
                    data: form_data,
                    headers: {
                        'Content-Type': type
                    }
                })
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });


            })
            .catch((error) => {
                console.log(error);
            });




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
                const source = { uri: response.uri };
                // this.putbtn(response.uri,response.fileName,response.type)

                axios({
                    method: 'POST',
                    url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/files/requestUpload',
                    data: this.state.filereqdata,
                    headers: {
                        'Authorization': data.Token,
                    }
                })
                    .then((response1) => {

                        console.log(response1.data.fileUploadUrl);



                        const form_data = new FormData();
                        form_data.append("image", {
                            uri: response.uri,
                            name: response.fileName,
                        });




                        axios({
                            method: 'PUT',
                            url: response1.data.fileUploadUrl,
                            data: response.data,
                            headers: {
                                'Content-Type': 'image/jpeg',
                                'Content-Encoding': 'base64'
                            }
                        })
                            .then((response2) => {
                                console.log(response2);
                            })
                            .catch((error) => {
                                console.log(error);
                            });


                    })
                    .catch((error) => {
                        console.log(error);
                    });

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                this.setState({ avatarSource: source });
            }
        });
    }


    showDateTimePicker = (value: "date" | "time" | "datetime") => {
        this.setState({ selectDateTime: value, isDateTimePickerVisible: true }, this.forceUpdate);
    }

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false }, this.forceUpdate);
    }

    handleDatePicked = (date: Date) => {

        if (this.state.selectDateTime == "date") {
            if (this.state.selectedInput == "startDate") {
                if (this.state.endDate == "TO DATE") {
                    this.setState({ startDate: format(date, 'YYYY-MM-DD') });
                }
                else {
                    let startDate: any = new Date(date);
                    let endDate: any = new Date(this.state.endDate + " " + this.state.endTime);
                    if (endDate - startDate < 0) {
                        Alert.alert('Error', 'Wrong Start Date!');
                        this.hideDateTimePicker();
                        return;
                    }
                    else {
                        this.setState({ startDate: format(date, 'YYYY-MM-DD') });
                    }
                }

                this.hideDateTimePicker();
            }
            if (this.state.selectedInput == "endDate") {

                if (this.state.startDate == "START DATE") {
                    this.setState({ endDate: format(date, 'YYYY-MM-DD') });
                }
                else {
                    let startDate: any = new Date(this.state.startDate + " " + this.state.startTime);
                    let endDate: any = new Date(date);
                    if (endDate - startDate < 0) {
                        Alert.alert('Error', 'Wrong End Date!');
                        this.hideDateTimePicker();
                        return;
                    }
                    else {
                        this.setState({ endDate: format(date, 'YYYY-MM-DD') });
                    }
                }
                this.hideDateTimePicker();
            }
            this.showDateTimePicker('time');
        }
        else {
            if (this.state.selectedInput == "startDate") {
                if (this.state.endTime == "") {
                    this.setState({ startTime: format(date, 'H:mm:ss') });
                }
                else {
                    let startTime: any = new Date(date);
                    let endTime: any = new Date(this.state.endTime);
                    if (endTime - startTime < 0) {
                        Alert.alert('Error', 'Wrong Start Date!');
                        this.hideDateTimePicker();
                        return;
                    }
                    else {
                        this.setState({ startTime: format(date, 'H:mm:ss') });
                    }
                }

                this.hideDateTimePicker();
            }
            if (this.state.selectedInput == "endDate") {

                if (this.state.startTime == "") {
                    this.setState({ endTime: format(date, 'H:mm:ss') });
                }
                else {
                    let startTime: any = new Date(this.state.startDate + " " + this.state.startTime);
                    let endTime: any = new Date(date);
                    if (endTime - startTime < 0) {
                        Alert.alert('Error', 'Wrong End Date!');
                        this.hideDateTimePicker();
                        return;
                    }
                    else {
                        this.setState({ endTime: format(date, 'H:mm:ss') });
                    }
                }
                this.hideDateTimePicker();
            }
        }
    };
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
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>PLAN AN ACTIVITY</Text>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.pop() }}
                        activeOpacity={0.8}>
                        <Image source={cross} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <Content>
                    <View style={styles.items}>

                        <Text style={styles.label}>{'WHAT DO YOU WANT TO DO?'}</Text>
                        <View style={styles.itemContainer}>
                            <Input
                                placeholder={'ADD what you want to do or Activity Name'}
                                placeholderTextColor={'#000'}
                                style={styles.text}
                                onChangeText={(text) => { const names = text; this.setState({ Name: names }); }}
                            />
                        </View>
                        <Text style={styles.label}>{'PLAN LOCATION OF YOUR ACTIVITY'}</Text>
                        <View style={styles.itemContainer}>
                            <Input
                                placeholder={'ADD LOCATION'}
                                placeholderTextColor={'#000'}
                                style={styles.text} />
                            <Image source={place} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </View>
                        <Text style={styles.label}>{'PLAN START DATE & TIME OF ACTIVITY'}</Text>
                        <View style={[styles.itemContainer, { paddingVertical: 10 }]}>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => { this.setState({ selectedInput: "startDate" }); this.showDateTimePicker('date'); }}>
                                <Text style={styles.text}>{this.state.startDate} {this.state.startTime}</Text>
                            </TouchableOpacity>
                            <Image source={appointment} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </View>
                        <Text style={styles.label}>{'PLAN END DATE & TIME OF ACTIVITY'}</Text>
                        <View style={[styles.itemContainer, { paddingVertical: 10 }]}>
                            <TouchableOpacity activeOpacity={0.8}
                                onPress={() => { this.setState({ selectedInput: "endDate" }); this.showDateTimePicker('date'); }}>
                                <Text style={styles.text}>{this.state.endDate} {this.state.endTime}</Text>
                            </TouchableOpacity>
                            <Image source={appointment} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </View>

                    </View>
                    <Text style={[styles.label, { marginLeft: 20 }]}>{'PLAN CATEGORY OF YOUR ACTIVITY'}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {_.map(this.state.categories, (item, index) => {
                            return (
                                <View key={index} >
                                    <TouchableOpacity activeOpacity={0.8} style={[styles.shadowBox, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>

                                        <Image source={item.img}
                                            style={{ height: 40, width: 40, resizeMode: 'contain', margin: 8, tintColor: 'black' }} />
                                        <View
                                            style={{ backgroundColor: '#dadada', width: 10, height: 10, borderRadius: 5, position: 'absolute', bottom: 10, right: 10 }}
                                        />
                                    </TouchableOpacity>
                                    <Text style={{
                                        color: 'black',
                                        paddingLeft: 25,
                                        paddingRight: 25,
                                        fontWeight: 'bold',
                                        fontSize: 18
                                    }}>{item.label}</Text>
                                </View>

                            );
                        })}
                    </ScrollView>

                    <Text style={[styles.label, { marginLeft: 20, marginTop: 20 }]}>{'ADD PHOTO OF YOUR ACTIVITY'}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {_.map(Photoes, (item, index) => {
                            return (
                                <View key={index} >
                                    <View style={[styles.photoShadowBox, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>

                                        <Image source={photo}
                                            style={{ height: width / 4, width: width / 3, resizeMode: 'cover' }} />

                                        <TouchableOpacity activeOpacity={0.8} style={{ alignItems: 'center', justifyContent: 'center', height: 20, width: 20, borderRadius: 10, backgroundColor: 'yellow', position: 'absolute', top: 5, right: 5 }}>
                                            <Image source={cross} style={{ height: 16, width: 16, resizeMode: 'contain', tintColor: 'red' }} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            );
                        })}
                        <View>
                            <View style={[styles.photoShadowBox, { backgroundColor: '#dadada', height: width / 4, width: width / 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }]}>
                                <Image source={this.state.avatarSource}
                                    style={{ height: 40, width: 50, resizeMode: 'contain' }} />
                                <Text style={{ position: 'absolute', bottom: 5, fontWeight: 'bold', fontSize: 15, color: 'grey' }} onPress={this.selectPhotoTapped}>Add Photo</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={[styles.shadowBoxItemBtn, { width: width - 40, alignSelf: 'center', justifyContent: 'center' }]} onPress={() => { this.onadd() }} activeOpacity={0.8}>
                        <Text style={{
                            color: '#fff',
                            paddingLeft: 30,
                            textAlign: 'center',
                            paddingRight: 30,
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>{'ADD ACTIVITY'}</Text>
                    </TouchableOpacity>
                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content>
                <DateTimePicker
                    mode={this.state.selectDateTime}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </Container>
        );
    }
}

export default PlanAnActivity;
