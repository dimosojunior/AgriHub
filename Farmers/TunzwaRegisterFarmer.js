import React, { useState,useCallback,useRef, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  RefreshControl,
  Keyboard,
  Linking,
  Animated,
  Modal,
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
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";
import Autocomplete from 'react-native-autocomplete-input';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import Checkbox from 'expo-checkbox'; // Make sure to install this package


export default function RegisterFarmer({ navigation }) {

   const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Poppins-Bold.ttf'),
    Medium: require('../assets/fonts/Poppins-Medium.ttf'),
    SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Thin: require('../assets/fonts/Poppins-Thin.ttf'),
    Light: require('../assets/fonts/Poppins-Light.ttf'),
  });

 const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');

 
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);

  useEffect(() => {
    checkLoggedIn();
  }, [userToken]);


const [Username2, setUsername2] = useState('');

  const checkLoggedIn = async () => {
    setPending(true);
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
    if (userToken) {
      try {
        const userResponse = await axios.get(
          EndPoint + '/Account/user_data/',
          {
            headers: {
              Authorization: `Token ${token}`,
            },
          }
        );



        const userData = userResponse.data;
        setPending(false);
        // setEmail(userData.email);
        setUsername2(userData.username);
        // setPhone(userData.phone);
        // setcompany_name(userData.company_name);
        //  setMaelezo(userData.Maelezo);
        //   setLocation(userData.Location);
        
      

      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
  //const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setPending(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Network problem, please turning ON your internet connection.');
      setPending(false);
    } else {
      showAlertFunction('Something went wrong');
      setPending(false);
    }
  };


  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");


 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };


const [isPending, setPending] = useState(true);

const [isPending2, setPending2] =useState(true);


// State variable to store the RoomClasses data
  const [Education, setEducation] = useState([]);
 const [selectedEducation, setSelectedEducation] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    //setPending2(true);
    fetch(`${EndPoint}/Add/AllEducationLevelsViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setEducation(data);
        //setPending2(false);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //setPending2(false);
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);




// State variable to store the RoomClasses data
  const [FarmersOwnership, setFarmersOwnership] = useState([]);
 const [selectedFarmersOwnership, setSelectedFarmersOwnership] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    //setPending2(true);
    fetch(`${EndPoint}/Add/AllFarmersOwnershipTypesViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setFarmersOwnership(data);
        //setPending2(false);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //setPending2(false);
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);



  // State variable to store the RoomClasses data
  const [Crops, setCrops] = useState([]);
 const [selectedCrops, setSelectedCrops] = useState([]);
 
 

useEffect(() => {
    // Make a GET request to fetch queryset and main total price
    axios.get(`${EndPoint}/GetCultivatedCropsView/`)

      .then((response) => {
        const { 
          Crops
          
        } = response.data;
        setCrops(Crops);
        //console.log("Weell");
            
        
      })
      .catch((error) => {
        
        //console.log("Error", error);
      });
  }, []);



  const [fullName, setFullName] = useState('');
  const [Username, setUsername] = useState('');
  const [NidaNo, setNidaNo] = useState('');
  const [MobileNumber, setMobileNumber] = useState('');
  const [TelNumber, setTelNumber] = useState('');
   const [FarmerSize, setFarmerSize] = useState('');
  const [Email, setEmail] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('male');
  const [PARTICIPATION_GROUPS, setPARTICIPATION_GROUPS] = useState('yes');

  const [countries, setCountries] = useState([]);
  const [countryQuery, setCountryQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState('');

  const [regions, setRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');

  const [districts, setDistricts] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState('');

  const [ward, setWard] = useState('');

  const [showCountries, setShowCountries] = useState(false);
  const [showDayPicker, setShowDayPicker] = useState(false);
const [showMonthPicker, setShowMonthPicker] = useState(false);
const [showYearPicker, setShowYearPicker] = useState(false);



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
        setPending(false);
      })
      .catch(err => {
        console.error('Failed to fetch countries:', err);
        setPending(false);
      });
  }, []);




  const getCountryCode = (countryName) => {
    if (countryName.toLowerCase() === 'tanzania') return 'TZ';
    if (countryName.toLowerCase() === 'kenya') return 'KE';
    return '';
  };


 const handleCheckboxChange = (id) => {
        setSelectedCrops((prev) => {
            if (prev.includes(id)) {
                return prev.filter((cropsId) => cropsId !== id);
            } else {
                return [...prev, id];
            }
        });
    };


  const handleSubmit = async () => {
    
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();



    if (!day || !month || !year) {
      showAlertFunction('Please select full date of birth.');
      return;
    }

    if (!selectedEducation) {
          showAlertFunction('Please enter education level.');
          return;
        }

  if (!selectedFarmersOwnership) {
          showAlertFunction('Please enter farmer ownership type.');
          return;
        }

 if (!emailRegex.test(Email)) {
    showAlertFunction("Please enter a valid email, @");
    return;
  }



    const date_of_birth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
   

          // Append the array of Crops IDs
    if (selectedCrops.length > 0) {
        selectedCrops.forEach((id) => {
            formData.append('Crops', id);
        });
    } else {
        showAlertFunction('Please choose cultivated crops.');
        //setIsLoading(false);
        return;
    }
    //setPending(true);

      if (MobileNumber) {
        formData.append('MobileNumber', MobileNumber);
    } else {
        showAlertFunction('Please enter phone number ');
        return;
    }

       if (TelNumber) {
        formData.append('TelNumber', TelNumber);
    } else {
        showAlertFunction('Please enter telephone number ');
        return;
    }

    if (Username) {
        formData.append('Username', Username);
    } else {
        showAlertFunction('Please enter username ');
        return;
    }

       if (NidaNo) {
        formData.append('NidaNo', NidaNo);
    } else {
        showAlertFunction('Please enter nida number ');
        return;
    }


    if (MobileNumber.length !== 10) {
    showAlertFunction("The phone number must contain 10 digits");
    return;
  }


         if (fullName) {
        formData.append('full_name', fullName);
    } else {
        showAlertFunction('Please enter full name ');
        return;
    }


    if (FarmerSize) {
        formData.append('FarmerSize', FarmerSize);
    } else {
        showAlertFunction('Please enter farmer size ');
        return;
    }

       if (Email) {
        formData.append('Email', Email);
    } else {
        showAlertFunction('Please enter email');
        return;
    }


         if (regions) {
        formData.append('region', regions);
    } else {
        showAlertFunction('Please enter region');
        return;
    }


            if (districts) {
        formData.append('district', districts);
    } else {
        showAlertFunction('Please enter district');
        return;
    }


       if (ward) {
        formData.append('ward', ward);
    } else {
        showAlertFunction('Please enter ward');
        return;
    }


        if (selectedEducation) {
        formData.append('Education', selectedEducation);
    } else {
        showAlertFunction('Please enter education level');
        return;
    }


      if (selectedFarmersOwnership) {
        formData.append('FarmersOwnership', selectedFarmersOwnership);
    } else {
        showAlertFunction('Please enter farmer ownership type');
        return;
    }


    //formData.append('full_name', fullName);
    //formData.append('Username', Username);
    //formData.append('NidaNo', NidaNo);
    //formData.append('MobileNumber', MobileNumber);
   // formData.append('TelNumber', TelNumber);
    //formData.append('FarmerSize', FarmerSize);
    //formData.append('Email', Email);
    formData.append('date_of_birth', date_of_birth);
    formData.append('country', selectedCountry);
    //formData.append('region', regions);
   // formData.append('district', districts);
   // formData.append('ward', ward);
    formData.append('gender', gender);
    formData.append('PARTICIPATION_GROUPS', PARTICIPATION_GROUPS);

    //formData.append('Education', selectedEducation);
    //formData.append('FarmersOwnership', selectedFarmersOwnership);
    setPending(true);

   axios.post(EndPoint + `/AddNewFarmerView/`, formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setPending(false);
        showAlertFunction("New farmer is added successfull");
        //console.log("Well");
       //   setModalVisible(false);
       //  setIsModalVisible(false); // Reset state when modal closes
       // setdisplayContentsState(false);
        setFullName('');
        setNidaNo('');
        setFarmerSize('');
        setRegions('');
        setDistricts('');
        setWard('');
        setMobileNumber('');
        setTelNumber('');
        setUsername('');
        setEmail('');
        

      }).catch(error => {
        setPending(false);
        console.log(error);
         

      });
    }
  };

  return (


    <>{!fontsLoaded ? (<View/>):(

            <>


 {!isPending ? (



<LinearGradient colors={['#015d68', '#000']} style={globalStyles.container}>
   
         <MinorHeader />

         <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Add New Farmer</Text>

    <ScrollView 
    keyboardShouldPersistTaps="handled"
    style={styles.container}>
      <Text style={styles.label}>Full Name</Text>
      <TextInput value={fullName} onChangeText={setFullName} 
      placeholder="full name" 
      placeholderTextColor="wheat"
      style={styles.input} />
  
   <Text style={styles.label}>Username</Text>
      <TextInput value={Username} onChangeText={setUsername} 
      style={styles.input}
      placeholder="username" 
      placeholderTextColor="wheat"
       />

  <Text style={styles.label}>Email</Text>
      <TextInput value={Email} onChangeText={setEmail} 
      style={styles.input} 
      placeholder="email" 
      placeholderTextColor="wheat"
      />

  <Text style={styles.label}>Nida No</Text>
      <TextInput value={NidaNo} 
      onChangeText={setNidaNo}
      keyboardType="numeric" 
      style={styles.input} 
      placeholder="national identity card no" 
      placeholderTextColor="wheat"
      />

  <Text style={styles.label}>Mobile Number</Text>
      <TextInput value={MobileNumber} 
      onChangeText={setMobileNumber}
      keyboardType="numeric" 
      placeholder="phone number" 
      placeholderTextColor="wheat"
      style={styles.input} />

  <Text style={styles.label}>Telephone Number</Text>
      <TextInput value={TelNumber} 
      onChangeText={setTelNumber}
      keyboardType="numeric" 
      placeholder="telephone number" 
      placeholderTextColor="wheat"
      style={styles.input} />

<Text style={styles.label}>Farmer Size</Text>
      <TextInput value={FarmerSize} 
      onChangeText={setFarmerSize}
      keyboardType="numeric" 
      placeholder="farmer size" 
      placeholderTextColor="wheat"
      style={styles.input} />

 {/* Container for day, month, year inputs */}
<View style={styles.dateRow}>
  {/* Day */}
  <TouchableOpacity
    style={[styles.input, styles.dateInput]}
    onPress={() => {
      setShowDayPicker(!showDayPicker);
      setShowMonthPicker(false);
      setShowYearPicker(false);
    }}
  >
    <Text style={styles.dateTextreg}>{day || "Day"}</Text>
  </TouchableOpacity>
  {showDayPicker && (
    <Picker
      selectedValue={day}
      onValueChange={(item) => {
        setDay(item);
        setShowDayPicker(false);
      }}
      style={[styles.picker, styles.dateInput]}
    >
      {days.map(d => <Picker.Item key={d}   label={d} value={d} />)}
    </Picker>
  )}

  {/* Month */}
  <TouchableOpacity
    style={[styles.input, styles.dateInput]}
    onPress={() => {
      setShowMonthPicker(!showMonthPicker);
      setShowDayPicker(false);
      setShowYearPicker(false);
    }}
  >
    <Text style={styles.dateTextreg}>{month || "Month"}</Text>
  </TouchableOpacity>
  {showMonthPicker && (
    <Picker
      selectedValue={month}
      onValueChange={(item) => {
        setMonth(item);
        setShowMonthPicker(false);
      }}
      style={[styles.picker, styles.dateInput]}
    >
      {months.map(m => <Picker.Item key={m}  label={m} value={m} />)}
    </Picker>
  )}

  {/* Year */}
  <TouchableOpacity
    style={[styles.input, styles.dateInput]}
    onPress={() => {
      setShowYearPicker(!showYearPicker);
      setShowDayPicker(false);
      setShowMonthPicker(false);
    }}
  >
    <Text style={styles.dateTextreg}>{year || "Year"}</Text>
  </TouchableOpacity>
  {showYearPicker && (
    <Picker
      selectedValue={year}
      onValueChange={(item) => {
        setYear(item);
        setShowYearPicker(false);
      }}
      style={[styles.picker, styles.dateInput]}
    >
      {years.map(y => <Picker.Item key={y}  label={y} value={y} />)}
    </Picker>
  )}
</View>



     <Text style={styles.label}>Country</Text>
<TouchableOpacity 
  style={styles.input} 
  onPress={() => setShowCountries(true)}
>
  <Text style={styles.dateTextreg}>{selectedCountry || "Select Country"}</Text>
</TouchableOpacity>

{showCountries && (
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
          setShowCountries(false);  // Ficha orodha baada ya kuchagua
        }}>
          <Text style={styles.suggestion}>{item}</Text>
        </TouchableOpacity>
      ),
    }}
    inputContainerStyle={styles.input}
  />
)}


      <Text style={styles.label}>Region</Text>
      <TextInput value={regions} onChangeText={setRegions} 
      style={styles.input} 
      placeholder="Region" 
      placeholderTextColor="wheat"
      />

        <Text style={styles.label}>District</Text>
      <TextInput value={districts} onChangeText={setDistricts} 
      style={styles.input} 
      placeholder="District"

      placeholderTextColor="wheat"
       />




      <Text style={styles.label}>Ward</Text>
      <TextInput value={ward} onChangeText={setWard} 
      style={styles.input} placeholder="Ward" 

      placeholderTextColor="wheat"
      />

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

        <Text style={styles.label}>Participation in Corporate Groups</Text>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.genderButton, PARTICIPATION_GROUPS === 'yes' && styles.selectedGender]}
          onPress={() => setPARTICIPATION_GROUPS('yes')}
        >
          <Text>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.genderButton, PARTICIPATION_GROUPS === 'no' && styles.selectedGender]}
          onPress={() => setPARTICIPATION_GROUPS('no')}
        >
          <Text>No</Text>
        </TouchableOpacity>
      </View>






  {/*  mwanzo wa picker*/}
 <View style={{ marginTop: 0 ,
  marginBottom:30,
 }}>
        

        < View style={[globalStyles.inputTax,
          {
            backgroundColor:'black',
            marginHorizontal:0,
            width:'100%',
          }

          ]}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Education
            </Text>

     <View style={globalStyles.picker}>

            
      
          <Picker
    selectedValue={selectedEducation}
    onValueChange={(itemValue) => setSelectedEducation(itemValue)}
    >
        {Education.map((x) => (
            <Picker.Item 
            key={x.id} 
            label={x.Education} 
            value={x.id} 
            />
        ))}
    </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}







  {/*  mwanzo wa picker*/}
 <View style={{ marginTop: 0 ,
  marginBottom:30,
 }}>
        

        < View style={[globalStyles.inputTax,
          {
            backgroundColor:'black',
            marginHorizontal:0,
            width:'100%',
          }

          ]}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Ownership
            </Text>

     <View style={globalStyles.picker}>

            
      
          <Picker
    selectedValue={selectedFarmersOwnership}
    onValueChange={(itemValue) => setSelectedFarmersOwnership(itemValue)}
    >
        {FarmersOwnership.map((x) => (
            <Picker.Item 
            key={x.id} 
            label={x.FarmersOwnership} 
            value={x.id} 
            />
        ))}
    </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}





  <View style={{ marginTop: 20 }}>
      <View style={{ width: '90%', marginHorizontal: 20 }}>
        <Text style={[globalStyles.haippo, { color: 'wheat' }]}>
          Choose Cultivated Crops
        </Text>
      </View>
      <View style={{ flexDirection: 'column', flexWrap: 'wrap' }}>
        {Crops.map((x) => (
          <View key={x.id} style={{ 
            flexDirection: 'row', 
            alignItems: 'center',
             marginHorizontal: 20,
             width:'90%',
              marginVertical: 15 }}>
            <Checkbox
              value={selectedCrops.includes(x.id)}
              onValueChange={() => handleCheckboxChange(x.id)}
              style={{
               marginRight: 10,
               height:30,
               width:30,
                }}
            />
            <Text style={{
             color: 'white',
             marginLeft:20, 
             fontFamily:'Bold',
             width:'85%',
           }}>{x.Crops}</Text>
          </View>
        ))}
      </View>
    </View>

      <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
        <Text style={styles.submitText}>Submit</Text>
      </TouchableOpacity>




         <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Overdose Stores"
                closeOnTouchOutside={true}
                closeOnHardwareBackPress={false}
                showCancelButton={false}
                showConfirmButton={true}
                confirmText="OK"
                confirmButtonColor="green"
                onConfirmPressed={hideAlert}
                 confirmButtonStyle={globalStyles.alertButton}
                contentContainerStyle={globalStyles.alertContainer}
                customView={
                  <View style={globalStyles.alertContent}>
                    <Image source={require('../assets/icon.png')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>AgroTm</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />
      

<View style={{
  marginBottom:100,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>



    </ScrollView>


 </LinearGradient> 








      
  

                ):(

<LotterViewScreen />

)}

    

    </>


     )}</>





  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  label: { 
    fontWeight: 'bold',
     marginTop: 12 ,
     marginBottom:10,
     color:'white',
   },
  input: {
    borderWidth: 1,
    borderColor: 'white',
    padding: Platform.OS === 'ios' ? 10 : 5,
    marginBottom: 10,
    borderRadius: 5,
    color:'wheat',
  },
  suggestion: {
    padding: 10,
    backgroundColor: '#eee',
    borderBottomWidth: 1,
    borderColor: 'white',
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
    color:'white',
    //backgroundColor:'white',
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
    backgroundColor: '#015d68',
    padding: 15,
    borderRadius: 5,
    marginTop: 20,
  },
  submitText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },


  dateRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10,
},
dateInput: {
  flex: 1,
  marginRight: 10,
  //color:'white',
},
dateTextreg:{
  color:'white',
},

});
