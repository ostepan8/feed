import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
} from 'react-native';
import React, {useContext, useState} from 'react';
import image from '../assets/img/welcomeBackground.jpg';
import color from '../color';
import Button from '../components/Button';
import feed from '../assets/img/feed.png';
import {AuthContext} from '../store/auth-context';
import {useWindowDimensions} from 'react-native';

const SignUp = ({navigation}) => {
  const {height, width} = useWindowDimensions();
  const [fdata, setFdata] = useState({
    fname: '',
    lname: '',
    email: '',
    password: '',
    cPassword: '',
    username: '',
  });
  const authCntx = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState(null);
  function navigate(location) {
    navigation.navigate(location);
  }
  function sendToTheBackend() {
    if (
      fdata.fname == '' ||
      fdata.cPassword == '' ||
      fdata.password == '' ||
      fdata.username == '' ||
      fdata.email == '' ||
      fdata.lname == ''
    ) {
      setErrorMsg('Please set all fields');
      return;
    }
    if (fdata.password != fdata.cPassword) {
      setErrorMsg('Your passwords do not match');
      return;
    } else {
      fetch('http://localhost:3000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(fdata),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setErrorMsg(data.error);
          } else {
            alert('Account created successfully');
            navigation.navigate('Login');
          }
        });
    }
  }
  return (
    <KeyboardAvoidingView behavior="height">
      <Image style={styles.image} source={image} />
      <View>
        <View style={styles.innerContainer}>
          <View style={styles.section}>
            <View style={styles.middle}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  top: '-10%',
                }}>
                <Image source={feed} style={styles.logo}></Image>
              </View>
            </View>
            <View style={{marginTop: '-8%'}}>
              <Text style={styles.h1}>Create New Account</Text>
              <View style={styles.createAccountContainer}>
                <Text style={styles.text}>Already have an account?</Text>
                <Pressable onPress={() => navigate('Login')}>
                  <Text style={styles.link}> Login here</Text>
                </Pressable>
              </View>
            </View>
            {errorMsg ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorMsg}>{errorMsg}</Text>
              </View>
            ) : null}
            <ScrollView>
              <View
                style={[
                  styles.formGroup,
                  {flexDirection: 'row', justifyContent: 'space-between'},
                ]}>
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={styles.label}>First Name</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onPressIn={() => setErrorMsg(null)}
                    onChangeText={text => setFdata({...fdata, fname: text})}
                    style={[
                      styles.input,
                      {paddingHorizontal: 16, width: width / 2.3},
                    ]}
                    placeholder="Enter your first name"></TextInput>
                </View>

                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingHorizontal: 16,
                  }}>
                  <Text style={styles.label}>Last Name</Text>
                  <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    onPressIn={() => setErrorMsg(null)}
                    onChangeText={text => setFdata({...fdata, lname: text})}
                    style={[
                      styles.input,
                      {paddingHorizontal: 16, width: width / 2.4},
                    ]}
                    placeholder="Enter your last name"></TextInput>
                </View>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>E-Mail</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onPressIn={() => setErrorMsg(null)}
                  onChangeText={text => setFdata({...fdata, email: text})}
                  style={styles.input}
                  placeholder="Enter your email"></TextInput>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Create a Username?</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onPressIn={() => setErrorMsg(null)}
                  onChangeText={text => setFdata({...fdata, username: text})}
                  style={styles.input}
                  placeholder="Enter your username"></TextInput>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Password</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onPressIn={() => setErrorMsg(null)}
                  onChangeText={text => setFdata({...fdata, password: text})}
                  secureTextEntry={true}
                  style={styles.input}
                  placeholder="Enter your password"></TextInput>
              </View>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                  autoCapitalize="none"
                  autoCorrect={false}
                  onPressIn={() => setErrorMsg(null)}
                  onChangeText={text => setFdata({...fdata, cPassword: text})}
                  style={styles.input}
                  secureTextEntry={true}
                  placeholder="Confirm your password"></TextInput>
              </View>

              <View style={styles.buttonContainer}>
                <Button
                  onPress={sendToTheBackend}
                  color={color.primaryOrange80}>
                  SIGN UP
                </Button>
              </View>
            </ScrollView>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  image: {
    zIndex: -1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  innerContainer: {
    display: 'flex',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
  },

  section: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    height: '80 %',
    borderRadius: 30,
    padding: 20,
  },
  h1: {
    fontSize: 32,
    textAlign: 'center',
    fontFamily: 'RedHatDisplay-Medium',
  },
  input: {
    padding: 10,
    backgroundColor: color.primaryOrange80,
    borderRadius: 20,
    fontFamily: 'RedHatDisplay-Medium',
  },
  h2: {
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'RedHatDisplay-Medium',
  },
  formGroup: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginVertical: 8,
  },
  label: {
    fontSize: 17,
    color: '#000',
    marginLeft: 10,
    marginBottom: 5,
    fontFamily: 'RedHatDisplay-Medium',
  },
  forgotPasswordContainer: {
    display: 'flex',
    alignItems: 'flex-end',
    marginHorizontal: 10,
    marginVertical: 8,
  },
  link: {
    color: color.primaryOrange80,
    fontSize: 14,
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 4,
  },
  middle: {
    marginRight: 'auto',
    marginLeft: 'auto',

    marginBottom: '-8%',
    width: '100%',
    height: '25%',
    overflow: 'hidden',
  },
  logo: {
    width: '100%',
    resizeMode: 'contain',
    marginVertical: 10,
  },
  text: {
    fontFamily: 'RedHatDisplay-Medium',
    fontSize: 14,
  },
  errorMsg: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
    padding: 4,
    paddingHorizontal: 32,
  },
  errorContainer: {
    backgroundColor: '#FF000090',

    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 24,
    marginBottom: 12,
    marginTop: 4,
  },
});
