import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import color from '../color';
import Button from '../components/Button';
import {AuthContext} from '../store/auth-context';
import {useWindowDimensions} from 'react-native';

const NewPost = ({navigation}) => {
  const {width, height} = useWindowDimensions();
  const [errMsg, setErrMsg] = useState('');
  function sendToBackend() {
    fetch('http://localhost:3000/NewPost', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data),
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setErrMsg(data.error);
        } else {
          navigation.navigate('Feed');
        }
      });
  }
  AuthCntx = useContext(AuthContext);
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = date.getDate();
  let postDate = day + '/' + month + 1 + '/' + year;
  const [typeState, setTypeState] = useState(0);
  const [data, setData] = useState({
    username: AuthCntx.username,
    caption: '',
    location: ' ',
    time: postDate,
    type: '',
  });

  return (
    <View>
      <SafeAreaView>
        <KeyboardAvoidingView behavior="position">
          <View
            style={{
              height: width,
              width: width,
              backgroundColor: color.primaryOrange80,
            }}></View>
          <View style={styles.inputContainer}>
            <Text style={{fontFamily: 'RedHatDisplay-Bold', color: 'white'}}>
              Caption
            </Text>
            <TextInput
              onPressIn={() => setErrMsg('')}
              style={{fontFamily: 'RedHatDisplay-Regular'}}
              placeholderTextColor={'#606060'}
              placeholder="What will you caption your post "
              onChangeText={text =>
                setData({...data, caption: text})
              }></TextInput>
          </View>
          <View style={styles.inputContainer}>
            <Text style={{fontFamily: 'RedHatDisplay-Bold', color: 'white'}}>
              Location
            </Text>
            <TextInput
              onPressIn={() => setErrMsg('')}
              style={{fontFamily: 'RedHatDisplay-Regular'}}
              placeholderTextColor={'#606060'}
              placeholder="Where did you get your food?"
              onChangeText={text =>
                setData({...data, location: text})
              }></TextInput>
          </View>
        </KeyboardAvoidingView>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginVertical: 8,
          }}>
          <View style={styles.Button}>
            <Button
              onPress={() => {
                setTypeState(1);
                setData({...data, type: 'Breakfast'});
              }}
              style={styles.Button}
              textColor={typeState == 1 ? 'white' : 'black'}
              color={typeState == 1 ? color.primaryOrange : '#DEDCDCCC'}>
              Breakfast
            </Button>
          </View>
          <View style={styles.Button}>
            <Button
              onPress={() => {
                setTypeState(2);
                setData({...data, type: 'Lunch'});
              }}
              style={styles.Button}
              textColor={typeState == 2 ? 'white' : 'black'}
              color={typeState == 2 ? color.primaryOrange : '#DEDCDCCC'}>
              Lunch
            </Button>
          </View>

          <View style={styles.Button}>
            <Button
              onPress={() => {
                setTypeState(3);
                setData({...data, type: 'Dinner'});
              }}
              textColor={typeState == 3 ? 'white' : 'black'}
              color={typeState == 3 ? color.primaryOrange : '#DEDCDCCC'}>
              Dinner
            </Button>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
          }}>
          <Button onPress={sendToBackend} color={color.primaryOrange80}>
            Post the picture
          </Button>
        </View>
        {errMsg && (
          <View
            style={{
              borderWidth: 1,
              borderColor: 'red',
              padding: 16,
              marginTop: 16,
              borderRadius: 20,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
            <Text style={{color: 'red', textAlign: 'center'}}>{errMsg}</Text>
          </View>
        )}
      </SafeAreaView>
    </View>
  );
};

export default NewPost;

const styles = StyleSheet.create({
  Button: {
    marginHorizontal: 4,
  },
  inputContainer: {
    backgroundColor: color.primaryOrange,
    padding: 6,
    borderRadius: 8,
    marginLeft: 4,
    marginTop: 4,
  },
});
