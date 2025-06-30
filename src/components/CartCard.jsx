import {
  Image,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { useState } from 'react';
import Cross from 'react-native-vector-icons/Feather';

const CartCard = ({ item, productData, currency, updateQuantity }) => {
  const [value, setValue] = useState(String(item.quantity));

  const handleChange = text => {
    // prevent empty or zero input
    if (text === '' || text === '0') {
      setValue(''); // still update local state
      return;
    }

    const num = Number(text);
    setValue(text);
    updateQuantity(item._id, item.size, num);
  };

  return (
    <View style={styles.container}>
      <View  style={styles.card}>
        <View style={styles.imgContainer}>
          <Image
            source={{ uri: `${productData.images[0]}` }}
            style={styles.img}
          />
        </View>
        <View style={styles.textContainer}>
          <Text numberOfLines={1} style={styles.title}>{productData.title}</Text>
          <Text style={[styles.size, { alignSelf: 'flex-start' }]}>
            Size : {item.size}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={styles.size}>Qty :</Text>
            <TextInput
              keyboardType="numeric"
              value={value}
              onChangeText={handleChange}
              style={styles.inputBox}
            />
          </View>

          <View style={{ flexDirection: 'row', marginTop: 8 }}>
            <Text style={[styles.price, { marginRight: 5 }]}>
              ₹ {productData.price}
            </Text>
            <Text
              style={[
                styles.price,
                {
                  marginRight: 5,
                  textDecorationLine: 'line-through',
                  color: '#6e6e6e',
                },
              ]}
            >
              199
            </Text>
            <Text style={[styles.price, { marginRight: 5, color: 'green' }]}>
              (50% OFF)
            </Text>
          </View>
        </View>
        <TouchableOpacity
          onPress={() => {
           
              updateQuantity(item._id, item.size, 0);
           
          }}
          style={{
            position: 'absolute',
            right: 5,
            top: 5,
            backgroundColor: '#b2babb',
          }}
        >
          <Cross name="x" size={20} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartCard;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    width: '100%',
    marginTop: 15,
  },

  card: {
    flexDirection: 'row',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 10,
    borderColor: '#d5d8dc',
    borderRadius: 10,
    width: 'full',
    justifyContent: 'space-between',
    position: 'relative',
  },

  imgContainer: {
    // backgroundColor: '#fadbd8',
    width: '30%',
  },

  img: {
    width: '100%',
    aspectRatio: 0.75,
    objectFit: 'cover',
  },

  textContainer: {
    width: '65%',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },

  inputBox: {
    height: 24,
    fontSize: 14,
    lineHeight: 16,
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    textAlign: 'center',
    width: 24,
  },

  price: {
    fontSize: 16,
    fontWeight: '800',
    paddingVertical: 2,
  },

  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },

  size: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2c3e50',
    backgroundColor: '#d7dbdd',
    paddingHorizontal: 5,
    marginRight: 5,
    paddingVertical: 2,
    marginTop: 1,
  },
});
