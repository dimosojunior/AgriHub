
import React, { useState,useRef, useEffect } from 'react';

import { View,SafeAreaView,ImageBackground,KeyboardAvoidingView,
Pressable, TextInput,Animated, Alert, Image,Platform, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, Touchable, TouchableOpacity } from 'react-native';


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
const BuyerRegistration = ({ navigation }) => {

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
    const [phone, setPhone] = useState('');


 const [error, setError] = useState('');
  //TO MAKE A LOADING MESSAGE ON A BUTTON
  //const [isPending, setPending] = useState(false);
    const [secureText, setSecureText] = useState(true);
    const [loading, setLoading] = useState(false);
    const fadeAnim = useState(new Animated.Value(1))[0];

  //const [phone, setPhone] = useState('');
  //const [profile_image, setProfile_image] = useState('');

  const [isAdmin, setIsAdmin] = useState(false);
const [isStaff, setIsStaff] = useState(false);
const [isCashier, setIsCashier] = useState(false);

const [is_transporter, setis_transporter] = useState(false);
const [is_farmer, setis_farmer] = useState(false);
const [is_collector, setis_collector] = useState(false);
const [is_agent, setis_agent] = useState(false);
const [is_stakeholder, setis_stakeholder] = useState(false);
const [is_buyer, setis_buyer] = useState(false);
  

 // const [error, setError] = useState(null); // State to hold the error message
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
      showAlertFunction('Network issue: please turn on your mobile data and try again');
    } else {
      showAlertFunction('An error occurred, please try again.');
    }
  };

  const handleRegistration = async () => {
    // Reset the error message
    setError(null);

    // Validation checks
    if (!password && !username && !full_name && !phone && !email) {
      //setError('All fields are required');
      showAlertFunction("Please fill in all the information accurately");
      return;
    }

    if (!email) {
      //setError('please enter your valid email');
       showAlertFunction("Please fill in your your email accurately");
      return;
    }

    if (!password) {
      //setError('please enter your password');
       showAlertFunction("Please fill in your password accurately");
      return;
    }


     if (password !== password2) {
      showAlertFunction("The two passwords don't match");
      return;
    }

    // Validate email format
  
  if (!emailRegex.test(email)) {
    showAlertFunction("Please follow proper email formatting rules, @");
    return;
  }

  // Validate password length
  if (password.length < 4) {
    showAlertFunction("Please make sure your password contains more than 4 characters");
    return;
  }

    if (!username) {
     // setError('please enter your username');
      showAlertFunction("Please fill in your username accurately");
      return;
    }

    if (!full_name) {
     // setError('please enter your username');
      showAlertFunction("Please fill in your full name accurately");
      return;
    }

    if (!phone) {
      //setError('please enter your phone number');
       showAlertFunction("Please fill in your phone number accurately");
      return;
    }

      // Validate phone number
     // Validate phone number
  if (!phone.startsWith("0")) {
    showAlertFunction("Phone number must start with 0");
    return;
  }

  if (phone.length !== 10) {
    showAlertFunction("Please make sure phone number contains 10 characters");
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




    //setPending(true);
    setLoading(true);

    try {
      const response = await axios.post(
        EndPoint + '/Account/BuyerRegistrationView/', {
        email: email,
        password: password,
        username: username,
        phone: phone,
        full_name: full_name,
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
    
  //setLoading(false);
  setLoading(false);
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
      setLoading(false);
      showAlertFunction("Email already exists");
    } else if (errors.username) {
      setLoading(false);
      showAlertFunction("Username already exists");
    } else if (errors.phone) {
      setLoading(false);
      showAlertFunction("Phone number already exists");
    } else {
      setLoading(false);
      showAlertFunction("An error occurred, please try again.");
    }
  } else {
    setLoading(false);
    handleErrorMessage(error);
  }
}
};




   return(

        <>{!fontsLoaded ? (<View/>):(

   
             <ScrollView 
        keyboardShouldPersistTaps="handled"
        >

     <LinearGradient colors={['#015d68', '#000']} style={styles.container}>
         
         


            <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
                
                {/* Logo & Company Info */}
                <View style={styles.logoContainer}>
                    <Image source={require('../assets/icon.png')} style={styles.logo} />
                    <Text style={styles.companyName}>AgriHub Tanzania</Text>
                    <Text style={styles.description}>Welcome back! Please register to continue.</Text>
                </View>

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
                        placeholder="Email"
                        placeholderTextColor="#bbb"
                        keyboardType={'email-address'}
                        value={email}
                        onChangeText={text => setEmail(text)} 
                    />
                </View>

                {/* Username Field */}
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

                <View style={styles.inputContainer}>
                    <Ionicons name="person-outline" size={20} color="#fff" style={styles.icon} />
                    <TextInput 
                        style={styles.input} 
                        placeholder="phone number"
                        placeholderTextColor="#bbb"
                        keyboardType="numeric"
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



   

               <Pressable 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                  //backgroundColor:'green',
                  marginTop:50,
                  paddingVertical:10,
                  paddingHorizontal:20,
                  borderRadius:8,
                  color:'white',
                  borderColor:'green',
                  borderWidth:1,
               // backgroundColor:'white'
               marginBottom:20,
              }}
             onPress={() => navigation.navigate("Signin Stack")}
              >
              
                <Text style={[styles.registerLbl,

                  {
                    color:'white',
                    //marginLeft:20,
                  }

                  ]}>Already have an account? | Login here</Text>

                   <Ionicons name='arrow-forward-circle' 
                size={28}
                color='white' 
                style={{
                 // marginTop:70,
                }} 
                
                 />
                
              </Pressable>









                {/* Login Button */}
                <TouchableOpacity style={styles.loginButton} 
                onPress={handleRegistration}>
                    <Text style={styles.loginText}>Submit</Text>
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
                    <Text style={globalStyles.alertTitle}>AgriHub Tanzania</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />


      
        </LinearGradient>

</ScrollView>




  
      



  

         )}</>
    )
}

export default BuyerRegistration;




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
        marginTop:50,
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
        marginBottom:30,
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
