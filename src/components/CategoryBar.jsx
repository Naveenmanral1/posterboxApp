import React from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import categoryList from './CategoryListData';

const CategoryBar = () => {
  
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
        <View style={{flexDirection:'row', alignItems:"center",justifyContent:"space-between"}}>
            <Text style={styles.heading}>Category</Text>
            <TouchableOpacity 
            onPress={()=>navigation.navigate('Categories')}
            >
              <Text style={{fontSize:12 , marginRight:5,fontWeight:"500"}}>See All</Text>
            </TouchableOpacity>
            
        </View>
      

      <FlatList
       data={categoryList}
        style={styles.bar}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
        
        renderItem={({ item }) => <CategoryBarCard card={item} />}
        keyExtractor={(item) => item.category}
      />
    </View>
  );
};

export default CategoryBar;

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
    marginVertical: 15,
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 15,
  },
  bar: {
    paddingLeft: 0,
  },
  cardContainer: {
    width: "full",
    alignItems: 'center',
    justifyContent:"center"
  },
  cardImg: {
    width: 80,
    height: 80,
    borderRadius: 50,
    
  },
  cardText: {
    marginTop: 0,
    fontSize: 12,
    textAlign: 'center',
    fontWeight:"400"
  },
});


