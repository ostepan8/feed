import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faUser} from '@fortawesome/free-solid-svg-icons';
import user from '../dummy-data/dummyData';
import {faCalendarDays} from '@fortawesome/free-regular-svg-icons';
import {faLocationDot} from '@fortawesome/free-solid-svg-icons';
import {AuthContext} from '../store/auth-context';
import {useContext} from 'react';
const PostPicture = ({params}) => {
  const {image, username, location, time} = params;
  console.log(params);
  const authCntx = useContext(AuthContext);
  const {height, width} = useWindowDimensions();
  return (
    <View>
      <View
        style={{
          width: width,
          height: width,
          overflow: 'hidden',
          position: 'absolute',
        }}>
        <Image
          source={image}
          style={{
            zIndex: -1,
            width: '100%',
            height: '100%',
            resizeMode: 'cover',
          }}></Image>
      </View>
      <View style={{height: width}}>
        <View style={{flexDirection: 'row'}}>
          <View style={styles.upperLeftContainer}>
            <Text style={styles.upperTextStyle}>
              <FontAwesomeIcon icon={faUser} color={'white'} />
              {username}
            </Text>
            <Text style={styles.text}>
              <FontAwesomeIcon
                color={'white'}
                icon={faCalendarDays}></FontAwesomeIcon>{' '}
              {time}
            </Text>
          </View>
          <View>
            <View style={styles.upperRightContainer}>
              <Text style={styles.text}>
                <FontAwesomeIcon icon={faLocationDot} color={'white'} />
                {'  '}
                {location}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PostPicture;

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
