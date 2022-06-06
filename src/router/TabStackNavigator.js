import { View, Text ,Dimensions} from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'

// Screens --> for tab bar
import Profile from '../screens/Profile'
import Discover from '../screens/Discover'
import Camera from '../screens/Camera'

// Icons --> for tab bar
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import AntDesign from 'react-native-vector-icons/AntDesign'

const Tab = createBottomTabNavigator()
const DEVICE_WIDHT = Dimensions.get('window').width

const TabStackNavigator = () => {
  return (
    <Tab.Navigator screenOptions={{
        headerShown:false,
        tabBarActiveTintColor:'#4cd137',
        tabBarInactiveTintColor:'#6E6F71',
        tabBarStyle:{
          backgroundColor:'#2C2C2E',
          position:'absolute',
          borderRadius:20,
          borderTopColor:'#2C2C2E',
          width:DEVICE_WIDHT - 45,
          height:54,
          bottom:4.5,
          left:23
        },
        tabBarShowLabel:false,
      }}>
      <Tab.Screen 
        name='Discover' 
        component={Discover} 
        options={{
          tabBarIcon:({color}) => (
            <Ionicons name='ios-grid-outline' size={23} color={color}/>
          )
        }}/>
        <Tab.Screen
          name='Camera'
          component={Camera}
          options={{
            tabBarIcon:({color}) => (
              <AntDesign name='pluscircleo' size={49} color={color}/>
            ),
            tabBarStyle:{display:'none'}
          }}
        />
      <Tab.Screen 
        name='Profile' 
        component={Profile}
        options={{
          tabBarIcon:({color}) => (
            <FontAwesome5 name='user' size={22} color={color}/>
          )
        }}
        />
    </Tab.Navigator>
  )
}

export default TabStackNavigator