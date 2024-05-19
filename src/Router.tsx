import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Signup from './screens/Signup';
import Login from './screens/Login';
import BreakPage from './screens/BreakPage';
import AdminPanel from './screens/AdminPanel';
import FlashMessage from 'react-native-flash-message';
import UserDetails from './screens/UserDetails';

const Stack = createNativeStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: true}}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="BreakPage" component={BreakPage} />
        <Stack.Screen name="AdminPanel" component={AdminPanel} />
        <Stack.Screen name="UserDetails" component={UserDetails} />
      </Stack.Navigator>
      <FlashMessage position="top" />
    </NavigationContainer>
  );
};

export default Router;
