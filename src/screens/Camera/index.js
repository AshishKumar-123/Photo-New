import { View, Text, Modal, Image,Dimensions, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useLayoutEffect, useState, useRef} from 'react'
import * as permissions from 'react-native-permissions'
import styles from './styles'


// Camera 
import { RNCamera } from 'react-native-camera'
import CameraRoll from '@react-native-community/cameraroll'
import { useNavigation } from '@react-navigation/native'

// Icons --> Camera screen
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import AntDesing  from 'react-native-vector-icons/AntDesign'

const DEVICE_WDITH = Dimensions.get('window').width
const DEVICE_HEIGHT = Dimensions.get('window').height

const Camera = () => {
  const navigation = useNavigation()
  let cameraRef = useRef(null)
  const [permission, setPermission] = useState(null)
  const [flash,setFlash] = useState(RNCamera.Constants.FlashMode.off)
  const [camType,setCamType] = useState(RNCamera.Constants.Type.back)

  // Image --> after clicking the image
  const [modal,setModal] = useState(false)
  const [image,setImage] = useState(null)

  useLayoutEffect(()=>{
    getPermission()
  },[])

  const getPermission = () => {
    permissions.request(permissions.PERMISSIONS.ANDROID.CAMERA).then((reslut) => {
      if (reslut == 'granted') {
        setPermission(true)
      }
      else {
        setPermission(false)
      }
    })
  }

  const flipCamera = () => {
    if (camType == RNCamera.Constants.Type.back) {
      setCamType(RNCamera.Constants.Type.front)
    }
    else {
      setCamType(RNCamera.Constants.Type.back)
    }
  }

  const toggleFlash = () => {
    if (flash == RNCamera.Constants.FlashMode.off) {
      setFlash(RNCamera.Constants.FlashMode.on)
    }
    else {
      setFlash(RNCamera.Constants.FlashMode.off)
    }
  }

  const takePicture = async(camera) => {
    const options = {quality:0.5, base64:true}
    const data = await camera.takePictureAsync(options)
    setImage(data.uri)
    setModal(true)
  }

  const savePicture = (image) => {
    CameraRoll.save(image).then(() => {
      showToast({message:'Saved'});
      setModal(false)
    })
  }

  const showToast = ({message}) => {
    ToastAndroid.showWithGravity(
      message,
      ToastAndroid.LONG,
      ToastAndroid.BOTTOM,
    )
  }

  return (
    <View style={{height:'100%', width:'100%'}}>
      {permission?<RNCamera
        ref={cameraRef}
        style={styles.preview}
        type={camType}
        flashMode={flash}
        playSoundOnCapture={true}
        useNativeZoom={true}
      >
  
        {({camera}) => {
          return (
            <>
                <View style={styles.cameraLowerMenue}>
                  <Ionicons onPress={() => toggleFlash()} name={flash?'ios-flash-outline':'ios-flash-off-outline'} size={40}/>
                  <Entypo onLongPress={() => {console.log('video')}} onPress={() => takePicture(camera)} name='circle' size={63}/>
                  <Ionicons onPress={() => flipCamera()} name='ios-camera-reverse-outline' size={40}/>
                </View>
                <View style={styles.cameraUpperMenue}>
                  <Ionicons name='ios-chevron-back' size={30} onPress={() => {navigation.navigate('Discover')}}/>
                  <Ionicons name='ios-grid-outline' size={30} onPress={() => {navigation.navigate('Gallery')}}/>
                </View>
            </>
          )
        }}
          
        

      </RNCamera>:
      <View style={styles.permissionDenied}>
        <Text>Camera permission denied</Text>
        <Text style={{color:'blue'}} onPress={() => permissions.openSettings()}>Go to settings</Text>
      </View>
      }
      <Modal onRequestClose={() => setModal(false)} transparent={true} animationType='fade' visible={modal}>
        <TouchableOpacity activeOpacity={1} onPress={()=>{setModal(false)}} style={styles.modalView}>
          <View style={{width:DEVICE_WDITH-30,height:DEVICE_HEIGHT-400}}>
            <Image
              source={{uri:image}}
              style={{aspectRatio:1,resizeMode:'cover',borderRadius:20}}
            />
            <TouchableOpacity style={styles.options}>
              <Ionicons name='ios-grid-outline' size={23}/>
              <Feather name='edit' size={23}/>
              <Feather onPress={() => savePicture(image)} name='upload' size={23}/>
              <Ionicons name='share-social-outline' size={23}/>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default Camera