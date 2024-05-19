import React, {useEffect, useState} from 'react';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import database from '@react-native-firebase/database';

const UserDetails = ({route}) => {
  const {userId, userName} = route.params;
  const [breaks, setBreaks] = useState([]);

  useEffect(() => {
    const breaksRef = database().ref(`users/${userId}/breaks`);
    const onValueChange = breaksRef.on('value', snapshot => {
      const breaksList = [];
      snapshot.forEach(child => {
        const startTime = new Date(child.val().startTime).toLocaleString();
        const endTime = new Date(child.val().endTime).toLocaleString();
        breaksList.push({startTime, endTime});
      });
      setBreaks(breaksList);
    });

    return () => breaksRef.off('value', onValueChange);
  }, [userId]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>
        {userName ? `${userName}'nin Molaları` : 'Kullanıcı Molaları'}
      </Text>
      <ScrollView>
        {breaks.map((breakItem, index) => (
          <View key={index} style={styles.breakItem}>
            <Text style={styles.breakText}>
              Mola Başlangıç: {breakItem.startTime}
            </Text>
            <Text style={styles.breakText}>
              Mola Bitiş: {breakItem.endTime}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default UserDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f4f4f8',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  breakItem: {
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3,
    elevation: 5,
  },
  breakText: {
    fontSize: 17,
    color: '#555',
  },
});
