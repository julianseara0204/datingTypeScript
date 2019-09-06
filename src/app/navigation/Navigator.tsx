import React from "react";

import { createStackNavigator, createSwitchNavigator } from "react-navigation";
import OtpScreen from "../containers/OtpScreen";
import LoginScreen from "../containers/login";
import RegisterScreen from "../containers/Register";
import LoadingScreen from "../containers/Loading";
import Landing from "../containers/landing";
import Home from "../containers/Home";
import InviteToActivity from "../containers/InviteToActivity";
import Activity from "../containers/Activity";
import PlanAnActivity from "../containers/PlanAnActivity";
import Filter from "../containers/Filter";
import MyPreferences from "../containers/MyPreferences";
import EditProfile from "../containers/EditProfile";
import AccountSetting from "../containers/AccountSetting";
import ChatBox from "../containers/ChatBox";
import InvitedProfile from "../containers/InvitedProfile";
import InvitedEvent from "../containers/InvitedEvent";
import Match from "../containers/Match";
import ActivityDetail from "../containers/ActivityDetail";
import InvitedEventDetail from "../containers/InvitedEventDetail";
import OBTabScreen from "../containers/onboarding/OBTabScreen";
import { string } from "prop-types";
import msg from "../containers/Home/DashboardMessage/DashboardMessage";
import Notification from "../containers/Home/Notification/Notification";
import Dashboard from "../containers/Home/Dashboard/Dashboard";

    

// const LoginStack = createStackNavigator({ LoginScreen, OtpScreen });
const LoginStack = createStackNavigator({ LoginScreen, OtpScreen });


//const AuthTabs = createBottomTabNavigator({LoginStack, RegisterScreen});

const RootSwitch = createStackNavigator(
    {
        LoginStack,
        LoadingScreen,
        Landing,
        LoginScreen,
        RegisterScreen,
        OtpScreen,
        InviteToActivity,
        Activity,
	    PlanAnActivity,
        AccountSetting,
        Home,
        EditProfile,
        MyPreferences,
        OBTabScreen,
        Filter,
        ChatBox,
        InvitedProfile,
        InvitedEvent,
        Match,
        ActivityDetail,
        InvitedEventDetail,
        msg,
        Dashboard,
        Notification
    },
    { headerMode: 'none' });

export default RootSwitch;
