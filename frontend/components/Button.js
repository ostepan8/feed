import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Button = ({children, onPress, color, textColor}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => (pressed ? styles.pressed : null)}>
      <View style={[styles.buttonContainer, {backgroundColor: color}]}>
        <Text style={[styles.text, {color: textColor}]}>{children}</Text>
      </View>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    shadowOffset: {width: -2, height: 4},
    shadowColor: '#171717',
    shadowOpacity: 0.25,
    shadowRadius: 2,
  },
  text: {
    fontFamily: 'RedHatDisplay-Bold',
  },
  pressed: {
    opacity: 0.75,
  },
});
