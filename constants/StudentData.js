import * as SecureStore from 'expo-secure-store';

const TOKEN_KEY = 'session_token';
const USER_KEY  = 'session_user';

// In-memory fallback for when rememberMe is false
let _token = null;
let _user  = null;

export async function saveSession(token, user, remember = false) {
  if (remember) {
    await SecureStore.setItemAsync(TOKEN_KEY, token);
    await SecureStore.setItemAsync(USER_KEY, JSON.stringify(user));
  } else {
    _token = token;
    _user  = user;
  }
}

export async function getToken() {
  if (_token) return _token;
  return await SecureStore.getItemAsync(TOKEN_KEY);
}

export async function getUser() {
  if (_user) return _user;
  const user = await SecureStore.getItemAsync(USER_KEY);
  return user ? JSON.parse(user) : null;
}

export async function clearSession() {
  _token = null;
  _user  = null;
  await SecureStore.deleteItemAsync(TOKEN_KEY);
  await SecureStore.deleteItemAsync(USER_KEY);
}

export async function isLoggedIn() {
  if (_token) return true;
  const token = await SecureStore.getItemAsync(TOKEN_KEY);
  return !!token;
}
