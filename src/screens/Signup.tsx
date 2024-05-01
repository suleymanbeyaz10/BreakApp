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
import Input from '../components/Input';
import {Text} from 'react-native-animatable';
import Button from '../components/Button';

const signImg = require('../assets/breakapp-logo.png');
const adminImg = require('../assets/admin.png');

const Signup = ({navigation}: any) => {
  const [isAdmin, setIsAdmin] = useState(false);

  const toggleSwitch = () => setIsAdmin(previousState => !previousState);

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
        <View>
          <Input text="Adınız" style={styles.input} />
          <Input text="Kullanıcı Adınız" style={styles.input} />
          <Input text="Parola" />
        </View>
        <View>
          <Button text="Kayıt Ol" />
        </View>
        <View style={styles.inner_container}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
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
