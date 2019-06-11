import React, { Component } from "react";
import { Alert, Dimensions, Image, ImageBackground, Text, TouchableOpacity, View, StatusBar, ScrollView, CheckBox, TextInput, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content, Input } from "native-base"
import DateTimePicker from 'react-native-modal-datetime-picker';
import styles from "./styles";
import _ from "lodash";
import { format } from 'date-fns';
import { Category } from '../../models/models';
const Slider = require("react-native-slider");
const { width } = Dimensions.get('window');

// Images
const cross = require('../../../assets/card_cross.png');
const bike_riding = require('../../../assets/bike_riding.png');
const trekking = require('../../../assets/trekking.png');
const party = require('../../../assets/party.png');
const appointment = require('../../../assets/appointment.png');

type ComponentState = {
    value: number,
    startDate: string,
    endDate: string,
    isDateTimePickerVisible: boolean,
    selectedInput: string,
    selectDateTime: string,
    categories: Category[],
    distance: string
}

export class Filter extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            value: 0.2,
            startDate: format(new Date(), 'MM/DD/YYYY'),
            endDate: format(new Date(), 'MM/DD/YYYY'),
            isDateTimePickerVisible: false,
            selectedInput: 'startDate',
            selectDateTime: 'date',
            categories:  [
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
            distance: "45-60"
        };
    }
    showDateTimePicker = (value: string, selectedInput: string) => {
        this.setState({ isDateTimePickerVisible: true, selectDateTime: value, selectedInput });
    }

    hideDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: false },  this.forceUpdate);
    }

    handleDatePicked = (date: Date) => {

        if (this.state.selectedInput == "startDate") {
           
                let startDate: any = new Date(date);
                let endDate: any = new Date(this.state.endDate);
                if (endDate - startDate < 0) {
                    Alert.alert('Error', 'Wrong Start Date!');
                }
                else {
                    this.setState({ startDate: format(date, 'MM/DD/YYYY') });
                }
        

            this.hideDateTimePicker();
        }
        if (this.state.selectedInput == "endDate") {

            if (this.state.startDate == "START DATE") {
                this.setState({ endDate: format(date, 'MM/DD/YYYY') });
            }
            else {
                let startDate: any = new Date(this.state.startDate);
                let endDate: any = new Date(date);
                if (endDate - startDate < 0) {
                    Alert.alert('Error', 'Wrong End Date!');
                }
                else {
                    this.setState({ endDate: format(date, 'MM/DD/YYYY') });
                }
            }
            this.hideDateTimePicker();
        }
    };
    render() {
        const barWidth = Dimensions.get('screen').width - 150;
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
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>Filter</Text>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.pop() }}
                        activeOpacity={0.8}>
                        <Image source={cross} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                </View>
                <Content>
                    <Text style={styles.label}>{'SEARCH BY DISTANCE'}</Text>
                    <View style={[styles.shadowBox, { width: width - 40, alignSelf: 'center' }]}>
                        <Text style={{ textAlign: 'center', width: '100%', fontSize: 15, color: 'black', fontWeight: 'bold' }}>71 mile</Text>
                        <Slider
                            minimumTrackTintColor='rgb(158, 149, 254)'
                            thumbTintColor='rgb(158, 149, 254)'
                            value={this.state.distance}
                            onValueChange={(value: string) => this.setState({distance: value })}
                        />
                    </View>
                    <Text style={styles.label}>{'SEARCH BY DATE'}</Text>
                    <View style={[styles.shadowBox, { width: width - 40, alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-between' }]}>
                        <View style={{ width: width / 2 - 40 }}>
                            <Text style={styles.label}>{'FROM'}</Text>
                            <View style={styles.itemContainer}>
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => { this.showDateTimePicker("date", "startDate"); }}>
                                    <Text style={styles.text}>{this.state.startDate}</Text>
                                </TouchableOpacity>
                                <Image source={appointment} style={{ width: 20, height: 20, resizeMode: 'contain' }} />
                            </View>
                        </View>
                        <View style={{ width: width / 2 - 40 }}>
                            <Text style={styles.label}>{'TO'}</Text>
                            <View style={styles.itemContainer}>
                                <TouchableOpacity activeOpacity={0.8}
                                    onPress={() => { this.showDateTimePicker("date", "endDate"); }}>
                                    <Text style={styles.text}>{this.state.endDate}</Text>
                                </TouchableOpacity>
                                <Image source={appointment} style={{ width: 20, height: 20, resizeMode: 'contain' }} />

                            </View>
                        </View>
                    </View>
                    <Text style={[styles.label]}>{'PLAN CATEGORY OF YOUR ACTIVITY'}</Text>
                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        {_.map(this.state.categories, (item, index) => {
                            return (
                                <View key={index} >
                                    <TouchableOpacity activeOpacity={0.8} style={[styles.shadowBox, { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }]}>
                                        <Text style={{
                                            color: 'black',
                                            paddingLeft: 25,
                                            paddingRight: 25,
                                            fontWeight: 'bold',
                                            fontSize: 18
                                        }}>{item.label}</Text>
                                    </TouchableOpacity>

                                </View>

                            );
                        })}
                    </ScrollView>

                    <TouchableOpacity
                        onPress={() => { this.props.navigation.pop(); }}
                        style={[styles.shadowBoxItemBtn, { width: width - 40, alignSelf: 'center', justifyContent: 'center', marginTop: 40 }]} activeOpacity={0.8}>
                        <Text style={{
                            color: '#fff',
                            paddingLeft: 30,
                            textAlign: 'center',
                            paddingRight: 30,
                            fontWeight: 'bold',
                            fontSize: 20
                        }}>{'SEE RESULT'}</Text>
                    </TouchableOpacity>
                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content>
                <DateTimePicker
                    mode={
                        // fix problem when is need
                        // this.state.selectDateTime || 
                        "date"}
                    isVisible={this.state.isDateTimePickerVisible}
                    onConfirm={this.handleDatePicked}
                    onCancel={this.hideDateTimePicker}
                />
            </Container>
        );
    }
}

export default Filter;
