import { StyleSheet, Text, View,FlatList,Image } from 'react-native'
import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import PosterCard from './PosterCard'
import _ from "lodash"

const AllProducts = () => {
   const {products} = useContext(ShopContext)
   const shuffledProduct = _.shuffle(products).slice(0,20)
  return (
      <View style={styles.container}>

      <FlatList
       data={shuffledProduct}
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

export default AllProducts

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