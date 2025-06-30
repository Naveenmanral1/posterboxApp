import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import WishlistCard from '../components/WishlistCard';
import images from '../assets/images';

const Wishlist = () => {
  const [wishlistData, setWishlistData] = useState([]);
  const { products, wishlistItem, deleteFromWishlist } = useContext(ShopContext);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const id in wishlistItem) {
        if (wishlistItem[id]) {
          tempData.push({ _id: id });
        }
      }
      setWishlistData(tempData);
    }
  }, [wishlistItem, products]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Wishlist</Text>
      </View>

      {wishlistData.length > 0 ? (
        <FlatList
          data={wishlistData}
          renderItem={({ item, index }) => {
            const productData = products.find(product => product._id === item._id);
            return (
              <WishlistCard
                item={item}
                deleteFromWishlist={deleteFromWishlist}
                productData={productData}
                key={`productData-${index}`}
              />
            );
          }}
          keyExtractor={(item) => item._id.toString()}
          numColumns={2}
          contentContainerStyle={styles.listContainer}
          columnWrapperStyle={styles.columnWrapper}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Image style={styles.emptyImage} source={images.wishlist} resizeMode="contain" />
          <Text style={styles.emptyTitle}>Your Wishlist is Empty</Text>
          <Text style={styles.emptySubtitle}>Looks like you haven't added anything yet.</Text>
        </View>
      )}
    </View>
  );
};

export default Wishlist;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#d5d8dc',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
  },
  listContainer: {
    padding: 10,
    paddingBottom: 80,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyImage: {
    width: 250,
    height: 250,
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
