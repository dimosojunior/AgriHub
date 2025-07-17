import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('screen');

const students = [
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

const MikatabaYote = ({navigation}) => {
  const navigation = useNavigation();

  const handlePress = (student) => {
    navigation.navigate('Home', { student });
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <ScrollView>
          <View style={styles.table}>
            {/* Table Header */}
            <View style={[styles.row, styles.header]}>
              <Text style={[styles.cell, styles.idColumn]}>ID</Text>
              <Text style={[styles.cell, styles.firstNameColumn]}>First Name</Text>
              <Text style={[styles.cell, styles.otherColumns]}>Middle Name</Text>
              <Text style={[styles.cell, styles.otherColumns]}>Last Name</Text>
              <Text style={[styles.cell, styles.otherColumns]}>Age</Text>
              <Text style={[styles.cell, styles.otherColumns]}>Gender</Text>
              <Text style={[styles.cell, styles.otherColumns]}>Phone</Text>
              <Text style={[styles.cell, styles.otherColumns]}>Action</Text>
            </View>
            {/* Table Rows */}
            {students.map((student) => (
              <View key={student.id} style={styles.row}>
                <Text style={[styles.cell, styles.idColumn]}>{student.id}</Text>
                <Text style={[styles.cell, styles.firstNameColumn]}>{student.firstName}</Text>
                <Text style={[styles.cell, styles.otherColumns]}>{student.middleName}</Text>
                <Text style={[styles.cell, styles.otherColumns]}>{student.lastName}</Text>
                <Text style={[styles.cell, styles.otherColumns]}>{student.age}</Text>
                <Text style={[styles.cell, styles.otherColumns]}>{student.gender}</Text>
                <Text style={[styles.cell, styles.otherColumns]}>{student.phone}</Text>
                <TouchableOpacity
                  style={[styles.cell, styles.buttonCell]}
                  onPress={() => handlePress(student)}
                >
                  <Text style={styles.buttonText}>Go Home</Text>
                </TouchableOpacity>
              </View>
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
