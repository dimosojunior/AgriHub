
import React, { useState,useCallback, useEffect } from 'react';

import { View,SafeAreaView,ImageBackground,KeyboardAvoidingView,
  Pressable,
 TextInput,
 Linking,
  
  Alert, Image, StyleSheet, ActivityIndicator,Platform, Text, Dimensions, ScrollView, Touchable, TouchableOpacity } from 'react-native';


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


const { width, height } = Dimensions.get('window');
const SigninScreen = ({ navigation }) => {

     const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };



    //const [isPending, setIsPending] = useState(false);
let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});





  const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Programu imeshindwa kufungua hii linki: ${url}`);
        }
    }

const sendTextMessage = useCallback(async (phNumber, message) => {
        const separator = Platform.OS === 'ios' ? '&' : '?'
        const url = `sms:${phNumber}${separator}body=${message}`
        await Linking.openURL(url)
    }, [])

const message = "Mfugaji Smart!!"

const HudumaKwaWatejaNumber = "0759536085";





  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  //TO MAKE A LOADING MESSAGE ON A BUTTON
  const [isPending, setPending] = useState(false);

  //const navigation = useNavigation();

  useEffect(() => {
    checkLoggedIn();
  }, []);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
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
        // Fetch and set cart data here
        // const cartResponse = await axios.get(
        //   'https://hotelappapisv1.pythonanywhere.com/Hotel/Cart/',
        //   {
        //     headers: {
        //       Authorization: `Token ${token}`,
        //     },
        //   }
        // );

        // const cartData = cartResponse.data;
        // // Update the cart state with the fetched data
        // setCart(cartData);

        // navigation.replace('Home Stack', { userData });
        navigation.reset({
          index: 0,
          routes: [{ name: 'Home Stack' }],
        });
      } catch (error) {
        
      }
    }
  };


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
      showAlertFunction('Taarifa zako sio sahihi');
    }
  };

  const handleLogin = async () => {
    

    if (!username && !password) {
      //setError('Please fill in all fields correctly');
      showAlertFunction("Tafadhali jaza taarifa zote kwa usahihi");
      return;
    }

    if (!username) {
     // setError('Please enter your registration username correctly');
      showAlertFunction("Tafadhali ingiza jina lako kwa usahihi");
      return;
    }

      // Validate email format
  
  // if (!emailRegex.test(email)) {
  //   showAlertFunction("Please enter a valid email address");
  //   return;
  // }

    if (!password) {
      //setError('Please enter your registration password correctly');
      showAlertFunction("Tafadhali ingiza password yako kwa usahihi");
      return;
    }
    setPending(true);

    try {
      const response = await axios.post(EndPoint + '/Account/login_user/', {
        username: username,
        password: password,
      });

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
    } catch (error) {
      //setError('Invalid credentials');
      // showAlertFunction("Invalid credentials");
      
      handleErrorMessage(error);
      setPending(false);
      console.log("Error", error);
    }
  };




  const [isPasswordVisible, setPasswordVisible] = useState(false);


    return(

        <>{!fontsLoaded ? (<View/>):(

          <>
 {!isPending ? (

       




    
       <KeyboardAvoidingView behavior="position" style={styles.mainCon}>
        <ScrollView 
        keyboardShouldPersistTaps="handled"
        >

        <View style={{
          //paddingTop: 10,
          flex:1,
          //marginTop:height/25,
          marginTop:25,
        }}>
          <Pressable style={{
            //backgroundColor:'green',

          }}>
           {/* <SvgIcon icon={'back'} width={30} height={30} />*/}
     {/*        <LottieView
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
      />*/}
       

             <Image

                  style={globalStyles.SignupImageJuu}
                   source={require('../assets/400.jpg')} 
                  >
                  </Image>



          </Pressable>
        </View>



 {/*mwanzo wa msaada kwa wateja*/}
      <TouchableOpacity
       onPress={() => {   Linking.openURL(`tel:${HudumaKwaWatejaNumber}`)}}
            
      style={{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:'yellow',
        paddingHorizontal:10,
        paddingVertical:6,
        width:'90%',
        marginTop:15,
        borderRadius:8,
        flex:2,
        marginTop:-30,
        marginLeft:20,
      }}>

       <Text style={{
        color:'green',
       // marginTop:15,
        //textAlign:'right',
        fontFamily:'Medium',
        width:'80%',
      }}>
      Msaada wakati wa kujisajili <Text style={{
        color:'red',
        fontFamily:'Medium',
      }}> {HudumaKwaWatejaNumber} </Text>
      </Text>


      <FontAwesome name='phone' 
                size={28}
                color='green' 
                style={{
                  //marginTop:15,
                  marginLeft:10,
                  width:'10%',
                }} 
                
                 />
        
      </TouchableOpacity>


{/*mwisho wa msaada kwa wateja*/}

        <View style={{position: 'relative', 
        flex:2,

        //marginTop:10,

        //bottom: 30
      }}>
          <View style={styles.loginIcon}>
            {/*<SvgIcon icon={'enterOtp'} width={280} height={280} />*/}
       
          </View>
          <View style={styles.container}>
           {/* <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Mfugaji Smart</Text>
            </View>*/}
            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                Ingiza taarifa zako kwa usahihi
              </Text>
           {/*   <Text style={styles.forgotDesLbl}>+91 1234567890</Text>*/}
            </View>
            <View style={styles.formCon}>

            {/*  <OTPInputView
               // pinCount={4}
                autoFocusOnLoad
                style={{width: '80%', height: 70}}
                
               
              />*/}

              
                 {/*  mwanzo wa username*/}
            <View 
            style={[styles.dataContainerForPassword, 
              {
                 width:width-20,
                marginTop:0,
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
            marginRight: 0,color:'white',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="user-circle" />

        {/*  <Text style={{
           color: 'white', 
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
            color: 'white',width:'88%',
            //backgroundColor:'white',

            //paddingVertical:20,
          }]}
          placeholder="Ingiza jina unalotumia"
          //keyboardType="numeric"
          
          value={username}
          onChangeText={setUsername}
        placeholderTextColor="white"
        />

      
        </View>
      {/*  mwisho wa username*/}


           
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
            marginRight: 0,color:'white',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

          <FontAwesome size={25} color="green" name="key" />

        {/*  <Text style={{
           color: 'white', 
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
            color: 'white',
          width:'65%'
        }]}
          placeholder="Neno siri"
          secureTextEntry={!isPasswordVisible} // Toggle secureTextEntry based on isPasswordVisible state
         value={password}
          onChangeText={(text) => setPassword(text)}
        placeholderTextColor="white"
        />

        <View style={{
          width:'20%',
          justifyContent:"center",
        }}>

         {/* Add a button to toggle password visibility */}
        <TouchableOpacity
          onPress={() => setPasswordVisible(!isPasswordVisible)}
          style={{ alignSelf: 'flex-end', marginRight: 0,color:'black' }}>
          <Text style={{ color: 'white', fontSize: 16,fontWeight:'bold' }}>
            {/*{isPasswordVisible ? 'Hide' : 'Show'} Password*/}
            {isPasswordVisible ? (
              <FontAwesome size={25} color="white" name="eye-slash" />
            ):(
              <FontAwesome size={25} color="white" name="eye" />
            )}
          </Text>
        </TouchableOpacity>

        </View>
        </View>
      {/*  mwisho wa neno siri*/}


{/*mwanzo wa forget password*/}
      <TouchableOpacity
      onPress={() => navigation.navigate("Send OTP Screen")} 
      style={{
        alignItems:'center',
        justifyContent:'space-between',
        flexDirection:'row'
      }}>

       <Text style={{
        color:'green',
        marginTop:15,
        textAlign:'right',
        fontFamily:'Medium',
      }}>
        Umesahau neno siri ?
      </Text>


      <Ionicons name='arrow-forward-circle' 
                size={28}
                color='white' 
                style={{
                  marginTop:15,
                  marginLeft:10,
                }} 
                
                 />
        
      </TouchableOpacity>





   



{/*mwanzo wa forget password*/}

            {!isPending && (
              <Pressable 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                  backgroundColor:'green',
                  marginTop:20,
                  paddingVertical:10,
                  paddingHorizontal:40,
                  borderRadius:8,
                  color:'white',
                  borderColor:'white',
                  borderWidth:1,
               // backgroundColor:'white'
              }}
              onPress={handleLogin}>
                <Text style={styles.registerLbl}>Ingia</Text>
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
               // backgroundColor:'white'
               marginBottom:20,
              }}
             onPress={() => navigation.navigate("Signup Stack")}
              >
              
                <Text style={[styles.registerLbl,

                  {
                    color:'white',
                    //marginLeft:20,
                  }

                  ]}>Bado hujajisajili? | Jisajili hapa</Text>

                   <Ionicons name='arrow-forward-circle' 
                size={28}
                color='green' 
                style={{
                 // marginTop:70,
                }} 
                
                 />
                
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
      

      



        ):(

<LotterViewScreen />

)}

    </>

         )}</>
    )
}

export default SigninScreen;



const styles = StyleSheet.create({
    mainCon: {
    //backgroundColor: '#fdb9b1',
    //fed4d0, fdb9b1, fed1ce, ffcfcb

   // backgroundColor:'#00BF8F',
   backgroundColor: '#233329',
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
    bottom: 20,

  },
  loginLbl: {
    color: 'black',
    fontSize: 40,
    marginBottom:10,
    fontFamily:'Regular',
    //fontFamily: Fonts.type.NotoSansExtraBold,
  },
  forgotDes: {
    position: 'relative',
    bottom: 20,
  },
  forgotDesLbl: {
    color: 'white',
    fontFamily:'Medium'
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
        borderColor:'white',
        
         
    },

  
    textinputi: {
        color: COLORS.white,
        //fontSize: SIZES.h3,
        fontFamily:'Light',
        
        
        marginHorizontal: 0,
        
        padding:0,



        
    },



});
