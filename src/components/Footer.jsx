import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import images from '../assets/images'


const CustomCard = () => {
  return (
    <View style={styles.container}>
      <Image source={images.customCard} resizeMethod='contain' style={styles.heroImg}/>
    </View>
  )
}

export default CustomCard

const styles = StyleSheet.create({

    container : {
        width : "100%",
        marginTop : 20,
        marginBottom :30,
    },

    heroImg : {
        width : '100%',
        height : "350",
        objectFit : "contain",
        borderRadius : 10,
    }
})