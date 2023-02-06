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
        <Pressable onPress={() => authCntx.logout()}>
          <View style={styles.logoutButton}>
            <Text style={styles.logoutText}>Logout</Text>
          </View>
          <FontAwesomeIcon icon={faCircleUser}></FontAwesomeIcon>
        </Pressable>
      </View>
    </ScrollView>
  );
};

export default Settings;

const styles = StyleSheet.create({
  settingContainer: {
    flex: 1,
  },
  logoutButton: {
    borderTopWidth: 1.5,
    borderBottomWidth: 1.5,
    borderColor: 'grey',
  },
  logoutText: {
    fontSize: 16,
    padding: 8,
  },
});
