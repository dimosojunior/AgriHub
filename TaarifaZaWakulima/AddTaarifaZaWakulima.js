


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


import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

const { width, height } = Dimensions.get('window');

export default function AddTaarifaZaWakulima({ navigation, route }) {

  const [loadingTime, setLoadingTime] = useState(0);

   const { 
    postId,
    id,
    full_name,
    reg_no,

    NidaNo,
    Education,
    FarmerSize,
    date_of_birth,
    country,
    region,
    district,
    ward,
    gender,
    PARTICIPATION_GROUPS,
    FarmersOwnership,
    MobileNumber,
    TelNumber,
    Username,
    Email,
    Created,
    FarmerImage,
    //Crops
   
   } = route.params




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
  const [CropType, setCropType] = useState([]);
 const [selectedCropType, setSelectedCropType] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    //setPending2(true);
    fetch(`${EndPoint}/Add/AllCultivatedCropsViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setCropType(data);
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





  const [CropImage, setCropImage] = useState(null);

  //MWANZO WA PICK IMAGE FROM THE PHONE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
      setCropImage(result.assets[0].uri); // Use assets array
      //console.log("PROJECT IMAGE", PichaYaPost)
     // processImage(); // Use assets array
    // console.log("RESULT 1" ,result);
  };


  const [fullName, setFullName] = useState('');
  const [EstimatedProduce, setEstimatedProduce] = useState('');
  const [Produce, setProduce] = useState('');
  const [EstimatedWeightPerBag, setEstimatedWeightPerBag] = useState('');
  const [FarmPricePerBag, setFarmPricePerBag] = useState('');
   const [Storage, setStorage] = useState('');
  const [QuantityStored, setQuantityStored] = useState('');

  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');


 const [day2, setDay2] = useState('');
  const [month2, setMonth2] = useState('');
  const [year2, setYear2] = useState('');

   const [day3, setDay3] = useState('');
  const [month3, setMonth3] = useState('');
  const [year3, setYear3] = useState('');


  //const [gender, setGender] = useState('male');
  //const [PARTICIPATION_GROUPS, setPARTICIPATION_GROUPS] = useState('yes');

  //const [countries, setCountries] = useState([]);
  //const [countryQuery, setCountryQuery] = useState('');
  //const [selectedCountry, setSelectedCountry] = useState('');

  // const [regions, setRegions] = useState([]);
  // const [selectedRegion, setSelectedRegion] = useState('');

  // const [districts, setDistricts] = useState([]);
  // const [selectedDistrict, setSelectedDistrict] = useState('');

  const [Acreage, setAcreage] = useState('');
   const [CropCategory, setCropCategory] = useState('');

  const [showCountries, setShowCountries] = useState(false);

  const [showDayPicker, setShowDayPicker] = useState(false);
const [showMonthPicker, setShowMonthPicker] = useState(false);
const [showYearPicker, setShowYearPicker] = useState(false);

const [showDayPicker2, setShowDayPicker2] = useState(false);
const [showMonthPicker2, setShowMonthPicker2] = useState(false);
const [showYearPicker2, setShowYearPicker2] = useState(false);

const [showDayPicker3, setShowDayPicker3] = useState(false);
const [showMonthPicker3, setShowMonthPicker3] = useState(false);
const [showYearPicker3, setShowYearPicker3] = useState(false);

const [showDistricts, setShowDistricts] = useState(false);
const [showRegions, setShowRegions] = useState(false);


  const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years = Array.from({ length: 100 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );


 const days2 = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months2 = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years2 = Array.from({ length: 100 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );


   const days3 = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const months3 = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const years3 = Array.from({ length: 100 }, (_, i) =>
    (new Date().getFullYear() - i).toString()
  );






  // const filtered = (list, q) =>
  //   list.filter(item => item.toLowerCase().includes(q.toLowerCase()));

  // useEffect(() => {
  //   fetch('https://restcountries.com/v3.1/all?fields=name')
  //     .then(res => res.json())
  //     .then(data => {
  //       const countryList = Array.isArray(data)
  //         ? data.map(c => c.name.common).sort()
  //         : [];
  //       setCountries(countryList);
  //       setPending(false);
  //     })
  //     .catch(err => {
  //       console.error('Failed to fetch countries:', err);
  //       setPending(false);
  //     });
  // }, []);



 // Fetch regions (states)
  // useEffect(() => {
  //   if (!selectedCountry) return;
  //   const countryCode = getCountryCode(selectedCountry);
  //   if (!countryCode) return;

  //   fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
  //     headers: {
  //       'X-CSCAPI-KEY': 'WlBxTG8weWRiWUh0dmVMeE1pcElZdnc4cXZvRU04SGdUTjB1VHNRRQ==',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => setRegions(data))
  //     .catch(err => console.error(err));
  // }, [selectedCountry]);

  // // Fetch districts (cities) based on region
  // useEffect(() => {
  //   if (!selectedCountry || !selectedRegion) return;
  //   const countryCode = getCountryCode(selectedCountry);
  //   const stateCode = selectedRegion?.iso2;
  //   if (!countryCode || !stateCode) return;

  //   fetch(`https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`, {
  //     headers: {
  //       'X-CSCAPI-KEY': 'WlBxTG8weWRiWUh0dmVMeE1pcElZdnc4cXZvRU04SGdUTjB1VHNRRQ==',
  //     },
  //   })
  //     .then(res => res.json())
  //     .then(data => setDistricts(data))
  //     .catch(err => console.error(err));
  // }, [selectedRegion]);


  // const getCountryCode = (countryName) => {
  //   if (countryName.toLowerCase() === 'tanzania') return 'TZ';
  //   if (countryName.toLowerCase() === 'kenya') return 'KE';
  //   return '';
  // };






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



    // if (!day || !month || !year) {
    //   showAlertFunction('Please select full date of birth.');
    //   return;
    // }

    if (!day2 || !month2 || !year2) {
      showAlertFunction('Please select Harversted on date.');
      return;
    }

     if (!day3 || !month3 || !year3) {
      showAlertFunction('Please select Calender Date Of Receipt At The Centre.');
      return;
    }


    if (!selectedCenterName) {
          showAlertFunction('Please select collection point.');
          return;
        }

  if (!selectedCropType) {
          showAlertFunction('Please select crop type.');
          return;
        }

 // if (!QuantityStoredRegex.test(QuantityStored)) {
 //    showAlertFunction("Please enter a valid QuantityStored, @");
 //    return;
 //  }



    //const date_of_birth = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
   
    const HarverstedOn = `${year2}-${month2.padStart(2, '0')}-${day2.padStart(2, '0')}`;

  const DateDispatchToCentre = `${year3}-${month3.padStart(2, '0')}-${day3.padStart(2, '0')}`;

          // Append the array of Crops IDs
    // if (selectedCrops.length > 0) {
    //     selectedCrops.forEach((id) => {
    //         formData.append('Crops', id);
    //     });
    // } else {
    //     showAlertFunction('Please choose cultivated crops.');
    //     //setIsLoading(false);
    //     return;
    // }
    //setPending(true);

      if (EstimatedWeightPerBag) {
        formData.append('EstimatedWeightPerBag', EstimatedWeightPerBag);
    } else {
        showAlertFunction('Please enter estimated weight per bag ');
        return;
    }

       if (FarmPricePerBag) {
        formData.append('FarmPricePerBag', FarmPricePerBag);
    } else {
        showAlertFunction('Please enter Farm Price Per Bag ');
        return;
    }

    if (EstimatedProduce) {
        formData.append('EstimatedProduce', EstimatedProduce);
    } else {
        showAlertFunction('Please enter estimated produce ');
        return;
    }

       if (Produce) {
        formData.append('Produce', Produce);
    } else {
        showAlertFunction('Please enter production data ');
        return;
    }


  //   if (EstimatedWeightPerBag.length !== 10) {
  //   showAlertFunction("The phone number must contain 10 digits");
  //   return;
  // }


    //      if (fullName) {
    //     formData.append('full_name', fullName);
    // } else {
    //     showAlertFunction('Please enter full name ');
    //     return;
    // }


    if (Storage) {
        formData.append('Storage', Storage);
    } else {
        showAlertFunction('Please enter storage data ');
        return;
    }

       if (QuantityStored) {
        formData.append('QuantityStored', QuantityStored);
    } else {
        showAlertFunction('Please enter Quantity Stored');
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

   
       if (Acreage) {
        formData.append('Acreage', Acreage);
    } else {
        showAlertFunction('Please enter Acreage');
        return;
    }

        if (CropCategory) {
        formData.append('CropCategory', CropCategory);
    } else {
        showAlertFunction('Please enter Crop Category');
        return;
    }



        if (selectedCenterName) {
        formData.append('CenterName', selectedCenterName);
    } else {
        showAlertFunction('Please select collection point');
        return;
    }


      if (selectedCropType) {
        formData.append('CropType', selectedCropType);
    } else {
        showAlertFunction('Please select crop type');
        return;
    }



   // Ongeza picha kwenye `FormData` tu kama imechaguliwa
        if (CropImage) {
            formData.append('CropImage', {
                uri: CropImage,
                name: 'CropImage.jpg',
                type: 'image/jpeg',
            });
        }



    //formData.append('full_name', fullName);
    //formData.append('EstimatedProduce', EstimatedProduce);
    //formData.append('Produce', Produce);
    //formData.append('EstimatedWeightPerBag', EstimatedWeightPerBag);
   // formData.append('FarmPricePerBag', FarmPricePerBag);
    //formData.append('Storage', Storage);
    //formData.append('QuantityStored', QuantityStored);
    //formData.append('date_of_birth', date_of_birth);
    formData.append('HarverstedOn', HarverstedOn);
    formData.append('DateDispatchToCentre', DateDispatchToCentre);

    // formData.append('country', selectedCountry);
    // formData.append('region', selectedRegion?.name);
    // formData.append('district', selectedDistrict?.name);
    //formData.append('region', regions);
   // formData.append('district', districts);
   // formData.append('Acreage', Acreage);
   //formData.append('gender', gender);
   // formData.append('PARTICIPATION_GROUPS', PARTICIPATION_GROUPS);

    //formData.append('CenterName', selectedCenterName);
    //formData.append('CropType', selectedCropType);
    setPending(true);

   axios.post(EndPoint + `/AddNewTaarifaZaWakulimaView/?full_name=${full_name}&Education=${Education}&date_of_birth=${date_of_birth}&country=${country}&region=${region}&district=${district}&ward=${ward}&gender=${gender}&PARTICIPATION_GROUPS=${PARTICIPATION_GROUPS}&FarmersOwnership=${FarmersOwnership}&Username=${Username}&Email=${Email}&reg_no=${reg_no}&NidaNo=${NidaNo}&MobileNumber=${MobileNumber}&TelNumber=${TelNumber}&FarmerSize=${FarmerSize}`, formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setPending(false);
        showAlertFunction("New farmer information is added successfull");
        //console.log("Well");
       //   setModalVisible(false);
       //  setIsModalVisible(false); // Reset state when modal closes
       // setdisplayContentsState(false);
        //setFullName('');
        setProduce('');
        setStorage('');
        //setRegions('');
        //setDistricts('');
        setAcreage('');
        setCropCategory('');
        setEstimatedWeightPerBag('');
        setFarmPricePerBag('');
        setEstimatedProduce('');
        setQuantityStored('');

        // setSelectedCountry('');
        // setSelectedRegion('');
        // setSelectedDistrict('');
        setDay('');
        setMonth('');
        setYear('');

        setDay2('');
        setMonth2('');
        setYear2('');

        setDay3('');
        setMonth3('');
        setYear3('');
        setCropImage('');
        

      }).catch(error => {
        setPending(false);
        console.log(error);
         

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
      <Text style={globalStyles.loaderText}>Adding data</Text>
      <Text style={globalStyles.loaderCounter2}>please wait...</Text>
    </View>
  </View>
)}








         <MinorHeader />

         <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Add New Farm informations of {full_name}</Text>

    <ScrollView 
    keyboardShouldPersistTaps="handled"
    style={styles.container}>

  {/*    <Text style={styles.label}>Full Name</Text>
      <TextInput value={fullName} onChangeText={setFullName} 
      placeholder="full name" 
      placeholderTextColor="wheat"
      style={styles.input} />*/}
  
   <Text style={styles.label}>Estimated Produce</Text>
      <TextInput value={EstimatedProduce} onChangeText={setEstimatedProduce} 
      style={styles.input}
      placeholder="estimated produce" 
      placeholderTextColor="wheat"
      keyboardType="numeric"
       />

  <Text style={styles.label}>Quantity Stored</Text>
      <TextInput value={QuantityStored} onChangeText={setQuantityStored} 
      style={styles.input} 
      placeholder="number of bags stored" 
      placeholderTextColor="wheat"
      keyboardType="numeric"
      />

  <Text style={styles.label}>Produce</Text>
      <TextInput value={Produce} 
      onChangeText={setProduce}
      keyboardType="numeric" 
      style={styles.input} 
      placeholder="production data" 
      placeholderTextColor="wheat"
      />

  <Text style={styles.label}>Estimated Weight Per Bag</Text>
      <TextInput value={EstimatedWeightPerBag} 
      onChangeText={setEstimatedWeightPerBag}
      keyboardType="numeric" 
      placeholder="Estimated Weight Per Bag" 
      placeholderTextColor="wheat"
      style={styles.input} />

  <Text style={styles.label}>Farm Price Per Bag</Text>
      <TextInput value={FarmPricePerBag} 
      onChangeText={setFarmPricePerBag}
      keyboardType="numeric" 
      placeholder="Farm Price Per Bag" 
      placeholderTextColor="wheat"
      style={styles.input} />

<Text style={styles.label}>Storage</Text>
      <TextInput value={Storage} 
      onChangeText={setStorage}
      keyboardType="numeric" 
      placeholder="Amount Stored" 
      placeholderTextColor="wheat"
      style={styles.input} />



 {/* Container for day, month, year inputs */}
 <Text style={styles.label}>Harversted On</Text>
<View style={styles.dateRow}>
  {/* Day */}
  <TouchableOpacity
    style={[styles.input, styles.dateInput]}
    onPress={() => {
      setShowDayPicker2(!showDayPicker2);
      setShowMonthPicker2(false);
      setShowYearPicker2(false);
    }}
  >
    <Text style={styles.dateTextreg}>{day2 || "Day"}</Text>
  </TouchableOpacity>
  {showDayPicker2 && (
    <Picker
      selectedValue={day2}
      onValueChange={(item) => {
        setDay2(item);
        setShowDayPicker2(false);
      }}
      style={[styles.picker, styles.dateInput]}

    >
      {days2.map(d => <Picker.Item key={d}   label={d} value={d} />)}
    </Picker>
  )}

  {/* Month */}
  <TouchableOpacity
    style={[styles.input, styles.dateInput]}
    onPress={() => {
      setShowMonthPicker2(!showMonthPicker2);
      setShowDayPicker2(false);
      setShowYearPicker2(false);
    }}
  >
    <Text style={styles.dateTextreg}>{month2 || "Month"}</Text>
  </TouchableOpacity>
  {showMonthPicker2 && (
    <Picker
      selectedValue={month2}
      onValueChange={(item) => {
        setMonth2(item);
        setShowMonthPicker2(false);
      }}
      style={[styles.picker, styles.dateInput]}
    >
      {months2.map(m => <Picker.Item key={m}  label={m} value={m} />)}
    </Picker>
  )}

  {/* Year */}
  <TouchableOpacity
    style={[styles.input, styles.dateInput]}
    onPress={() => {
      setShowYearPicker2(!showYearPicker2);
      setShowDayPicker2(false);
      setShowMonthPicker2(false);
    }}
  >
    <Text style={styles.dateTextreg}>{year2 || "Year"}</Text>
  </TouchableOpacity>
  {showYearPicker2 && (
    <Picker
      selectedValue={year}
      onValueChange={(item) => {
        setYear2(item);
        setShowYearPicker2(false);
      }}
      style={[styles.picker, styles.dateInput]}
    >
      {years2.map(y => <Picker.Item key={y}  label={y} value={y} />)}
    </Picker>
  )}
</View>











 {/* Container for day, month, year inputs */}
 <Text style={styles.label}>Calender Date Of Receipt At The Centre</Text>
<View style={styles.dateRow}>
  {/* Day */}
  <TouchableOpacity
    style={[styles.input, styles.dateInput]}
    onPress={() => {
      setShowDayPicker3(!showDayPicker3);
      setShowMonthPicker3(false);
      setShowYearPicker3(false);
    }}
  >
    <Text style={styles.dateTextreg}>{day3 || "Day"}</Text>
  </TouchableOpacity>
  {showDayPicker3 && (
    <Picker
      selectedValue={day3}
      onValueChange={(item) => {
        setDay3(item);
        setShowDayPicker3(false);
      }}
      style={[styles.picker, styles.dateInput]}

    >
      {days3.map(d => <Picker.Item key={d}   label={d} value={d} />)}
    </Picker>
  )}

  {/* Month */}
  <TouchableOpacity
    style={[styles.input, styles.dateInput]}
    onPress={() => {
      setShowMonthPicker3(!showMonthPicker3);
      setShowDayPicker3(false);
      setShowYearPicker3(false);
    }}
  >
    <Text style={styles.dateTextreg}>{month3 || "Month"}</Text>
  </TouchableOpacity>
  {showMonthPicker3 && (
    <Picker
      selectedValue={month3}
      onValueChange={(item) => {
        setMonth3(item);
        setShowMonthPicker3(false);
      }}
      style={[styles.picker, styles.dateInput]}
    >
      {months3.map(m => <Picker.Item key={m}  label={m} value={m} />)}
    </Picker>
  )}

  {/* Year */}
  <TouchableOpacity
    style={[styles.input, styles.dateInput]}
    onPress={() => {
      setShowYearPicker3(!showYearPicker3);
      setShowDayPicker3(false);
      setShowMonthPicker3(false);
    }}
  >
    <Text style={styles.dateTextreg}>{year3 || "Year"}</Text>
  </TouchableOpacity>
  {showYearPicker3 && (
    <Picker
      selectedValue={year}
      onValueChange={(item) => {
        setYear3(item);
        setShowYearPicker3(false);
      }}
      style={[styles.picker, styles.dateInput]}
    >
      {years3.map(y => <Picker.Item key={y}  label={y} value={y} />)}
    </Picker>
  )}
</View>





      <Text style={styles.label}>Acreage</Text>
      <TextInput value={Acreage} onChangeText={setAcreage} 
      style={styles.input} placeholder="Acreage / Area" 

      placeholderTextColor="wheat"
      />

        <Text style={styles.label}>Crop Category</Text>
      <TextInput value={CropCategory} onChangeText={setCropCategory} 
      style={styles.input} placeholder="Crop Category" 

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
                 Crop Type
            </Text>

     <View style={globalStyles.picker}>

            
      
          <Picker
    selectedValue={selectedCropType}
    onValueChange={(itemValue) => setSelectedCropType(itemValue)}
    >
        {CropType.map((x) => (
            <Picker.Item 
            key={x.id} 
            label={x.Crops} 
            value={x.id} 
            />
        ))}
    </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}






  <View style={[globalStyles.input,
    {
     // backgroundColor:'green',
     backgroundColor:'rgba(0,0,0,0)',
      //marginHorizontal:20,
      width:'100%',
      borderColor:'white',
      borderWidth:1,

    }

    ]}>

  

     <TouchableOpacity
      
      onPress={pickImage}
    >
    <FontAwesome
     style={globalStyles.InputIcon} 
     name='image' 
     size ={30}
     color="white"
     />
     </TouchableOpacity>

    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage}
    >
      <Text style={{ 
        color: 'white',
        marginLeft:15, 
      }}>Choose crop image</Text>
    </TouchableOpacity>
  </View>


<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
}}>
    {CropImage && (
<Image source={{ uri: CropImage }} style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
)}
</View>




{/*mwisho wa picha yako*/}






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
