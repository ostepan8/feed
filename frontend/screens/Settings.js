import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Pressable,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import React from 'react';
import {AuthContext} from '../store/auth-context';
import {useContext} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleUser} from '@fortawesome/free-solid-svg-icons/faCircleUser';
const Settings = ({navigation}) => {
  const authCntx = useContext(AuthContext);
  return (
    <ScrollView>
      <View style={styles.settingContainer}>
        <View style={[styles.logoutButton, {borderTopWidth: 0}]}>
          <Pressable onPress={() => authCntx.logout()}>
            <Text style={styles.logoutText}>Logout</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingContainer: {
    flex: 1,
    borderTopWidth: 1.5,
  },
  logoutButton: {
    borderColor: 'grey',
    borderTopWidth: 1.5,
  },
  logoutText: {
    fontSize: 16,
    padding: 8,
  },
});
