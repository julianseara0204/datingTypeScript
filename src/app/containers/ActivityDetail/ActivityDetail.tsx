import React, { Component } from "react";
import { Dimensions, Image, Text, TouchableOpacity, View } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container, Content, Icon } from "native-base"
import styles from "./styles";
import _ from "lodash";
import Carousel, { Pagination } from 'react-native-snap-carousel';
import HomeFooter from './HomeFooter';
import { fetchLink, CATEGORIES_ID, CATEGORIES_ID_REPLACE } from '../../utils/endpoints';
import { format } from 'date-fns';
import { Route } from '../../models/models';
const { width } = Dimensions.get('window');

// Images
const clock = require('../../../assets/clock.png');
const arrow = require('../../../assets/arrow_back.png');
const fullSize = require('../../../assets/fullSize.png');
const place = require('../../../assets/place.png');
const appointment = require('../../../assets/appointment.png');
const photo = require('../../../assets/photo.png');
const like = require('../../../assets/like.png');
const send = require('../../../assets/send.png');

type ComponentState = {
    index: number,
    routes: Route[],
    popup: boolean,
    activityDescription: string,
    interested: number,
    invites: number,
    timeRange: string,
    dateDay: string,
    dateMonth: string,
    activityName: string,
    location: string
}

export class ActivityDetail extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    parameters = {
        eventID: "1"
    }

    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
            // List of images for carosel must see how to do get images from where
            routes: [
                
            ],
            popup: false,
            interested: 45,
            invites: 60,
            dateDay: "24",
            dateMonth: "April",
            location: "Maha Creek, Texas, USA",
            timeRange: "2:30 PM - 7:30 PM",
            activityName: "I want to go for hiking in the Rocky Mountain",
            activityDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        };
    }

    componentDidMount(){
        // TODO: Implement loading stage
        // Load event details
        let endpoint = CATEGORIES_ID;
        endpoint.replace(CATEGORIES_ID_REPLACE, this.parameters.eventID);
        fetchLink(endpoint, "GET", {})
            .then(response => response.json())
            .then(response => {
                let dateDay: string = format(response.eventStartTime, 'D');
                let dateMonth: string = format(response.eventStartTime, 'MMM');

                // TODO: Get the end date from backend
                let timeRange: string = `${format(response.eventStartTime,"H:mm A")} - 7:30 PM`;
                
                // TODO: Complete with the data need
                this.setState({
                    dateDay,
                    dateMonth,
                    activityName: response.eventName,
                    activityDescription: response.eventDescription,
                    timeRange,
                    // location: response.location
                    // interested: response.interested,
                    // invites: response.invites,
                });
            })
            // TODO: Treath all errors
            .catch(error=>{
                console.log(error)
            })
    }


    get pagination() {
        const { routes, index } = this.state;
        return (
            <Pagination
                dotsLength={routes.length}
                activeDotIndex={index}
                containerStyle={{ backgroundColor: 'rgba(0, 0, 0, 0)' }}
                dotStyle={styles.paginationDotStyle}
                inactiveDotStyle={{
                    // Define styles for inactive dots here
                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        );
    }

    // TODO: Find wat to render here
    renderItem({ item, index }: {item: Route, index: number}) {
        return (
            <View key={index} style={{ width: '100%', height: width / 361 * 297, backgroundColor: '#fff' }}>
                <View style={[styles.posImgContainer, { borderRadius: 1 }]}>
                    <Image style={{ height: '100%', width: '100%', resizeMode: 'cover' }} source={photo} />
                </View>
                <TouchableOpacity activeOpacity={0.8}
                    style={[styles.iconContainer, {
                        position: 'absolute', bottom: 10, right: 0, borderRadius: 2, width: 30,
                        height: 30,
                    }]}>
                    <Image source={fullSize} style={styles.iconImg} />
                </TouchableOpacity>
            </View>);
    }

    render() {
        return (
            <Container style={styles.container}>

                <Content>
                    <TouchableOpacity
                        onPress={() => { this.props.navigation.pop(); }}
                        activeOpacity={0.8}
                        style={{ position: 'absolute', top: 20, left: 20, zIndex: 10000 }}>
                        <Image source={arrow} style={{ tintColor: 'white', width: 30, height: 30, resizeMode: 'contain' }} />
                    </TouchableOpacity>
                    <View style={{ width: width }} >
                        <Carousel
                            data={this.state.routes}
                            renderItem={this.renderItem}
                            sliderWidth={width}
                            sliderHeight={width / 361 * 297}
                            itemWidth={width}
                            itemHeight={width / 361 * 297}
                            layout={'default'}
                        />
                        <View style={{ position: 'absolute', bottom: 0, width: width }}>
                            {this.pagination}
                        </View>
                    </View>


                    <View style={{ flexDirection: 'column', alignItems: 'center', width: width }}>
                        <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, padding: 10 }}>
                            <View style={{ flexDirection: 'column', width: (width - 20) / 4, alignItems: 'center', justifyContent: 'center' }}>
                                <Text style={{ fontSize: 20, fontWeight: 'bold', padding: 5, color: 'rgb(158, 149, 254)' }}>{this.state.dateDay}24</Text>
                                <Text style={{ fontSize: 15, fontWeight: 'bold', padding: 5, color: 'black' }}>{this.state.dateMonth}</Text>
                            </View>
                            <Text style={{ fontSize: 20, width: (width - 20) / 4 * 3, fontStyle: 'italic', color: 'grey' }}>{this.state.activityName}</Text>

                        </View>
                        <View style={[styles.descRow, { borderTopWidth: 1, borderTopColor: '#dadada' }]}>
                            <Image source={place} style={styles.smallIcon} />
                            <Text
                                style={styles.smallText}>{this.state.location}</Text>
                        </View>
                        <View style={styles.descRow}>
                            <Image source={appointment} style={styles.smallIcon} />
                            <Text
                                style={styles.smallText}>{this.state.dateMonth }. {this.state.dateDay}</Text>
                        </View>
                        <View style={[styles.descRow, { borderBottomWidth: 1, borderBottomColor: '#dadada' }]}>
                            <Image source={clock} style={styles.smallIcon} />
                            <Text
                                style={styles.smallText}>{this.state.timeRange}</Text>
                        </View>

                        <View style={{ alignItems: 'center', height: width / 4, width: width, alignContent: 'center', justifyContent: 'center' }}>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', position: 'absolute' }}>
                                <View style={[styles.photoContainer, {
                                    ...styles.photoContainerAditional,
                                    overflow: 'hidden'
                                }]}>
                                    <Image source={photo} style={[styles.photo, styles.photoContainerAditional]} />
                                    <View style={{ width: width / 5 * 0.6, height: width / 5 * 0.6, backgroundColor: '#888888aa', position: 'absolute', zIndex: 200000 }} />
                                </View>
                                <View style={[styles.photoContainer, styles.photoContainerAditional]}>
                                    <Image source={photo} style={[styles.photo,styles.photoContainerAditional]} />
                                </View>
                                <View style={[styles.photoContainer, styles.photoContainerAditional]}>
                                    <Image source={photo} style={[styles.photo, styles.photoContainerAditional]} />
                                </View>
                                <View style={[styles.photoContainer, styles.photoContainerAditional]}>
                                    <Image source={photo} style={[styles.photo, styles.photoContainerAditional]} />
                                    <View style={{ width: width / 5 * 0.6, height: width / 5 * 0.6, backgroundColor: '#888888aa', position: 'absolute', zIndex: 200000 }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', position: 'absolute' }}>
                                <View style={[styles.photoContainer, {
                                    width: width / 5 * 0.7,
                                    height: width / 5 * 0.7,
                                    borderRadius: width / 10 * 0.7,
                                    overflow: 'hidden'
                                }]}>
                                    <Image source={photo} style={[styles.photo, {
                                        width: width / 5 * 0.7,
                                        height: width / 5 * 0.7,
                                        borderRadius: width / 10 * 0.7,
                                    }]} />
                                    <View style={{ width: width / 5 * 0.7, height: width / 5 * 0.7, backgroundColor: '#aaaaaa88', position: 'absolute', zIndex: 200000 }} />
                                </View>
                                <View style={[styles.photoContainer, {
                                    width: width / 5 * 0.7,
                                    height: width / 5 * 0.7,
                                    borderRadius: width / 10 * 0.7,
                                }]}>
                                    <Image source={photo} style={[styles.photo, {
                                        width: width / 5 * 0.7,
                                        height: width / 5 * 0.7,
                                        borderRadius: width / 10 * 0.7,
                                    }]} />
                                </View>
                                <View style={[styles.photoContainer, {
                                    width: width / 5 * 0.7,
                                    height: width / 5 * 0.7,
                                    borderRadius: width / 10 * 0.7,
                                    overflow: 'hidden'
                                }]}>
                                    <Image source={photo} style={[styles.photo, {
                                        width: width / 5 * 0.7,
                                        height: width / 5 * 0.7,
                                        borderRadius: width / 10 * 0.7,
                                    }]} />
                                    <View style={{ width: width / 5 * 0.7, height: width / 5 * 0.7, backgroundColor: '#aaaaaa88', position: 'absolute', zIndex: 200000 }} />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', alignSelf: 'center', alignItems: 'center', position: 'absolute' }}>
                                <View style={[styles.photoContainer, {
                                    width: width / 5 * 0.8,
                                    height: width / 5 * 0.8,
                                    borderRadius: width / 10 * 0.8,
                                    overflow: 'hidden'
                                }]}>
                                    <Image source={photo} style={[styles.photo, {
                                        width: width / 5 * 0.8,
                                        height: width / 5 * 0.8,
                                        borderRadius: width / 10 * 0.8,
                                    }]} />
                                    <View style={{ width: width / 5 * 0.8, height: width / 5 * 0.8, backgroundColor: '#cccccc44', position: 'absolute', zIndex: 200000 }} />
                                </View>
                                <View style={[styles.photoContainer, {
                                    width: width / 5 * 0.8,
                                    height: width / 5 * 0.8,
                                    borderRadius: width / 10 * 0.8,
                                    overflow: 'hidden'
                                }]}>
                                    <Image source={photo} style={[styles.photo, {
                                        width: width / 5 * 0.8,
                                        height: width / 5 * 0.8,
                                        borderRadius: width / 10 * 0.8,
                                    }]} />
                                    <View style={{ width: width / 5 * 0.8, height: width / 5 * 0.8, backgroundColor: '#cccccc44', position: 'absolute', zIndex: 200000 }} />
                                </View>
                            </View>
                            <View style={[styles.photoContainer, { position: 'absolute' }]}>
                                <Image source={photo} style={styles.photo} />
                            </View>
                        </View>


                        <Text style={[styles.desc, { width: width - 40, textAlign: 'center' }]}>Members are showing interest in your activity</Text>
                        <Text style={[styles.desc, { width: width - 40, textAlign: 'center', marginTop: 10 }]}>share more for more interest</Text>

                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', backgroundColor: '#fff', padding: 10, paddingBottom: 50 }}>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity activeOpacity={0.8}
                                    style={[styles.iconContainer]}
                                    onPress={() => {
                                        this.setState({ popup: true });
                                    }}>
                                    <Image source={like} style={styles.iconImg} />
                                </TouchableOpacity>
                                <Text style={[styles.desc, { color: 'rgb(158, 149, 254)' }]}>{this.state.interested} Interested</Text>
                            </View>
                            <View style={{ alignItems: 'center' }}>
                                <TouchableOpacity activeOpacity={0.8}
                                    style={[styles.iconContainer]}>
                                    <Image source={send} style={styles.iconImg} />
                                </TouchableOpacity>
                                <Text style={[styles.desc, { color: 'rgb(158, 149, 254)' }]}>{this.state.invites} Invites</Text>
                            </View>
                        </View>

                    </View>


                    <Text style={{
                        marginTop: 10, marginLeft: 10, color: 'black',
                        fontWeight: 'bold',
                        fontSize: 15
                    }}>{'ACTIVITY activityName'}</Text>

                    <Text style={{
                        width: width,
                        padding: 10,
                        color: 'grey',
                        fontStyle: 'italic',
                        fontSize: 15
                    }}>{this.state.activityDescription}</Text>

                    <View style={{ height: 60, backgroundColor: 'white' }} />
                </Content>
                <HomeFooter navigation={this.props.navigation} />
            </Container >
        );
    }
}

export default ActivityDetail;
