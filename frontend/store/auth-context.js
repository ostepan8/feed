import {createContext, useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const AuthContext = createContext({
  token: '',
  isAuthenticated: 'false',
  authenticate: token => {},
  logout: () => {},
});
function AuthContextProvider({children}) {
  const [authToken, setAuthToken] = useState();
  const [email, setEmail] = useState();
  const [username, setUsername] = useState('');
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setAuthToken(storedToken);
      }
      const storedEmail = await AsyncStorage.getItem('email');
      if (storedEmail) {
        setEmail(storedEmail);
      }
      const storedUsername = await AsyncStorage.getItem('username');
      if (storedUsername) {
        setUsername(storedUsername);
      }
    }
    fetchToken();
  }, []);
  function authenticate(token) {
    setAuthToken(token);
    AsyncStorage.setItem('token', token);
  }
  function logout() {
    setAuthToken(null);
    setEmail(null);
    setUsername(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('email');
    AsyncStorage.removeItem('username');
  }
  function storeEmail(email) {
    setEmail(email);
    AsyncStorage.setItem('email', email);
  }
  function storeUsername(user) {
    setUsername(user);
    AsyncStorage.setItem('username', user);
  }
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    storeEmail: storeEmail,
    email: email,
    username: username,
    storeUsername: storeUsername,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
