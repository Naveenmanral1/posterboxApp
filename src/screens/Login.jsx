import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import images from '../assets/images'
import Toast from 'react-native-toast-message'
import { useNavigation } from '@react-navigation/native'
import { useForm , Controller } from 'react-hook-form'
import { loginUser,getCurrentUser } from '../store/authSlice'
import { useDispatch } from 'react-redux'
const Login = () => {
     
  const navigation = useNavigation();
  const dispatch = useDispatch();
    const {
      control,
      handleSubmit,
      formState: { errors },
    } = useForm();


     const onSubmit = async (data) => {
    try {
      const response = await dispatch(loginUser(data)).unwrap();
      const user = await dispatch(getCurrentUser()).unwrap();
      if (user && response) {
        navigation.navigate('MainTabs')
      }
    } catch (error) {
      setError("Invalid email or password");
     
    }
  };

  return (
      <View style={styles.container}>
      <View style={styles.inputContainer}>
        {/* <Image style={styles.logo} source={images.Logo} /> */}
        <View style={{width:"100%",alignItems:"center"}}>
        <Text style={{fontSize:24,fontWeight:"600",paddingBottom:10 }}>Sign In</Text>
        <Text style={{paddingBottom:30 }}>Hi! Welcome back,you've been missed</Text>
        </View>


        <View style={{width:"100%"}}>
           

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
          <Text>Don't have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={{ color: '#006dff' ,fontWeight : "500"}}> Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Login

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
    marginTop: 20,
    width : "100%"
  },
})