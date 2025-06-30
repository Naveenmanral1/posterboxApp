import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../assets/images'

const HeroSection = () => {
  return (
    <View style={styles.container}>
      <Image source={images.BG} resizeMethod='contain' style={styles.heroImg}/>
    </View>
  )
}

export default HeroSection

const styles = StyleSheet.create({

    container : {
        width : "100%",
        marginTop : 20,
        

    },

    heroImg : {
        width : 'full',
        height : '200',
        objectFit : "cover",
        borderRadius : 10
    }
})