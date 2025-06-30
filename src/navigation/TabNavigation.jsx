import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Account from "../screens/Account";
import Cart from "../screens/Cart";
import Categories from "../screens/Categories";
import Wishlist from "../screens/Wishlist";
import Home from "../screens/Home";
import HomeIcon from 'react-native-vector-icons/Ionicons';
import HeartIcon from 'react-native-vector-icons/Feather';
import ProfileIcon from 'react-native-vector-icons/Feather';
import CartIcon from 'react-native-vector-icons/Feather';
import CategoryIcon from 'react-native-vector-icons/Feather';
import { StyleSheet, Text, View } from "react-native";
import { ShopContext } from "../context/ShopContext";
import { useContext } from "react";

const Tab = createBottomTabNavigator();

function MyTabs() {
  const { getCartCount } = useContext(ShopContext);

  const ACTIVE_COLOR = "#1f5ae1"; // Tomato or your brand color
  const INACTIVE_COLOR = "#6e6e6e";

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 12,
          marginBottom: 5,
        },
        tabBarStyle: {
          height: 65,
          paddingBottom: 5,
          paddingTop: 5,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let icon;
          let iconColor = focused ? ACTIVE_COLOR : INACTIVE_COLOR;

          switch (route.name) {
            case "Home":
              icon = <HomeIcon name="home-outline" size={24} color={iconColor} />;
              break;
            case "Wishlist":
              icon = <HeartIcon name="heart" size={24} color={iconColor} />;
              break;
            case "Categories":
              icon = <CategoryIcon name="grid" size={24} color={iconColor} />;
              break;
            case "Account":
              icon = <ProfileIcon name="user" size={24} color={iconColor} />;
              break;
            case "Cart":
              icon = (
                <View>
                  <CartIcon name="shopping-cart" size={24} color={iconColor} />
                  {getCartCount() > 0 && (
                    <Text style={styles.cartCount}>{getCartCount()}</Text>
                  )}
                </View>
              );
              break;
          }

          return icon;
        },
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Wishlist" component={Wishlist} />
      <Tab.Screen name="Categories" component={Categories} />
      <Tab.Screen name="Account" component={Account} />
      <Tab.Screen name="Cart" component={Cart} />
    </Tab.Navigator>
  );
}

export default MyTabs;

const styles = StyleSheet.create({
  cartCount: {
    position: "absolute",
    right: -10,
    top: -5,
    backgroundColor: "red",
    color: "white",
    borderRadius: 10,
    paddingHorizontal: 5,
    fontSize: 10,
    fontWeight: "bold",
    overflow: "hidden",
    zIndex: 10,
  },
});
