import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import color from '../color';

const Followers = ({num, type}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{type}</Text>
      <Text style={styles.number}>{num}</Text>
    </View>
  );
};

export default Followers;

const styles = StyleSheet.create({
  title: {
    fontFamily: 'RedHatDisplay-Bold',
    color: color.primaryOrange,
  },
  number: {
    textAlign: 'center',
    color: color.primaryOrange,
  },
  container: {marginHorizontal: 8},
});
