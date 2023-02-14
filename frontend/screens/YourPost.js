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
import {faHeart} from '@fortawesome/free-regular-svg-icons';
import {faComment} from '@fortawesome/free-regular-svg-icons';
import PostPicture from '../components/PostPicture';
import {AuthContext} from '../store/auth-context';
import {useContext} from 'react';

const YourPost = ({navigation, route}) => {
  const AuthCntx = useContext(AuthContext);
  const {height, width} = useWindowDimensions();
  const {caption, image, location, time} = route.params.data;
  const dataObject = {
    caption: caption,
    image: image,
    location: location,
    time: time,
    username: AuthCntx.username,
  };
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
          <PostPicture params={dataObject}></PostPicture>
        </View>
        <View style={styles.buttonContainer}>
          <View style={styles.heart}>
            <Pressable onPress={() => console.log('liked')}>
              <FontAwesomeIcon size={height / 30} icon={faHeart} />
            </Pressable>
          </View>
          <View style={styles.comment}>
            <Pressable onPress={() => console.log('commented')}>
              <FontAwesomeIcon size={height / 30} icon={faComment} />
            </Pressable>
          </View>
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
    paddingBottom: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#00000020',
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
    overflow: 'hidden',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderBottomColor: '#00000020',
    borderTopColor: '#00000020',
  },
  buttonContainer: {
    flexDirection: 'row',
    padding: 8,
  },
  heart: {
    marginRight: 8,
  },
  comment: {
    marginHorizontal: 8,
  },
});
