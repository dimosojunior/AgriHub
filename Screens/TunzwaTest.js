import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Platform,
} from 'react-native';
import Autocomplete from 'react-native-autocomplete-input';
import { Picker } from '@react-native-picker/picker';

export default function Test() {
  const [fullName, setFullName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('male');

  const [countries, setCountries] = useState([]);
  const [countryQuery, setCountryQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [ward, setWard] = useState('');

  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );

  const filtered = (list, q) =>
    list.filter(item => item.toLowerCase().includes(q.toLowerCase()));

  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all?fields=name')
      .then(res => res.json())
      .then(data => {
        const countryList = Array.isArray(data)
          ? data.map(c => c.name.common).sort()
          : [];
        setCountries(countryList);
      })
      .catch(err => {
        console.error('Failed to fetch countries:', err);
      });
  }, []);

  // Fetch regions (states)
  useEffect(() => {
    if (!selectedCountry) return;
    const countryCode = getCountryCode(selectedCountry);
    if (!countryCode) return;

    fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
      headers: {
        'X-CSCAPI-KEY': 'YOUR_CSC_API_KEY',
      },
    })
      .then(res => res.json())
      .then(data => setRegions(data))
      .catch(err => console.error(err));
  }, [selectedCountry]);

  // Fetch districts (cities) based on region
  useEffect(() => {
    if (!selectedCountry || !selectedRegion) return;
    const countryCode = getCountryCode(selectedCountry);
    const stateCode = selectedRegion?.iso2;
    if (!countryCode || !stateCode) return;

    fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
      headers: {
        'X-CSCAPI-KEY': 'YOUR_CSC_API_KEY',
      },
    })
      .then(res => res.json())
      .then(data => setDistricts(data))
      .catch(err => console.error(err));
  }, [selectedRegion]);

  const getCountryCode = (countryName) => {
    if (countryName.toLowerCase() === 'tanzania') return 'TZ';
    if (countryName.toLowerCase() === 'kenya') return 'KE';
    return '';
  };

  const handleSubmit = () => {
    if (!day || !month || !year) {
      Alert.alert('Error', 'Please select full date of birth.');
      return;
    }

    const date_of_birth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    const formData = new FormData();
    formData.append('full_name', fullName);
    formData.append('date_of_birth', date_of_birth);
    formData.append('country', selectedCountry);
    formData.append('region', selectedRegion?.name);
    formData.append('district', selectedDistrict?.name);
    formData.append('ward', ward);
    formData.append('gender', gender);

    fetch('https://twinsmicrofinance.pythonanywhere.com/Account/ProfileCreateAPIView/', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (res.ok) {
          Alert.alert('Success', 'Profile saved!');
        } else {
          Alert.alert('Error', 'Something went wrong!');
        }
      });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput value={fullName} onChangeText={setFullName} style={styles.input} />

      <Text style={styles.label}>Date of Birth</Text>
      <View style={styles.row}>
        <Picker selectedValue={day} style={styles.picker} onValueChange={(item) => setDay(item)}>
          <Picker.Item label="Day" value="" />
          {days.map(d => <Picker.Item key={d} label={d} value={d} />)}
        </Picker>
        <Picker selectedValue={month} style={styles.picker} onValueChange={(item) => setMonth(item)}>
          <Picker.Item label="Month" value="" />
          {months.map(m => <Picker.Item key={m} label={m} value={m} />)}
        </Picker>
        <Picker selectedValue={year} style={styles.picker} onValueChange={(item) => setYear(item)}>
          <Picker.Item label="Year" value="" />
          {years.map(y => <Picker.Item key={y} label={y} value={y} />)}
        </Picker>
      </View>

      <Text style={styles.label}>Country</Text>
      <Autocomplete
        data={filtered(countries, countryQuery)}
        value={countryQuery}
        onChangeText={(text) => {
          setCountryQuery(text);
          setSelectedCountry(text);
        }}
        flatListProps={{
          keyExtractor: (_, idx) => idx.toString(),
          renderItem: ({ item }) => (
            <TouchableOpacity onPress={() => {
              setCountryQuery(item);
              setSelectedCountry(item);
            }}>
              <Text style={styles.suggestion}>{item}</Text>
            </TouchableOpacity>
          ),
        }}
        inputContainerStyle={styles.input}
      />

      <Text style={styles.label}>Mkoa (Region)</Text>
      <Picker
        selectedValue={selectedRegion}
        onValueChange={(itemValue) => {
          const selected = regions.find(r => r.iso2 === itemValue);
          setSelectedRegion(selected);
        }}
        style={styles.input}
      >
        <Picker.Item label="Select Region" value="" />
        {regions.map(region => (
          <Picker.Item key={region.iso2} label={region.name} value={region.iso2} />
        ))}
      </Picker>

      <Text style={styles.label}>Wilaya (District)</Text>
      <Picker
        selectedValue={selectedDistrict?.name}
        onValueChange={(itemValue) => {
          const selected = districts.find(d => d.name === itemValue);
          setSelectedDistrict(selected);
        }}
        style={styles.input}
      >
        <Picker.Item label="Select District" value="" />
        {districts.map(district => (
          <Picker.Item key={district.id} label={district.name} value={district.name} />
        ))}
      </Picker>

      <Text style={styles.label}>Kata (Ward)</Text>
      <TextInput value={ward} onChangeText={setWard} style={styles.input} placeholder="Jaza Kata" />

      <Text style={styles.label}>Gender</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'male' && styles.selectedGender]}
          onPress={() => setGender('male')}
        >
          <Text>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, gender === 'female' && styles.selectedGender]}
          onPress={() => setGender('female')}
        >
          <Text>Female</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { fontWeight: 'bold', marginTop: 12 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: Platform.OS === 'ios' ? 10 : 5,
    marginBottom: 10,
    borderRadius: 5,
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  picker: {
    flex: 1,
    height: 50,
    marginHorizontal: 3,
  },
  genderButton: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    marginRight: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  selectedGender: {
    backgroundColor: '#aaa',
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
