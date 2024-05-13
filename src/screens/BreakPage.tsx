import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Button from '../components/Button';
import DateTimePicker from '@react-native-community/datetimepicker';

const loginImg = require('../assets/break-time.png');

interface Break {
  id: string;
  startTime: string;
  endTime: string | null;
}

const BreakPage = ({route}: any) => {
  const {user} = route.params;
  const userId = auth().currentUser?.uid;
  const userRef = database().ref(`users/${userId}`);
  const breaksRef = userRef.child('breaks');
  const [breaks, setBreaks] = useState<Break[]>([]);
  const [isOnBreak, setIsOnBreak] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    const query = breaksRef.orderByKey().limitToFirst(5 * currentPage);

    const onValueChange = snapshot => {
      const data = snapshot.val() || {};
      const loadedBreaks = Object.keys(data).map(key => ({
        id: key,
        ...data[key],
      }));
      setBreaks(loadedBreaks.slice((currentPage - 1) * 5, currentPage * 5));
    };

    query.on('value', onValueChange);
    return () => query.off('value', onValueChange);
  }, [breaksRef, currentPage]);

  const handleBreak = async (starting: boolean) => {
    setIsLoading(true);
    try {
      if (starting) {
        const newBreak = {startTime: new Date().toISOString(), endTime: null};
        await breaksRef.push(newBreak);
      } else {
        const activeBreak = breaks.find(b => !b.endTime);
        if (activeBreak) {
          await breaksRef
            .child(activeBreak.id)
            .update({endTime: new Date().toISOString()});
        }
      }
      setIsOnBreak(starting);
    } catch (error) {
      console.error('Error updating break: ', error);
    }
    setIsLoading(false);
  };

  const onChangeDate = selectedDate => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const goToNextPage = () => {
    if (breaks.length === 5) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Welcome, {user.username}</Text>
        <Image source={loginImg} style={styles.image} />
        <Text style={styles.header}>Break Control Panel</Text>
        <Button
          text={isOnBreak ? 'End Break' : 'Start Break'}
          onPress={() => handleBreak(!isOnBreak)}
        />
        <Button text="Select Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={onChangeDate}
          />
        )}
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        <Text style={styles.header}>Break History</Text>
        {breaks.map(b => (
          <View key={b.id} style={styles.breakItem}>
            <Text style={styles.breakText}>
              Start: {new Date(b.startTime).toLocaleTimeString()} - End:{' '}
              {b.endTime
                ? new Date(b.endTime).toLocaleTimeString()
                : 'In progress'}
            </Text>
          </View>
        ))}
        <View style={styles.pagination_container}>
          <Button
            text="Previous Page"
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
          />
          <Button text="Next Page" onPress={goToNextPage} />
        </View>
      </ScrollView>
    </View>
  );
};

export default BreakPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#666',
    textAlign: 'center',
    marginVertical: 10,
  },
  image: {
    width: 190,
    height: 190,
    alignSelf: 'center',
  },
  breakItem: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    marginVertical: 5,
  },
  breakText: {
    fontSize: 17,
    color: 'black',
  },
  pagination_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
});
