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

const ORS_API_KEY = 'eyJvcmciOiI1YjNjZTM1OTc4NTExMTAwMDFjZjYyNDgiLCJpZCI6IjA4OTY5YjljOGZjZTQ2YzViMDcxMmYyN2Q2NDQ3MjBkIiwiaCI6Im11cm11cjY0In0=';
//const GOOGLE_MAPS_API_KEY = 'AIzaSyAn6o61kCZgJbvOuwmFOf4Zp969CqtThRA'; // 🔑 Badilisha na yako

const MapScreen = ({ route }) => {
  const {
    id,
    Destination,
    StocksCollectionCenterName,
    StocksCollectionCenterLocation,
  } = route.params;

  const [currentLocation, setCurrentLocation] = useState(null);
  const [collectionCenter, setCollectionCenter] = useState(null);
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [routeCoords, setRouteCoords] = useState([]);
  const [distanceInKm, setDistanceInKm] = useState(null);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) *
        Math.cos(toRad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const fetchCoordinates = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const response = await fetch(
        `${EndPoint}/GetTransportRouteCoordinates/?id=${id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );

      const data = await response.json();
      setCollectionCenter(data.collection_center);
      setDestination(data.destination);
      fetchRoute(data.collection_center, data.destination);

      const distance = getDistance(
        data.collection_center.latitude,
        data.collection_center.longitude,
        data.destination.latitude,
        data.destination.longitude
      );
      setDistanceInKm(distance);
    } catch (error) {
      Alert.alert('Error', 'Failed to load coordinates.');
    } finally {
      setLoading(false);
    }
  };

  const fetchRoute = async (originCoord, destCoord) => {
    const body = {
      coordinates: [
        [originCoord.longitude, originCoord.latitude],
        [destCoord.longitude, destCoord.latitude],
      ],
      format: 'geojson',
    };

    try {
      const response = await fetch('https://api.openrouteservice.org/v2/directions/driving-car/geojson', {
        method: 'POST',
        headers: {
          'Authorization': ORS_API_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (data && data.features && data.features.length > 0) {
        const coords = data.features[0].geometry.coordinates.map(([lon, lat]) => ({
          latitude: lat,
          longitude: lon,
        }));
        setRouteCoords(coords);
      } else {
        console.warn("No route data found");
        setRouteCoords([originCoord, destCoord]); // fallback
      }
    } catch (error) {
      console.error('OpenRouteService fetch error:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          Alert.alert('Permission Denied', 'Location permission is required.');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        setCurrentLocation({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        fetchCoordinates();
      })();

      return () => {
        setRouteCoords([]);
      };
    }, [])
  );

  if (loading || !currentLocation || !collectionCenter || !destination) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
       provider="google"
        style={styles.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={currentLocation} title="You" pinColor="blue" />
        <Marker
          coordinate={collectionCenter}
          title={`Collection Center (${StocksCollectionCenterLocation})`}
          pinColor="green"
        />
        <Marker
          coordinate={destination}
          title={`Buyer Destination (${Destination})`}
          pinColor="red"
        />

        {routeCoords.length > 0 && (
          <>
            <Polyline
              coordinates={routeCoords}
              strokeWidth={8}
              strokeColor="rgba(255,192,203,0.4)" // background shadow
            />
            <Polyline
              coordinates={routeCoords}
              strokeWidth={4}
              strokeColor="hotpink" // main line
            />
          </>
        )}
      </MapView>

      {distanceInKm && (
        <View style={styles.distanceBox}>
          <Text style={styles.distanceText}>
            Distance: {distanceInKm} km from Collection Centre ({StocksCollectionCenterLocation}) to Destination ({Destination})
          </Text>
        </View>
      )}
    </View>
  );
};

export default MapScreen;

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
