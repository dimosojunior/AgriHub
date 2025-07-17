
import React, { useState,useRef, useEffect } from 'react';

import { View,SafeAreaView,ImageBackground,KeyboardAvoidingView,Pressable,
 TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text,ScrollView, Dimensions, Touchable, TouchableOpacity } from 'react-native';


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
import LotterViewScreen from '../Screens/LotterViewScreen';
import { LinearGradient } from 'expo-linear-gradient';
//import SvgIcon from '../assets/SvgIcon';
//import OTPInputView from '@twotalltotems/react-native-otp-input';
//import OTPInputView from 'react-native-otp-input';



const { width, height } = Dimensions.get('window');
const VerifyOTPScreen = ({ navigation, route }) => {

  const { email } = route.params;

     const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };



   // const [isPending, setPending] = useState(false);
let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});



  const [error, setError] = useState('');
  //TO MAKE A LOADING MESSAGE ON A BUTTON
  const [isPending, setPending] = useState(false);


// const [error, setError] = useState(null);
const [errorMessage, setErrorMessage] = useState('');
const emailRegex = /\S+@\S+\.\S+/;

const handleErrorMessage = (error) => {
    if (error.response) {
      // The request was made and the server responded with an error status code
      // if (error.response.status === 401) {
      //   showAlertFunction('Authentication Error: You are not authorized.');
      // } 
      // else if (error.response.status === 404) {
      //   showAlertFunction('Not Found: The requested resource was not found.');

      // } 
      //else if{
      //   showAlertFunction('An error occurred while processing your request.');
      // }
    }  if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
    } else {
      showAlertFunction('kuna tatizo kwenye taarifa zako, tafadhali ingiza email uliyojisajilia', error.response.data.error);
    }
  };




  const [otp, setOTP] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [password2, setPassword2] = useState('');
    const [isPasswordVisible, setPasswordVisible] = useState(false);

  const verifyOTP = () => {
    setPending(true);

     if (!otp) {
      //setError('please enter your valid email');
       showAlertFunction("Tafadhali ingiza codes zilizotumwa kwenye email yako kwa usahihi");
       setPending(false);
      return;
    }

      if (otp.length > 6) {
    showAlertFunction("tafadhali codes zimezidi, codes lazima ziwe 6");
    setPending(false);
    return;
  }

  if (otp.length < 6) {
    showAlertFunction("tafadhali codes ziko pungufu, codes lazima ziwe 6");
    setPending(false);
    return;
  }



     if (!newPassword) {
      //setError('please enter your valid email');
       showAlertFunction("Tafadhali ingiza neno siri jipya");
       setPending(false);
      return;
    }

     if (newPassword.length < 4) {
    showAlertFunction("tafadhali neno siri linapaswa kuwa na tarakimu zaidi ya 4");
    setPending(false);
    return;
  }

  if (newPassword !== password2) {
      showAlertFunction("Neno siri ulizoingiza hazifanani");
      setPending(false);
      return;
    }

    axios.post(EndPoint + '/Account/verify-otp/', { email, otp, new_password: newPassword })
      .then(response => {
         setPending(false);
        showAlertFunction('Umefanikiwa kubadilisha neno siri lako la mwanzo, sasa unaweza kuingia kutumia neno siri jipya.');
        navigation.navigate('Signin Stack');
      })
      .catch(error => {
        setPending(false);
         handleErrorMessage(error);
        
      });
  };



// Create an array of refs for each TextInput
  const otpRefs = Array.from({ length: 6 }, () => useRef(null));

  const handleOTPChange = (text, index) => {
    let newOTP = otp.split('');
    newOTP[index] = text;
    setOTP(newOTP.join(''));

   // Move to the next input field if it exists and if a digit was entered
if (text && index < otpRefs.length - 1) {
  otpRefs[index + 1].current.focus();
}
};



    return(

        <>{!fontsLoaded ? (<View/>):(

        

      
       <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <ScrollView 
        keyboardShouldPersistTaps="handled"
        >

        <View style={{padding: 20}}>
          <Pressable style={{
            //backgroundColor:'green',
          }}>
           {/* <SvgIcon icon={'back'} width={30} height={30} />*/}
             <LottieView
        style={{
        height: height/4,
         width:'100%',
         borderRadius:5,
        // backgroundColor:'red',
         // justifyContent:'center',
         // alignItems:'center',
         zIndex:1,
         marginTop:0,

        // flex:1,

        }}
        source={require('../assets/Loading/l1.json')} // Replace with your animation JSON file
        autoPlay
        loop
      />
       
          </Pressable>
        </View>
        <View style={{position: 'relative', bottom: 30}}>
          <View style={styles.loginIcon}>
            {/*<SvgIcon icon={'enterOtp'} width={280} height={280} />*/}
       
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Mfugaji Smart</Text>
            </View>
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                Ingiza taarifa kwa usahihi
              </Text>
           {/*   <Text style={styles.forgotDesLbl}>+91 1234567890</Text>*/}
            </View>
            <View style={styles.formCon}>

             
     <Text style={{
      marginBottom:15,
     }}>Ingiza tarakimu 6 zilizotumwa kwenye email yako</Text>
              <View style={styles.otpContainer}>

               {Array(6).fill(0).map((_, index) => (
            <TextInput
              key={index}
              ref={otpRefs[index]} // Assign ref to each TextInput
              style={styles.otpInput}
              keyboardType="numeric"
              maxLength={1}
              value={otp[index] || ''}
              onChangeText={(text) => handleOTPChange(text, index)}
            />
          ))}
          </View>

             {/*   <TextInput 
                placeholder='Ingiza codes ulizotumiwa' 
                style={[styles.textinput,{
                  width:width-20,
                  //height:70,
                  color:'black',
              }]} 

              placeholderTextColor="black"
              value={otp}
            onChangeText={setOTP}
            
            keyboardType="numeric"

              />*/}


           
          {/*  mwanzo wa neno siri*/}
            <View 
               style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:20,
              }

              ]}
          >

                 <View style={{
          width:'10%',
          //justifyContent:"center",
         // backgroundColor:'red',
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="key" />

        {/*  <Text style={{
           color: 'black', 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>
          <TextInput
          style= {[styles.textinputi,{ 
            color: 'black',
          width:'65%'
        }]}
          placeholder="Neno siri jipya"
          secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on isPasswordVisible state
          value={newPassword}
        onChangeText={setNewPassword}
        placeholderTextColor="black"
        />

        <View style={{
          width:'20%',
          justifyContent:"center",
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={{ alignSelf: 'flex-end', marginRight: 0,color:'black' }}>
          <Text style={{ color: 'black', fontSize: 16,fontWeight:'bold' }}>
            {/*{isPasswordVisible ? 'Hide' : 'Show'} Password*/}
            {isPasswordVisible ? (
              <FontAwesome size={25} color="black" name="eye-slash" />
            ):(
              <FontAwesome size={25} color="black" name="eye" />
            )}
          </Text>
        </TouchableOpacity>

        </View>
        </View>
      {/*  mwisho wa neno siri*/}



       {/*  mwanzo wa neno siri*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:20,
              }

              ]}
          >

                 <View style={{
          width:'10%',
          //justifyContent:"center",
         // backgroundColor:'red',
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          
          style={{ 
            alignSelf: 'flex-start', 
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="key" />

        {/*  <Text style={{
           color: 'black', 
           fontSize: 16,
           fontWeight:'bold',
           marginLeft:10,
            }}>
            +255
          </Text>*/}
        </TouchableOpacity>

        </View>
          <TextInput
          style= {[styles.textinputi,{ 
            color: 'black',width:'65%',
            //paddingVertical:20,
          }]}
          placeholder=" Thibitisha neno siri"
          secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on isPasswordVisible state
          value={password2}
          onChangeText={setPassword2}
        placeholderTextColor="black"
        />

        <View style={{
          width:'20%',
          //justifyContent:"center",
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={{ alignSelf: 'flex-end', marginRight: 0,color:'black' }}>
          <Text style={{ color: 'black', fontSize: 16,fontWeight:'bold' }}>
            {/*{isPasswordVisible ? 'Hide' : 'Show'} Password*/}
            {isPasswordVisible ? (
              <FontAwesome size={25} color="black" name="eye-slash" />
            ):(
              <FontAwesome size={25} color="black" name="eye" />
            )}
          </Text>
        </TouchableOpacity>

        </View>
        </View>
      {/*  mwisho wa neno siri*/}






            {!isPending && (
              <Pressable 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                  backgroundColor:'green',
                  marginTop:50,
                  paddingVertical:10,
                  paddingHorizontal:40,
                  borderRadius:8,
                  color:'white',
                  borderColor:'white',
                  borderWidth:1,
               // backgroundColor:'black'
              }}
              onPress={verifyOTP}>
                <Text style={styles.registerLbl}>Tuma Ombi</Text>
                 <Ionicons name='arrow-forward-circle' 
                size={28}
                color='white' 
                style={{
                 // marginTop:70,
                }} 
                
                 />
              </Pressable>
              )}




           {isPending &&
                         <View style={styles.btnContainer}>
                        <TouchableOpacity 
                        
                        >
                            <View style={styles.button1}>
                               
                             <ActivityIndicator size="large" color="green" /> 
                            </View>
                        </TouchableOpacity>
                     
                    </View>}





               <Pressable 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                  //backgroundColor:'green',
                  marginTop:50,
                  paddingVertical:10,
                  paddingHorizontal:40,
                  borderRadius:8,
                  color:'white',
                  borderColor:'green',
                  borderWidth:1,
               // backgroundColor:'black'
              }}
             onPress={() => navigation.navigate("Send OTP Screen")}
              >
               <Ionicons name='arrow-back-circle' 
                size={28}
                color='green' 
                style={{
                 // marginTop:70,
                }} 
                
                 />
                <Text style={[styles.registerLbl,

                  {
                    color:'black',
                    marginLeft:20,
                  }

                  ]}>Hujapata codes ? | Omba tena</Text>
                
              </Pressable>


            </View>
          </View>
        </View>





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
                    <Image source={require('../assets/i2.jpg')} style={globalStyles.alertImage} />
                    <Text style={globalStyles.alertTitle}>Mfugaji Smart</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />

</ScrollView>
      </KeyboardAvoidingView>

        

        




 

         )}</>
    )
}

export default VerifyOTPScreen;


const styles = StyleSheet.create({

   otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width:'100%'
  },
  otpInput: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: 40,
    height: 50,
    textAlign: 'center',
    fontSize: 20,
  },
   mainCon: {
    backgroundColor: 'white',
   // backgroundColor:'#00BF8F',
    flex: 1,
  },
  loginIcon: {
    alignSelf: 'center',
  },
  formCon: {
    alignItems: 'center',
  },
  container: {
    paddingHorizontal: 20,
    marginTop: 50,
  },
  loginLblCon: {
    position: 'relative',
    bottom: 40,
  },
  loginLbl: {
    color: 'black',
    fontSize: 40,
    marginBottom:10,
    //fontFamily: Fonts.type.NotoSansExtraBold,
  },
  forgotDes: {
    position: 'relative',
    bottom: 35,
  },
  forgotDesLbl: {
    color: '#000',
   // fontFamily: Fonts.type.NotoSansRegular,
  },
  //registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},


registerLbl:{
  // backgroundColor:'black',
  // marginTop:70,
  // paddingVertical:10,
  // paddingHorizontal:40,
  // borderRadius:8,
   color:'white',
  // borderColor:'green',
  // borderWidth:1,
  marginRight:20,


},




   textinput: {
        color: COLORS.white,
        //fontSize: SIZES.h3,
        // borderBottomColor: COLORS.lightGrey,
        borderColor: COLORS.green,
        borderWidth: 1,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        padding:10,
        borderRadius:8,
        fontFamily:'Light',

        borderWidth:2,
        borderColor:'black',
    //       elevation: 3,

    // shadowOffset: { width: 1, height: 1 },
    // shadowColor: Platform.OS === "android" ? COLORS.white : COLORS.white,
    // shadowOpacity: 1,
    // shadowRadius: 2,
    },



    dataContainerForPassword: {
      color: COLORS.white,
        fontSize: SIZES.h3,
        // borderBottomColor: COLORS.lightGrey,
        borderColor: COLORS.green,
        borderWidth: 1,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 5,
        marginTop: 50,
        padding:10,
        borderRadius:8,
        width:width-100,
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,

        borderWidth:2,
        borderColor:'black',
        
         
    },

  
    textinputi: {
        color: COLORS.white,
        //fontSize: SIZES.h3,
        fontFamily:'Light',
        
        
        marginHorizontal: 0,
        
        padding:0,



        
    },

});
