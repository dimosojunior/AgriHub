import React, { useState,useRef, useEffect } from 'react';
import { View, SafeAreaView, ImageBackground, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { EndPoint } from '../Constant/links';
import { globalStyles } from '../Styles/GlobalStyles';
import LottieView from 'lottie-react-native';
import { EventRegister } from 'react-native-event-listeners';
import { Ionicons, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import { COLORS, SIZES } from '../Screens/src/Constant';
import LotterViewScreen from '../Screens/LotterViewScreen';
import DirectHomeStack from '../Header/DirectHomeStack';
import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import { LinearGradient } from 'expo-linear-gradient';

import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';




Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});


// async function sendPushNotificationHandler(expoPushToken){
//   const message = {
//   to: expoPushToken,
//   sound: 'default',
//   title: 'Karibu Mfugaji Smart!',
//   body: 'Asante kwa kujisajili. Tunakukaribisha kwenye Mfugaji Smart!',
//   data: { someData: 'goes here' }

//   };
//   await fetch('https://exp.host/--/api/v2/push/send', {

//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
  
// }




function handleRegistrationError(errorMessage) {
  showAlertFunction(errorMessage);
  throw new Error(errorMessage);
}

async function registerForPushNotificationsAsync() {
   if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      handleRegistrationError('Permission not granted to get push token for push notification!');
      return;
    }
 
 const projectId = '8c8e8cdf-bdf4-4df2-8993-1f7614db109d';
 if(!projectId) {
  handleRegistrationError('Project ID not found');
 }
 try {
    const pushTokenString = (
      await Notifications.getExpoPushTokenAsync({
        projectId,
      })
    ).data;
    console.log('My New Push Token', pushTokenString);
    return pushTokenString;
 } catch (e) {
  handleRegistrationError(`${e}`);
 }


}else {
  handleRegistrationError('Must use physical device for push notification');
}



// hili ni bano la kufunga registerForPushNotificationsAsync function
}





const { width, height } = Dimensions.get('window');

const UpdateScreen = ({ navigation }) => {




 //for Push NOTIFICATION
   const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(undefined);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync()
    .then((token) => setExpoPushToken(token ?? ""))
    .catch((error) => setExpoPushToken('${error}'));

    notificationListener.current = 
    Notifications.addNotificationReceivedListener((notification) => {
      setNotification(notification);
    });

    responseListener.current = 
    Notifications.addNotificationResponseReceivedListener(
      (response)  => {
      console.log(response);
    });

    return () => {
      notificationListener.current && 
      Notifications.removeNotificationSubscription(
        notificationListener.current
        );
      Notifications.removeNotificationSubscription(
        responseListener.current
        );
    };
  }, []);



const expo_push_token = expoPushToken;
console.log("Update Expo push Token", expo_push_token);

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


const [displayContentsState, setdisplayContentsState] = useState(false);





    const [profile_image, setprofile_image] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [IsPicked, setIsPicked] = useState(false);



//MWANZO WA PICK IMAGE FROM THE PHONE
  // const pickImage = async () => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
 
  //     setprofile_image(result.assets[0].uri); // Use assets array
  //     console.log("PROJECT IMAGE", profile_image)
  //     processImage(); // Use assets array
  // };

const pickImage = async () => {
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.All,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    setprofile_image(result.assets[0].uri);
    setIsPicked(true);
    //console.log(result);
  }
};




 const  processImage = ()=>{
    console.log('Converted')
  }

  //MWISHO WA PICK IMAGE FROM THE PHONE


//MWANZO WA PICK PDF FROM THE PHONE

// Add PDF state
const [pdf, setPdf] = useState(null);

// Add PDF picker function
const pickPdf = async () => {
    let result = await DocumentPicker.getDocumentAsync({
      type: 'application/pdf'
    });
    if (!result.cancelled) {
      setPdf(result.assets[0].uri);
      console.log("result URI:", result);
      console.log("PDF URI:", pdf); // Log PDF URI after setting
    }
  };
//MWISHO WA PICK PDF FROM THE PHONE






// State variable to store the RoomClasses data
  const [Mkoa, setMkoa] = useState([]);
 const [selectedMkoa, setSelectedMkoa] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/AllMikoa/`)
      .then((response) => response.json())
      .then((data) => {
        setMkoa(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);


// State variable to store the RoomClasses data
  const [Level, setLevel] = useState([]);
  const [selectedLevel, setSelectedLevel] = useState(null);
 
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/LevelZaWafugaji/`)
      .then((response) => response.json())
      .then((data) => {
        setLevel(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);



// State variable to store the RoomClasses data
  const [AinaYaKuku, setAinaYaKuku] = useState([]);
 const [selectedAinaYaKuku, setSelectedAinaYaKuku] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/AinaZaKukuViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setAinaYaKuku(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);








// State variable to store the RoomClasses data
  const [Role, setRole] = useState([]);
 const [selectedRole, setSelectedRole] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/UserRoleViewSet/`)
      .then((response) => response.json())
      .then((data) => {
        setRole(data);
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);











  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');

  const [Location, setLocation] = useState('');
  const [Maelezo, setMaelezo] = useState('');


  const [profileImage, setProfileImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);

  useEffect(() => {
    checkLoggedIn();
  }, [userToken]);

  const checkLoggedIn = async () => {
    setIsLoading(true);
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
        setIsLoading(false);
        setEmail(userData.email);
        setUsername(userData.username);
        setPhone(userData.phone);
        setcompany_name(userData.company_name);
         setMaelezo(userData.Maelezo);
          setLocation(userData.Location);

          // Set selectedMkoa moja kwa moja kwa kutumia ID
        setSelectedMkoa(userData.Mkoa.id);

        setSelectedAinaYaKuku(userData.AinaYaKuku.id);
         setSelectedRole(userData.Role.id);

         setprofile_image(userData.profile_image);
         setIsPicked(false);
        
         // Set selectedMkoa and selectedAinaYaKuku based on user data
        //  const mkoa = Mkoa.find(m => m.id === userData.Mkoa.id);
        // const ainaYaKuku = AinaYaKuku.find(a => a.id === userData.AinaYaKuku.id);

        // setSelectedMkoa(mkoa ? mkoa.id : null);
        // setSelectedAinaYaKuku(ainaYaKuku ? ainaYaKuku.id : null);


      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
  const [isPending, setPending] = useState(false);
  const emailRegex = /\S+@\S+\.\S+/;

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading(false);
    } else {
      //showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
      setIsLoading(false);
    }
  };

  const handleUpdate = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();
      formData.append('email', email);
      formData.append('username', username);
      formData.append('phone', phone);
      formData.append('company_name', company_name);
      formData.append('Maelezo', Maelezo);
      formData.append('expo_push_token', expo_push_token);
      

      if (Location) {
            formData.append('Location', Location);
        } else {
            showAlertFunction('Tafadhali jaza wilaya unayoishi.');
            setIsLoading(false);
            return;
        }


         if (company_name) {
            formData.append('company_name', company_name);
        } 

       

        if (phone && phone.length == 10) {
            formData.append('phone', phone);
        } else {
            showAlertFunction('Tafadhali ingiza namba ya simu yenye tarakimu 10, 0*********.');
            setIsLoading(false);
            return;
        }

        

        

        if (username) {
            formData.append('username', username);
        } else {
            showAlertFunction('Tafadhali jaza jina lako kamili.');
            setIsLoading(false);
            return;
        }

        if (email) {
            formData.append('email', email);
        } else {
            showAlertFunction('Tafadhali jaza email yako.');
            setIsLoading(false);
            return;
        }

         // Hakikisha kuwa selectedMkoa na selectedAinaYaKuku sio null
        // if (selectedMkoa && selectedMkoa.id) {
        //     formData.append('Mkoa', selectedMkoa.id);
        // } else {
        //     showAlertFunction('Tafadhali chagua Mkoa.');
        //     setIsLoading(false);
        //     return;
        // }

        if (selectedMkoa) {
          formData.append('Mkoa', selectedMkoa);
        } else {
          showAlertFunction('Tafadhali chagua Mkoa.');
          setIsLoading(false);
          return;
        }

        //  if (selectedRole && selectedRole.id) {
        //     formData.append('Role', selectedMkoa.id);
        // } else {
        //     showAlertFunction('Tafadhali chagua aina ya mtumiaji.');
        //     setIsLoading(false);
        //     return;
        // }

        // if (selectedRole) {
        //   formData.append('Role', selectedRole);
        // } else {
        //   showAlertFunction('Tafadhali chagua aina ya mtumiaji.');
        //   setIsLoading(false);
        //   return;
        // }

         if (selectedRole) {
          formData.append('Role', selectedRole);
        } 

        // if (selectedAinaYaKuku && selectedAinaYaKuku.id) {
        //     formData.append('AinaYaKuku', selectedAinaYaKuku.id);
        // } else {
        //     showAlertFunction('Tafadhali chagua Aina ya Kuku.');
        //     setIsLoading(false);
        //     return;
        // }

        //   if (selectedAinaYaKuku) {
        //   formData.append('AinaYaKuku', selectedAinaYaKuku);
        // } else {
        //   showAlertFunction('Tafadhali chagua aina ya kuku.');
        //   setIsLoading(false);
        //   return;
        // }

           if (selectedAinaYaKuku) {
          formData.append('AinaYaKuku', selectedAinaYaKuku);
        } 




      // formData.append('Mkoa', selectedMkoa.id);
      // //formData.append('Level', selectedLevel.id);
      // formData.append('AinaYaKuku', selectedAinaYaKuku.id);

     // if (profile_image) {
     //        formData.append('profile_image', {
     //            uri: profile_image,
     //            name: 'profile_image.jpg',
     //            type: 'image/jpeg',
     //        });
        
     //     } else {
     //      showAlertFunction('Tafadhali chagua picha yako.');
     //      setIsLoading(false);
     //      return;
     //    }

     if (profile_image && IsPicked) {
  //console.log("Image URI:", profile_image.uri || profile_image);
  formData.append('profile_image', {
    uri: profile_image.uri || profile_image,
    name: 'profile_image.jpg',
    type: 'image/jpeg',
  });
} else {
  console.log("No image selected or uri not found");
}



       // Append the image file
    // formData.append('profile_image', {
    //   uri: profile_image,
    //   name: 'profile_image.jpg',
    //   type: 'image/jpeg',
    // });

    // formData.append('pdf', {
    //   uri: pdf,
    //   name: 'project.pdf',
    //   type: 'application/pdf',
    // });

      axios.put(EndPoint + '/Account/update_user/', formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setIsLoading(false);
        showAlertFunction("Umefanikiwa Kubadilisha taarifa zako");
        setdisplayContentsState(true);
        //console.log("Well");
      }).catch(error => {
        setIsLoading(false);
        console.log(error);
        showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
        setdisplayContentsState(false);
        //handleErrorMessage(error);
      });
    }
  };

  return (
    <>
      {!fontsLoaded ? (<View />) : (
        <>
          {!isLoading ? (
            <View style={{ flex: 1 }}>
              <DirectHomeStack title="Badili Taarifa" />
              <ImageBackground
                source={require('../assets/bc1.png')}
                style={{ flex: 1, opacity: 1 }}
                resizeMode="cover"
              >
                <ScrollView keyboardShouldPersistTaps="handled">
                {!displayContentsState && (
                  <View>


                  <View style={styles.ImageAccountContainer}>
                    <Text style={styles.title}>MFUGAJI SMART</Text>
                    <Text style={styles.subtitle}>Fuga Kidijitali</Text>
                  </View>

                  <Text style={styles.dataContainerFormTitle}>Badilisha taarifa zako </Text>

                
                  <TextInput
                    placeholder='Jina unalotumia'
                    value={username}
                    onChangeText={setUsername}
                    placeholderTextColor={COLORS.white}
                    style={styles.MyTextInput}
                  />
                  <TextInput
                    placeholder='Namba yako ya simu'
                    value={phone}
                    onChangeText={setPhone}
                    placeholderTextColor={COLORS.white}
                    keyboardType="numeric"
                    style={styles.MyTextInput}
                  />
                  <TextInput
                    placeholder='Jina la kampuni au biashara yako'
                    value={company_name}
                    onChangeText={setcompany_name}
                    placeholderTextColor={COLORS.white}
                    style={styles.MyTextInput}
                  />


                   <TextInput
                    placeholder='Wilaya uliyopo'
                    value={Location}
                    onChangeText={setLocation}
                    placeholderTextColor={COLORS.white}
                    style={styles.MyTextInput}
                  />

                    <TextInput
                    placeholder='Email yako'
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor={COLORS.white}
                    style={styles.MyTextInput}
                  />







{/*  mwanzo wa picker*/}
 <View style={{ marginTop: 20 }}>
        

        < View style={globalStyles.inputTax}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Mtumiaji
            </Text>

     <View style={globalStyles.picker}>

       <Picker
    selectedValue={selectedRole}
    onValueChange={(itemValue) => setSelectedRole(itemValue)}
    >
        {Role.map((role) => (
            <Picker.Item 
            key={role.id} 
            label={role.Role} 
            value={role.id}
             />
        ))}
    </Picker>

            
      {/*    <Picker
           style={globalStyles.pickerInputAddNewProject}
            selectedValue={selectedRole}
            onValueChange={(itemValue) => setSelectedRole(itemValue)}
          >

            {Role.map((x) => (
              <Picker.Item
                key={x.id}
                label={x.Role}
                value={x}
              />
            ))}
          </Picker>*/}

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}










  {/*  mwanzo wa picker*/}
 <View style={{ marginTop: 20 }}>
        

        < View style={globalStyles.inputTax}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Mkoa
            </Text>

     <View style={globalStyles.picker}>

            
       {/*   <Picker
           style={globalStyles.pickerInputAddNewProject}
            selectedValue={selectedMkoa}
            onValueChange={(itemValue) => setSelectedMkoa(itemValue)}
          >

            {Mkoa.map((x) => (
              <Picker.Item
                key={x.id}
                label={selectedMkoa ? selectedMkoa : x.JinaLaMkoa}
                value={x}
              />
            ))}
          </Picker>*/}
          <Picker
    selectedValue={selectedMkoa}
    onValueChange={(itemValue) => setSelectedMkoa(itemValue)}
    >
        {Mkoa.map((mkoa) => (
            <Picker.Item 
            key={mkoa.id} 
            label={mkoa.JinaLaMkoa} 
            value={mkoa.id} 
            />
        ))}
    </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}






  {/*  mwanzo wa picker*/}
 <View style={{ marginTop: 20 }}>
        

        < View style={globalStyles.inputTax}>
            <Text style={globalStyles.TaxTypeAddNewProject}>
                 Aina Ya Kuku
            </Text>

     <View style={globalStyles.picker}>

       <Picker
    selectedValue={selectedAinaYaKuku}
    onValueChange={(itemValue) => setSelectedAinaYaKuku(itemValue)}
    >
        {AinaYaKuku.map((ainayakuku) => (
            <Picker.Item 
            key={ainayakuku.id} 
            label={ainayakuku.AinaYaKuku} 
            value={ainayakuku.id} 
            />
        ))}
    </Picker>

            
        {/*  <Picker
           style={globalStyles.pickerInputAddNewProject}
            selectedValue={selectedAinaYaKuku}
            onValueChange={(itemValue) => setSelectedAinaYaKuku(itemValue)}
          >

            {AinaYaKuku.map((x) => (
              <Picker.Item
                key={x.id}
                label={x.AinaYaKuku}
                value={x}
              />
            ))}
          </Picker>*/}

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}







{/*mwanzo wa picha yako*/}

<View style={{ 
  marginTop: 20,
  marginHorizontal:20,
  width:'90%'
   }}>
  {/*<Text style={{ 
    fontSize: 16,
   marginLeft: 3,
   color:'white'
   }}>Picha Yako </Text>*/}
  <View style={[globalStyles.input,
    {
      backgroundColor:'green',
      //marginHorizontal:20,
      width:'100%'
    }

    ]}>
    <FontAwesome style={globalStyles.InputIcon} name='image' />
    <TouchableOpacity
      style={globalStyles.textInputAddNewProjectAddProject}
      onPress={pickImage}
    >
      <Text style={{ 
        color: 'white',
        marginLeft:15, 
      }}>Picha Yako</Text>
    </TouchableOpacity>
  </View>


<View style={{
  width:'100%',
  justifyContent:'center',
  alignItems:'center',
}}>


 {!IsPicked && profile_image && (
<Image 
 source={{
uri: EndPoint + '/' + profile_image
}}
//source={{ uri: profile_image }} 
//source={profile_image ? { uri: profile_image } : require('../assets/profile.jpg')}

style={{ 
width: width/2 -30,
height: 150,
borderRadius:100,
marginTop:10,
marginBottom:20,

}} 
/>
)}


  {IsPicked && profile_image && (
<Image 
//  source={{
// uri: EndPoint + '/' + profile_image
// }}
source={{ uri: profile_image }} 
//source={profile_image ? { uri: profile_image } : require('../assets/profile.jpg')}

style={{ 
width: width/2 -30,
height: 150,
borderRadius:100,
marginTop:10,
marginBottom:20,

}} 
/>
)}



</View>


</View>

{/*mwisho wa picha yako*/}







{/*mwanzo  wa field*/}
                <View style={{ marginTop:20 }}>
                    <Text style={{
                     //fontSize:16,
                      marginLeft:20,
                      color:'white',
                       }}>
                     Tafadhali, tuambie wewe ni nani</Text>
                    < View style={globalStyles.ProjectBodyinput}>
                        {/*<FontAwesome style={globalStyles.InputIcon} name='pencil'/>*/}
                        <TextInput 
                        style={globalStyles.ProjectBodyInputIcon}  
                        placeholder='weka maelezo yako'
                        placeholderTextColor={COLORS.white}
                        value={Maelezo}
                    onChangeText={setMaelezo}
                       
         multiline={true}  // Enable multiline
          numberOfLines={50}  // Set a maximum number of lines
                           />
                    </View>
                </View>
              {/*mwisho wa field*/}










                  {!isLoading && (
                    <TouchableOpacity onPress={handleUpdate} style={styles.ButtonContainerUpdate}>
                      <Text style={styles.ButtonTextUpdate}>Jisajili</Text>
                    </TouchableOpacity>
                  )}




                  </View>
                  )}



                {displayContentsState && (
                  <View style={{
                    justifyContent:'center',
                    alignItems:'center',
                    flex:1,
                    width:'90%',
                    marginHorizontal:20,
                    height:height,
                  }}>
               <Text style={{
                color:'white',
                lineHeight:25,
                fontFamily:'Medium',
               }}>Hongera! {username}, usajili wako umekamilika na taarifa 
               zako zimekusanywa kwa ukamilifu. Endelea kutumia huduma zote zinazopatikana 
               ndani ya Mfugaji Smart App</Text>

               <TouchableOpacity onPress={() => navigation.replace('Home Stack')} 
               style={styles.ButtonContainerUpdate}>
                      <Text style={styles.ButtonTextUpdate}>Endelea</Text>
                    </TouchableOpacity>

                  </View>
                  )}


                </ScrollView>

              </ImageBackground>

              <AwesomeAlert
                show={showAlert}
                showProgress={false}
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
            </View>
          ) : (
            <LotterViewScreen />
          )}
        </>
      )}
    </>
  );
};

export default UpdateScreen;

const styles = StyleSheet.create({
  MyTextInput: {
    marginBottom: 10,
    borderBottomWidth: 1,
    padding: 8,
    color: 'white',
    marginHorizontal: 10,
    borderBottomColor: 'white',
    marginVertical: 15,
  },
  ButtonContainerUpdate: {
    padding: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 25,
  },
  ButtonTextUpdate: {
    color: 'white',
    textAlign: 'center',
    fontFamily: 'Medium',
    backgroundColor: 'blue',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  title: {
    color: COLORS.white,
    fontFamily: 'Regular',
    fontSize: 25,
  },
  subtitle: {
    color: 'green',
    paddingTop: 3,
    textAlign: 'center',
    marginBottom: 15,
    fontFamily: 'Medium',
  },
  dataContainerFormTitle: {
    color: 'white',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Medium',
  },
  ImageAccountContainer: {
    alignItems: 'center',
  },
});
