import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState, useContext} from 'react';
import image from '../assets/img/welcomeBackground.jpg';
import color from '../color';
import Button from '../components/Button';
import feed from '../assets/img/feed.png';
import {AuthContext} from '../store/auth-context';
const Login = ({navigation}) => {
  const [token, setAuthToken] = useState(null);
  const [fdata, setFdata] = useState({
    email: '',
    password: '',
  });
  const authCntx = useContext(AuthContext);
  const [errorMsg, setErrorMsg] = useState(null);
  function navigate(location) {
    navigation.navigate(location);
  }
  function setBackendData() {
    if (fdata.email == '' || fdata.password == '') {
      setErrorMsg('Please fill out both fields');
      return;
    } else {
      fetch('http://localhost:3000/signin', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(fdata),
      })
        .then(res => res.json())
        .then(data => {
          if (data.error) {
            setErrorMsg(data.error);
          } else {
            console.log(data);
            authCntx.authenticate(data.token);
            authCntx.storeEmail(fdata.email);
            authCntx.storeUsername(data.username);
          }
        });
    }
  }
  return (
    <KeyboardAvoidingView behavior="position" style={styles.container}>
      <Image style={styles.image} source={image} />
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.section}></View>
          <View style={styles.section2}>
            <View style={styles.middle}>
              <View
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Image source={feed} style={[styles.logo]}></Image>
              </View>
            </View>

            <View style={{top: '-2%'}}>
              <Text style={styles.h2}>Sign in to Continue</Text>
              {errorMsg ? (
                <View style={styles.errorContainer}>
                  <Text style={styles.errorMsg}>{errorMsg}</Text>
                </View>
              ) : null}
            </View>

            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                autoCorrect={false}
                onPressIn={() => setErrorMsg(null)}
                style={styles.input}
                autoCapitalize="none"
                onChangeText={text =>
                  setFdata({...fdata, email: text})
                }></TextInput>
            </View>
            <View style={styles.formGroup}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                autoCorrect={false}
                autoCapitalize="none"
                onPressIn={() => setErrorMsg(null)}
                secureTextEntry={true}
                style={styles.input}
                onChangeText={text =>
                  setFdata({...fdata, password: text})
                }></TextInput>
            </View>
            <View>
              <View style={styles.forgotPasswordContainer}>
                <Text style={styles.link}>Forgot Password?</Text>
              </View>
              <View style={styles.buttonContainer}>
                <Button onPress={setBackendData} color={color.primaryOrange80}>
                  LOGIN
                </Button>
              </View>
              <View style={styles.createAccountContainer}>
                <Text style={styles.text}>Don't have an account?</Text>
                <Pressable
                  onPress={() => {
                    navigate('SignUp');
                  }}>
                  <Text style={styles.link}> Create a new account</Text>
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {},
  image: {
    zIndex: -1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  innerContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  section: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '50%',
  },
  section2: {
    display: 'flex',
    backgroundColor: '#fff',
    width: '100%',
    height: '50%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
    top: '-2%',
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
    marginTop: 4,
  },
  link: {
    color: color.primaryOrange80,
    fontSize: 12,
    fontFamily: 'RedHatDisplay-Medium',
  },
  buttonContainer: {
    alignItems: 'center',

    marginBottom: 16,
  },
  createAccountContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  middle: {
    marginRight: 'auto',
    marginLeft: 'auto',
    marginBottom: '-7.5%',
    width: '100%',
    height: '30%',
    overflow: 'hidden',
    top: '-3%',
  },
  logo: {
    width: '75%',
    resizeMode: 'contain',
  },
  text: {
    fontFamily: 'RedHatDisplay-Medium',
    fontSize: 12,
  },
  errorMsg: {
    textAlign: 'center',
    color: 'white',
    fontSize: 12,
    padding: 4,
    paddingHorizontal: 32,
  },
  errorContainer: {
    padding: 4,
    backgroundColor: '#FF000090',
    marginLeft: 'auto',
    marginRight: 'auto',
    borderRadius: 24,
    marginBottom: 12,
    marginTop: 4,
  },
});
