import { View, Text, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import React, {useState} from 'react'
import styles from './styles'

// Firebase
import {auth} from '../../firebase/Firebase'

// Icons
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5'
import Ionicons from 'react-native-vector-icons/Ionicons'


const Welcome = () => {
  // true --> login && false --> sign up
  const [option, selectOption] = useState(true)

  // passwords and email-id
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [name, setName] = useState(null)

  const changeOption = (option) => {
    selectOption(option)
  }

  const signup = async({email,password}) => {
    await auth().createUserWithEmailAndPassword(email,password).then((auth) => {
      if (auth) {
        console.log('User Logged in !')
      }
    })
    await auth().currentUser.sendEmailVerification({
      handleCodeInApp:true,
    })
  }

  return (
    <View style={styles.main}>
      
      {/* Main Heading --> Welcome to  */}
      <View style={styles.heading}>
        
          <Text style={{color:'white',...styles.headingTitle}}>Welcome To,</Text>
          <Text style={{color:'#4cd137',...styles.headingTitle}}>Phobo</Text>
          

          {/* Options view --> Login && Sign up */}
          <View style={styles.options}>

            <TouchableOpacity onPress={() => changeOption(true)} style={styles.optionsView}>
              <Text style={{...styles.optionsText,color:option?'#4cd137':'white'}}>Sign in</Text>
            {option?<View style={styles.smallEllipes}></View>:<View style={styles.vacantEllipes}></View>}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => changeOption(false)} style={styles.optionsView}>
              <Text style={{...styles.optionsText,color:option?'white':'#4cd137'}}>Sign up</Text>
              {!option?<View style={styles.smallEllipes}></View>:<View style={styles.vacantEllipes}></View>}
            </TouchableOpacity>
          </View>
      </View>


      {/* Ellipes View */}
      <View style={styles.ellipesView}>
        <View style={styles.ellipes} >

          {/* Login Inputs */}
          {option?<View style={styles.details}>

            <View style={{flexDirection:'row'}}>
              <Text style={{...styles.subHeading, backgroundColor:'#4cd137',borderRadius:20,paddingLeft:8}}>Lo</Text>
              <Text style={styles.subHeading}>gin</Text>
            </View>

            <View style={styles.inputView}>
              <TextInput style={styles.input} placeholder='Email-id' placeholderTextColor={'grey'}/>
              <FontAwesome5 name='user' size={22} color='grey'/>
            </View>

            <View style={styles.inputView}>
              <TextInput secureTextEntry={true} style={styles.input} placeholder='Password' placeholderTextColor={'grey'}/>
              <Ionicons name='ios-key-outline' size={24} color='grey'/>
            </View>
            <Text style={{color:'grey'}}>Forgot password?</Text>

            <TouchableOpacity style={styles.loginButton}>
              <Text style={{color:'black', fontWeight:'bold', fontSize:16}}>Sing-in Now</Text>
            </TouchableOpacity>
          </View>:

          // Sign-up Inputs
          <View style={{...styles.details}}>

            <View style={{flexDirection:'row'}}>
              <Text style={styles.subHeading}>Sign</Text>
              <Text style={{...styles.subHeading,backgroundColor:'#4cd137',marginLeft:5,paddingRight:5,borderRadius:20}}>up</Text>
            </View>

            <View style={styles.inputView}>
              <TextInput onChangeText={(t) => {setName(t)}} style={styles.input} placeholder='Name' placeholderTextColor={'grey'}/>
              <FontAwesome5 name='user' size={22} color='grey'/>
            </View>

            <View style={styles.inputView}>
              <TextInput onChangeText={(t) => {setEmail(t)}} style={styles.input} placeholder='Email-id' placeholderTextColor={'grey'}/>
              <Ionicons name='ios-key-outline' size={24} color='grey'/>
            </View>

            <View style={styles.inputView}>
              <TextInput secureTextEntry={true} onChangeText={(t) => {setPassword(t)}} style={styles.input} placeholder='Password' placeholderTextColor={'grey'}/>
              <Ionicons name='ios-key-outline' size={24} color='grey'/>
            </View>

            <TouchableOpacity onPress={() => {signup({email:email,password:password})}} style={styles.loginButton}>
              <Text style={{color:'black', fontWeight:'bold', fontSize:16}}>Sign-up Now</Text>
            </TouchableOpacity>

          </View>
          }

        </View>
      </View>

      {/* Already have account */}
      <View style={styles.bottomView}>
          <Text style={{...styles.bottomText}}>Already have account</Text>
          <TouchableOpacity onPress={() => {selectOption(true)}} style={{marginLeft:8}}>
            <Text style={{...styles.bottomText, color:'#4cd137',fontWeight:'bold'}}>Login?</Text>
          </TouchableOpacity>
      </View>

      {/* Other login methods --> facebook and google */}
      <View style={styles.otherLogins}>
          <Text style={{fontWeight:'bold',color:'white'}}>Also login with</Text>
          <TouchableOpacity style={{marginLeft:12,marginRight:12}}>
            <FontAwesome5 name='facebook' size={23} color='#0082FF'/>
          </TouchableOpacity>
          <TouchableOpacity>
            <FontAwesome5 name='google' size={23} color='red' />
          </TouchableOpacity>
      </View>

    </View>
  )
}

export default Welcome