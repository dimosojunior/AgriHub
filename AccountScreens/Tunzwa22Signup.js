
import React, { useState,useRef, useEffect } from 'react';

import { View,SafeAreaView,ImageBackground,KeyboardAvoidingView,
Pressable, TextInput, Alert, Image,Platform, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, Touchable, TouchableOpacity } from 'react-native';


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import {globalStyles} from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons, FontAwesome, MaterialCommunityIcons} from '@expo/vector-icons';
import {useFonts} from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import { COLORS, SIZES } from '../Screens/src/Constant';
import { LinearGradient } from 'expo-linear-gradient';
import DirectHeader from '../Header/DirectHeader';
import MinorHeader from '../Header/MinorHeader';

import Checkbox from 'expo-checkbox'; // Make sure to install this package
import {Picker} from '@react-native-picker/picker';
import LotterViewScreen from '../Screens/LotterViewScreen';

const {width,height} = Dimensions.get('window');
const OtherUserRegistration = ({ navigation }) => {

  const [loadingTime, setLoadingTime] = useState(0);

  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

   const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };

const [isPending2, setPending2] =useState(true);


// State variable to store the RoomClasses data
  const [CenterName, setCenterName] = useState([]);
 const [selectedCenterName, setSelectedCenterName] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    setPending2(true);
    fetch(`${EndPoint}/Add/AllCollectionCentersViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setCenterName(data);
        setPending2(false);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        setPending2(false);
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);



  //console.log("Push Token Again", pushToken);


 const [isPasswordVisible, setPasswordVisible] = useState(false);

  //const {width,height} = Dimensions.get('window');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [password2, setPassword2] = useState('');
  const [full_name, setfull_name] = useState('');


  //const [phone, setPhone] = useState('');
  //const [profile_image, setProfile_image] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);
const [isStaff, setIsStaff] = useState(false);
const [isCashier, setIsCashier] = useState(false);

  

  const [error, setError] = useState(null); // State to hold the error message
const [isPending, setPending] =useState(false);
const emailRegex = /\S+@\S+\.\S+/;

const [errorMessage, setErrorMessage] = useState('');



const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      // if (error.response.status === 401) {
      //   showAlertFunction('Registration error. Please try again later.');
      // } else if (error.response.status === 404) {
      //   showAlertFunction('Not Found: The requested resource was not found.');

      // } 
      // else {
      //   showAlertFunction('An error occurred while processing your request.');
      // }
    }  if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
    } else {
      showAlertFunction('Taarifa zako sio sahihi');
    }
  };

  const handleRegistration = async () => {
    // Reset the error message
    setError(null);

    // Validation checks
    if (!password && !username && !full_name && !phone && !email) {
      //setError('All fields are required');
      showAlertFunction("Tafadhali jaza taarifa zote kwa usahihi");
      return;
    }

    if (!email) {
      //setError('please enter your valid email');
       showAlertFunction("Tafadhali ingiza email yako kwa usahihi");
      return;
    }

    if (!password) {
      //setError('please enter your password');
       showAlertFunction("Tafadhali ingiza password yako kwa usahihi");
      return;
    }


     if (password !== password2) {
      showAlertFunction("Neno siri ulizoingiza hazifanani");
      return;
    }

    // Validate email format
  
  if (!emailRegex.test(email)) {
    showAlertFunction("Tafadhali fuata kanuni za kuandika email, @");
    return;
  }

  // Validate password length
  if (password.length < 4) {
    showAlertFunction("tafadhali neno siri linapaswa kuwa na tarakimu zaidi ya 4");
    return;
  }

    if (!username) {
     // setError('please enter your username');
      showAlertFunction("Tafadhali ingiza jina unalotumia kwa usahihi");
      return;
    }

    if (!full_name) {
     // setError('please enter your username');
      showAlertFunction("Tafadhali ingiza jina lako kamili kwa usahihi");
      return;
    }

    if (!phone) {
      //setError('please enter your phone number');
       showAlertFunction("Tafadhali ingiza namba yako ya simu kwa usahihi");
      return;
    }

      // Validate phone number
  if (!phone.startsWith("0")) {
    showAlertFunction("Namba ya simu lazima ianze na 0");
    return;
  }

  if (phone.length !== 10) {
    showAlertFunction("Namba ya simu lazima iwe na tarakimu 10");
    return;
  }


 // if (!selectedJinaLaKituo) {
 //          showAlertFunction('Tafadhali chagua kituo unachomsajili mtumiaji.');
 //          return;
 //        }

  // Fetch the Expo push token
  // const expoPushToken = await registerForPushNotificationsAsync();
 // const expoPushToken = pushToken;

  // if (!expoPushToken) {
  //   showAlertFunction("Imeshindikana, Kifaa chako kimeshindwa kutengeneza token");
  //   return;
  // }




    setPending(true);

    try {
      const response = await axios.post(
        EndPoint + '/Account/BuyerRegistrationView/', {
        //email: email,
        password: password,
        username: username,
        //phone: phone,
        //is_admin: isAdmin,
        //is_staff: isStaff,
        //is_cashier: isCashier,
        //JinaLaKituo:selectedJinaLaKituo
        //Location:Location
        
      });
      //Alert.alert("You have registered Successfully");
       //showAlertFunction(expoPushToken);
       showAlertFunction("You have registered Successfully");
      //navigation.replace('Home Stack');

      //const token = response.data.token; // Extract the token from the response
      // You can now save the token to your app's state, AsyncStorage, or Redux store
    
  setPending(false);
  setEmail('');
  setUsername('');
  setPassword('');
  setPassword2('');
  setPhone('');
  setfull_name('');
  


//mwanzo wa kusave user data


 const token = response.data.token;
      await AsyncStorage.setItem('userToken', token);
      //navigation.emit('updateUserToken', token);

      // Now, make another request to get user data
      const userResponse = await axios.get(EndPoint + '/Account/user_data/', {
        headers: {
          Authorization: `Token ${token}`,
        },
      });

      const userData = userResponse.data;
      // Save user data to AsyncStorage
      await AsyncStorage.setItem('userData', JSON.stringify(userData));

      // Emit the 'updateUserToken' event
      // hii inasaidia kupata a login user token automatically without
      // page refreshing
      EventRegister.emit('updateUserToken', token);



      // Pass the userData to Home Stack
      // navigation.replace('MainScreen', { userData });
      navigation.reset({
        index: 0,
        routes: [{ name: 'Home Stack' }],
      });



//mwisho wa kusave data





   } catch (error) {
  if (error.response) {
    const errors = error.response.data;
    if (errors.email) {
      showAlertFunction("Email uliyotumia tayari ipo.");
    } else if (errors.username) {
      showAlertFunction("Username uliyotumia tayari upo.");
    } else if (errors.phone) {
      showAlertFunction("Namba ya simu tayari ipo.");
    } else {
      showAlertFunction("Tatizo limetokea, tafadhali jaribu tena.");
    }
  } else {
    handleErrorMessage(error);
  }
}
    return(

        <>{!fontsLoaded ? (<View/>):(

  
       

      

     <LinearGradient colors={['#015d68', '#000']} style={styles.container}>
            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                
                {/* Logo & Company Info */}
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/icon.png')} style={styles.logo} />
                    <Text style={styles.companyName}>AgriHub Tanzania</Text>
                    <Text style={styles.description}>Welcome back! Please log in to continue.</Text>
                </View>

                {/* Username Field */}

                  <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="full name"
                        placeholderTextColor="#bbb"
                        value={full_name}
                        onChangeText={text => setfull_name(text)} 
                    />
                </View>

                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Username"
                        placeholderTextColor="#bbb"
                        value={username}
                        onChangeText={text => setUsername(text)} 
                    />
                </View>

                  <TextInput 
                        style={styles.input} 
                        placeholder="Phone Number"
                        placeholderTextColor="#bbb"
                        value={phone}
                        onChangeText={text => setPhone(text)} 
                    />
                </View>

                {/* Password Field */}
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="Password"
                        placeholderTextColor="#bbb"
                        secureTextEntry={secureText}
                        value={password}
                     onChangeText={(text) => setPassword(text)}
                    />
                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                        <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="#fff" />
                    </TouchableOpacity>
                </View>


             

               {/* Password Field */}
                <View style={styles.inputContainer}>
                    <Ionicons name="lock-closed-outline" size={20} color="#fff" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="confirm password"
                        placeholderTextColor="#bbb"
                        secureTextEntry={secureText}
                        value={password2}
                     onChangeText={(text) => setPassword2(text)}
                    />
                    <TouchableOpacity onPress={() => setSecureText(!secureText)}>
                        <Ionicons name={secureText ? "eye-off-outline" : "eye-outline"} size={20} color="#fff" />
                    </TouchableOpacity>
                </View>









<Text style={{
  color:'green',
  marginLeft:0,
}}>Weka tiki sehemu sahihi kutokana na taarifa ulizojaza hapo juu</Text>

{/*mwanzo wa checkboxes*/}
 <View style={styles.checkboxContainer}>
        <View style={styles.checkboxRow}>
          <Checkbox
            value={isAdmin}
            onValueChange={setIsAdmin}
            color={isAdmin ? '#2196F3' : undefined}
            style={{
               marginRight: 10,
               height:30,
               width:30,
                }}
          />
          <Text style={styles.checkboxLabel}>Ni Admin ?</Text>
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox
            value={isStaff}
            onValueChange={setIsStaff}
            color={isStaff ? '#2196F3' : undefined}
            style={{
               marginRight: 10,
               height:30,
               width:30,
                }}
          />
          <Text style={styles.checkboxLabel}>Ni Mtumiaji Wa Kituo ?</Text>
        </View>

        <View style={styles.checkboxRow}>
          <Checkbox
            value={isCashier}
            onValueChange={setIsCashier}
            color={isCashier ? '#2196F3' : undefined}
            style={{
               marginRight: 10,
               height:30,
               width:30,
                }}
          />
          <Text style={styles.checkboxLabel}>Ni Cashier ?</Text>
        </View>
      </View>

     {/*mwisho wa checkboxes*/}  




                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginText}>Login</Text>
                </TouchableOpacity>
            </Animated.View>

            {/* Loader Overlay */}
            {loading && (
                <View style={styles.loadingOverlay}>
                    <ActivityIndicator size="large" color="#fff" />
                </View>
            )}












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


      
        </LinearGradient>







 

         )}</>
    )
}

export default OtherUserRegistration;




const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    content: {
        width: '85%',
        alignItems: 'center',
    },
    logoContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    logo: {
        width: 80,
        height: 80,
        marginBottom: 10,
        borderRadius:50,
    },
    companyName: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#fff',
    },
    description: {
        fontSize: 14,
        color: '#bbb',
        textAlign: 'center',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#333',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 15,
        width: '100%',
        // borderColor:'white',
        // borederWidth:1,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#fff',

    },
    loginButton: {
        // backgroundColor: '#007AFF',
        //backgroundColor: '#0c9b56',
        backgroundColor:'#015d68',
        paddingVertical: 12,
        borderRadius: 10,
        alignItems: 'center',
        width: '100%',
    },
    loginText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loadingOverlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },

 checkboxContainer: {
    width: '100%',
    marginBottom: 20,
    //backgroundColor:'red',
    marginTop:20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    //fontSize: 16,
    fontFamily: 'Light',
  },



});
