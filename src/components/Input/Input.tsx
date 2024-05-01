import React from 'react';
import {View, TextInput} from 'react-native';
import styles from './Input.styles';

const Input = (props: any) => {
  return (
    <View style={styles.container}>
      <TextInput
        selectionColor={'#AAA'}
        placeholderTextColor={'#666'}
        underlineColorAndroid={'#CCC'}
        placeholder={props.text}
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
