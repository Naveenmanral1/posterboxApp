import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import api from '../services/api'
import { useState,useEffect } from 'react'
import { useSelector } from 'react-redux'
import OrderCard from '../components/OrderCard'

const MyOrder = () => {

  const [orderData , setOrderData] = useState([])
  const authStatus = useSelector(state => state.auth.status)

   const loadOrderData = async() => {
    try {
      if(!authStatus){
        return null
      }

      const response = await api.post('/api/v1/order/user-order',{})
      if(response.data.success){
       let allOrdersItem = []
       response.data.data.map((order)=>{
        order.items.map((item)=> {
          item['status'] = order.status
          item['payment'] = order.payment
          item['paymentMethod'] = order.paymentMethod
          allOrdersItem.push(item)
        })
       })
       setOrderData(allOrdersItem.reverse())
      }
      
      
    } catch (error) {
      
    }
  }

  useEffect(()=>{
    loadOrderData()
  },[authStatus])



  return (
    <View>
      <View style={{paddingVertical:10 , alignItems:"center",borderBottomColor:"#d5d8dc",borderBottomWidth:1}}>
                    <Text style={{fontSize:24,fontWeight:"600",color:"#2c3e50",fontFamily:''}}>My Orders</Text>
                  </View>
      <ScrollView showsVerticalScrollIndicator={false}>
         <View style={{marginBottom:80}}>
           {orderData.map((item,index)=> (
          <OrderCard item={item} key={index}/>
         ))}
         </View>
        
      </ScrollView>
    </View>
  )
}

export default MyOrder

const styles = StyleSheet.create({})