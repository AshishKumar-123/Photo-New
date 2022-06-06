import {StyleSheet} from 'react-native'

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection:'column',
        backgroundColor:'black'
    },
    preview:{
        flex:1,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    permissionDenied:{
        backgroundColor:'#161718',
        height:'100%',
        justifyContent:'center',
        alignItems:'center'
    },
    cameraLowerMenue:{
        flex:0,
        flexDirection:'row',
        justifyContent:'space-between',
        alignContent:'space-between',
        width:'100%',
        marginBottom:20,
        paddingHorizontal:23,
        alignItems:'center'
    },
    cameraUpperMenue:{
        width:'100%',
        position:'absolute',
        flex:1,
        justifyContent:'space-between',
        flexDirection:'row',
        marginTop:20,
        top:0,
        paddingHorizontal:23
    },
    modalView:{
        backgroundColor:'rgba(0,0,0,0.7)',
        height:'100%',
        width:'100%',
        justifyContent:'center',
        alignItems:'center',
    },
    options:{
        flexDirection:'row',
        justifyContent:'space-between',
        marginTop:21
    }

});

export default styles;