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


export default function UpdateCollector({ navigation, route }) {

  const [loadingTime, setLoadingTime] = useState(0);

    const { 
      postId,
      full_name
     } = route.params;
  // const [postDetails, setPostDetails] = useState({
  //   Title: '',
  //   Maelezo: '',
  //   // PichaYaPost: '',
  //   // PichaYaPost2: '',
  //   // PichaYaPost3: '',
  //   // PichaYaPost4: '',
  //   // PichaYaPost5: '',
  // });

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
  const [CenterName, setCenterName] = useState([]);
 const [selectedCenterName, setSelectedCenterName] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    //setPending2(true);
    fetch(`${EndPoint}/Add/AllCollectionCentersViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setCenterName(data);
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
   const [Location, setLocation] = useState('');
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

const [showDistricts, setShowDistricts] = useState(false);
const [showRegions, setShowRegions] = useState(false);


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



 // Fetch regions (states)
  useEffect(() => {
    if (!selectedCountry) return;
    const countryCode = getCountryCode(selectedCountry);
    if (!countryCode) return;

    fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
      headers: {
        'X-CSCAPI-KEY': 'WlBxTG8weWRiWUh0dmVMeE1pcElZdnc4cXZvRU04SGdUTjB1VHNRRQ==',
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
        'X-CSCAPI-KEY': 'WlBxTG8weWRiWUh0dmVMeE1pcElZdnc4cXZvRU04SGdUTjB1VHNRRQ==',
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






 const handleCheckboxChange = (id) => {
        setSelectedCrops((prev) => {
            if (prev.includes(id)) {
                return prev.filter((cropsId) => cropsId !== id);
            } else {
                return [...prev, id];
            }
        });
    };












useEffect(() => {
  const fetchPostDetails = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setUserToken(token);  // Set the token before making the API call
      try {
        const response = await axios.get(`${EndPoint}/RetrieveCollectorsView/${postId}/`, {
          headers: {
            Authorization: `Token ${token}`,  // Use the retrieved token
          },
        });
        const data = response.data;

       setFullName(data.full_name);
       setUsername(data.Username);
      // setNidaNo(data.NidaNo.toString());
      //setLocation(data.Location);
       setMobileNumber(data.MobileNumber.toString());
      // setTelNumber(data.TelNumber.toString());

       setSelectedCountry(data.country);
       setSelectedRegion(data.region);
       setSelectedDistrict(data.district);
       setWard(data.ward);
      // setGender(data.gender);
      // setPARTICIPATION_GROUPS(data.PARTICIPATION_GROUPS);

       setEmail(data.Email);
       //setCenterName(data.CenterName.CenterName);
       
       


        //console.log("Data fetched successfully");
      } catch (error) {
        handleErrorMessage(error);
        console.log("Error:", error);
      }
    }
  };
  
  // Ensure token is available first before making the API call
  if (userToken) {
    fetchPostDetails();
  }
}, [postId, userToken]);

// Fetch user token first in a separate useEffect
useEffect(() => {
  const getToken = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);  // Token is set here
  };
  getToken();
}, []);  // Run this only once when the component is mounted














  const handleSubmit = async () => {
    
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();



 if (!emailRegex.test(Email)) {
    showAlertFunction("Please enter a valid email, @");
    return;
  }



  //  const date_of_birth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
   

    //setPending(true);

      if (MobileNumber) {
        formData.append('MobileNumber', MobileNumber);
    } else {
        showAlertFunction('Please enter phone number ');
        return;
    }

   

    if (Username) {
        formData.append('Username', Username);
    } else {
        showAlertFunction('Please enter username ');
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



    if (selectedCenterName) {
        formData.append('CenterName', selectedCenterName);
    } else {
        showAlertFunction('Please select collection point');
        return;
    }

    // if (Location) {
    //     formData.append('Location', Location);
    // } else {
    //     showAlertFunction('Please enter location ');
    //     return;
    // }

       if (Email) {
        formData.append('Email', Email);
    } else {
        showAlertFunction('Please enter email');
        return;
    }


    //      if (selectedRegion) {
    //     formData.append('region', regions);
    // } else {
    //     showAlertFunction('Please enter region');
    //     return;
    // }


    //         if (selectedDistrict) {
    //     formData.append('district', districts);
    // } else {
    //     showAlertFunction('Please enter district');
    //     return;
    // }

         if (!selectedRegion) {
        
        showAlertFunction('Please select region');
        return;
    }


            if (!selectedDistrict) {
        
        showAlertFunction('Please select district');
        return;
    }


       if (ward) {
        formData.append('ward', ward);
    } else {
        showAlertFunction('Please enter ward');
        return;
    }


   


    //formData.append('full_name', fullName);
    //formData.append('Username', Username);
    //formData.append('NidaNo', NidaNo);
    //formData.append('MobileNumber', MobileNumber);
   // formData.append('TelNumber', TelNumber);
    //formData.append('Location', Location);
    //formData.append('Email', Email);
   // formData.append('date_of_birth', date_of_birth);
    formData.append('country', selectedCountry);
    formData.append('region', selectedRegion?.name);
    formData.append('district', selectedDistrict?.name);
    //formData.append('region', regions);
   // formData.append('district', districts);
   // formData.append('ward', ward);
    //formData.append('gender', gender);
   // formData.append('PARTICIPATION_GROUPS', PARTICIPATION_GROUPS);

    //formData.append('CenterName', selectedCenterName);
    //formData.append('FarmersOwnership', selectedFarmersOwnership);
    setPending(true);

   axios.put(EndPoint + `/UpdateCollectorsPostView/${postId}/edit/`, formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setPending(false);
        showAlertFunction("Data updated successfull");
        //console.log("Well");
       //   setModalVisible(false);
       //  setIsModalVisible(false); // Reset state when modal closes
       // setdisplayContentsState(false);
        setFullName('');
        //setNidaNo('');
        //setLocation('');
        //setRegions('');
        //setDistricts('');
        setWard('');
        setMobileNumber('');
       // setTelNumber('');
        setUsername('');
        setEmail('');

        setSelectedCountry('');
        setSelectedRegion('');
        setSelectedDistrict('');
        //setDay('');
       // setMonth('');
       // setYear('');

       // navigation.goBack();
       navigation.navigate("All Collectors");
        

      }).catch(error => {
          setPending(false);
          if (error.response?.data?.error) {
            showAlertFunction(error.response.data.error);
          } else {
            showAlertFunction("Something went wrong. Try again.");
          }
          console.log(error.response?.data);
        });

      
    }
  };

  return (


    <>{!fontsLoaded ? (<View/>):(

 

<LinearGradient colors={['#015d68', '#000']} style={globalStyles.container}>
   
     
  {isPending && (
  <View style={globalStyles.loaderOverlay}>
    <View style={globalStyles.loaderContent}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={globalStyles.loaderText}>Updating collector</Text>
      <Text style={globalStyles.loaderCounter2}>please wait....</Text>
    </View>
  </View>
)}




         <MinorHeader />

         <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Change Informations of {full_name}</Text>

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

 
  <Text style={styles.label}>Mobile Number</Text>
      <TextInput value={MobileNumber} 
      onChangeText={setMobileNumber}
      keyboardType="numeric" 
      placeholder="phone number" 
      placeholderTextColor="wheat"
      style={styles.input} />

  



<Text style={styles.label}>Country</Text>

<TouchableOpacity 
  style={styles.input} 
  onPress={() => setShowCountries(true)}
>
  <Text style={styles.dateTextreg}>{selectedCountry || "Select Country"}</Text>
</TouchableOpacity>

{showCountries && (
  <View style={styles.dropdownList}>
    <TextInput
      style={styles.input}
      value={countryQuery}
      onChangeText={(text) => {
        setCountryQuery(text);
        setSelectedCountry(text);
      }}
      placeholder="Search country..."
    />
    
    {/* Map through filtered countries */}
    {filtered(countries, countryQuery).map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setCountryQuery(item);
          setSelectedCountry(item);
          setShowCountries(false);  // Hide dropdown after selection
        }}
      >
        <Text style={styles.suggestion}>{item}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}


<TouchableOpacity onPress={() => setShowRegions(true)} style={styles.dropdownBox}>
  <Text style={styles.dropdownText}>
    {selectedRegion ? selectedRegion.name : 'Select Region'}
  </Text>
</TouchableOpacity>

{showRegions && (
  <View style={styles.dropdownList}>
    {regions.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedRegion(item);
          setShowRegions(false);
        }}
      >
        <Text style={styles.dropdownItem}>{item.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}

<TouchableOpacity onPress={() => setShowDistricts(true)} style={styles.dropdownBox}>
  <Text style={styles.dropdownText}>
    {selectedDistrict ? selectedDistrict.name : 'Select District'}
  </Text>
</TouchableOpacity>

{showDistricts && (
  <View style={styles.dropdownList}>
    {districts.map((item, index) => (
      <TouchableOpacity
        key={index}
        onPress={() => {
          setSelectedDistrict(item);
          setShowDistricts(false);
        }}
      >
        <Text style={styles.dropdownItem}>{item.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
)}



      <Text style={styles.label}>Ward</Text>
      <TextInput value={ward} onChangeText={setWard} 
      style={styles.input} placeholder="Ward" 

      placeholderTextColor="wheat"
      />

   





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
                 Collection Point
            </Text>

     <View style={globalStyles.picker}>

            
      
          <Picker
    selectedValue={selectedCenterName}
    onValueChange={(itemValue) => setSelectedCenterName(itemValue)}
    >
        {CenterName.map((x) => (
            <Picker.Item 
            key={x.id} 
            label={x.CenterName} 
            value={x.id} 
            />
        ))}
    </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}





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

dropdownBox: {
  padding: 12,
  backgroundColor: 'rgba(0,0,0,0)',
  borderRadius: 8,
  borderColor: 'white',
  borderWidth: 1,
  marginBottom: 10,
},
dropdownText: {
  color: 'white',
},
dropdownList: {
  //maxHeight: 150,
  //backgroundColor: '#015d68',
  borderRadius: 8,
  elevation: 4,
  //Zindex:1,
  color: 'white',
  paddingHorizontal:10,
},
dropdownItem: {
  padding: 10,
  // borderBottomColor: 'red',
  // borderBottomWidth: 1,
  color: 'white',

},
phoneInputContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  borderColor: '#ccc',
  borderWidth: 1,
  borderRadius: 8,
  paddingHorizontal: 10,
  backgroundColor: '#fff',
},
prefix: {
  fontSize: 16,
  color: '#555',
},
phoneInput: {
  flex: 1,
  paddingVertical: 10,
  paddingLeft: 10,
  color: '#000',
},


});
