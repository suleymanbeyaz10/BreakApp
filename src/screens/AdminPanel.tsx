import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Modal,
} from 'react-native';
import database from '@react-native-firebase/database';
import {useNavigation} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {Formik} from 'formik';
import Input from '../components/Input';
import {showMessage} from 'react-native-flash-message';
import authErrorMessageParser from '../utils/authErrorMessageParser';
import Button from '../components/Button';

const AdminPanel = ({route}) => {
  const {user} = route.params;
  const navigation = useNavigation();
  const [users, setUsers] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const initialFormValues = {
    username: '',
    usermail: '',
    password: '',
    repassword: '',
    isAdmin: false,
  };

  useEffect(() => {
    const usersRef = database().ref('users');
    const onValueChange = usersRef.on('value', snapshot => {
      const usersList = [];
      snapshot.forEach(child => {
        const userData = child.val();
        usersList.push({
          id: child.key,
          email: userData.usermail,
          username: userData.username,
          isAdmin: userData.isAdmin,
        });
      });
      setUsers(usersList);
    });

    return () => usersRef.off('value', onValueChange);
  }, []);

  const deleteUser = userId => {
    database().ref(`users/${userId}`).remove();
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      navigation.replace('Login');
    } catch (error) {
      showMessage({
        message: 'Çıkış yapılamadı',
        description: error.message,
        type: 'danger',
      });
    }
  };

  const handleFormSubmit = async (values, {resetForm}: any) => {
    if (values.password !== values.repassword) {
      showMessage({
        message: 'Hata',
        description: 'Şifreler uyuşmuyor',
        type: 'danger',
      });
      return;
    }
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        values.usermail,
        values.password,
      );
      await database().ref(`users/${userCredential.user.uid}`).set({
        username: values.username,
        usermail: values.usermail,
        isAdmin: values.isAdmin,
      });
      showMessage({
        message: 'Kullanıcı oluşturuldu',
        type: 'success',
      });
      resetForm();
      setModalVisible(false);
    } catch (error: any) {
      showMessage({
        message: authErrorMessageParser(error.code),
        type: 'danger',
      });
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.imageAndTitleContainer}>
          <Image style={styles.image} source={require('../assets/admin.png')} />
          <Text style={styles.title}>İyi günler, {user.username}</Text>
        </View>
        <Text style={styles.header}>Kullanıcı Listesi</Text>
        {users.map(user => (
          <View key={user.id} style={styles.userCard}>
            <View style={styles.userInfo}>
              <Text style={styles.userText}>{user.username}</Text>
              <Text>{user.email}</Text>
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity
                style={styles.detailButton}
                onPress={() =>
                  navigation.navigate('UserDetails', {userId: user.id})
                }
                activeOpacity={0.6}>
                <Text style={styles.buttonText}>Detaylar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteUser(user.id)}>
                <Text style={styles.buttonText}>Sil</Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <Button text="Kullanıcı Ekle" onPress={() => setModalVisible(true)} />
        <Button
          text="Çıkış Yap"
          onPress={handleSignOut}
          style={styles.signOutButton}
        />
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Formik
                initialValues={{initialFormValues}}
                onSubmit={handleFormSubmit}>
                {({handleChange, handleSubmit, values}) => (
                  <>
                    <Input
                      onType={handleChange('username')}
                      value={values.username}
                      text="Kullanıcı Adı"
                    />
                    <Input
                      onType={handleChange('usermail')}
                      value={values.usermail}
                      text="Mail Adresi"
                    />
                    <Input
                      isSecure={true}
                      onType={handleChange('password')}
                      value={values.password}
                      text="Şifre"
                    />
                    <Input
                      isSecure={true}
                      onType={handleChange('repassword')}
                      value={values.repassword}
                      text="Şifre Tekrar"
                    />
                    <Button text="Kaydet" onPress={handleSubmit} />
                    <Button
                      text="Kapat"
                      onPress={() => setModalVisible(false)}
                    />
                  </>
                )}
              </Formik>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </View>
  );
};

export default AdminPanel;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    padding: 20,
  },
  imageAndTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 130,
    height: 100,
    marginRight: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginBottom: 10,
  },
  userCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 15,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInfo: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  userText: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailButton: {
    backgroundColor: '#1976d2',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  deleteButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
