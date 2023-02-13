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
  const [username, setUsername] = useState();
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem('token');
      if (storedToken) {
        setAuthToken(storedToken);
      }
      const storedUsername = await AsyncStorage.getItem('email');
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
    setUsername(null);
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('email');
  }
  function storeUsername(email) {
    setUsername(email);
    AsyncStorage.setItem('email', email);
  }
  const value = {
    token: authToken,
    isAuthenticated: !!authToken,
    authenticate: authenticate,
    logout: logout,
    storeUsername: storeUsername,
    username: username,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
export default AuthContextProvider;
