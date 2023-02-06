import {
  ScrollView,
  View,
  SafeAreaView,
  Pressable,
  StyleSheet,
  Text,
  FlatList,
  Image,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faGear} from '@fortawesome/free-solid-svg-icons';
import user from '../dummy-data/dummyData';
import ProfilePicture from '../components/ProfilePicture';
import {useWindowDimensions} from 'react-native';
const MainPage = ({navigation, route}) => {
  const {width, height} = useWindowDimensions();
  return (
    <SafeAreaView>
      <ScrollView>
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

        <View style={styles.headerContainer}>
          <Text style={styles.profileTitle}>{user.username}</Text>
        </View>
        <View style={styles.infoHolder}>
          <View style={styles.nameInformation}>
            <ProfilePicture radius={100} user={null} />
          </View>
          <View style={styles.nameHolder}>
            <Text style={styles.profileName}>{user.name}</Text>
          </View>
        </View>
        <View style={styles.bio}>
          <Text style={[styles.bioText, styles.Text]}>{user.bio}</Text>
        </View>
        <View style={styles.followerContainer}>
          <View style={[styles.textContainer, {marginBottom: 16}]}>
            <Text style={[styles.number, styles.Text]}>
              {user.posts.length}
            </Text>
            <Text style={styles.Text}>Posts</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.number, styles.Text]}>{user.followers}</Text>
            <Text style={styles.Text}>Followers</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.number, styles.Text]}>{user.following}</Text>
            <Text style={styles.Text}>Following</Text>
          </View>
        </View>

        <View style={styles.postContainer}>
          <FlatList
            scrollEnabled={false}
            data={user.posts}
            style={{flex: 1}}
            numColumns={3}
            renderItem={item => {
              return (
                <View
                  style={[
                    {
                      height: width / 3.25,
                      width: width / 3.25,
                      margin: 2,
                      borderWidth: 1,
                      borderColor: color.primaryOrange80,
                      borderRadius: 6,
                      overflow: 'hidden',
                    },
                  ]}>
                  <Pressable
                    onPress={() => {
                      navigation.navigate('YourPost', {
                        data: item.item,
                        index: item.index,
                      });
                    }}>
                    <Image
                      source={item.item.image}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'cover',
                      }}></Image>
                  </Pressable>
                </View>
              );
            }}></FlatList>
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
  },
  textContainer: {
    marginHorizontal: 10,
  },
  number: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  profileName: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: color.primaryOrange,
    fontFamily: 'RedHatDisplay-Bold',
    fontSize: 24,
  },
  nameHolder: {
    marginBottom: 4,
    marginTop: 8,
  },
  nameInformation: {
    marginTop: -4,
  },
  followerContainer: {
    flexDirection: 'row',

    alignContent: 'center',
    justifyContent: 'center',
  },

  topHeader: {
    flexDirection: 'row-reverse',
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
  bio: {
    marginBottom: 8,
  },
  bioText: {
    fontSize: 12,
    marginLeft: 32,
    marginRight: 32,
    textAlign: 'center',
  },
});
