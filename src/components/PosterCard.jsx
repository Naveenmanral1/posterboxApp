import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const PosterCard = (props) => {
    const {_id,images,price,title} = props;
    const navigation = useNavigation();
  return (
   <TouchableOpacity 
     onPress={() => navigation.navigate('PosterDetails', {item : props})} 
      style={styles.container}
   >
    <Image 
    source={{uri:images[0]}}
    resizeMode='cover'
    style = {styles.img}
    />
    <Text numberOfLines={1} style={styles.title}>{title}</Text>
    <Text numberOfLines={1} style={styles.price}>₹{price}</Text>
   </TouchableOpacity>
  )
}

export default PosterCard

const styles = StyleSheet.create({

    container : {
        marginBottom : 3,
        width : "50%",
    },

    img : {
        width : "100%",
        aspectRatio: .75,
        borderRadius : 0,
        objectFit:'contain',
    },

    title : {
        fontSize:12,
        fontWeight: "400",
        marginTop : 5,
        marginLeft : "5%"
    },

    price : {
        fontSize:14,
        fontWeight: "bold",
        marginTop : 2,
        marginLeft : "5%"
    }

})