import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useContext } from 'react';
import { useRoute } from '@react-navigation/native';
import { useState,useRef,useEffect } from 'react';
import FeatureComp from '../components/FeatureComp';
import images from '../assets/images';
import { ShopContext } from '../context/ShopContext';

const PosterDetail = () => {
  const router = useRoute();
   const scrollRef = useRef();
   const {addToCart , addToWishlist , wishlistItem} = useContext(ShopContext);
  const { item } = router.params;
  const [selectedSize, setSelectedSize] = useState('');
  const [wishlisted , setWishlisted] = useState(false)

   useEffect(() => {
    scrollRef.current?.scrollTo({ y: 0, animated: true });
  }, [item]);

   const isWishlisted = async()=> {
    for(const items in wishlistItem){
      if(items === productId){
       setWishlisted(true)
      }
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView 
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 80 }} 
      ref={scrollRef}>
        <View >
          <Image
            source={{ uri: `${item.images[0]}` }}
            resizeMode="stretch"
            style={styles.img}
          />
        </View>
        <View style={styles.DetailContainer}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={[styles.title,{marginTop:10}]}>{item.title}</Text>

          <View style={{flexDirection:"row",marginTop:8}}>
            <Text style={[styles.title,{marginRight:5}]}>₹ {item.price}</Text>
            <Text style={[styles.title,{marginRight:5,textDecorationLine:"line-through",color:"#6e6e6e"}]}>199</Text>
            <Text style={[styles.title,{marginRight:5,color:"green"}]}>(50% OFF)</Text>
          </View>


          <View style={{marginTop:15}}>
            <Text style={styles.heading} >Select Size</Text>
            <View style={styles.btnContainer}>
              {item.sizes.map((size, index) => {
                const isSelected = selectedSize === size;
                return (
                  <Pressable
                    key={index}
                    onPress={() => setSelectedSize(size)}
                    style={[
                      styles.button,
                      isSelected
                        ? styles.selectedButton
                        : styles.unselectedButton,
                    ]}
                  >
                    <Text
                      style={[
                        styles.text,
                        isSelected
                          ? styles.selectedText
                          : styles.unselectedText,
                      ]}
                    >
                      {size}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>


          <View style={{marginTop:12}}>
            <TouchableOpacity
            onPress={()=>addToCart(item._id,selectedSize)}
            style={[styles.btn,{backgroundColor:"black" }]}>
              <Text style={[styles.text,{color: '#fff'}]}>ADD TO CART</Text>
            </TouchableOpacity>
            <TouchableOpacity 
            onPress={()=>addToWishlist(item._id)}
            style={styles.btn}>
              <Text style={styles.text}>WISHLIST</Text>
            </TouchableOpacity>
          </View>

           <View style={{marginTop:20}}>
            <Text style={styles.heading}>Product Detials</Text>
            <Text style={styles.description}>Our high-resolution prints ensure vibrant colors and
                        crisp details, available in various sizes to fit any
                        space. Choose from glossy, matte, or canvas finishes for
                        a professional touch. Personalize with your own artwork,
                        images, or text, and enjoy fade-resistant, long-lasting
                        quality. Perfect for home décor, offices, events,
                        promotions, and gifting!</Text>
          </View>

          <FeatureComp image={images.bestSelling} query={"Web-Series"}/>
        </View>
      </ScrollView>
    </View>
  );
};

export default PosterDetail;

const styles = StyleSheet.create({
  container: {
    flex: 'flex-1',
    width:"100%",
    backgroundColor:"white"
  },

  img: {
   width : "100%",
        aspectRatio: .75,
        borderRadius : 0,
        objectFit:'cover',
  },

  DetailContainer: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginTop:15
  },

  category: {
    color:"#6e6e6e",
    fontWeight:"500"
  },

  title : {
    fontSize : 18,
    fontWeight:"600"
  },

  heading :{
    fontSize:15,
    fontWeight:"500"
  },

  description :{
    color:"#565656",
    marginTop:10,
    marginBottom :20
    
  },

  btnContainer: {
    flexDirection: 'row',
    marginTop:10
  },

  // buttonText: {
  //   fontSize: 15,
  //   marginRight: 15,
  //   padding: 10,
  //   borderWidth: 1,
  //   borderRadius: 50,
  //    backgroundColor:"red"
  // },

  // buttonBase: {
  //   marginRight: 15,
  //   borderWidth: 1,
  //   borderRadius: 50,
  //   paddingVertical: 10,
  //   paddingHorizontal: 20,
  // },

  button: {
    height: 48,
    width: 48,
    marginRight: 12,
    borderRadius: 30,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  selectedButton: {
    backgroundColor: '#000',
    borderColor: '#000',
  },
  unselectedButton: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
  },
  text: {
    fontSize: 18,
    fontWeight: '600',
  },
  selectedText: {
    color: '#fff',
  },
  unselectedText: {
    color: '#000',
  },

  btn : {
   marginVertical:5,
   justifyContent:"center",
   alignItems:"center",
   paddingVertical:12,
   borderRadius:10,
   borderWidth:1,
   borderColor:'black'
  },

 
});
