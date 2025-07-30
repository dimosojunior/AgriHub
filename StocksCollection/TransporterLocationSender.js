import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
  Text,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import AwesomeAlert from 'react-native-awesome-alerts';
//const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjA4OTY5YjljOGZjZTQ2YzViMDcxMmYyN2Q2NDQ3MjBkIiwiaCI6Im11cm11cjY0In0=';
//const GOOGLE_MAPS_API_KEY = 'AIzaSyAn6o61kCZgJbvOuwmFOf4Zp969CqtThRA'; // 🔑 Badilisha na yako
import { LinearGradient } from 'expo-linear-gradient';

import {globalStyles} from '../Styles/GlobalStyles';

const TransporterLocationSender = ({navigation, route }) => {
  const { 
    
    id
  } = route.params;

  const transportId = id;

const [isPending, setIsPending] = useState(true);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };


 useEffect(() => {
    const sendLocation = async () => {
      setIsPending(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      const location = await Location.getCurrentPositionAsync({});
      const token = await AsyncStorage.getItem('userToken');

      console.log("Your Token", token);

      await fetch(`${EndPoint}/send-location/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          transport_loading_id: transportId,
          latitude: location.coords.latitude,
          longitude: location.coords.longitude
        })
      });
      Alert.alert('Location is updated successfully');

      console.log("Well data fetched");
      navigation.goBack();
      setIsPending(false);
    };

    const interval = setInterval(sendLocation, 5000);
    return () => clearInterval(interval);
  }, [transportId]);

  return (
    <LinearGradient colors={['#015d68', '#000']} style={globalStyles.container}>
   
   

       {isPending && (
  <View style={globalStyles.loaderOverlay}>
    <View style={globalStyles.loaderContent}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={globalStyles.loaderText}>Updating location...</Text>
      <Text style={globalStyles.loaderCounter2}>please wait...</Text>
    </View>
  </View>
)}

    
    </LinearGradient>
  );
};

export default TransporterLocationSender;

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  distanceBox: {
    position: 'absolute',
    bottom: 20,
    left: 10,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    alignItems: 'center',
  },
  distanceText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
});
