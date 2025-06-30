import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '../assets/images'

const SearchBar = ({onPress,placeholder,value,onChangeText}) => {
  
  return (
    <TouchableOpacity  onPress={onPress}
    style={styles.container} >
        <Image source={images.Search} resizeMethod='contain' tintColor='black' />
        <TextInput
         placeholder='Search here'
         value={value}
         onChangeText={onChangeText}
         placeholderTextColor='black'
         style={{flex:"flex-1", marginLeft:2}}
        />
    </TouchableOpacity>
  )
}

export default SearchBar

const styles = StyleSheet.create({

    container : {
        flexDirection : "row",
        alignItems : "center",
        paddingHorizontal : 10,
        paddingVertical : 1,
        
        marginTop : 5,
        borderRadius:5,
        borderWidth:0.7,
        borderColor: "black",
    }
})