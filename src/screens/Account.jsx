import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logoutUser } from '../store/authSlice';
import images from '../assets/images';
import Icon from 'react-native-vector-icons/Feather';

const Divider = () => (
  <View style={styles.divider} />
);

const AccountOption = ({ icon, label, onPress }) => (
  <>
    <TouchableOpacity onPress={onPress} style={styles.btnContainer}>
      <Icon name={icon} size={22} />
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
    <Divider />
  </>
);

const Account = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const authData = useSelector(state => state.auth.userData);
  const authStatus = useSelector(state => state.auth.status);

  const logoutHandler = () => {
    try {
      dispatch(logoutUser());
      navigation.navigate('Login');
    } catch (error) {
      throw error;
    }
  };

  const options = [
    { icon: 'user', label: 'Your profile', onPress: () => navigation.navigate('WorkInProgress') },
    { icon: 'clipboard', label: 'My Orders', onPress: () => navigation.navigate('Myorders') },
    { icon: 'credit-card', label: 'Payment Methods', onPress: () => navigation.navigate('WorkInProgress') },
    { icon: 'settings', label: 'Settings', onPress: () => navigation.navigate('WorkInProgress') },
    { icon: 'help-circle', label: 'Help Center', onPress: () => navigation.navigate('WorkInProgress') },
    { icon: 'lock', label: 'Privacy Policy', onPress: () => navigation.navigate('WorkInProgress') },
    { icon: 'user-plus', label: 'Invites Friends', onPress: () => navigation.navigate('WorkInProgress') },
    { icon: 'log-out', label: 'Logout', onPress: logoutHandler },
  ];

  return (
    <View style={{ flex: 1 }}>
      {authStatus ? (
        <View style={{ flex: 1, backgroundColor: 'white', alignItems: 'center' }}>
          <View style={{paddingVertical:10 , alignItems:"center",borderBottomColor:"#d5d8dc",borderBottomWidth:1,width:"100%"}}>
                      <Text style={{fontSize:24,fontWeight:"600",color:"#2c3e50",fontFamily:''}}>Profile</Text>
                    </View>
          <Image style={styles.img} source={images.user} />
          <Text style={styles.userName}>{authData.fullName}</Text>

          <View style={styles.container}>
            {options.map((option, index) => (
              <AccountOption
                key={index}
                icon={option.icon}
                label={option.label}
                onPress={option.onPress}
              />
            ))}
          </View>
        </View>
      ) : (
        <View style={styles.notAuthContainer}>
          <Image source={images.user} style={styles.img} />
          <Text style={styles.userName}>Welcome, Guest!</Text>
          <Text style={styles.subText}>Please log in to access your account.</Text>

          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            style={styles.loginBtn}
          >
            <Text style={styles.loginBtnText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('Signup')}
            style={styles.signupBtn}
          >
            <Text style={styles.signupBtnText}>Create Account</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default Account;

const styles = StyleSheet.create({
  img: {
    width: 120,
    height: 120,
    marginTop : 20
  },
  container: {
    width: '100%',
    backgroundColor: 'white',
    padding: 10,
    marginRight:20
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    marginVertical: 10,
  },
  btnContainer: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 17,
    marginLeft: 15,
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#eaecee',
    marginTop: 1,
    marginHorizontal: 10,
  },
    notAuthContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  subText: {
    fontSize: 16,
    color: '#5d6d7e',
    textAlign: 'center',
    marginBottom: 30,
  },
  loginBtn: {
    backgroundColor: '#2c3e50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 15,
  },
  loginBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
  },
  signupBtn: {
    borderColor: '#2c3e50',
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  signupBtnText: {
    color: '#2c3e50',
    fontSize: 18,
    fontWeight: '500',
  },

});
