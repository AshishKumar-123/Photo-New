import { View, Text, ScrollView, Pressable, FlatList, Image, TouchableOpacity, Modal, Dimensions } from 'react-native'
import React,{useState, useLayoutEffect} from 'react'
import styles from './styles'
import CameraRoll from '@react-native-community/cameraroll'
var RNFS = require('react-native-fs')

// Icons used -->
import Ionicons from 'react-native-vector-icons/Ionicons'
import Feather from 'react-native-vector-icons/Feather'


// Device Dimesions -->
const DEVICE_HEIGHT = Dimensions.get('window').height
const DEVICE_WDITH = Dimensions.get('window').width

const Gallery = () => {
  const [gallery, setGallery] =  useState([])
  const [refresh, setRefresh] = useState(false)

  // Category seleted --> Name
  const [selected, setSelected] = useState('All')

  // Image showing (**selected image)
  const [modal, setModal] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [albums, setAlbums] = useState([])


  useLayoutEffect(() => {
    get_gallery({category:''})
  },[setGallery])

  const get_gallery = ({category}) => {
    CameraRoll.getPhotos({
      first:20000,
      assetType:'Photos',
      groupName:category
    }).then((gal) => {
      setGallery(gal.edges)
      setRefresh(false)
    }).catch(({e}) => {
      ToastAndroid.showWithGravity(
        e,
        ToastAndroid.BOTTOM,
        ToastAndroid.SHORT
      )
    })
    CameraRoll.getAlbums() .then((r) => setAlbums(r))
  }
  
  const selectCategory = ({category}) => {
    get_gallery({category:category});
    if (category == '') {
      setSelected('All')
    }
    else {
      setSelected(category)
    }
  } 

  const showImage = ({uri}) => {
    setSelectedImage(uri)
    setModal(true)
  }

  // const deleteImage = ({uri}) => {
  //   RNFS.unlink(uri).then(() => {
  //     ToastAndroid.showWithGravity(
  //       'Deleted',
  //       ToastAndroid.BOTTOM,
  //       ToastAndroid.LONG
  //     )
  //     setModal(false)
  //     RNFS.scanFile(uri).then((r) => {
  //       console.log(r)
  //     })
  //   }).catch((e) => {
  //     console.log(e)
  //   })
  // }

  return (
    <View style={styles.main}>
        <View style={styles.header}>
          <Text style={styles.heading}>Gallery</Text>
        </View>

        {/* Category of photos */}
        <View style={styles.category}>
            <FlatList
              ListHeaderComponent={() => (
                <Pressable onPress={() => {selectCategory({category:''})}}>
                  <Text style={selected == 'All'?styles.selectedCaetgorySuggestion:styles.categorySuggestion}>All</Text>
                </Pressable>
              )}
              data={albums}
              horizontal={true}
              renderItem={({item}) => (
                  <Pressable onPress={() => {selectCategory({category:item.title})}}>
                    <Text style={selected == item.title?styles.selectedCaetgorySuggestion:styles.categorySuggestion}>{`${item.title} (${item.count})`}</Text>
                  </Pressable>
              )}
            />
          
        </View>


        <View style={styles.gallery}>
          <FlatList
            contentContainerStyle={{paddingBottom:110}}
            data={gallery}
            numColumns={2}
            refreshing={refresh}
            onRefresh={() => {get_gallery({category:''});setSelected('All')}}
            renderItem={({item}) => ( 
              <TouchableOpacity onPress={() =>showImage({uri:item.node.image.uri})} style={styles.galleryImage}>
                  <Image
                    source={{uri:item.node.image.uri}}
                    style={{height:140, width:150,borderRadius:12}}
                  />
              </TouchableOpacity>
            )}
           
          />
        </View>

        {/* Modal to show selected image */}
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
              {/* <FontAwesome onPress={() =>deleteImage({uri:selectedImage})} name='trash' size={23}/> */}
            </TouchableOpacity>
          </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default Gallery