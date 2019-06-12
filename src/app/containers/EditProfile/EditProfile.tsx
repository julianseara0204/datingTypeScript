import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, TextInput, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content, Input } from "native-base";
import { Category } from "../../models/models";
import styles from "./styles";
import _ from "lodash";

const { width } = Dimensions.get('window'); 

// Images
const cross = require('../../../assets/card_cross.png');
const bike_riding = require('../../../assets/bike_riding.png');
const trekking = require('../../../assets/trekking.png');
const party = require('../../../assets/party.png');
const addPhoto = require('../../../assets/AddPhoto.png');
const photo = require('../../../assets/photo.png');
const place = require('../../../assets/place.png');
const appointment = require('../../../assets/appointment.png');

type ComponentState = {
    categories: Category[]
    photoes: {img: any}[]
}

export class EditProfile extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            categories:[
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
            photoes:[
                {img: bike_riding},
                {img: trekking},
                {img: party}
            ]
        };
    }

    componentDidMount() {
        // Find way to get id
        // Need id for user images
        // Need term definition to search user category
        //fetchLink(CATEGORIES, "GET")
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
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>EDIT PROFILE</Text>
                    <TouchableOpacity activeOpacity={0.8}
                        onPress={() => { this.props.navigation.pop() }}>
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
                                style={styles.text} />
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
                        <View style={styles.itemContainer}>
                            <Input
                                placeholder={'ADD LOCATION'}
                                placeholderTextColor={'#000'}
                                style={styles.text} />
                            <Image source={appointment} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </View>
                        <Text style={styles.label}>{'PLAN END DATE & TIME OF ACTIVITY'}</Text>
                        <View style={styles.itemContainer}>
                            <Input
                                placeholder={'ADD LOCATION'}
                                placeholderTextColor={'#000'}
                                style={styles.text} />
                            <Image source={appointment} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                        </View>

                    </View>
                    <Text style={[styles.label, { marginLeft: 20 }]}>{'PLAN CATEGORY OF YOUR ACTIVITY'}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {_.map(this.state.categories, (item, index) => {
                            return (
                                <View key={item.id} >
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
                        {_.map(this.state.photoes, (item, index) => {
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

                                <Image source={addPhoto}
                                    style={{ height: 40, width: 50, resizeMode: 'contain' }} />
                                <Text style={{ position: 'absolute', bottom: 5, fontWeight: 'bold', fontSize: 15, color: 'grey' }}>Add Photo</Text>
                            </View>
                        </View>
                    </ScrollView>
                    <TouchableOpacity style={[styles.shadowBoxItemBtn, { width: width - 40, alignSelf: 'center', justifyContent: 'center' }]} activeOpacity={0.8}>
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
            </Container>
        );
    }
}

export default EditProfile;
