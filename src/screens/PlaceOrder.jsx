import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { useNavigation } from '@react-navigation/native';
import { VITE_RAZORPAY_KEY_ID } from '@env';
import RazorpayCheckout from 'react-native-razorpay';
import api from '../services/api';
import images from '../assets/images';

const PlaceOrder = () => {
  const {
    currency,
    deliveryFee,
    getCartAmount,
    cartItems,
    setCartItems,
    products,
    getCartCount,
  } = useContext(ShopContext);

  const navigation = useNavigation();
  const [paymentMethod, setPaymentMethod] = useState('cod');

  const [formData, setFromData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    phone: '',
  });

  const initPay = (order) => {
    const options = {
      key: VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      title: 'Order Payment',
      description: 'Order Payment with Razorpay',
      order_id: order.id,
      receipt: order.receipt,
      prefill: {
        email: formData.email,
        contact: formData.phone,
        name: `${formData.firstName} ${formData.lastName}`,
      },
      theme: { color: '#2471a3' },
    };

    RazorpayCheckout.open(options)
      .then(async (data) => {
        const { razorpay_payment_id, razorpay_order_id, razorpay_signature } = data;
        try {
          const { data: verifyRes } = await api.post('/api/v1/order/verify-razorpay', {
            razorpay_payment_id,
            razorpay_order_id,
            razorpay_signature,
          });

          if (verifyRes.success) {
            setCartItems({});
            navigation.navigate('MainTabs');
            return true;
          } else {
            Alert.alert('Payment verification failed');
          }
        } catch (error) {
          console.error(error);
          Alert.alert('Something went wrong during verification');
        }
      })
      .catch((error) => {
        console.log(`Payment failed: ${error.description}`);
      });
  };

  const onSubmitHandler = async () => {
    try {
      // Form Validation
      const isFormValid = Object.values(formData).every(value => value.trim() !== '');
      if (!isFormValid) {
        Alert.alert('Error', 'Please fill in all the required fields.');
        return false;
      }

      let orderItems = [];
      for (const productId in cartItems) {
        for (const size in cartItems[productId]) {
          if (cartItems[productId][size] > 0) {
            const product = products.find(p => p._id === productId);
            if (product) {
              orderItems.push({ ...product, size, quantity: cartItems[productId][size] });
            }
          }
        }
      }

      const orderData = {
        address: formData,
        items: orderItems,
        totalAmount: getCartAmount() + deliveryFee,
      };

      if (paymentMethod === 'cod') {
        const res = await api.post('/api/v1/order/place-order', orderData);
        if (res.data.success) {
          setCartItems({});
          navigation.navigate('MainTabs');
          return true;
        } else {
          Alert.alert('Order Failed', res.data.message);
          return false;
        }
      } else {
        const razorRes = await api.post('/api/v1/order/razorpay', orderData);
        if (razorRes.data.success) {
          await initPay(razorRes.data.data);
          return true;
        }
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Error', err.message);
      return false;
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Shipping Information</Text>
        </View>

        <View style={styles.addressContainer}>
          <View style={[styles.inputContainer, { flexDirection: 'row' }]}>
            <View style={styles.miniInput}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="John"
                placeholderTextColor="#b2babb"
                value={formData.firstName}
                onChangeText={text => setFromData(prev => ({ ...prev, firstName: text }))}
              />
            </View>
            <View style={styles.miniInput}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.inputBox}
                placeholder="Doe"
                placeholderTextColor="#b2babb"
                value={formData.lastName}
                onChangeText={text => setFromData(prev => ({ ...prev, lastName: text }))}
              />
            </View>
          </View>

          {[
            { label: 'Email', key: 'email', placeholder: 'abc@example.com' },
            { label: 'Phone number', key: 'phone', placeholder: '1234567890', keyboardType: 'numeric' },
            { label: 'Street', key: 'street', placeholder: 'Street name' },
            { label: 'City', key: 'city', placeholder: 'City' },
            { label: 'State', key: 'state', placeholder: 'State' },
            { label: 'PinCode', key: 'pincode', placeholder: '123456', keyboardType: 'numeric' },
            { label: 'Country', key: 'country', placeholder: 'India' },
          ].map(({ label, key, placeholder, keyboardType }, i) => (
            <View key={i} style={styles.inputContainer}>
              <Text style={styles.label}>{label}</Text>
              <TextInput
                style={styles.inputBox}
                placeholder={placeholder}
                placeholderTextColor="#b2babb"
                keyboardType={keyboardType || 'default'}
                value={formData[key]}
                onChangeText={text => setFromData(prev => ({ ...prev, [key]: text }))}
              />
            </View>
          ))}
        </View>

        <View style={styles.divider} />

        <View style={styles.priceContainer}>
          <Text style={styles.sectionTitle}>PRICE DETAILS ({getCartCount()} items)</Text>
          <View style={styles.priceRow}>
            <Text style={styles.label}>Total MRP</Text>
            <Text style={styles.label}>{currency} {getCartAmount()}.00</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.label}>Discount on MRP</Text>
            <Text style={[styles.label, { color: 'green' }]}>{currency} 0.00</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={styles.label}>Delivery Fee</Text>
            <Text style={styles.label}>{currency} {deliveryFee}.00</Text>
          </View>
          <View style={styles.priceRow}>
            <Text style={[styles.label, styles.total]}>Total Amount</Text>
            <Text style={[styles.label, styles.total]}>
              {currency} {getCartAmount() + deliveryFee}.00
            </Text>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.paymentContainer}>
          <Text style={styles.sectionTitle}>PAYMENT METHOD</Text>

          <TouchableOpacity style={styles.payment} onPress={() => setPaymentMethod('razorpay')}>
            <Text style={[styles.radio, paymentMethod === 'razorpay' && styles.radioSelected]} />
            <Image source={images.razorpay} style={styles.razorpayLogo} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.payment} onPress={() => setPaymentMethod('cod')}>
            <Text style={[styles.radio, paymentMethod === 'cod' && styles.radioSelected]} />
            <Text style={styles.codText}>CASH ON DELIVERY</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={onSubmitHandler}
            style={[styles.btn, { backgroundColor: 'black' }]}
          >
            <Text style={styles.btnText}>PROCEED TO PAY</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlaceOrder;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: 'white' },
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
  addressContainer: { padding: 20 },
  inputContainer: { marginBottom: 14 },
  miniInput: { width: '48%', marginRight: '4%' },
  inputBox: {
    borderWidth: 1,
    borderColor: '#abb2b9',
    borderRadius: 6,
    padding: 10,
    fontSize: 16,
    color: 'black',
  },
  label: { fontSize: 16, color: '#2c3e50', fontWeight: '400' },
  divider: {
    height: 1,
    backgroundColor: '#c7c8ca',
    marginVertical: 10,
    marginHorizontal: 15,
  },
  priceContainer: { paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  total: { fontWeight: '700', fontSize: 18 },
  paymentContainer: { padding: 20 },
  payment: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#abb2b9',
    borderRadius: 6,
    marginBottom: 10,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  radio: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#abb2b9',
    marginRight: 15,
  },
  radioSelected: {
    backgroundColor: '#2ecc71',
    borderColor: '#2ecc71',
  },
  razorpayLogo: { height: 25, width: 100, resizeMode: 'contain' },
  codText: { fontSize: 16, fontWeight: '600', color: '#566573' },
  btn: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
  },
  btnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});
