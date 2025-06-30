import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import images from '../assets/images';
import CheckBox from 'react-native-vector-icons/Feather';
import Toast from 'react-native-toast-message';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { loginUser, signupUser } from '../store/authSlice';
import { useDispatch } from 'react-redux';

const SignUp = () => {
  const [checked, setChecked] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [error, setError] = useState('');

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      await dispatch(signupUser(data)).unwrap();
      const { email, password } = data;
      await dispatch(loginUser({ email, password })).unwrap();
      navigation.navigate('MainTabs');
    } catch (error) {
      setError(error.message || 'An error occurred during signup');
      Toast.show({
        type: 'error',
        text1: 'Signup Failed',
        text2: error.message || 'Try again later',
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* <Image style={styles.logo} source={images.Logo} /> */}
        <View style={{width:"100%",alignItems:"center"}}>
        <Text style={{fontSize:24,fontWeight:"600",paddingBottom:20 }}>Create Account</Text>
        <Text style={{paddingBottom:20 }}>Fill your information below to get Started</Text>
        </View>


        <View style={{width:"100%"}}>
           
        <Text>Name</Text>
        <Controller
          control={control}
          name="fullName"
          rules={{ required: 'Full name is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter your full name"
              onChangeText={onChange}
              value={value}
              style={styles.input}
              keyboardType="default"
            />
          )}
        />
        {errors.fullName && (
          <Text style={styles.errorText}>{errors.fullName.message}</Text>
        )}

        {/* Email */}
        <Text>Email</Text>
        <Controller
          control={control}
          name="email"
          rules={{
            required: 'Email is required',
            pattern: {
              value: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
              message: 'Invalid email address',
            },
          }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter your email"
              onChangeText={onChange}
              value={value}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && (
          <Text style={styles.errorText}>{errors.email.message}</Text>
        )}

        {/* Password */}
        <Text>Password</Text>
        <Controller
          control={control}
          name="password"
          rules={{ required: 'Password is required' }}
          render={({ field: { onChange, value } }) => (
            <TextInput
              placeholder="Enter your password"
              onChangeText={onChange}
              value={value}
              secureTextEntry
              style={styles.input}
            />
          )}
        />
        {errors.password && (
          <Text style={styles.errorText}>{errors.password.message}</Text>
        )}

        {/* Terms */}
        <TouchableOpacity
          onPress={() => setChecked(!checked)}
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginVertical: 10,
          }}
        >
          <CheckBox
            name={checked ? 'check-square' : 'square'}
            size={24}
            color={checked ? 'black' : '#aaa'}
          />
          <Text style={{ marginLeft: 8 }}>Agree with Terms & Conditions</Text>
        </TouchableOpacity>
        </View>
       

       

        {/* SignUp Button */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          style={styles.button}
        >
          <Text style={{ color: '#fff',fontSize : 16 }}>Sign Up</Text>
        </TouchableOpacity>

        {/* Navigation */}
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <Text>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={{ color: '#006dff' ,fontWeight : "500"}}> Sign In</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
  },
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
    justifyContent : 'center',
  },
  inputContainer: {
    padding: 20,
    // backgroundColor: '#f2f2f2',
    borderRadius: 10,
    alignItems : "center",
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    marginVertical: 5,
    borderRadius: 8,
    borderColor: '#ccc',
    borderWidth: 1,
    width : "100%",
    marginBottom:15,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 4,
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 15,
    width : "100%"
  },
});
