import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { View, ActivityIndicator } from 'react-native';

export default function Protected({ children, authentication = true }) {
  const navigation = useNavigation();
  const authStatus = useSelector((state) => state.auth.status);
  const loading = false; // optionally, use a real loader from redux/state

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigation.navigate('Login'); // or your desired screen
    }
    if (!authentication && authStatus !== authentication) {
      navigation.navigate('Home');
    }
  }, [authStatus, authentication]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  }

  return <>{children}</>;
}
