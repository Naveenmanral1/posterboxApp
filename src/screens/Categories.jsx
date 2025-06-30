import { StyleSheet, Text, View,FlatList,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import categoryList from '../components/CategoryListData'


const Categories = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      
      <View style={{paddingVertical:10 , alignItems:"center",borderBottomColor:"#d5d8dc",borderBottomWidth:1}}>
                  <Text style={{fontSize:24,fontWeight:"600",color:"#2c3e50",fontFamily:''}}>All Categories</Text>
                </View>

      <FlatList
       data={categoryList}
        style={styles.bar}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <CategoryBarCard card={item} />}
        keyExtractor={(item) => item.category}
        numColumns={3}
        columnWrapperStyle = {{
        justifyContent:"space-between",
        marginBottom : 10,
        
       }}
      />
    </View>
  )
}


export default Categories


const CategoryBarCard = ({ card: { headingText, img, category } }) => {
  const navigation  = useNavigation();
  return (
    <TouchableOpacity 
    onPress={() => navigation.navigate('Category', {query : category})} 
    style={styles.cardContainer}>
      <Image source={img} style={styles.cardImg} resizeMode="cover" />
      <Text numberOfLines={1} style={styles.cardText}>
        {headingText}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
   container: {
    flex:1,
    backgroundColor:"white"
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    alignSelf : 'center',
    marginTop :10,
   
  },
  bar: {
    padding:10,
    marginTop:10,
    
  },
  cardContainer: {
    width: "full",
    alignItems: 'center',
    justifyContent:"center",
    padding:5
  },
  cardImg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    
  },
  cardText: {
    marginTop: 5,
    fontSize: 14,
    textAlign: 'center',
    fontWeight : "400"
  },
})