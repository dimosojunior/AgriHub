import React, { useState,useCallback,useRef, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Linking,
  Animated,
  Alert,
  ScrollView,
  Dimensions,
  Pressable,
  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

import COLORS  from '../Constant/colors';

import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
//import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import LotterViewScreen from '../Screens/LotterViewScreen';

import MinorHeader from '../Header/MinorHeader';
import { useFocusEffect } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const queryset = [
  { id: 1, firstName: "John", middleName: "Doe", lastName: "Smith", age: 18, gender: "Male", phone: "123-456-7890" },
  { id: 2, firstName: "Jane", middleName: "Mary", lastName: "Doe", age: 19, gender: "Female", phone: "234-567-8901" },
  { id: 3, firstName: "Alice", middleName: "Lee", lastName: "Johnson", age: 17, gender: "Female", phone: "345-678-9012" },
  { id: 4, firstName: "Bob", middleName: "Ray", lastName: "Brown", age: 20, gender: "Male", phone: "456-789-0123" },
  { id: 5, firstName: "Charlie", middleName: "Anna", lastName: "Taylor", age: 21, gender: "Male", phone: "567-890-1234" },
  { id: 6, firstName: "Daisy", middleName: "Sue", lastName: "Wilson", age: 18, gender: "Female", phone: "678-901-2345" },
  { id: 7, firstName: "Eve", middleName: "May", lastName: "Moore", age: 19, gender: "Female", phone: "789-012-3456" },
  { id: 8, firstName: "Frank", middleName: "Joe", lastName: "Martin", age: 20, gender: "Male", phone: "890-123-4567" },
  { id: 9, firstName: "Grace", middleName: "Ella", lastName: "Jackson", age: 17, gender: "Female", phone: "901-234-5678" },
  { id: 10, firstName: "Henry", middleName: "Tom", lastName: "Harris", age: 21, gender: "Male", phone: "012-345-6789" },
];


const MikatabaYote = () => {
  const navigation = useNavigation();

  const handlePress = (item) => {
    navigation.navigate('Home', { item });
  };




  // TableRow Component
const TableRow = ({ item, handlePress }) => {
  return (
    <View style={globalStyles.row}>
      <Text style={[globalStyles.cell, globalStyles.idColumn]}>{item.id}</Text>
      <Text style={[globalStyles.cell, globalStyles.firstNameColumn]}>{item.firstName}</Text>
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{item.middleName}</Text>
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{item.lastName}</Text>
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{item.age}</Text>
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{item.gender}</Text>
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{item.phone}</Text>
      <TouchableOpacity
        style={[globalStyles.cell, globalStyles.buttonCell]}
        onPress={() => handlePress(item)}
      >
        <Text style={globalStyles.buttonText}>Go Home</Text>
      </TouchableOpacity>
    </View>
  );
};


  return (
    <View style={globalStyles.container}>
      <ScrollView horizontal>
        <ScrollView>
          <View style={globalStyles.table}>
            {/* Table Header */}
            <View style={[globalStyles.row, globalStyles.header]}>
              <Text style={[globalStyles.cell, globalStyles.idColumn]}>ID</Text>
              <Text style={[globalStyles.cell, globalStyles.firstNameColumn]}>First Name</Text>
              <Text style={[globalStyles.cell, globalStyles.otherColumns]}>Middle Name</Text>
              <Text style={[globalStyles.cell, globalStyles.otherColumns]}>Last Name</Text>
              <Text style={[globalStyles.cell, globalStyles.otherColumns]}>Age</Text>
              <Text style={[globalStyles.cell, globalStyles.otherColumns]}>Gender</Text>
              <Text style={[globalStyles.cell, globalStyles.otherColumns]}>Phone</Text>
              <Text style={[globalStyles.cell, globalStyles.otherColumns]}>Action</Text>
            </View>
            {/* Table Rows */}
            {queryset.map((item) => (
              <TableRow key={item.id} item={item} handlePress={handlePress} />
            ))}
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default MikatabaYote;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  table: {
    borderWidth: 1,
    borderColor: "black",
  },
  header: {
    backgroundColor: "red",
  },
  row: {
    flexDirection: "row",
  },
  cell: {
    padding: 10,
    textAlign: "center",
    color: "black",
    borderWidth: 1,
    borderColor: "black",
  },
  idColumn: {
    width: 50,
  },
  firstNameColumn: {
    width: 200,
  },
  otherColumns: {
    width: 100,
  },
  buttonCell: {
    backgroundColor: "#4CAF50",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
});
