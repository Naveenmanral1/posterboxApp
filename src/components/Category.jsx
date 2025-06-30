import { StyleSheet, Text, View,FlatList,Image, ScrollView } from 'react-native'
import React from 'react'
import { useEffect,useState,useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import PosterCard from './PosterCard'
import { useRoute } from '@react-navigation/native'

const Category = () => {
   
     const {products} = useContext(ShopContext)
        const [poster , setPoster] = useState([])
         const router = useRoute();

         const { query } = router.params;

    
        useEffect(() => {
            const featureProduct = products.filter((item)=>(item.category === query))
            setPoster(featureProduct)
        },[products])

  return (
    <View style={styles.container}>

      <View style={{paddingVertical:10 , alignItems:"center",borderBottomColor:"#d5d8dc",borderBottomWidth:1}}>
        <Text style={{fontSize:24,fontWeight:"600",color:"#2c3e50",fontFamily:''}}>{query} Category </Text>
      </View>

      <ScrollView>
     
          <FlatList
       data={poster}
       style={{marginBottom:60}}
       renderItem={({item}) => (
        <PosterCard {...item}/>
       )}
       keyExtractor={(item)=>item._id.toString()}
       numColumns={2}
       scrollEnabled={false}
       columnWrapperStyle = {{
        justifyContent:'space-between',
        marginVertical : 10,
        marginHorizontal: 10
       }}
       showsVerticalScrollIndicator={false}
      />
      </ScrollView>
   
    </View>
  )
}

export default Category

const styles = StyleSheet.create({
    container : {
       
    },

    
})