import { StyleSheet, Dimensions, StatusBar, Platform } from "react-native";
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: 'flex-start',
        width: width,
        ...Platform.select({
            ios: {
                height: height - 170 - 20,
            },
            android: {
                height: height - 170 -  ( StatusBar.currentHeight ? StatusBar.currentHeight : 0 ),
            },
        }),
        backgroundColor: '#fff'
    },
    slideitem: {
        width: width - 60,
        height: (width - 40) / 290 * 317,
        alignSelf: 'center',
        padding: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#aaa'
      
    },

    InputView: {
        // marginTop:10,
        // flexDirection: 'row',
        borderColor: 'gray',
        borderWidth: 1,
        backgroundColor: 'white',
        // width: '90%',
        flex:1,
        borderRadius:5,
        paddingHorizontal:5,
        paddingVertical:5,
        alignItems:'center',
        
        
    },
    TextInputView: {
        // position: 'absolute',
        marginTop:5,
        flexDirection: 'row',
        borderColor: '#B0B0B0',
        borderWidth: 1,
        backgroundColor: 'white',
        width: '90%',
        borderRadius:5,
        paddingHorizontal:10,
        alignItems:'center',
        shadowRadius: 5,
        shadowOpacity: 0.8
        
        
    },
    
    label: {
        color: '#b0b0b0',
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingBottom: 0,
        paddingTop: 0,
        marginTop:5,
    },
    TextInputStyle: {
       flex:1,       
       color:'grey',
       marginRight:10
       
      
    },
    mapContainer: {
        position: 'absolute',
        alignItems: "center",
        top: 20,
        width: width - 40,
        height: width - 40,
        borderRadius: 5,
        // overflow: false,
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(61,39,255,0.2)',
                shadowOffset: {
                    width: 5,
                    height: 5
                },
                shadowRadius: 5,
                shadowOpacity: 0.8
            },
            android: {
                elevation: 8,
            },
        }),
    },
    map: {
        width: width - 40,
        height: width - 40,
        resizeMode: 'cover',
        borderRadius: 5
    },
    headerTitile: {
        fontWeight: 'bold',
        fontSize: 20,
        padding: 5,
        color: '#000000'
    },
    shadowBoxBtn: {
        position: 'absolute',
        top: width - 40 - 100,
        width: width - 100,
        marginHorizontal: 10,
        marginVertical: 5,
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 2,
        borderRadius: 15,
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(61,39,255,0.2)',
                shadowOffset: {
                    width: 5,
                    height: 5
                },
                shadowRadius: 5,
                shadowOpacity: 0.8
            },
            android: {
                elevation: 8,
            },
        }),
    },
    shadowBoxNextBtn: {
        width: width - 40,
        marginHorizontal: 10,
        marginVertical: 5,
        marginBottom: 20,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(61,39,255,0.2)',
                shadowOffset: {
                    width: 5,
                    height: 5
                },
                shadowRadius: 5,
                shadowOpacity: 0.8
            },
            android: {
                elevation: 8,
            },
        }),
    },
    shadowBoxItemBtn: {
        width: width - 80,
        marginHorizontal: 10,
        marginVertical: 5,
        marginBottom: 10,
        marginTop: 10,
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 5,
        backgroundColor: '#fff',
        ...Platform.select({
            ios: {
                shadowColor: 'rgba(61,39,255,0.2)',
                shadowOffset: {
                    width: 5,
                    height: 5
                },
                shadowRadius: 5,
                shadowOpacity: 0.8
            },
            android: {
                elevation: 8,
            },
        }),
    }
});

export default styles;
