import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';

const AdminPanel = ({route}: any) => {
  const {user} = route.params;
  return (
    <View style={styles.container}>
      <View>
        <Text>{user.username}</Text>
        <Image style={styles.image} source={require('../assets/admin.png')} />
      </View>
    </View>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 200,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
});
