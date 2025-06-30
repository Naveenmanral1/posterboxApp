import { View, Text, Image, ScrollView } from 'react-native';
import Home from './src/screens/Home';
import ShopContextProvider from './src/context/ShopContext';
import PosterDetail from './src/screens/PosterDetail';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MyTabs from './src/navigation/TabNavigation';
import Login from './src/screens/Login';
import SignUp from './src/screens/SignUp';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import { store,persistor } from './src/store/store';
import PlaceOrder from './src/screens/PlaceOrder';
import MyOrder from './src/screens/MyOrder';
import Categories from './src/screens/Categories';
import WorkInProgress from './src/screens/WorkInProgress';
import Category from './src/components/Category';
import Protected from './src/components/AuthLayout';
import Payment from './src/screens/Payment';
import Search from './src/screens/Search';
import { PersistGate } from 'redux-persist/integration/react';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      <ShopContextProvider>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen
              name="MainTabs"
              component={MyTabs}
              options={{ headerShown: false }}
            />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="PlaceOrder">
              {props => (
                <Protected>
                  <PlaceOrder {...props} />
                </Protected>
              )}
            </Stack.Screen>

            <Stack.Screen name="Myorders">
              {props => (
                <Protected>
                  <MyOrder {...props} />
                </Protected>
              )}
            </Stack.Screen>
             <Stack.Screen name='WorkInProgress' component={WorkInProgress}/>
            <Stack.Screen name='Categories' component={Categories}/>
             <Stack.Screen name="Category" component={Category} />
              <Stack.Screen name="Payment" component={Payment} />
              <Stack.Screen name="Search" component={Search} />
            <Stack.Screen name="PosterDetails" component={PosterDetail} />
          </Stack.Navigator>
        </NavigationContainer>
        <Toast />
      </ShopContextProvider>
      </PersistGate>
    </Provider>
  );
}
