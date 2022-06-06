import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

// Screens or Stacks
import Welcome from '../screens/Welcome'
import TabStackNavigator from './TabStackNavigator'
import Editor from '../screens/Editor'
import Discover from '../screens/Discover'
import Images from '../screens/Image'
import Gallery from '../screens/Gallery'


const Stack = createNativeStackNavigator();

const Router = () => {
  return (
      <NavigationContainer>
          <Stack.Navigator>
              <Stack.Screen name='Welcome' component={Welcome} options={{headerShown:false}}/>
              <Stack.Screen name='Tab' component={TabStackNavigator} options={{headerShown:false}}/>
              <Stack.Screen name='Editor' component={Editor} options={{headerShown:false}}/>
              <Stack.Screen name='Discover' component={Discover} options={{headerShown:false}}/>
              <Stack.Screen name='Image' component={Images} options={{headerShown:false}}/>
              <Stack.Screen name='Gallery' component={Gallery} options={{headerShown:false}}/>
          </Stack.Navigator>
      </NavigationContainer>
  )
};

export default Router