import {
  StyleSheet,
  Text,
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
const BottomTabIcon = ({icon, navigate, where, color}) => {
  const {width, height} = useWindowDimensions();
  return (
    <View style={styles.iconContainer}>
      <Pressable onPress={() => navigate(where)}>
        <FontAwesomeIcon
          style={{color: color}}
          icon={icon}
          size={width / 16}></FontAwesomeIcon>
      </Pressable>
    </View>
  );
};

export default BottomTabIcon;

const styles = StyleSheet.create({
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 6,
    top: 6,
    marginHorizontal: -5,
  },
});
