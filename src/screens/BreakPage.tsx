import React, {useEffect, useState} from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Alert,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import Button from '../components/Button';
import DatePicker from 'react-native-date-picker';

const loginImg = require('../assets/break-time.png');

interface Break {
  id: string;
  startTime: string;
  endTime: string | null;
}

const BreakPage = ({route, navigation}: any) => {
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

    const onValueChange = (snapshot: any) => {
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
      console.error('Mola güncellenirken hata oluştu: ', error);
    }
    setIsLoading(false);
  };

  const onChangeDate = (selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(Platform.OS === 'ios');
    setDate(currentDate);

    // Firebase'de startTime'e göre filtreleme
    const formattedDate = currentDate.toISOString().split('T')[0];
    const filteredQuery = breaksRef
      .orderByChild('startTime')
      .startAt(formattedDate)
      .endAt(formattedDate + '\uf8ff');

    filteredQuery.on('value', snapshot => {
      const data = snapshot.val() || {};
      setBreaks(Object.keys(data).map(key => ({id: key, ...data[key]})));
    });
  };

  const goToNextPage = () => {
    if (breaks.length === 5) {
      setCurrentPage(prevPage => prevPage + 1);
    }
    console.log(currentPage);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      navigation.replace('Login');
    } catch (error: any) {
      Alert.alert(
        'Error',
        'Çıkış yapılırken bir hata oluştu: ' + error.message,
      );
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>İyi günler, {user.username}</Text>
        <Image source={loginImg} style={styles.image} />
        <Button text="Çıkış Yap" onPress={handleSignOut} />
        <Text style={styles.header}>Mola Kontrol Paneli</Text>
        <Button
          text={isOnBreak ? 'Molayı Sonlandır' : 'Molayı Başlat'}
          onPress={() => handleBreak(!isOnBreak)}
        />
        <Button text="Tarih Seç" onPress={() => setShowDatePicker(true)} />
        <DatePicker
          modal
          open={showDatePicker}
          date={date}
          mode="date"
          onConfirm={onChangeDate}
          onCancel={() => setShowDatePicker(false)}
        />
        {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
        <Text style={styles.header}>Mola Geçmişi</Text>
        {breaks.map(b => (
          <View key={b.id} style={styles.breakItem}>
            <Text style={styles.breakText}>
              Başlangıç: {new Date(b.startTime).toLocaleTimeString()} - Bitiş:{' '}
              {b.endTime
                ? new Date(b.endTime).toLocaleTimeString()
                : 'İşleniyor'}
            </Text>
            <Text style={styles.breakText}>
              Süre:{' '}
              {b.endTime
                ? (() => {
                    const durationMs =
                      new Date(b.endTime).getTime() -
                      new Date(b.startTime).getTime();
                    const hours = Math.floor(durationMs / 3600000);
                    const minutes = Math.floor((durationMs % 3600000) / 60000);
                    const seconds = Math.floor((durationMs % 60000) / 1000);
                    return `${hours}:${minutes}:${seconds}`;
                  })()
                : 'Hesaplanıyor...'}
            </Text>
          </View>
        ))}
        <View style={styles.pagination_container}>
          <Button
            text="Önceki Sayfa"
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
          />
          <Button text="Sonraki Sayfa" onPress={goToNextPage} />
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
