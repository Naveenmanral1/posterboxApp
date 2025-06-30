import { FlatList, Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useState ,useEffect,useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import PosterCard from './PosterCard';

const FeatureComp = ({image,query}) => {

    const {products} = useContext(ShopContext)
    const [poster , setPoster] = useState([])

    useEffect(() => {
        const featureProduct = products.filter((item)=>(item.category === query))
        setPoster(featureProduct.slice(0,4))
    },[products])

    

  return (
    <View style={styles.container}>
      <View style={styles.imgcontainer}>
        <Image source={image}
        resizeMode='cover'
        style = {styles.img}/>
      </View>

      <FlatList
       data={poster}
       renderItem={({item}) => (
        <PosterCard {...item}/>
       )}
       keyExtractor={(item)=>item._id.toString()}
       numColumns={2}
       scrollEnabled={false}
       columnWrapperStyle = {{
        justifyContent:'space-between',
        marginBottom : 10
       }}
      />
    </View>
  )
}

export default FeatureComp

const styles = StyleSheet.create({

    container : {
       
    },

    img : {
        width : "100%",
        objectFit : "contain",
        height : 60,
        marginBottom : 20
         
    }
})