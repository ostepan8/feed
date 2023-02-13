import {
  ScrollView,
  View,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  FlatList,
  Image,
  RefreshControl,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import user from '../dummy-data/dummyData';
import ProfilePicture from '../components/ProfilePicture';
import {useWindowDimensions} from 'react-native';
import ProfileScroller from '../components/ProfileScroller';
import color from '../color';
import Followers from '../components/Followers';
import {useEffect} from 'react';
import {AuthContext} from '../store/auth-context';
import {useContext, useState} from 'react';
import Button from '../components/Button';
import Feed from '../assets/img/feed.png';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';

const MainPage = ({navigation, route}) => {
  const backgroundColor = 'white';
  const [data, setData] = useState({
    username: '',
    lname: '',
    bio: '',
    fname: '',
  });
  const [refreshing, setRefreshing] = useState(false);
  function getBackEndData() {
    fetch('http://localhost:3000/profile', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email: AuthCntx.username}),
    })
      .then(res => res.json())
      .then(data => {
        setData({
          username: data.username,
          fname: data.fname,
          bio: data.bio,
          lname: data.lname,
        });
      });
  }
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getBackEndData();
    setRefreshing(false);
  }, []);

  AuthCntx = useContext(AuthContext);

  useEffect(() => {
    getBackEndData();
  }, []);
  const {width, height} = useWindowDimensions();
  return (
    <SafeAreaView style={{backgroundColor: backgroundColor}}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: backgroundColor,
        }}>
        <View
          style={{
            position: 'absolute',
            width: '100%',
            zIndex: 1,
            flexDirection: 'row-reverse',
          }}>
          <Pressable onPress={() => navigation.navigate('Settings')}>
            <View style={styles.topHeader}>
              <FontAwesomeIcon icon={faGear} style={styles.settingsIcon} />
            </View>
          </Pressable>
        </View>
        <View style={[{borderBottomWidth: 1, borderBottomColor: '#00000020'}]}>
          <View style={{flexDirection: 'row', marginBottom: 8, marginTop: 4}}>
            <View
              style={{
                marginLeft: 16,
                marginTop: 'auto',
                marginBottom: 'auto',
              }}>
              <ProfilePicture radius={height / 10} user={null} />
              <Text
                style={[
                  styles.Text,
                  {
                    textAlign: 'center',
                    marginTop: 2,
                    fontSize: width / 25,
                    fontFamily: 'RedHatDisplay-Regular',
                  },
                ]}>
                {data.username}
              </Text>
            </View>
            <View
              style={{
                flex: 1,
              }}>
              <View
                style={{
                  marginVertical: 8,
                  width: '100%',
                  marginLeft: width / 20,
                }}>
                <Text
                  style={{
                    fontFamily: 'RedHatDisplay-Bold',
                    color: color.primaryOrange,
                    fontSize: height / 30,
                    textAlign: 'left',
                  }}>
                  {data.fname} {data.lname}
                </Text>
                <Text
                  style={[
                    styles.bioText,
                    styles.Text,
                    {
                      fontFamily: 'RedHatDisplay-Regular',
                      marginRight: width / 3.2,
                      textAlign: 'center',
                    },
                  ]}>
                  {data.bio ? data.bio : "Create your bio in 'edit'"}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginLeft: width / 15,
                  marginTop: 'auto',
                  marginRight: width / 48,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <Followers num={user.followers} type={'Followers'} />
                  <Followers num={user.following} type={'Following'} />
                </View>

                <View
                  style={[
                    styles.editButton,
                    {
                      height: height / 23,
                      width: width / 7,
                      borderRadius: height / 10,
                      backgroundColor: backgroundColor,
                    },
                  ]}>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('EditProfile', {data: data})
                    }>
                    <Text
                      style={{
                        color: color.primaryOrange,
                        fontFamily: 'RedHatDisplay-Bold',
                      }}>
                      Edit
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            height: (height * 7.1) / 10,
          }}>
          <View
            style={{
              overflow: 'hidden',
            }}>
            <Image
              style={{
                width: height / 9,
                height: height / 25,
                marginLeft: 'auto',
                marginRight: 'auto',
                marginTop: height / 125,
              }}
              source={Feed}></Image>
            {/* <Text
              style={[
                styles.profileTitle,
                {
                  textAlign: 'center',
                  marginTop: height / 200,
                  fontSize: height / 45,
                },
              ]}>
              Posts
            </Text> */}
          </View>
          <View style={{top: -height / 50}}>
            <View style={styles.slideshowContainer}>
              <Text
                style={[
                  styles.slideshowText,
                  {
                    fontSize: width / 30,
                    marginTop: 0,
                  },
                ]}>
                Breakfast
              </Text>
              <ProfileScroller
                data={user.posts}
                navigation={navigation}></ProfileScroller>
            </View>
            <View style={styles.slideshowContainer}>
              <Text
                style={[
                  styles.slideshowText,
                  {
                    fontSize: width / 30,
                  },
                ]}>
                Lunch
              </Text>
              <ProfileScroller
                data={user.posts}
                navigation={navigation}></ProfileScroller>
            </View>
            <View style={styles.slideshowContainer}>
              <Text
                style={[
                  styles.slideshowText,
                  {
                    fontSize: width / 30,
                  },
                ]}>
                Dinner
              </Text>
              <ProfileScroller
                data={user.posts}
                navigation={navigation}></ProfileScroller>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MainPage;
const styles = StyleSheet.create({
  headerContainer: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  profileTitle: {
    fontSize: 24,
    textAlign: 'center',
    color: color.primaryOrange,
    fontFamily: 'RedHatDisplay-Medium',
  },
  infoHolder: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
  },
  textContainer: {
    marginHorizontal: 10,
  },
  number: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  nameHolder: {
    marginBottom: 4,
    marginTop: 8,
  },
  nameInformation: {
    marginTop: -8,
  },
  followerContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#00000040',
    flexDirection: 'row',
    alignContent: 'center',
    justifyContent: 'center',
  },

  topHeader: {
    flexDirection: 'row-reverse',
    top: 2,
  },
  settingsIcon: {
    marginRight: 12,
  },
  postContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Text: {
    color: color.primaryOrange,
    fontFamily: 'RedHatDisplay-Bold',
  },
  bioText: {
    fontSize: 12,
  },
  slideshowContainer: {},
  slideshowText: {
    textAlign: 'left',
    marginLeft: 16,
    marginVertical: 6,
    overflow: 'hidden',
    fontFamily: 'RedHatDisplay-Regular',
    color: color.primaryOrange,
  },
  editButton: {
    backgroundColor: color.primaryOrange80,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 'auto',
    marginRight: 4,
    borderWidth: 2,
    borderColor: color.primaryOrange,
  },
});
