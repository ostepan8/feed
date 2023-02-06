import {StyleSheet, Text, View, Image, Pressable} from 'react-native';
import React from 'react';
import image from '../assets/img/welcomeBackground.jpg';
import color from '../color';
import feed from '../assets/img/feed.png';
import {useWindowDimensions} from 'react-native';
import Button from '../components/Button';

const Welcome = ({navigation}) => {
  const {height, width} = useWindowDimensions();

  return (
    <Pressable onPress={() => navigation.navigate('Login')}>
      <View style={styles.container}>
        <Image style={styles.image} source={image}></Image>
        <View style={styles.innerContainer}>
          <Image source={feed} style={styles.logo}></Image>
        </View>
        <Text style={styles.text}>press anywhere to login</Text>
      </View>
    </Pressable>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    zIndex: -1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    top: '-5%',
  },
  logo: {
    height: '30%',
    left: '-12%',
    resizeMode: 'contain',
  },
  text: {
    color: color.primaryOrange,
    textAlign: 'center',
    marginBottom: 24,
    fontFamily: 'RedHatDisplay-Medium',
  },
});
