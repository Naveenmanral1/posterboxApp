import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import images from '../assets/images';

const WorkInProgress = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={images.wip} resizeMode="contain" />
      <Text style={styles.title}>Work In Progress</Text>
      <Text style={styles.subtitle}>We're building something awesome for you.</Text>
    </View>
  );
};

export default WorkInProgress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 250,
    height: 250,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#0c1e76',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    maxWidth: 300,
  },
});
