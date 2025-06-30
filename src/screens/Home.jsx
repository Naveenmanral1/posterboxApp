import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SearchBar from '../components/SearchBar'
import HeroSection from '../components/HeroSection'
import CategoryBar from '../components/CategoryBar'
import FeatureComp from '../components/FeatureComp'
import images from '../assets/images'
import CustomCard from '../components/Footer'
import AllProducts from '../components/AllProducts'
import { useNavigation } from '@react-navigation/native'

const Home = () => {
  const navigation  = useNavigation();
  return (
    <View style={styles.container}>
      <ScrollView 
      style={styles.scroll}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ minHeight: '100%', paddingBottom: 10 }}>

        <TouchableOpacity 
        style={styles.searchBar}>
          <SearchBar   onPress={()=>navigation.navigate('Search')}/>
        </TouchableOpacity>
        
        <HeroSection/>
        <CategoryBar/>
        <FeatureComp image={images.bestSelling} query={"Web-Series"}/>
        <FeatureComp image={images.newArrival} query={"Anime"}/>
         {/* <FeatureComp image={images.posterSet} query={"Movie"}/> */}
         {/* <Category /> */}
         <CustomCard/>
         <AllProducts/>
      </ScrollView>
   
    </View>
  )
}

export default Home

const styles = StyleSheet.create({

  container : {
    backgroundColor : "white",
    flex : "flex-1"
  },

  scroll : {
    flex : "flex-1",
    paddingHorizontal : 10,
    
  },

  searchBar : {
    marginTop : 10,
  }
})