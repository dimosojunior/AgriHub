


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

export default function UpdateStocksCollection({ navigation, route }) {



const [loadingTime, setLoadingTime] = useState(0);


   const { 
    postId,
    id,
    full_name,
  
   
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
  const [Quantity, setQuantity] = useState('');
  const [Produce, setProduce] = useState('');
  const [CropUnitPrice, setCropUnitPrice] = useState('');
  const [StorageChargesPerUnit, setStorageChargesPerUnit] = useState('');
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





useEffect(() => {
  const fetchPostDetails = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      setUserToken(token);  // Set the token before making the API call
      try {
        const response = await axios.get(`${EndPoint}/RetrieveStocksCollectionView/${postId}/`, {
          headers: {
            Authorization: `Token ${token}`,  // Use the retrieved token
          },
        });
        const data = response.data;

       
       setCropUnitPrice(data.CropUnitPrice.toString());
       setStorageChargesPerUnit(data.StorageChargesPerUnit.toString());
       setQuantity(data.Quantity.toString());
       
       //setCropImage(data.CropImage);
       console.log("Full Response Data:", data);



      setSelectedCropType(data.CropType?.id || null);
      setSelectedCenterName(data.CenterName?.id || null);
      
     // setCropImage(data.CropImage || null);
     //setCropImage(`${EndPoint}${data?.CropImage}` || `${EndPoint}${data.CropType.CropImage}`);

    setCropImage(
      data?.CropImage 
        ? `${EndPoint}${data.CropImage}` 
        : data?.CropType?.CropImage 
          ? `${EndPoint}${data.CropType.CropImage}`
          : null
    );
   console.log("CropImage:", data?.CropImage);
console.log("CropType Image:", data?.CropType?.CropImage);




      //setIs_Harversted(data.Is_Harversted || false);
       
       //setEducation(data.Education.Education);
       
       


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




    if (!selectedCenterName) {
          showAlertFunction('Please select collection point.');
          return;
        }

  if (!selectedCropType) {
          showAlertFunction('Please select crop type.');
          return;
        }

 

      if (CropUnitPrice) {
        formData.append('CropUnitPrice', CropUnitPrice);
    } else {
        showAlertFunction('Please enter Crop Unit Price ');
        return;
    }

       if (StorageChargesPerUnit) {
        formData.append('StorageChargesPerUnit', StorageChargesPerUnit);
    } else {
        showAlertFunction('Please enter Storage Charges Per Unit ');
        return;
    }

    if (Quantity) {
        formData.append('Quantity', Quantity);
    } else {
        showAlertFunction('Please enter amount at the collection centre ');
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



    
    // formData.append('HarverstedOn', HarverstedOn);
    // formData.append('DateDispatchToCentre', DateDispatchToCentre);

   
    setPending(true);

   axios.put(`https://twinsmicrofinance.pythonanywhere.com/UpdateStocksCollectionPostView/${postId}/edit/`, formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setPending(false);
        showAlertFunction("New stock information is updated successfull");
        
        setCropUnitPrice('');
        setStorageChargesPerUnit('');
        setQuantity('');
        

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
      <Text style={globalStyles.loaderText}>Updating data</Text>
      <Text style={globalStyles.loaderCounter}>please wait...</Text>
    </View>
  </View>
)}




         <MinorHeader />

         <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Update Stock informations of {full_name}</Text>

    <ScrollView 
    keyboardShouldPersistTaps="handled"
    style={styles.container}>

  {/*    <Text style={styles.label}>Full Name</Text>
      <TextInput value={fullName} onChangeText={setFullName} 
      placeholder="full name" 
      placeholderTextColor="wheat"
      style={styles.input} />*/}
  
   <Text style={styles.label}>Amount at the Collection Centre</Text>
      <TextInput value={Quantity} onChangeText={setQuantity} 
      style={styles.input}
      placeholder="Quantity" 
      placeholderTextColor="wheat"
      keyboardType="numeric"
       />

  

  <Text style={styles.label}>Crop Unit Price</Text>
      <TextInput value={CropUnitPrice} 
      onChangeText={setCropUnitPrice}
      keyboardType="numeric" 
      placeholder="price for 1 debe" 
      placeholderTextColor="wheat"
      style={styles.input} />

  <Text style={styles.label}>Storage Charges Per Unit</Text>
      <TextInput value={StorageChargesPerUnit} 
      onChangeText={setStorageChargesPerUnit}
      keyboardType="numeric" 
      placeholder="storage charges per 1 debe" 
      placeholderTextColor="wheat"
      style={styles.input} />



  





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
    {CropImage ? (
<Image source={{ uri: CropImage }} style={{ 
width: width-50 ,
height: 200,
borderRadius:10,
marginTop:10,
marginBottom:20,

}} />
):(

<Image 
source={{ uri: CropType.CropImage }} 
// source={{
//   uri: EndPoint + '/' + CropType.CropImage,
// }}

style={{ 
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
