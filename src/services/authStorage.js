// authStorage.js
import * as Keychain from 'react-native-keychain';

// Save access + refresh token
export const saveTokens = async (accessToken, refreshToken) => {
  if (!accessToken || !refreshToken) {
    console.warn('❗ Tried to save empty tokens. Skipping Keychain write.');
    return;
  }

  const combined = JSON.stringify({ accessToken, refreshToken });
  await Keychain.setGenericPassword('auth', combined);
};


export const getTokens = async () => {
  const credentials = await Keychain.getGenericPassword();
  if (!credentials) return null;
  try {
    return JSON.parse(credentials.password);
  } catch {
    return null;
  } 
};

export const getAccessToken = async () => {
  const tokens = await getTokens();
  return tokens?.accessToken || null;
};

export const getRefreshToken = async () => {
  const tokens = await getTokens();
  
  return tokens?.refreshToken || null;
};

export const clearTokens = async () => {
  await Keychain.resetGenericPassword();
};
