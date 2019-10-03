import React, { Component } from "react";
import { Text, View, TextInput, TouchableOpacity } from "react-native";
import styles from "./styles";

import axios from "axios";

import { data, datapost } from './../data'

type ComponentProps = {

}

type ComponentState = {
    index: number,
    institute: String,
    name: String,
    job: String,
}

class InformationScreen extends Component<ComponentProps, ComponentState> {
    constructor(props: any) {
        super(props);
        this.state = {
            index: 0,
            institute: "",
            name: "",
            job: "",
        };
        this.dataput();
    }


    dataput = () => {
        axios({
            method: 'GET',
            url: 'https://8eojn1fzhj.execute-api.us-east-1.amazonaws.com/beta-1/users/profile',
            // data: datapost,
            headers: {
                'Authorization': data.Token
            }
        })
            .then(async (response) => {


                response.data.profileEntries.forEach((arrss: any) => {
                    if (arrss.entryType === "NAME") {
                        this.setState({ name: arrss.value });
                        datapost.profile[7].value = arrss.value;
                    }
                    if (arrss.entryType === "JOB_TITLE") {
                        this.setState({ job: arrss.value });
                        datapost.profile[6].value = arrss.value;
                    }
                    if (arrss.entryType === "WORK") {
                        this.setState({ institute: arrss.value });
                        datapost.profile[5].value = arrss.value;
                    }
                });
                // const name =response.data.profileEntries.filter((book:arritem) => (book.entryType === "NAME"? book.value :""));

                console.log(response);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {
        let { institute, name, job } = this.state;
        return (
            <View style={styles.container}>
                <View style={styles.mapContainer}>
                    <Text style={styles.label}>{'NAME'}</Text>
                    <View style={styles.TextInputView}>
                        <TextInput underlineColorAndroid='transparent'
                            style={styles.TextInputStyle}
                            placeholderTextColor="#b2b2b2"
                            onChangeText={(text) => { datapost.profile[7].value = text }}
                            placeholder="Name"
                        >{this.state.name}</TextInput>
                    </View>
                    
                    <Text style={styles.label}>{'WORK'}</Text>
                    <View style={styles.TextInputView}>
                        <TextInput underlineColorAndroid='transparent'
                            style={styles.TextInputStyle}
                            placeholderTextColor="#b2b2b2"
                            onChangeText={(text) => { datapost.profile[5].value = text }}
                            placeholder="work"
                        >{this.state.job}</TextInput>
                    </View>
                    
                    <Text style={styles.label}>{'STUDY AT'}</Text>
                    <View style={styles.TextInputView}>
                        <TextInput underlineColorAndroid='transparent'
                            style={styles.TextInputStyle}
                            placeholderTextColor="#b2b2b2"
                            placeholder="study"
                            onChangeText={(text) => { datapost.profile[6].value = text }}
                        >{this.state.institute}</TextInput>

                    </View>
                </View>
            </View>
        );
    }
}

export default InformationScreen;
