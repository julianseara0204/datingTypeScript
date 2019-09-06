import React, { Component } from "react";
import { Dimensions, View, StatusBar, Platform } from "react-native";
import { NavigationScreenProps } from "react-navigation";
import { Container } from "native-base"
import styles from "./styles";
import _ from "lodash";
import HomeFooter from './HomeFooter';
import PopupSendLike from './PopupSendLike';
import Dashboard from './Dashboard';
import Notification from './Notification';
import DashboardMessage from './DashboardMessage';
import MyProfile from './MyProfile';
const { width } = Dimensions.get('window');

type ComponentState = {
    index: number,
    popup: boolean
}

export class Home extends Component<NavigationScreenProps, ComponentState> {
    static navigationOptions = {
        header: null
    };

    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
            popup: false,

        };
    }
    setPage = (index: number) => {
        this.setState({ index });
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
                {this.state.index == 0 ?
                    <Dashboard navigation={this.props.navigation} /> :
                    this.state.index == 1 ? <DashboardMessage navigation={this.props.navigation} /> :
                    this.state.index == 2 ? <Notification navigation={this.props.navigation} /> :
                        <MyProfile navigation={this.props.navigation} />}

                <HomeFooter setPage={this.setPage} {...this.props} />
                {this.state.popup &&
                    <PopupSendLike navigation={this.props.navigation} />}
            </Container>
        );
    }
}

export default Home;
