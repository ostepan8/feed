import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import {useEffect} from 'react';
import user from '../dummy-data/dummyData';
import {FlatList, TextInput} from 'react-native-gesture-handler';
import {useWindowDimensions} from 'react-native';
import FeedPicture from '../assets/img/feed.png';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import {faCalendarDays} from '@fortawesome/free-solid-svg-icons';
import color from '../color';
import {faComment, faHeart} from '@fortawesome/free-regular-svg-icons';
import PostPicture from '../components/PostPicture';
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
              <PostPicture params={item.item}></PostPicture>
              <View>
                <View>
                  <View
                    style={{
                      borderBottomWidth: 1,
                      flexDirection: 'row',
                      justifyContent: 'center',
                    }}>
                    <FontAwesomeIcon
                      style={styles.icon}
                      size={width / 12}
                      icon={faHeart}></FontAwesomeIcon>
                    <FontAwesomeIcon
                      style={styles.icon}
                      size={width / 12}
                      icon={faComment}></FontAwesomeIcon>
                    <FontAwesomeIcon
                      style={styles.icon}
                      size={width / 12}
                      icon={faHeart}></FontAwesomeIcon>
                  </View>

                  <View
                    style={{
                      paddingHorizontal: 8,
                      paddingVertical: 8,
                      borderBottomWidth: 1,
                    }}>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'RedHatDisplay-Bold'}}>
                        user123{' '}
                      </Text>
                      <Text>Lol</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'RedHatDisplay-Bold'}}>
                        plauer323{' '}
                      </Text>
                      <Text>OMG</Text>
                    </View>
                    <View style={{flexDirection: 'row'}}>
                      <Text style={{fontFamily: 'RedHatDisplay-Bold'}}>
                        esato23{' '}
                      </Text>
                      <Text>this looks really good</Text>
                    </View>
                    <Pressable>
                      <Text
                        style={{
                          fontFamily: 'RedHatDisplay-Bold',
                          color: color.primaryOrange,
                          textDecorationLine: 'underline',
                        }}>
                        Add a comment
                      </Text>
                    </Pressable>
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
  icon: {
    color: color.primaryOrange,
    marginHorizontal: 8,
    marginVertical: 8,
  },
});
