import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './Input.styles';

const Input = ({text, value, onType, isSecure}: any) => {
  return (
    <View style={styles.container}>
      <TextInput
        autoCapitalize="none"
        onChangeText={onType}
        selectionColor={'#AAA'}
        placeholderTextColor={'#666'}
        underlineColorAndroid={'#CCC'}
        placeholder={text}
        value={value}
        secureTextEntry={isSecure}
        style={styles.text_input}
      />
      {/*
     <TextInput
            onChangeText={(e) => changeValue(e)}
            value={value}
            placeholderTextColor={'#626262'}
            placeholder={name.toUpperCase()}
            secureTextEntry={secure ? secure : false}
 */}
    </View>
  );
};

export default Input;
