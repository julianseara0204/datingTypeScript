import {StyleSheet} from "react-native";
import colors from "../../../Colors";
import { Dimensions } from "react-native";

var width = Dimensions.get('window').width; //full width

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 35,
        backgroundColor: '#ffffff'
    },
    topLogoContiner: {
        marginBottom: 10,
        fontSize: 25,
        fontWeight: 'bold',
        padding: 10
    },
    boottmView: {
        flex: 1,
        marginTop:10,
        width:width-30,
       // position: 'absolute',
        // bottom: 35,
    },
    phoneStyle: {
        color: '#1a1a1a',
        opacity: 0.44,
        padding:10
    },
    infoText: {
        color: '#1a1a1a',
        opacity: 0.44,
        textAlign: 'center'
    },
    facebookButton: {
        marginBottom: 25
    },
    logoImage: {
        width: 300,
        height: 200,
        resizeMode: 'contain',

    }, 
    facebookStyleButton: {
        width: '100%', resizeMode: 'contain'
    }, buttonText: {
        paddingTop: 8,
        paddingBottom: 25,
        fontWeight: 'bold',
        textAlign: 'center', color: '#fff'
    },
    layer9: {
        width: 62,
        height: 1.3,
        opacity: 0.5,
        backgroundColor: "#1a1a1a"
    },
    phoneContainer: {
        alignItems: 'center',
        flex: 1,
        marginBottom:15,
        marginTop:20
    },
    progressCustomStyles: {
        backgroundColor: colors.periwinkleBlue,
        borderRadius: 10,

    },
    label: {
        color: '#b0b0b0',
        fontWeight: 'bold',
        paddingLeft: 5
    },
    text: {
        color: '#000000',
        borderBottomColor: '#b0b0b0',
        borderTopColor: '#ffffff',
        borderLeftColor: '#ffffff',
        borderRightColor: '#ffffff',
        borderWidth: 2,
        marginBottom: 15,
        fontWeight: 'bold'

    }
})
;

export default styles;
