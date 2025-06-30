import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const OrderCard = ({item}) => {
    
  return (
      <View style={styles.container}>
  
        <View style={styles.card}>
          <View style={styles.imgContainer}>
            <Image
              source={{ uri: `${item.images[0]}` }}
              style={styles.img}
            />
          </View>
          <View style={styles.textContainer}>
            <Text numberOfLines={1} style={styles.title}>{item.title}</Text>
             <Text style={[styles.price, { marginRight: 5 }]}>
               Price : ₹ {item.price}
              </Text>
              <Text style={[styles.price, { marginRight: 5 }]}>
               Payment : ₹ {item.paymentMethod}
              </Text>

              <Text style={[styles.price, item.paymentMethod === "Razorpay" && item.payment === true
                    ? {color:"green"}
                    : item.paymentMethod === "COD"
                    ? {color:"yellow"}
                    : {color:"red"},{fontWeight:"500"}]}>
               Payment Status :  { item.paymentMethod === "Razorpay" && item.payment === true
                    ? "Success"
                    : item.paymentMethod === "COD"
                    ? "Pending"
                    : "Failed"}
              </Text>

              <Text style={[styles.price, { marginRight: 5 }]}>
               Order Placed : {new Date(item.createdAt).toDateString()}
              </Text>
           
  
            <View style={{flexDirection:"row" , alignItems:"center"}}>
            <Text style={[styles.size,{alignSelf: "flex-start",}]}>Size : {item.size}</Text>
            <Text style={styles.size}>Qty : {item.quantity}</Text>
            </View>
         
          </View>
        </View>
      </View>
    );
}

export default OrderCard

const styles = StyleSheet.create({
      container: {
    paddingHorizontal: 0,
    width: '100%',
    marginTop:15
  },

  

  card: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    borderColor: '#d5d8dc',
    borderRadius: 10,
    width: 'full',
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
  },

  imgContainer: {
    width: '30%',
   justifyContent:"flex-end"
  },

  img: {
    width: '100%',
    aspectRatio: 0.7,
    objectFit: 'cover',
    
  },

  textContainer: {
     width: '65%',
     flexDirection : "column",
     justifyContent : "space-between",
     
  },

  price : {
    fontSize : 14,
    fontWeight:"400",
    paddingVertical : 2,
  },

  title : {
    fontSize : 16,
    fontWeight : "bold"
  },

  size :{
    fontSize : 14,
    fontWeight : "700",
    color : '#2c3e50',
    backgroundColor : '#d7dbdd',
    paddingHorizontal : 5,
    marginRight : 5,
    paddingVertical : 0,
    marginTop:1
  }
})