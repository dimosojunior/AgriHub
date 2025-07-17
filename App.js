import { StatusBar } from 'expo-status-bar';
import { StyleSheet,Alert, Linking, Text,SafeAreaView, View } from 'react-native';
import HomeScreen from './Screens/HomeScreen';

import MyDrawer from './Drawer/drawer';

import MyStack from './Stack/MyStack';

import { NavigationContainer } from '@react-navigation/native';

import React, { useState,useRef, useEffect } from 'react';
import { EndPoint } from './Constant/links';
//import * as Application from 'expo-application';
import AwesomeAlert from 'react-native-awesome-alerts';

import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { EventRegister } from 'react-native-event-listeners';

import { UserProvider } from './UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App({navigation}) {

const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  
useEffect(() => {
  const listener = EventRegister.addEventListener('updateUserToken', async () => {
    const userDataJSON = await AsyncStorage.getItem('userData');
    if (userDataJSON) {
      setUserData(JSON.parse(userDataJSON));
    }
  });

  return () => EventRegister.removeEventListener(listener);
}, []);



const checkForUpdate = async () => {
  try {
    const response = await fetch(EndPoint + '/LatestVersionView/');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json(); // Ensure it's JSON
    const latestVersion = data.latest_version;

   // const currentVersion = Application.nativeApplicationVersion;
    const currentVersion = "2";

    console.log("currentVersion:", currentVersion);
    console.log("latestVersion:", latestVersion);

    if (currentVersion < latestVersion) {
      Alert.alert(
        'New Version of AgriHub Tanzania',
        'The new version of AgriHub Tanzania is now available on the Play store. Please download the latest version to access new features and services',
        [
          { text: 'Download Now', onPress: () => Linking.openURL('https://play.google.com/store/apps/details?id=ttpc.AgriHub') },
          { text: 'Later', style: 'cancel' }
        ]
      );
    }
  } catch (error) {
    console.error('Error checking for update:', error.message);
  }
};

 useEffect(() => {
    checkForUpdate(); // Check for updates when the app starts
  }, []);




  return (
    <SafeAreaView style={styles.container}>
    
      
    

      <UserProvider>
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </UserProvider>
      

      
      <StatusBar backgroundColor="white" barStyle="dark-content" />


    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop:10,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
