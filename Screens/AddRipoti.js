import React, { useState, useEffect } from 'react';
import { View, SafeAreaView,Modal,Pressable,KeyboardAvoidingView, ImageBackground, TextInput, Alert, Image, StyleSheet, ActivityIndicator, Text, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
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

import {Picker} from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
//import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';
import MinorHeader from '../Header/MinorHeader';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const AddRipoti = () => {

const navigation = useNavigation();


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




const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable
const [displayContentsState, setdisplayContentsState] = useState(false);

// const [OngezaPichaOpen, setOngezaPichaOpen] = useState(false);
// const [OngezaPichaClose, setOngezaPichaClose] = useState(false);





const [PichaYaMteja, setPichaYaMteja] = useState(null);



//MWANZO WA PICK IMAGE FROM THE PHONE
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });
 
      setPichaYaMteja(result.assets[0].uri); // Use assets array
      //console.log("PROJECT IMAGE", PichaYaMteja)
     // processImage(); // Use assets array
    // console.log("RESULT 1" ,result);
  };

const [OngezaPichaOpen, setOngezaPichaOpen] = useState(false);
const [OngezaPichaClose, setOngezaPichaClose] = useState(false);




const [FomuNaBima, setFomuNaBima] = useState('');
const [IdadiYaMikatabaMipyaLeo, setIdadiYaMikatabaMipyaLeo] = useState('');
const [ImetokaKituoJirani, setImetokaKituoJirani] = useState('');
const [ImeendaKituoJirani, setImeendaKituoJirani] = useState('');
const [ImeendaKwaBosi, setImeendaKwaBosi] = useState('');
const [ImetokaKwaBosi, setImetokaKwaBosi] = useState(0);
const [Mkopo, setMkopo] = useState('');
const [Posho, setPosho] = useState('');
const [MatumiziMengine, setMatumiziMengine] = useState('');
const [IdadiYaMikopoYaLeo, setIdadiYaMikopoYaLeo] = useState('');


const [KituoIlichoendaHela, setKituoIlichoendaHela] = useState('');
const [KituoIlichotokaHela, setKituoIlichotokaHela] = useState('');


  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');

  const [Location, setLocation] = useState('');
  //const [Maelezo, setMaelezo] = useState('');


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
         //setMaelezo(userData.Maelezo);
          setLocation(userData.Location);
        
       

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
      showAlertFunction('Kuna tatizo kwenye uwandaaji wa ripoti ya leo');
      setIsLoading(false);
    }
  };





  // State variable to store the RoomClasses data
  const [JinaLaKituo, setJinaLaKituo] = useState([]);
 const [selectedJinaLaKituo, setSelectedJinaLaKituo] = useState(null);
 
  // Fetch Universities
  useEffect(() => {
    fetch(`${EndPoint}/Add/AllVituoVyote/`)
      .then((response) => response.json())
      .then((data) => {
        setJinaLaKituo(data);
        //console.log("Well");
        
        // Set the default selectedRoomClass if needed
        //setSelectedRoomClass(data[0]); // For example, set the first RoomClass as default
      })
      .catch((error) => {
        //console.error('Error fetching Product categories:', error);
        //showAlertFunction("Error fetching Universities");
      });
  }, []);





const handleRegistration = async () => {
    setIsLoading(true);
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
        const formData = new FormData();


            if (selectedJinaLaKituo) {
          formData.append('JinaLaKituo', selectedJinaLaKituo);
        } else {
          showAlertFunction('Tafadhali chagua jina la kituo unachokijazia ripoti.');
          setIsLoading(false);
          return;
        }


        
        if (FomuNaBima) {
            formData.append('FomuNaBima', FomuNaBima);
        } else {
            showAlertFunction('Tafadhali ingiza kiasi cha fomu na bima ?');
            setIsLoading(false);
            return;
        }



         if (ImetokaKituoJirani) {
            formData.append('ImetokaKituoJirani', ImetokaKituoJirani);
        } else {
            showAlertFunction('Tafadhali ingiza kiasi cha pesa kilichotoka kituo jirani au andika 0');
            setIsLoading(false);
            return;
        }

             if (Mkopo) {
            formData.append('Mkopo', Mkopo);
        } else {
            showAlertFunction('Tafadhali ingiza kiasi cha mkopo au andika 0 ');
            setIsLoading(false);
            return;
        }

           if (Posho) {
            formData.append('Posho', Posho);
        } else {
            showAlertFunction('Tafadhali ingiza kiasi cha posho au andika 0 ');
            setIsLoading(false);
            return;
        }

              if (MatumiziMengine) {
            formData.append('MatumiziMengine', MatumiziMengine);
        } else {
            showAlertFunction('Tafadhali ingiza kiasi cha Matumizi mengine au andika 0 ');
            setIsLoading(false);
            return;
        }

           if (IdadiYaMikopoYaLeo) {
            formData.append('IdadiYaMikopoYaLeo', IdadiYaMikopoYaLeo);
        } else {
            showAlertFunction('Tafadhali ingiza idadi ya mikopo iliyotolewa leo au andika 0 ');
            setIsLoading(false);
            return;
        }




          if (ImeendaKituoJirani) {
            formData.append('ImeendaKituoJirani', ImeendaKituoJirani);
        } else {
            showAlertFunction('Tafadhali ingiza kiasi cha pesa iliyoenda kituo jirani au andika 0 ');
            setIsLoading(false);
            return;
        }


          if (KituoIlichoendaHela) {
            formData.append('KituoIlichoendaHela', KituoIlichoendaHela);
        } else {
            showAlertFunction('Tafadhali andika jina la kituo kilichoenda pesa ');
            setIsLoading(false);
            return;
        }

           if (KituoIlichotokaHela) {
            formData.append('KituoIlichotokaHela', KituoIlichotokaHela);
        } else {
            showAlertFunction('Tafadhali andika jina la kituo  pesa ilipotoka ');
            setIsLoading(false);
            return;
        }




          if (ImeendaKwaBosi) {
            formData.append('ImeendaKwaBosi', ImeendaKwaBosi);
        } else {
            showAlertFunction('Tafadhali ingiza kiasi cha pesa kilichoenda kwa bosi au andika 0 ');
            setIsLoading(false);
            return;
        }


          if (ImetokaKwaBosi) {
            formData.append('ImetokaKwaBosi', ImetokaKwaBosi);
        } else {
            showAlertFunction('Tafadhali ingiza kiasi cha pesa kilichotoka kwa bosi au andika 0 ');
            setIsLoading(false);
            return;
        }



        if (IdadiYaMikatabaMipyaLeo) {
            formData.append('IdadiYaMikatabaMipyaLeo', IdadiYaMikatabaMipyaLeo);
        } else {
            showAlertFunction('Tafadhali ingiza idadi ya mikataba mipya leo au andika 0 ');
            setIsLoading(false);
            return;
        }

        // Ongeza picha kwenye `FormData` tu kama imechaguliwa
        // if (PichaYaMteja) {
        //     formData.append('PichaYaMteja', {
        //         uri: PichaYaMteja,
        //         name: 'PichaYaMteja.jpg',
        //         type: 'image/jpeg',
        //     });
        // }

      

        axios.post(EndPoint + '/AddRipotiView/', formData, {
            headers: {
                Authorization: `Token ${userToken}`,
                'Content-Type': 'multipart/form-data',
            },
        }).then(response => {
            setIsLoading(false);
            showAlertFunction("Umefanikiwa Kuweka ripoti ya leo");
            setdisplayContentsState(true);
            //console.log("Well");
            setFomuNaBima('');
            setMatumiziMengine('');
            setIdadiYaMikopoYaLeo('');
            //setPichaYaMteja('');
            setIdadiYaMikatabaMipyaLeo('');
            setImetokaKituoJirani(0);
            setMkopo(0);
            setPosho(0);
            setImeendaKituoJirani('');
            setImeendaKwaBosi('');
            setImetokaKwaBosi(0);

            setKituoIlichotokaHela('');
            setKituoIlichoendaHela('');



        }).catch(error => {
            setIsLoading(false);
            setdisplayContentsState(false);
            console.log("ERRORR", error);
            handleErrorMessage(error);
        });
    }
};
  return (
    <>
      {!fontsLoaded ? (<View />) : (
        <>
          {!isLoading ? (
           

          
      
       <LinearGradient colors={['#015d68', '#000']} style={globalStyles.container}>


       <MinorHeader />
        <ScrollView 
        keyboardShouldPersistTaps="handled"
        >

      {!displayContentsState && (

        <View style={{position: 'relative',
         bottom: 30,
         marginTop:50,
       }}>


     <View style={{
         bottom: 10,
         //marginTop:50,
         justifyContent:'center',
         alignItems:'center',
       }}>
           <Image

          style={{
            width:60,
            height:60,
            borderRadius:50,
          }}
           source={require('../assets/icon.png')} 
          >
         </Image>

         </View>


          <View style={styles.loginIcon}>
            {/*<SvgIcon icon={'enterOtp'} width={280} height={280} />*/}
       
          </View>
          <View style={styles.container}>
            <View style={styles.loginLblCon}>
              <Text style={styles.loginLbl}>Treasure Microfinance</Text>
            </View>


            


            <View style={styles.forgotDes}>
              <Text style={styles.forgotDesLbl}>
                Jaza ripoti ya leo 
              </Text>
           {/*   <Text style={styles.forgotDesLbl}>+91 1234567890</Text>*/}
            </View>
            <View style={styles.formCon}>

            {/*  <OTPInputView
               // pinCount={4}
                autoFocusOnLoad
                style={{width: '80%', height: 70}}
                
               
              />*/}

          
          {!OngezaPichaOpen && (
            <>


            
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
                 Kituo
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
    selectedValue={selectedJinaLaKituo}
    onValueChange={(itemValue) => setSelectedJinaLaKituo(itemValue)}
    >
        {JinaLaKituo.map((x) => (
            <Picker.Item 
            key={x.id} 
            label={x.JinaLaKituo} 
            value={x.id} 
            />
        ))}
    </Picker>

         </View>
          
        </View>    
          
        
    </View>

  {/*  mwisho wa picker*/}




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
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

         <FontAwesome size={20} color="#c07d18" name="pencil" />

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
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Fomu na bima"
          keyboardType="numeric"
          
          value={FomuNaBima}
          onChangeText={setFomuNaBima}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa username*/}


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
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

        <FontAwesome size={20} color="#c07d18" name="pencil" />

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
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Imetoka Kwa Bosi"
          keyboardType="numeric"
          
          value={ImetokaKwaBosi}
          onChangeText={setImetokaKwaBosi}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa username*/}
       




               {/*  mwanzo wa namba ya simu*/}
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

         <FontAwesome size={20} color="#c07d18" name="pencil" />

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

            //paddingVertical:20,
          }]}
          placeholder="Imetoka Kituo Jirani"
          keyboardType="numeric"
          
          value={ImetokaKituoJirani}
          onChangeText={setImetokaKituoJirani}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa namba ya simu*/}





               {/*  mwanzo wa namba ya simu*/}
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

         <FontAwesome size={20} color="#c07d18" name="pencil" />

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

            //paddingVertical:20,
          }]}
          placeholder="Jina la kituo pesa ilipotoka"
          //keyboardType="numeric"
          
          value={KituoIlichotokaHela}
          onChangeText={setKituoIlichotokaHela}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa namba ya simu*/}




               {/*  mwanzo wa namba ya simu*/}
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

          <FontAwesome size={20} color="#c07d18" name="pencil" />

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

            //paddingVertical:20,
          }]}
          placeholder="Mkopo"
          keyboardType="numeric"
          
          value={Mkopo}
          onChangeText={setMkopo}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa namba ya simu*/}




               {/*  mwanzo wa namba ya simu*/}
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

         <FontAwesome size={20} color="#c07d18" name="pencil" />

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

            //paddingVertical:20,
          }]}
          placeholder="Posho"
          keyboardType="numeric"
          
          value={Posho}
          onChangeText={setPosho}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa namba ya simu*/}

</>
)}


{!OngezaPichaOpen && (
<TouchableOpacity 
 onPress={() => {
  setOngezaPichaOpen(true);
}}
style={{
  width:'40%',
}}>
   <Text style={[globalStyles.haippo,
  {
    //width:'90%',
    color:'wheat',
    backgroundColor:'green',
    paddingHorizontal:10,
    paddingVertical:10,
    textAlign:'center',
    borderRadius:8,
  }
  ]}>
Endelea
</Text>
</TouchableOpacity>
)}

        
        {OngezaPichaOpen && (
          <>

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
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

        <FontAwesome size={20} color="#c07d18" name="pencil" />

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
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Imeenda Kwa Bosi"
          keyboardType="numeric"
          
          value={ImeendaKwaBosi}
          onChangeText={setImeendaKwaBosi}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa username*/}






  

        {/*  mwanzo wa email*/}
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
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

         <FontAwesome size={20} color="#c07d18" name="pencil" />

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
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Imeenda Kituo Jirani"
          keyboardType="numeric"
           //keyboardType={'email-address'}
          
          value={ImeendaKituoJirani}
          onChangeText={setImeendaKituoJirani}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa email*/}









        {/*  mwanzo wa email*/}
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
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

         <FontAwesome size={20} color="#c07d18" name="pencil" />

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
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Jina la kituo pesa ilipoenda"
          //keyboardType="numeric"
           //keyboardType={'email-address'}
          
          value={KituoIlichoendaHela}
          onChangeText={setKituoIlichoendaHela}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa email*/}











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
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

        <FontAwesome size={20} color="#c07d18" name="pencil" />

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
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Matumizi Mengine"
          keyboardType="numeric"
          
          value={MatumiziMengine}
          onChangeText={setMatumiziMengine}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa username*/}







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
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

        <FontAwesome size={20} color="#c07d18" name="pencil" />

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
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Idadi Ya Mikopo Ya Leo"
          keyboardType="numeric"
          
          value={IdadiYaMikopoYaLeo}
          onChangeText={setIdadiYaMikopoYaLeo}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa username*/}




      




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
            marginRight: 0,color:'black',
            flexDirection:'row',
            alignItems:'center',
             }}
          >

        <FontAwesome size={20} color="#c07d18" name="pencil" />

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
            //backgroundColor:'black',

            //paddingVertical:20,
          }]}
          placeholder="Idadi Ya Mikataba Mipya Leo"
          keyboardType="numeric"
          
          value={IdadiYaMikatabaMipyaLeo}
          onChangeText={setIdadiYaMikatabaMipyaLeo}
        placeholderTextColor="#bbb"
        />

      
        </View>
      {/*  mwisho wa username*/}


</>
)}


{/*mwanzo wa forget password*/}
 {OngezaPichaOpen && (
  <>

            {!isPending && (
              <Pressable 
              style={{
                flexDirection:'row',
                justifyContent:'space-between',
                alignItems:'center',
                  backgroundColor:'black',
                  marginTop:50,
                  paddingVertical:10,
                  paddingHorizontal:40,
                  borderRadius:8,
                  color:'white',
                  borderColor:'green',
                  borderWidth:1,
               // backgroundColor:'black'
              }}
              onPress={handleRegistration}>
                <Text style={styles.registerLbl}>Kusanya Ripoti</Text>
                 <FontAwesome name='book' 
                size={28}
                color='white' 
                style={{
                 // marginTop:70,
                }} 
                
                 />
              </Pressable>
              )}


</>
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






            </View>
          </View>
        </View>





              



    )}



{displayContentsState &&(
<View style={{
  marginTop:100,
  width:'90%',
  marginHorizontal:20,
  justifyContent:'center',
  alignItems:'center',
  flex:1,
}}>
  <Text style={{
    color:'black',
    fontFamily:'Medium',
  }}>
     Umefanikiwa kuandaa ripoti ya leo kikamilifu.
  </Text>

   <TouchableOpacity 
   onPress={() => {
   navigation.navigate("Ripoti Ya Siku");
  }}
     style={styles.ButtonContainerUpdate}>
  <Text style={styles.ButtonTextUpdate}>Angalia Ripoti</Text>
</TouchableOpacity>

</View>


  )}



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
                    <Text style={globalStyles.alertTitle}>Gegwajo Microfinance</Text>
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



{OngezaPichaOpen && (
<TouchableOpacity 
 onPress={() => {
  setOngezaPichaOpen(false);
}}
style={{
  width:'50%',
  position:'absolute',
  bottom:0,
  left:5,
}}>
   <Text style={[globalStyles.haippo,
  {
    //width:'90%',
    color:'white',
    backgroundColor:'#c07d18',
    paddingHorizontal:0,
    paddingVertical:10,
    textAlign:'center',
    borderRadius:8,
  }
  ]}>
Rudi nyuma
</Text>
</TouchableOpacity>
)}

      </LinearGradient>


            
          ) : (
            <LotterViewScreen />
          )}
        </>
      )}
    </>
  );
};

export default AddRipoti;

const styles = StyleSheet.create({
 mainCon: {
    backgroundColor: 'white',
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
    color: COLORS.white,
    fontSize: 20,
    marginBottom:10,
    textAlign:'center',
    fontFamily:'Medium',
    //fontFamily: Fonts.type.NotoSansExtraBold,
  },
  forgotDes: {
    position: 'relative',
    bottom: 35,
     color: COLORS.white,
  },
  forgotDesLbl: {
    color: '#000',
     color: COLORS.white,
   // fontFamily: Fonts.type.NotoSansRegular,
  },
  //registerLbl: {color: '#0057ff', fontFamily: Fonts.type.NotoSansSemiBold},


registerLbl:{
  // backgroundColor:'black',
  // marginTop:70,
  // paddingVertical:10,
  // paddingHorizontal:40,
  // borderRadius:8,
    color: COLORS.white,
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
    },



    dataContainerForPassword: {
      color: COLORS.white,
        fontSize: SIZES.h3,
        // borderBottomColor: COLORS.lightGrey,
        //borderColor: COLORS.green,
        borderWidth: 1,
        paddingVertical: 10,
        marginHorizontal: 15,
        marginVertical: 10,
        marginTop: 50,
        padding:10,
        borderRadius:8,
        width:width-100,
        flexDirection:'row',
        justifyContent:'space-between',
        flex:1,

        borderWidth:2,
        borderColor:COLORS.white,
        
         
    },

  
    textinputi: {
        color: COLORS.white,
        //fontSize: SIZES.h3,
        fontFamily:'Light',

        
        
        marginHorizontal: 0,
        
        padding:0,
        
    },


});
