import { View, Text, Pressable, ScrollView, FlatList, TouchableOpacity, ToastAndroid, Image, Modal , Dimensions, Alert } from 'react-native'
import React, {useLayoutEffect, useState} from 'react'
import styles from './styles'
import CameraRoll from '@react-native-community/cameraroll'
import { useNavigation } from '@react-navigation/native'
import * as permissions from 'react-native-permissions'
import MaskedView from '@react-native-masked-view/masked-view'
var RNFS = require('react-native-fs');


// Icons
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'
import LinearGradient from 'react-native-linear-gradient'


const DEVICE_HEIGHT = Dimensions.get('window').height
const DEVICE_WDITH = Dimensions.get('window').width


const Discover = () => {
  const navigation = useNavigation()
  const [gallery, setGallery] = useState([])
  const [refreshing, setRefreshing] = useState(false)
  
  // Quick view of image
  const [modal, setModal] = useState(false)
  const [selectedImage,setSelectedImage] = useState(null)
  
  useLayoutEffect(() => {
    get_gallery()
  },[setGallery])

  const get_gallery = () => {
    CameraRoll.getPhotos({
      first:10,
      assetType:'Photos',
      groupName:''
    }).then((gal) => {
      setGallery(gal.edges)
      setRefreshing(false)
    }).catch(({e}) => {
      ToastAndroid.showWithGravity(
        e,
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT
      )
    }) 
  }

  const refreshGallery = () => {
    setRefreshing(true);
    get_gallery()
  }

  const showImage = ({uri}) => {
    setSelectedImage(uri)
    setModal(true)
  }

  const deleteImage = ({uri}) => {
    RNFS.unlink(uri).then(() => {
      ToastAndroid.showWithGravity(
        'Deleted',
        ToastAndroid.BOTTOM,
        ToastAndroid.LONG
      );
      setModal(false)
    }).catch((e) => {
      Alert.alert(e)
    })
  }

 
  return (
    <View style={styles.main}>
      
      <View style={styles.header}>
          <Text style={styles.heading}>Discover</Text>
        {/* Search Button to search trends */}
        <Pressable style={styles.searchButton}>
          <FontAwesome name="search" size={20} color="white"/>
          <Text style={styles.searchButtonText}>Search Templates</Text>
        </Pressable>
      </View>
      
      {/* Category of styles */}
      <View style={styles.category}>
        <ScrollView  horizontal={true}>
          <Text style={styles.categorySuggestion}>Christmas</Text>
          <Text style={styles.categorySuggestion}>Inspiration</Text>
          <Text style={styles.categorySuggestion}>CyberMode</Text>
          <Text style={styles.categorySuggestion}>New Year</Text>
        </ScrollView>
      </View>

      <View style={styles.category}>
        <ScrollView horizontal={true}>
          <TouchableOpacity style={{backgroundColor:'#E1306C', ...styles.platforms}}>
            <View style={styles.platformsIcon}>
              <Ionicons size={23} name='ios-logo-instagram'/>
            </View>
            <View style={styles.platformsTitle}>
              <Text style={styles.platformsTitleText}>Instagram Story</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:'#0082FF', ...styles.platforms}}>
            <View style={styles.platformsIcon}>
              <Feather size={23} name='facebook'/>
            </View>
            <View style={styles.platformsTitle}>
              <Text style={styles.platformsTitleText}>Facebook Post</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={{backgroundColor:'#25D366', ...styles.platforms}}>
            <View style={styles.platformsIcon}>
              <Ionicons size={23} name='ios-logo-whatsapp'/>
            </View>
            <View style={styles.platformsTitle}>
              <Text style={styles.platformsTitleText}>Whatsapp Status</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <View style={styles.subHeading}>
        <View style={styles.subTitle}>
          <Text style={styles.subTitleHead}>Your Gallery</Text>
          <Pressable onPress={() => navigation.navigate('Gallery')}>
            <Text style={styles.subTitleExtension}>More Images</Text>
          </Pressable>
        </View>
        <FlatList
            data={gallery}
            contentContainerStyle={{paddingBottom:423}}
            numColumns={2}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => showImage({uri:item.node.image.uri})}  style={styles.galleryImage}>
                <Image
                  source={{uri:item.node.image.uri}}
                  style={{width:150,height:140,borderRadius:12}}
                  resizeMode='cover'
                  progressiveRenderingEnabled={true}
                />
              </TouchableOpacity>
            )}
            refreshing={refreshing}
            onRefresh={() => refreshGallery()}
        />
      </View>

      {/* Quick view of image */}
      <Modal onRequestClose={() => setModal(false)} transparent={true} animationType='fade' visible={modal}>
        <Pressable  onPress={()=>{setModal(false)}} style={styles.modalView}>
          <View style={{width:DEVICE_WDITH-30,height:DEVICE_HEIGHT-400}}>
            <Image
              source={{uri:selectedImage}}
              style={{aspectRatio:1,resizeMode:'cover',borderRadius:20}}
            />
            <TouchableOpacity style={styles.options}>
              <Ionicons name='ios-grid-outline' size={23}/>
              <Feather name='edit' size={23}/>
              <Ionicons name='share-social-outline' size={23}/>
              <FontAwesome onPress={() =>deleteImage({uri:selectedImage})} name='trash' size={23}/>
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    
    </View>
  )
}

export default Discover;