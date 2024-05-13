import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import styles from './Button.styles';

const Button = ({text, onPress}: any) => {
  return (
    <TouchableOpacity
      style={styles.container}
      activeOpacity={0.6}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
