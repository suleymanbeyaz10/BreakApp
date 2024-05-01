import React from 'react';
import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import styles from './Login.Style';

const ToDo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>ToDo</Text>
      <View style={styles.inner_container}>
        <TextInput
          style={styles.input}
          placeholder="Bir görev girin..."
          placeholderTextColor={'#34568B'}
        />
      </View>
      <TouchableOpacity style={styles.button} activeOpacity={0.3}>
        <Text style={styles.button_text}>EKLE</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ToDo;
