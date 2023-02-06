import React, { useEffect } from 'react';

import {
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from './screens/Welcome';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContextProvider from './store/auth-context';
import { AuthContext } from './store/auth-context';
import { useContext, } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Feed from './screens/Feed';
import Search from './screens/Search';
import Plate from './screens/Plate';
import Profile from './screens/Profile';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faCircleUser} from '@fortawesome/free-regular-svg-icons/faCircleUser';
import { useWindowDimensions } from 'react-native';
import BottomTabIcon from './components/BottomTabIcon';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import { faList } from '@fortawesome/free-solid-svg-icons';
import color from './color';

function UnAuthenticatedStack(){
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator >
    <Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
    <Stack.Screen name="Login" component={Login} options={{headerShown: false}}/>
    <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />
    </Stack.Navigator>
  )
}
function AuthenticatedStack(){
  const {width, height} = useWindowDimensions()
  const Tab = createBottomTabNavigator();
  return (
  <Tab.Navigator>
    <Tab.Screen name="Feed" component={Feed}  options={({ navigation }) => ({
        tabBarButton: (props) => (
          <View style={[styles.bottomTabContainer, {marginLeft: 'auto'}]}>
          <BottomTabIcon navigate ={navigation.navigate}icon={faHome} where={"Feed"} color={props.accessibilityState?.selected? color.primaryOrange:'#00000050'}/>   
          </View>      
          
        ),
        headerShown: false
      })} />
    <Tab.Screen
      name="Search"
      component={Search}
      options={({ navigation }) => ({
        tabBarButton: (props) => (
          <View style={styles.bottomTabContainer}>
            <BottomTabIcon navigate ={navigation.navigate} where={"Search"}icon={faMagnifyingGlass} color={props.accessibilityState?.selected? color.primaryOrange:'#00000050'} />         
          </View>
        
          
        ),
        headerShown: false
      })}
    />
    <Tab.Screen
      name="Plate"
      component={Plate}
      options={({ navigation }) => ({
        tabBarButton: (props) => (

          <View style={styles.bottomTabContainer}>
            <BottomTabIcon navigate ={navigation.navigate} where={"Plate"}icon={faList} color={props.accessibilityState?.selected? color.primaryOrange:'#00000050'}/> 
          </View>        
          
        ),
        headerShown: false
      })}
    />
    <Tab.Screen
      name="Profile"
      component={Profile}
      options={({ navigation }) => ({
        tabBarButton: (props) => (
          <View style={[styles.bottomTabContainer, {marginRight: 'auto'}]}>
          <BottomTabIcon navigate ={navigation.navigate} where={"Profile"} icon={faCircleUser} color={props.accessibilityState?.selected? color.primaryOrange:'#00000050'}/>    
          </View>     
        ),
        headerShown: false,
      })}
      
    />
  </Tab.Navigator>
  )
}
function Navigation(){
  const authCntx = useContext(AuthContext)
  return(
    <NavigationContainer>
    {!authCntx.isAuthenticated && <UnAuthenticatedStack/>}
    {authCntx.isAuthenticated && <AuthenticatedStack/>}
  </NavigationContainer>
  )
}

function App(): JSX.Element {
  return (
    <>
     <StatusBar></StatusBar>
        <AuthContextProvider>
      <Navigation/>
    </AuthContextProvider>
    </>
   

  );
}

const styles = StyleSheet.create({
  iconContainer:{
    width: '25%',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon:{
    color: 'blue'
  },
  bottomTabContainer:{
    marginHorizontal: '5%' 
  }

});

export default App;
