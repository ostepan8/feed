import {StyleSheet, Text, View, SafeAreaView, Pressable} from 'react-native';
import React, {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft, faArrowRight} from '@fortawesome/free-solid-svg-icons';
import ProfilePicture from '../components/ProfilePicture';
import {useWindowDimensions} from 'react-native';
import Button from '../components/Button';
import color from '../color';
import {useContext} from 'react';
import {AuthContext} from '../store/auth-context';
import EditProfileField from '../components/EditProfileField';

import {TextInput} from 'react-native-gesture-handler';
const EditProfile = ({navigation, route}) => {
  const {bio, lname, fname, username} = route.params.data;
  const {width, height} = useWindowDimensions();
  const authCntx = useContext(AuthContext);
  const [data, setData] = useState({email: authCntx.username, bio: ''});
  function sendToBackend() {
    fetch('http://localhost:3000/editprofile', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setErrorMsg(data.error);
        } else {
        }
      });
  }

  return (
    <View>
      <SafeAreaView>
        <Pressable onPress={() => navigation.navigate('Main')}>
          <View style={{marginLeft: 4}}>
            <FontAwesomeIcon
              icon={faArrowLeft}
              size={height / 40}></FontAwesomeIcon>
          </View>
        </Pressable>
        <View>
          <View
            style={{
              width: '100%',
              alignItems: 'center',
            }}>
            <ProfilePicture radius={height / 10} user={null} />
          </View>
          <View>
            <Text style={styles.title}>Edit Bio</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontSize: width / 22}}>{bio}</Text>
              </View>

              <FontAwesomeIcon
                size={width / 12}
                style={{marginHorizontal: 4}}
                icon={faArrowRight}></FontAwesomeIcon>
              <TextInput
                style={[
                  styles.textInput,
                  {height: height / 25, width: (width * 4.5) / 10},
                ]}
                onChangeText={text => {
                  setData({...data, bio: text});
                }}></TextInput>
            </View>
          </View>
          <View>
            <Text style={styles.title}>Edit Bio</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <View>
                <Text style={{fontSize: width / 22}}>{bio}</Text>
              </View>

              <FontAwesomeIcon
                size={width / 12}
                style={{marginHorizontal: 4}}
                icon={faArrowRight}></FontAwesomeIcon>
              <TextInput
                style={[
                  styles.textInput,
                  {height: height / 25, width: (width * 4.5) / 10},
                ]}
                onChangeText={text => {
                  setData({...data, bio: text});
                }}></TextInput>
            </View>
          </View>

          <Button
            onPress={() => {
              sendToBackend(data);
              navigation.navigate('Main');
            }}>
            Save Changes
          </Button>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default EditProfile;

const styles = StyleSheet.create({
  w100: {
    width: '100%',
  },
  textInput: {
    backgroundColor: color.primaryOrange80,
    marginRight: 'auto',
    marginLeft: 'auto',
    borderRadius: 4,
  },
  title: {
    fontFamily: 'RedHatDisplay-Bold',
    textAlign: 'center',
  },
});
