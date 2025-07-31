import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Alert,
} from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { EndPoint } from '../Constant/links';

export default function BuyerTrackVehicleScreen({ route }) {
  const {
    id,
    Destination,
    StocksCollectionCenterName,
    StocksCollectionCenterLocation,
  } = route.params;

  const transport_loading_id = id;

  const [vehicleLocation, setVehicleLocation] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [locationName, setLocationName] = useState('');
  const [routeCoords, setRouteCoords] = useState([]);
  const [distanceInKm, setDistanceInKm] = useState(null);

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(2);
  };

  const fetchVehicleLocation = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const res = await fetch(`${EndPoint}/get-location/?transport_loading_id=${transport_loading_id}`, {
        headers: { 'Authorization': `Token ${token}` }
      });

      const data = await res.json();
      if (data.latitude && data.longitude) {
        const coords = { latitude: data.latitude, longitude: data.longitude };
        setVehicleLocation(coords);

        // Geocode to get human-readable name
        const places = await Location.reverseGeocodeAsync(coords);
        if (places.length > 0) {
          const place = places[0];
          const name = `${place.name || ''}, ${place.street || ''}, ${place.district || ''}, ${place.region || ''}`;
          setLocationName(name);
        }

        // Calculate distance
        if (destinationCoords) {
          const dist = getDistance(
            coords.latitude,
            coords.longitude,
            destinationCoords.latitude,
            destinationCoords.longitude
          );
          setDistanceInKm(dist);

          // Polyline path
          setRouteCoords([coords, destinationCoords]);
        }
      }
    } catch (error) {
      Alert.alert("Error", "Failed to fetch vehicle location.");
    }
  };

  const fetchDestinationCoords = async () => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(Destination)}&format=json`);
      const data = await response.json();
      if (data.length > 0) {
        const dest = {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
        setDestinationCoords(dest);
      } else {
        Alert.alert('Error', 'Failed to locate destination.');
      }
    } catch (error) {
      console.log('Failed to fetch destination:', error);
    }
  };

  useEffect(() => {
    fetchDestinationCoords();
  }, []);

  useEffect(() => {
    if (destinationCoords) {
      fetchVehicleLocation();
      const interval = setInterval(fetchVehicleLocation, 5000);
      return () => clearInterval(interval);
    }
  }, [destinationCoords]);

  if (!vehicleLocation || !destinationCoords) {
    return <View style={styles.center}><ActivityIndicator size="large" /></View>;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
      provider="google"
        style={styles.map}
        initialRegion={{
          ...vehicleLocation,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        <Marker
          coordinate={vehicleLocation}
          title="Current Vehicle Location"
          description={locationName || 'Loading...'}
          pinColor="blue"
        />
        <Marker
          coordinate={destinationCoords}
          title="Destination"
          description={Destination}
          pinColor="red"
        />
        {routeCoords.length > 0 && (
          <>
            <Polyline
              coordinates={routeCoords}
              strokeWidth={8}
              strokeColor="rgba(100,100,255,0.2)" // shadow
            />
            <Polyline
              coordinates={routeCoords}
              strokeWidth={4}
              strokeColor="blue"
            />
          </>
        )}
      </MapView>

      {distanceInKm && (
        <View style={styles.distanceBox}>
          <Text style={styles.distanceText}>
            Distance: {distanceInKm} km from vehicle to destination
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  center: {
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
