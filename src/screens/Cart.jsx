import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import CartCard from '../components/CartCard';
import { useNavigation } from '@react-navigation/native';
import images from '../assets/images';

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    updateQuantity,
    getCartCount,
    getCartAmount,
    deliveryFee
  } = useContext(ShopContext);

  const [cartData, setCartData] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            tempData.push({
              _id: productId,
              size,
              quantity: cartItems[productId][size],
            });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <View style={styles.wrapper}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cart</Text>
        </View>

        {cartData.length > 0 ? (
          <>
            {cartData.map((item, index) => {
              const productData = products.find(product => product._id === item._id);
              return (
                <CartCard
                  item={item}
                  currency={currency}
                  updateQuantity={updateQuantity}
                  productData={productData}
                  key={`product-${index}`}
                />
              );
            })}

            <View style={styles.divider} />

            <View style={styles.priceContainer}>
              <Text style={styles.sectionTitle}>PRICE DETAILS ({getCartCount()} items)</Text>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Total MRP</Text>
                <Text style={styles.priceValue}>{currency} {getCartAmount()}.00</Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Discount on MRP</Text>
                <Text style={[styles.priceValue, { color: "green" }]}>{currency} 0.00</Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Coupon Discount</Text>
                <Text style={[styles.priceValue, { color: "green" }]}>{currency} 0.00</Text>
              </View>

              <View style={styles.priceRow}>
                <Text style={styles.priceLabel}>Delivery Fee</Text>
                <Text style={styles.priceValue}>{currency} {deliveryFee}.00</Text>
              </View>

              <View style={styles.divider} />

              <View style={styles.priceRow}>
                <Text style={styles.totalLabel}>Total Amount</Text>
                <Text style={styles.totalValue}>
                  {currency} {getCartAmount() === 0 ? 0 : getCartAmount() + deliveryFee}.00
                </Text>
              </View>

              <TouchableOpacity
                onPress={() => navigation.navigate('PlaceOrder')}
                style={styles.orderButton}
              >
                <Text style={styles.orderButtonText}>PLACE ORDER</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.emptyContainer}>
            <Image style={styles.emptyImage} source={images.cart} resizeMode="contain" />
            <Text style={styles.emptyTitle}>Your cart is empty</Text>
            <Text style={styles.emptySubtitle}>Looks like you haven't added anything yet.</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d5d8dc',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
  },
  divider: {
    height: 1,
    backgroundColor: '#c7c8ca',
    marginVertical: 15,
    marginHorizontal:0,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  priceContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 16,
    color: '#2f2f2f',
  },
  priceValue: {
    fontSize: 16,
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
  },
  orderButton: {
    marginTop: 20,
    backgroundColor: '#1c2833',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0c1e76',
    marginBottom: 10,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    maxWidth: 300,
  },
});
