import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';
import {Formik} from 'formik';
const loginImg = require('../assets/signup.png');
import auth from '@react-native-firebase/auth';
import {showMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../utils/authErrorMessageParser';
import database from '@react-native-firebase/database';

const initialFormValues = {
  usermail: '',
  password: '',
};

const Login = ({navigation}: any) => {
  const handleSignUp = () => {
    navigation.navigate('Signup');
  };

  async function handleFormSubmit(formValues: any) {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      const userRef = database().ref(`users/${userCredential.user.uid}`);
      const snapshot = await userRef.once('value');
      const userData = snapshot.val();
      const isAdmin = userData.isAdmin;

      navigation.navigate(isAdmin ? 'AdminPanel' : 'BreakPage', {
        user: userData,
      });
    } catch (error: any) {
      showMessage({
        message: 'Hata',
        description: authErrorMessageParser(error.code),
        type: 'danger',
      });
    }
  }

  return (
    <View>
      <ScrollView>
        <Image source={loginImg} style={styles.image} />
        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
          {({handleChange, handleSubmit, values}) => (
            <>
              <Input
                onType={handleChange('usermail')}
                value={values.usermail}
                text="Kullanıcı Adınız"
              />
              <Input
                onType={handleChange('password')}
                value={values.password}
                text="Şifreniz"
                isSecure={true}
              />
              <Button text="Giriş Yap" onPress={handleSubmit} theme="primary" />
            </>
          )}
        </Formik>

        <View style={styles.inner_container}>
          <TouchableOpacity onPress={handleSignUp}>
            <Text style={styles.button_text}>Hesabınız yok mu ?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    alignSelf: 'center',
    marginTop: 50,
  },
  inner_container: {
    marginTop: 20,
    fontSize: 20,
  },
  button_text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default Login;
