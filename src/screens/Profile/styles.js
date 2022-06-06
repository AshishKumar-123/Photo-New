import {StyleSheet, Dimensions} from 'react-native'

const DEVICE_WIDTH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const styles = StyleSheet.create({
    main:{
        backgroundColor:'#161718',
        height:'100%',
        flexGrow:1
    },
    header:{
        padding:21
    },
    heading:{
        color:'#4cd137',
        fontSize:32,
        fontWeight:'bold',
    },
    profile:{
        justifyContent:'center',
        alignItems:'center',
    },
    porfileImage:{
        height:200,
        width:200,
        borderRadius:95
    },
    info:{
        marginTop:12,
        alignItems:'center',
    },
    name:{
        fontWeight:'bold',
        fontSize:23,
        paddingHorizontal:12
    },
    email:{
        fontWeight:'bold',
        color:'#4cd137'
    },
    scrollList:{
        flexGrow:1,
        paddingBottom:54
    },
    myTags:{
        backgroundColor:'rgba(0,0,0,0.3)',
        width:'94%',
        borderRadius:12,
        alignSelf:'center',
        marginVertical:12
    },
    myTagsTitle:{
        color:'white', 
        fontWeight:'bold', 
        fontSize:18,
        paddingHorizontal:10,
        paddingTop:10,
        flexDirection:'row',
        alignItems:'center'
    },
    socialIcons:{
        justifyContent:'space-evenly',
        alignItems:'center',
        flexDirection:'row',
        marginVertical:18
    },
    permissions:{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        paddingHorizontal:16,
        paddingVertical:12
    },
    others:{
        fontWeight:'bold',
        color:'#4cd137'
    }
});

export default styles
