import React, { Component } from "react";
//import * as Orientation from "react-native-orientation";
import Navigator from "./src/app/navigation/Navigator";

export default class App extends Component {
    componentDidMount = () => {
      //  Orientation.lockToPortrait();
    };

    render() {
        return <Navigator/>;
    }
}
