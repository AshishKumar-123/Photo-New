import { View, Text, Image, FlatList, ScrollView } from 'react-native'
import React, {useState, useLayoutEffect} from 'react'
import styles from './styles'
import ToggleSwitch from 'toggle-switch-react-native'
import * as permissions from 'react-native-permissions'

// Icons --> 
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'

const Profile = () => {
  // Permissions
  const [camera, setCamera] =useState(false)
  const [mic, setMic] = useState(false)
  const [storage, setStorage] = useState(false)

  useLayoutEffect(() => {
    permissions.checkMultiple([permissions.PERMISSIONS.ANDROID.CAMERA,permissions.PERMISSIONS.ANDROID.RECORD_AUDIO,permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then((resluts) => {
      // Camera
      if (resluts[permissions.PERMISSIONS.ANDROID.CAMERA] == 'granted') {
        setCamera(true)
      }

      // Storage --> includes read and write of external storage (**both required)
      if (resluts[permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == 'granted' && resluts[permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == 'granted') {
        setStorage(true)
      }

      if (resluts[permissions.PERMISSIONS.ANDROID.RECORD_AUDIO] == 'granted') {
        setMic(true)
      }

    })
  },[camera, mic, storage ])

  const requestPermissions = (name) => {
    if (name == 'camera') {
      permissions.request(permissions.PERMISSIONS.ANDROID.CAMERA).then((e) => {
        if (e == 'granted' || e == 'limited') {setCamera(true)} else {setCamera(false)}
      })
    }
    else if (name == 'mic') {
      permissions.request(permissions.PERMISSIONS.ANDROID.RECORD_AUDIO).then((e) => {
        if (e == 'granted' || e == 'limited') {setMic(true)} else {setMic(false)}
      })
    }
    else if (name == 'storage') {
      permissions.requestMultiple([permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then((e) => {
        if (e[permissions.PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] == 'granted' && e[permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == 'granted' || 
        
        e[permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] && e[permissions.PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] == 'limited') {
          setStorage(true)
        } else {
          setStorage(false)
        }
      })
    }
  }

  const toggle_switch = (porps) => {
     if (porps == 'camera') {
       if (camera) {permissions.openSettings()} else {requestPermissions('camera')}
     }
     else if (porps == 'mic') {
       if (mic) {permissions.openSettings().then((e) => console.log(e))} else {requestPermissions('mic')}
     }
     else if (porps == 'storage') {
       if (storage) {permissions.openSettings()} else {requestPermissions('storage')}
     }
     else {permissions.openSettings()}
  }

  return (
    <View style={styles.main}>
      <View style={styles.header}>
        <Text style={styles.heading}>Profile</Text>
      </View>

      {/* Profile Image */}
      <View style={styles.profile}>
        <Image
          source={{uri:'https://media.wired.com/photos/6019cab23453f789506008d0/1:1/w_1600,h_1600,c_limit/Sec_Bezos_1036084400.jpg'}}
          style={styles.porfileImage}
        />
        <View style={styles.info}>
          <Text style={styles.name}>Ashish Kumar</Text>
          <Text style={styles.email}>ak9122512@gmail.com</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollList}>

      {/* Badges */}
        <View style={styles.myTags}>
          <Text style={styles.myTagsTitle}>
            <Text>Badges  </Text>
            <SimpleLineIcons name='badge' size={20}/>
          </Text>
          <View style={{marginVertical:10,alignItems:'center',justifyContent:'center',}}>
            <Text>No Badges</Text>
          </View>
        </View>
        
      {/* Social */}
        <View style={styles.myTags}>
          <Text style={styles.myTagsTitle}>
            <Text>Social  </Text>
            <Ionicons name='ios-share-social' size={21}/>
          </Text>
          <View style={styles.socialIcons}>
            <SimpleLineIcons name='social-twitter'  size={28}/>
            <SimpleLineIcons name='social-facebook'  size={28}/>
            <SimpleLineIcons name='social-instagram'  size={28}/>
            <SimpleLineIcons name='social-youtube' size={28}/>
          </View>
        </View>

      {/* Permissions */}
        <View style={styles.myTags}>
          <Text style={styles.myTagsTitle}>
            <Text>Permissions  </Text>
            <Ionicons name='ios-settings-outline' size={21}/>
          </Text>

          <View>
            <View style={styles.permissions}>
              <Text style={{fontWeight:'800',fontSize:16}}>Camera</Text>
              <ToggleSwitch
                isOn={camera}
                onColor='#4cd137'
                offColor='#ecf0f1'
                size='small'
                onToggle={() => toggle_switch('camera')}
              />
            </View>
            <View style={styles.permissions}>
              <Text style={{fontWeight:'800',fontSize:16}}>Mic</Text>
              <ToggleSwitch
                isOn={mic}
                onColor='#4cd137'
                offColor='#ecf0f1'
                size='small'
                onToggle={() => toggle_switch('mic')}
              />
            </View>
            <View style={styles.permissions}>
              <Text style={{fontWeight:'800',fontSize:16}}>Storage</Text>
              <ToggleSwitch
                isOn={storage}
                onColor='#4cd137'
                offColor='#ecf0f1'
                size='small'
                onToggle={() => toggle_switch('storage')}
              />
            </View>
          </View>
        </View>

        {/* Others section --> include privacy policy | feedback | terms & condition */}
        <View style={styles.myTags}>
          <Text style={styles.myTagsTitle}>
            <Text>Others  </Text>
            <MaterialIcons name='policy' size={20}/>
          </Text>
          <View style={styles.permissions}>
              <Text style={styles.others}>Privacy policy</Text>
              <Text style={styles.others}>Feedback</Text>
              <Text style={styles.others}>Terms & Conditions</Text>
          </View>
        </View>

      </ScrollView>


    </View>
  )
}

export default Profile