// react-native.config.js
module.exports = {
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        android: null, // 👈 Prevents native autolinking for Android
      },
    },
  },
};
