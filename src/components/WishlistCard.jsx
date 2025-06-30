import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Cross from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';


const WishlistCard = ({item,productData,deleteFromWishlist, ...props}) => {

    //  console.log(productData,"this si data")


    const navigation = useNavigation();

  return (
    <TouchableOpacity
         onPress={() => navigation.navigate('PosterDetails', {item : productData })} 
          style={styles.container}
       >
        <Image
        source={{uri:productData.images[0]}}
        resizeMode='cover'
        style = {styles.img}
        />
              <TouchableOpacity
                  onPress={() => {
                   
                     deleteFromWishlist(item._id);
                   
                  }}
                  style={{
                    position: 'absolute',
                    right: 12,
                    top: 0,
                    backgroundColor: '#b2babb',
                  }}
                >
                  <Cross name="x" size={20} />
                </TouchableOpacity>
        <Text numberOfLines={1} style={styles.title}>{productData.title}</Text>
       </TouchableOpacity>
  )
}

export default WishlistCard

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
        position : "relative",
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