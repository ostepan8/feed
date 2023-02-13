import {StyleSheet, Text, View, SafeAreaView, Image} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import user from '../dummy-data/dummyData';
import {FlatList} from 'react-native-gesture-handler';
import {useWindowDimensions} from 'react-native';
import FeedPicture from '../assets/img/feed.png';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
const Feed = ({navigation, route}) => {
  const {height, width} = useWindowDimensions();
  return (
    <SafeAreaView>
      <View
        style={{
          width: width,
          height: height / 25,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: height / 200,
        }}>
        <Image
          style={{height: '100%', width: '30%'}}
          source={FeedPicture}></Image>
      </View>
      <FlatList
        data={user.posts}
        renderItem={item => {
          return (
            <View style={{width: width, height: height / 1.5}}>
              <View
                style={{
                  width: width,
                  height: width,
                  overflow: 'hidden',
                  position: 'absolute',
                }}>
                <Image
                  source={item.item.image}
                  style={{
                    zIndex: -1,
                    width: '100%',
                    height: '100%',
                    resizeMode: 'cover',
                  }}></Image>
              </View>
              <View style={{flexDirection: 'row'}}>
                <View style={styles.upperLeftContainer}>
                  <Text style={styles.upperTextStyle}>
                    <FontAwesomeIcon icon={faUser} color={'white'} />{' '}
                    {user.username}
                  </Text>
                  <Text style={styles.text}>
                    <FontAwesomeIcon
                      color={'white'}
                      icon={faCalendarDays}></FontAwesomeIcon>{' '}
                    {user.posts[item.index].time}
                  </Text>
                </View>
                <View>
                  <View style={styles.upperRightContainer}>
                    <Text style={styles.text}>
                      <FontAwesomeIcon icon={faLocationDot} color={'white'} />
                      {'  '}
                      {item.item.restaurant}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          );
        }}></FlatList>
    </SafeAreaView>
  );
};

export default Feed;

const styles = StyleSheet.create({
  upperTextStyle: {
    fontFamily: 'RedHatDisplay-Bold',
    color: 'white',
  },
  upperLeftContainer: {
    backgroundColor: '#1D1E1ECC',
    marginRight: 'auto',
    padding: 6,
    borderRadius: 8,
    marginLeft: 4,
    marginTop: 4,
  },
  upperRightContainer: {
    backgroundColor: '#1D1E1ECC',
    margin: 4,
    padding: 6,
    borderRadius: 8,
  },
  text: {fontFamily: 'RedHatDisplay-Bold', color: 'white'},
});
