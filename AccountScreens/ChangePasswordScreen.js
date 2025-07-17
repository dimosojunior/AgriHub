
import React, { useState,useCallback, useEffect } from 'react';

import { View,SafeAreaView,ImageBackground,KeyboardAvoidingView,
  Pressable,
 TextInput,
 Linking,
  Button,
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


const ChangePasswordScreen = ({navigation}) => {

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






  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChangePassword = async () => {
    const token = await AsyncStorage.getItem('userToken'); // Assuming token is stored
    if (!token) {
      showAlertFunction('Error', 'You are not logged in.');
      return;
    }

    if (!currentPassword && !newPassword && !confirmPassword) {
      showAlertFunction('Please, fill in all fields');
      return;
    }

      if (!currentPassword) {
      showAlertFunction('Please, fill in a current password');
      return;
    }

      if (!newPassword) {
      showAlertFunction('Please, fill in a new password');
      return;
    }

      if (!confirmPassword) {
      showAlertFunction('Please, Re-enter the new password');
      return;
    }

      if (newPassword !== confirmPassword) {
      showAlertFunction("The passwords you entered do not match");
      return;
    }


    setLoading(true);

    axios
      .post(
        EndPoint + '/change-password/',
        {
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        },
        {
          headers: { Authorization: `Token ${token}` },
        }
      )
      .then((response) => {
        setLoading(false);
        showAlertFunction('You have successfully changed your original password');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        navigation.navigate("Signin Stack");
      })
      .catch((error) => {
        setLoading(false);
        const errorMessage = error.response?.data || 'Something went wrong!';
        //Alert.alert('Error', JSON.stringify(errorMessage));
        showAlertFunction(JSON.stringify(errorMessage));
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Change password</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your current password"
        placeholderTextColor="white"
        secureTextEntry
        value={currentPassword}
        onChangeText={setCurrentPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Enter a new password"
         placeholderTextColor="white"
        secureTextEntry
        value={newPassword}
        onChangeText={setNewPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Re-enter the new password"
         placeholderTextColor="white"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />


    
                    {!loading &&
                <TouchableOpacity 
                        onPress={handleChangePassword}
                        
                        >
                    <View style={styles.btnContainer}>
                        
                            <View style={styles.button1}>
                                <Text style={styles.btnText}>Change</Text>
                            </View>
                        
                        </View>
                    </TouchableOpacity>}

                      {loading &&
                         <View style={styles.btnContainer}>
                        <TouchableOpacity 
                        
                        >
                            <View style={[
                              styles.button1,
                              {
                                backgroundColor:'black',
                                borderColor:'black',
                              }

                              ]}>
                               
                             <ActivityIndicator size="large" color="red" /> 
                            </View>
                        </TouchableOpacity>
                     
                    </View>}



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


    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flex: 1, padding: 20,
    justifyContent:'center',
    //alignItems:'center',
    backgroundColor:'#012827',
     },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold',
     marginBottom: 20,
     marginTop:30,
     color:'white', 
   },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    color:'white',
  },

    btnContainer: {
        marginTop: 15,
    },
    button1: {
        //backgroundColor: 'black',
        padding: 20,
        marginHorizontal: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
        // borderColor:'white',
        // borderWidth:1,
    },
    btnText: {
        color: COLORS.white,
        fontWeight: 'bold',
        fontSize: SIZES.h4,
        borderColor:'white',
        borderWidth:1,
        borderRadius: 10,
        paddingHorizontal:50,
        paddingVertical:15,
        borderTopRightRadius:0,
        borderBottomLeftRadius:0,
    },
    button2: {
        flexDirection: 'row',
        backgroundColor: COLORS.blue,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default ChangePasswordScreen;
