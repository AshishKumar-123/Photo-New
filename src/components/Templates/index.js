import { View, Text, Image } from 'react-native'
import React from 'react'
import styles from './styles'

const Templates = (porps) => {
    const template = porps.templates.item

    return (
        <View style={{marginHorizontal:2,marginVertical:12}}>
            <Image source={{uri:template.source}} style={{resizeMode:'cover',aspectRatio:1,borderRadius:10}}/>
        </View>
    )
}

export default Templates