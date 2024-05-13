/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import {Formik} from 'formik';
import Input from '../components/Input';
import {Text} from 'react-native-animatable';
import Button from '../components/Button';
import auth from '@react-native-firebase/auth';
import authErrorMessageParser from '../utils/authErrorMessageParser';
import {showMessage} from 'react-native-flash-message';
import database from '@react-native-firebase/database';

const signImg = require('../assets/breakapp-logo.png');
const adminImg = require('../assets/admin.png');

const Signup = ({navigation}: any) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleSwitch = () => setIsAdmin(previousState => !previousState);

  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const initialFormValues = {
    username: '',
    usermail: '',
    password: '',
    repassword: '',
  };

  async function handleFormSubmit(formValues: any) {
    if (formValues.password !== formValues.repassword) {
      showMessage({
        message: 'Hata',
        description: 'Şifreler uyuşmuyor',
        type: 'danger',
      });
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        formValues.usermail,
        formValues.password,
      );
      await database().ref(`users/${userCredential.user.uid}`).set({
        username: formValues.username,
        usermail: formValues.usermail,
        isAdmin,
      });

      navigation.navigate('Login');
      showMessage({
        message: 'Kullanıcı oluşturuldu',
        type: 'success',
      });
    } catch (error: any) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
      console.log(error.code);
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image source={signImg} style={styles.image} />
        <Text
          style={styles.text}
          animation="fadeIn"
          duration={3000}
          iterationCount="infinite">
          Kayıt Ol
        </Text>
        <View style={{flexDirection: 'row-reverse'}}>
          <Switch
            trackColor={{false: '#767577', true: '#81b0ff'}}
            thumbColor={isAdmin ? '#fff' : '#fff'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isAdmin}
          />
          <Image source={adminImg} style={styles.admin_img} />
        </View>
        <Formik initialValues={initialFormValues} onSubmit={handleFormSubmit}>
          {({handleChange, handleSubmit, values}) => (
            <>
              <Input
                onType={handleChange('username')}
                value={values.username}
                text="Adınız"
                style={styles.input}
              />
              <Input
                onType={handleChange('usermail')}
                value={values.usermail}
                text="Mail Adresiniz"
                style={styles.input}
              />
              <Input
                isSecure={true}
                onType={handleChange('password')}
                value={values.password}
                text="Şifre"
              />
              <Input
                isSecure={true}
                onType={handleChange('repassword')}
                value={values.repassword}
                text="Şifre Tekrar"
              />
              <Button text="Kayıt Ol" onPress={handleSubmit} />
            </>
          )}
        </Formik>
        <View style={styles.inner_container}>
          <TouchableOpacity onPress={handleLogin}>
            <Text style={styles.button_text}>Zaten bir hesabınız var mı ?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: 170,
    height: 170,
    alignSelf: 'center',
  },
  admin_img: {
    width: 50,
    height: 100,
    alignSelf: 'flex-end',
  },
  input: {
    margin: 7,
    padding: 7,
  },
  text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  button_text: {
    color: 'black',
    fontSize: 20,
    textAlign: 'center',
  },
  inner_container: {
    marginTop: 20,
    fontSize: 20,
  },
});
