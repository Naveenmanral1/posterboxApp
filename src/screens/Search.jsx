import React, { useContext, useState, useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  FlatList,
} from 'react-native';
import SearchBar from '../components/SearchBar';
import PosterCard from '../components/PosterCard';
import { ShopContext } from '../context/ShopContext';

let debounceTimer;

const Search = () => {
  const { search, setSearch, products } = useContext(ShopContext);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {
      if (search.trim()) {
        const filtered = products.filter((item) =>
          item.title.toLowerCase().includes(search.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        setFilteredProducts([]);
      }
    }, 300); // wait 300ms after user stops typing

    return () => clearTimeout(debounceTimer);
  }, [search, products]);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Search Posters</Text>

      <SearchBar
        value={search}
        onChangeText={(text) => setSearch(text)}
        placeholder="Search posters..."
        
      />

      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item._id.toString()}
        renderItem={({ item }) => <PosterCard {...item} />}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
        contentContainerStyle={[
          styles.listContent,
          filteredProducts.length === 0 && { flex: 1, justifyContent: 'center' },
        ]}
        ListEmptyComponent={
          search ? (
            <Text style={styles.noResultText}>No matching posters found.</Text>
          ) : null
        }
        style={{marginTop:20}}
      />
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 10,
    marginBottom: 8,
    color: '#111',
  },
  listContent: {
    paddingBottom: 20,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  noResultText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 40,
  },
});