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

export default function AddNewCrop({ navigation }) {

  const [loadingTime, setLoadingTime] = useState(0);

   const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Poppins-Bold.ttf'),
    Medium: require('../assets/fonts/Poppins-Medium.ttf'),
    SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Thin: require('../assets/fonts/Poppins-Thin.ttf'),
    Light: require('../assets/fonts/Poppins-Light.ttf'),
  });

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
         setPending(false);

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



  const [Crops, setCrops] = useState('');
  const [Username, setUsername] = useState('');
 

  const handleSubmit = async () => {
    
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();



         if (Crops) {
        formData.append('Crops', Crops);
    } else {
        showAlertFunction('Please fill in Crop name');
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



    setPending(true);

   axios.post(EndPoint + `/AddCultivatedCropsView/`, formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setPending(false);
        showAlertFunction("New Crop  is added successfull");
        //console.log("Well");
       //   setModalVisible(false);
       //  setIsModalVisible(false); // Reset state when modal closes
       // setdisplayContentsState(false);
        setCrops('');
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
      <Text style={globalStyles.loaderCounter2}>please wait....</Text>
    </View>
  </View>
)}




         <MinorHeader />

         <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>Add New Crop</Text>

    <ScrollView 
    keyboardShouldPersistTaps="handled"
    style={styles.container}>
      <Text style={styles.label}>Crop Name</Text>
      <TextInput value={Crops} onChangeText={setCrops} 
      placeholder="eg: maize" 
      placeholderTextColor="wheat"
      style={styles.input} />





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

});
