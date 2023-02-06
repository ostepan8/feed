import React from 'react';

import MainPage from './MainPage';

import Settings from './Settings';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import YourPost from './YourPost';
const Profile = ({navigation, route}) => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        component={MainPage}
        options={{headerShown: false}}
      />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="YourPost"
        component={YourPost}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Profile;
