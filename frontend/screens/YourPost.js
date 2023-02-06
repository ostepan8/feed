import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';
import {SafeAreaView} from 'react-native-safe-area-context';
import color from '../color';
import user from '../dummy-data/dummyData';
import {useWindowDimensions} from 'react-native';
const YourPost = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  const {caption, image, restaurant, time} = route.params.data;

  return (
    <ScrollView>
      <SafeAreaView>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.navigate('Main')}>
            <FontAwesomeIcon
              size={20}
              style={{marginLeft: 16, marginTop: 'auto', marginBottom: 'auto'}}
              icon={faArrowLeft}
            />
          </Pressable>
          <View style={styles.headerAligner}>
            <Text style={styles.title}>{user.username}</Text>
          </View>
          <View style={{opacity: 0, marginRight: 16}}>
            <FontAwesomeIcon icon={faArrowLeft} size={20} />
          </View>
        </View>
        <View style={[styles.post, {width: width, height: width}]}>
          <Image source={image} style={{width: '100%', height: '100%'}}></Image>
        </View>
        <View>
          <Text>likes,comments, plated</Text>
        </View>
        <View>
          <Text>{user.username}</Text>
        </View>
        <View>
          <Text style={{position: 'absolute', zIndex: 1}}>{caption}</Text>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default YourPost;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    width: '100%',
  },
  headerAligner: {
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  title: {
    fontSize: 32,
    color: color.primaryOrange,
    fontFamily: 'RedHatDisplay-Medium',
  },
  post: {
    backgroundColor: 'grey',
    overflow: 'hidden',
  },
});
