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

const loginImg = require('../assets/signup.png');

const Login = ({navigation}: any) => {
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
        <View style={styles.inner_container}>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
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
