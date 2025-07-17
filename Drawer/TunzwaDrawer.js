
import {DrawerItemList,createDrawerNavigator} from '@react-navigation/drawer';

import {NavigationContainer} from '@react-navigation/native';


import MyStack from '../Stack/MyStack';

import { StyleSheet,ScrollView,TouchableOpacity,Modal, 
  Dimensions,Image,Switch, Text, View, Button,
  Linking,Alert,
  ActivityIndicator
} from 'react-native';

import {MaterialIcons, Ionicons, FontAwesome} from '@expo/vector-icons';


import { EventRegister } from 'react-native-event-listeners';
//import theme from '../theme/theme';
import COLORS  from '../Constant/colors';
//import themeContext from '../theme/themeContext';
import React, {useState,useCallback,useContext, useEffect} from 'react';
import {useFonts} from 'expo-font';
import Header from '../Header/header';

import {globalStyles} from '../Styles/GlobalStyles';


import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from "../Constant/links";


import Test from '../Screens/Test';

import MtejaDetails from '../Screens/MtejaDetails';
// import DeleteMteja from '../Screens/DeleteMteja';

import PokeaRejeshoStack from '../Stack/PokeaRejeshoStack';

import MarejeshoYaLeo from '../Marejesho/MarejeshoYaLeo';
import FainiZaLeo from '../Marejesho/FainiZaLeo';

import MikatabaHai from '../Screens/MikatabaHai';

import HomeScreen from '../Screens/HomeScreen';

import AddRipoti from '../Screens/AddRipoti';

import HawajarejeshaJana from '../Screens/HawajarejeshaJana';
import MikatabaYote from '../Screens/MikatabaYote';
import NjeYaMkatabaWote from '../Screens/NjeYaMkatabaWote';
import NjeYaMkatabaTarehe from '../Screens/NjeYaMkatabaTarehe';

import SignupScreen from '../AccountScreens/SignupScreen';

import { useFocusEffect } from '@react-navigation/native';

import { UserContext } from '../UserContext';

import AddEducationLevels from '../Components/AddEducationLevels';
import AddFarmersOwnershipTypes from '../Components/AddFarmersOwnershipTypes';
import AddNewCrop from '../Components/AddNewCrop';
//import Scan from '../Screens/Scan';

import RegisterFarmer from '../Farmers/RegisterFarmer';
import RegisterBuyer from '../Buyers/RegisterBuyer';
import RegisterTransporter from '../Transporters/RegisterTransporter';
import RegisterStakeHolder from '../StakeHolders/RegisterStakeHolder';
import AddCollectors from '../Collectors/AddCollectors';

const { width, height } = Dimensions.get('window');
const Drawer = createDrawerNavigator();
function MyDrawer(){


     let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});

const { userData, userToken, setUserData } = useContext(UserContext);

  const openUrl = async (url) => {
        const isSupported = await Linking.canOpenURL(url);
        if (isSupported) {
            await Linking.openURL(url);
        } else {
            Alert.alert(`Programu imeshindwa kufungua hii linki: ${url}`);
        }
    }
//const [modalVisible, setModalVisible] = useState(false);
const WebsiteLink = EndPoint + `/admin/App/myuser/`

const [modalVisible, setModalVisible] = useState(false);

 // const {width,height} = Dimensions.get('window');

  const [darkMode, setdarkMode] = useState(false)
  //const theme = useContext(themeContext)
const navigation = useNavigation();

//const [userData, setUserData] = useState({});
 // const [userToken, setUserToken] = useState('');




 //  useEffect(() => {
 //    AsyncStorage.getItem("userToken").then(token => {
 //      setUserToken(token)
 //    })
 //    fetchUserData();
 //  }, [userToken]);

 //  const fetchUserData = async () => {
 //    try {
 //      const userDataJSON = await AsyncStorage.getItem('userData');
 //      if (userDataJSON) {
 //        const parsedUserData = JSON.parse(userDataJSON);
 //        setUserData(parsedUserData);

 //        //console.log(parsedUserData);
        
 //      }
 //    } catch (error) {
 //      // console.log(error);
 //    }
 //  };


 // useEffect(() => {
 //    checkLoggedIn();


 //  }, [userToken]);

 //  const checkLoggedIn = async () => {
 //    const token = await AsyncStorage.getItem('userToken');
 //    setUserToken(token);
 //  };





// console.log("Drawer userToken", userToken);
// console.log("Drawer userData", userData);



 const handleLogout = async () => {
    try {
      if (!userToken) {
        
        return;
      }

      // Make a POST request to your Django logout API
      const response = await axios.post(
        EndPoint + `/Account/logout_user/`,
        null,
        {
          headers: {
            Authorization: `Token ${userToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // If the logout was successful, remove the user token from AsyncStorage
      if (response.status === 200) {
        await AsyncStorage.removeItem('userToken', () => {
          setModalVisible(false);
          // Callback function to navigate to the Signin screen after token removal
          navigation.navigate('Signin Stack');
      //     navigation.reset({
      //   index: 0,
      //   routes: [{ name: 'Signin Stack' }],
      // });

        });
        
      } else {
        console.log('Failed to logout');
      }
    } catch (error) {
      console.error('Error while logging out:', error);
    }
  };


const [dropdownVisible, setDropdownVisible] = useState(false);
const [dropdownVisible2, setDropdownVisible2] = useState(false);

  return(

<>{!fontsLoaded ? (<View/>):(

   <Drawer.Navigator
       //initialRouteName="MyStack"
       // drawerPosition = "left"
       // drawerType="front"
       // edgeWidth={100}
       hideStatusBar={true}
       overlayColor="black"
        drawerContent={
          (props) => {

             return (
            <>
              <View style={{
                // backgroundColor: 'rgb(5,5,49)',
              }}>

              

                <ScrollView>

                  <View
                    style={{
                      // height: height,
                      width: '100%',
                      justifyContent: "center",
                      alignItems: "center",
                      borderBottomColor: "#f4f4f4",
                      borderBottomWidth: 1,
                      marginBottom: 12,

                    }}
                  >
                   
                  
                      
                      <Image
                      source={require('../assets/icon.png')}
                       
                        style={{
                          height: 80,
                          width: 80,
                          borderRadius: 60,
                          marginBottom: 10,
                          marginTop: 30,
                        }}
                      />
                    


                    <Text style={{
                      // fontSize: 18,
                      // fontWeight: 'bold',
                      fontFamily:'Medium',
                      color: 'white'
                    }}>Welcome => {userData ? userData.username : ''}</Text>
                  
              {((userData && userData.is_admin === true) || (userData && userData.is_cashier === true))  && (
                    <TouchableOpacity
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 10,
                marginLeft:15,
                justifyContent:'space-between',
                borderColor:'white',
                borderWidth:1,
                marginBottom:10,
                borderRadius:10,
              }}
              onPress={() => navigation.navigate("Badili Password")}
            >
               
             <Text style={{
              // fontSize: 18,
              // fontWeight: 'bold',
              fontFamily:'Medium',
              color: 'wheat',
              marginRight:20,
            }}>Change password</Text>
             <FontAwesome name="key" size={20} color="white" />
            </TouchableOpacity>
            )}

                  </View>

         

                  <DrawerItemList {...props} />



          
            
              

<View style={{
  marginBottom:100,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>




                </ScrollView>

               

            

                
              </View>







                    
                <TouchableOpacity
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left:10,
                    // right: width/2 - 70,
                    backgroundColor: '#063164',
                    padding: 10,
                    borderRadius: 6,
                    width:'50%',
                    borderColor:'white',
                    borderWidth:1,
                    


                  }}
                  // onPress={handleLogout}
                  onPress={() => {

                    setModalVisible(true);
                  }}
                >
                  <Text style={{
                   color: '#fff',
                    fontFamily:'Light',
                    textAlign:'center',
                   // backgroundColor:'#015d68'

                  }}>Logout</Text>
                </TouchableOpacity>



              <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
              >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                  <View style={globalStyles.ModalView}>
                    <Text style={{ marginLeft: 90, fontFamily:'Light', }}>
                    Hello {userData ? userData.username : ''}</Text>

                    <ScrollView keyboardShouldPersistTaps="handled">

                      <View style={globalStyles.form}>

                        <Text style={{ fontFamily:'Light', marginLeft: 3 }}>
                        Do you want to logout ?</Text>


                        <View style={{ marginTop: 20 }}>


                        </View>
                      </View>

                      <View style={globalStyles.ButtonConatiner}>
                        <TouchableOpacity style={globalStyles.ButtonClose} onPress={() => setModalVisible(false)} >
                          <Text style={{
                            color: 'white',
                             fontFamily:'Light',
                          }}>NO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={globalStyles.ButtonAdd}
                          onPress={handleLogout} 
                          >
                          <Text style={{
                            color: 'white',
                             fontFamily:'Light',
                          }}>YES</Text>
                        </TouchableOpacity>
                      </View>

                    </ScrollView>
                  </View>
                </View>
              </Modal>
            </>

          )
        }
      }
          
       screenOptions={{
        headerShown: false,
        swipeEnabled: false,
        overlayColor:'#1f1f1f',
        hideStatusBar:true,
        // header: () => (
        //   <Header />
        // ),
        drawerStyle: {
          // backgroundColor: 'rgb(5,5,49)',
          //backgroundColor: '#F0F0F0',
          backgroundColor:'#063164', //'#233329',
          width: width -70 //260
        },
        headerStyle: {
          backgroundColor: "#f4511e",
        },
        headerTintColor: "#fff",
        headerTitleStyle: {
          //fontWeight: "bold"
           fontFamily:'Light',
        },
        drawerLabelStyle: {
          color: "white",
          //fontSize: 16,
           fontFamily:'Light',

        },
        // drawerIconStyle: {
        //   color: "white",
        //   fontSize:16,
        //   border:4,
        //   borderColor:'red',

        // }
      }}
    >



   {/*  <Drawer.Screen
          name="Welcome"
          options={{
            drawerLabel: "Welcome",
            title: "Welcome",
            
            drawerIcon: () => (
              <MaterialIcons name="home" size={40} color="green" />
            )
          }}
          component={WelcomeScreen}
        />

*/}


    <Drawer.Screen
          name="Mwanzo"
          options={{
            drawerLabel: "Mwanzo",
            title: "Mwanzo",
            
            drawerIcon: () => (
              <FontAwesome name="home" size={20} color="white" />
            )
          }}
          component={MyStack}
        />


{/*
   {userData && userData.is_admin === true && (

            <Drawer.Screen
          name="Sajili Mtumiaji"
          options={{
            drawerLabel: "Sajili Mtumiaji",
            title: "Sajili Mtumiaji",
            
            drawerIcon: () => (
              <FontAwesome name="user" size={20} color="white" />
            )
          }}
          component={SignupScreen}
        />
        )}
*/}



 {userData && userData.is_admin === true && (

            <Drawer.Screen
          name="Farmer Registration"
          options={{
            drawerLabel: "Farmer Registration",
            title: "Farmer Registration",
            
            drawerIcon: () => (
              <FontAwesome name="user-circle" size={20} color="white" />
            )
          }}
          component={RegisterFarmer}
        />
        )}


 {userData && userData.is_admin === true && (

            <Drawer.Screen
          name="Buyer Registration"
          options={{
            drawerLabel: "Buyer Registration",
            title: "Buyer Registration",
            
            drawerIcon: () => (
              <FontAwesome name="user-circle-o" size={20} color="white" />
            )
          }}
          component={RegisterBuyer}
        />
        )}



 {userData && userData.is_admin === true && (

            <Drawer.Screen
          name="Transporter Registration"
          options={{
            drawerLabel: "Transporter Registration",
            title: "Transporter Registration",
            
            drawerIcon: () => (
              <FontAwesome name="user-circle" size={20} color="white" />
            )
          }}
          component={RegisterTransporter}
        />
        )}


{userData && userData.is_admin === true && (

            <Drawer.Screen
          name="Stake Holder Registration"
          options={{
            drawerLabel: "Stake Holder Registration",
            title: "Stake Holder Registration",
            
            drawerIcon: () => (
              <FontAwesome name="users" size={20} color="white" />
            )
          }}
          component={RegisterStakeHolder}
        />
        )}



{userData && userData.is_admin === true && (

            <Drawer.Screen
          name="Collector Registration"
          options={{
            drawerLabel: "Collector Registration",
            title: "Collector Registration",
            
            drawerIcon: () => (
              <FontAwesome name="users" size={20} color="white" />
            )
          }}
          component={AddCollectors}
        />
        )}






{userData && userData.is_admin === true && (

            <Drawer.Screen
          name="Add Education Level"
          options={{
            drawerLabel: "Add Education Level",
            title: "Add Education Level",
            
            drawerIcon: () => (
              <FontAwesome name="book" size={20} color="white" />
            )
          }}
          component={AddEducationLevels}
        />
        )}

{userData && userData.is_admin === true && (

            <Drawer.Screen
          name="Add Farmer Ownership"
          options={{
            drawerLabel: "Add Farmer Ownership",
            title: "Add Farmer Ownership",
            
            drawerIcon: () => (
              <FontAwesome name="user-circle-o" size={20} color="white" />
            )
          }}
          component={AddFarmersOwnershipTypes}
        />
        )}


{userData && userData.is_admin === true && (

            <Drawer.Screen
          name="Add New Crop"
          options={{
            drawerLabel: "Add New Crop",
            title: "Add New Crop",
            
            drawerIcon: () => (
              <FontAwesome name="apple" size={20} color="white" />
            )
          }}
          component={AddNewCrop}
        />
        )}





    {/*<Drawer.Screen
          name="Test"
          options={{
            drawerLabel: "Test",
            title: "Test",
            
            drawerIcon: () => (
              <FontAwesome name="user-circle" size={20} color="white" />
            )
          }}
          component={Test}
        />
*/}




{/*<Switch 

value={darkMode}
onValueChange={(value) => {setdarkMode(value);
  EventRegister.emit('ChangeTheme', value)
}}
/>*/}









      
      </Drawer.Navigator>
    
    
)}</>


    );
}
export default MyDrawer;




const styles = StyleSheet.create({
    menuicon: { 

       // color:'black', 
        


    },

     });