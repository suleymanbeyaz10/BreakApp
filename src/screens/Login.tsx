import React from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Input from '../components/Input';
import Button from '../components/Button';

const loginImg = require('../assets/signup.png');

const Login = () => {
  return (
    <View>
      <ScrollView>
        <Image source={loginImg} style={styles.image} />
        <View>
          <Input text="Kullanıcı Adınız" />
          <Input text="Parola" />
        </View>
        <View>
          <Button text="Giriş Yap" />
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
});

export default Login;
