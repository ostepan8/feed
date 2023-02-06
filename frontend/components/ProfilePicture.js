import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faCircleUser} from '@fortawesome/free-regular-svg-icons/faCircleUser';
import color from '../color';

const ProfilePicture = ({radius, user}) => {
  return (
    <View
      style={[
        styles.profilePictureContainer,
        {height: radius, width: radius, borderRadius: radius / 2},
      ]}>
      {user ? null : (
        <FontAwesomeIcon
          style={styles.icon}
          icon={faCircleUser}
          size={radius}
        />
      )}
    </View>
  );
};

export default ProfilePicture;

const styles = StyleSheet.create({
  profilePictureContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,

    borderColor: color.primaryOrange80,
  },

  icon: {
    color: color.primaryOrange80,
  },
});
