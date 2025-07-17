import React, { useState,useCallback,useRef, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Linking,
  Animated,
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
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('screen');




// const queryset = [
//   { id: 1, firstName: "John", middleName: "Doe", lastName: "Smith", age: 18, gender: "Male", phone: "123-456-7890" },
//   { id: 2, firstName: "Jane", middleName: "Mary", lastName: "Doe", age: 19, gender: "Female", phone: "234-567-8901" },
//   { id: 3, firstName: "Alice", middleName: "Lee", lastName: "Johnson", age: 17, gender: "Female", phone: "345-678-9012" },
//   { id: 4, firstName: "Bob", middleName: "Ray", lastName: "Brown", age: 20, gender: "Male", phone: "456-789-0123" },
//   { id: 5, firstName: "Charlie", middleName: "Anna", lastName: "Taylor", age: 21, gender: "Male", phone: "567-890-1234" },
//   { id: 6, firstName: "Daisy", middleName: "Sue", lastName: "Wilson", age: 18, gender: "Female", phone: "678-901-2345" },
//   { id: 7, firstName: "Eve", middleName: "May", lastName: "Moore", age: 19, gender: "Female", phone: "789-012-3456" },
//   { id: 8, firstName: "Frank", middleName: "Joe", lastName: "Martin", age: 20, gender: "Male", phone: "890-123-4567" },
//   { id: 9, firstName: "Grace", middleName: "Ella", lastName: "Jackson", age: 17, gender: "Female", phone: "901-234-5678" },
//   { id: 10, firstName: "Henry", middleName: "Tom", lastName: "Harris", age: 21, gender: "Male", phone: "012-345-6789" },
// ];

const DeleteMteja = ({navigation, route}) => {

   const { 
    postId,
    JinaKamiliLaMteja,
    SimuYaMteja,
    EmailYaMteja,
    SimuYaMzaminiWa1,
    SimuYaMzaminiWa2,
    Mahali,
    KiasiAnachokopa,
    KiasiAlicholipa,
    RejeshoKwaSiku,
    JumlaYaDeni,
    Riba,
    AmesajiliwaNa,
    PichaYaMteja,
    Ni_Mteja_Hai,
    Created,
    Up_To
   
   } = route.params




  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


// kwaajili ya kupata taarifa za aliyelogin
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
    fetchUserData();
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const parsedUserData = JSON.parse(userDataJSON);
        setUserData(parsedUserData);

        //console.log(parsedUserData);
        //console.log(userDataJSON);
      }
    } catch (error) {
      // console.log(error);
    }
  };


 useEffect(() => {
    checkLoggedIn();


  }, [userToken]);

  const checkLoggedIn = async () => {
    const token = await AsyncStorage.getItem('userToken');
    setUserToken(token);
  };




//FOR SEARCHING
const [input, setInput] = useState('');


    const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };




const handleDeletePost = async () => {
    const token = await AsyncStorage.getItem('token');
    //setUserToken(token);
    //console.log("USER", userToken);
    try {
      await axios.delete(EndPoint + `/DeleteWatejaWotePostView/${postId}/delete/`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      showAlertFunction('Umefanikiwa kumfuta mteja');
      navigation.replace('Home Stack');  // Navigate back to the previous screen
    } catch (error) {
      showAlertFunction('Imeshindikana kumfuta mteja');
      //console.log(error);
    }
  };




 const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };


const formatToThreeDigits = (number) => {
  if (number !== null) {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0, // Ensure two decimal places
      maximumFractionDigits: 2, // Limit to two decimal places
      minimumIntegerDigits: 1, // Ensure at least one integer digit
    });
  }
  return null;
};




  return (

     <>{!fontsLoaded ? (<View/>):(

   

    <LinearGradient colors={['#015d68', '#000']} style={globalStyles.container}>

<MinorHeader />

<ScrollView 
keyboardShouldPersistTaps="handled"

>


<View style={{
  width:'100%',
  marginVertical:0,
  // marginHorizontal:20,
  //flex:1,
  //backgroundColor:'wheat',

}}>
  
  <Text style={{
    color:'white',
    // backgroundColor:'wheat',
    paddingVertical:10,
  paddingHorizontal:20,
  width:'90%',
  marginHorizontal:10,
  borderRadius:10,
  fontFamily:'Medium',

  }}>Futa taarifa za  {JinaKamiliLaMteja}</Text>
</View>



{/*mwanzo wa view ya taarifa binafsi*/}
<View style={globalStyles.TaarifaBinafsiMainContainer}>
  
  {PichaYaMteja ? (
      <Image
     style={globalStyles.TaarifaBinafsiMtejaImage}
      source={{
      uri: EndPoint + '/' + PichaYaMteja
    }}
       //source={require('../assets/profile.jpg')} 
      >
      </Image>

      ):(
     <Image
     style={globalStyles.TaarifaBinafsiMtejaImage}
      
       source={require('../assets/profile.jpg')} 
      >
      </Image>
      )}

      <Text style={globalStyles.TaarifaBinafsiJinaLaMteja}>
     {JinaKamiliLaMteja}    
      </Text>
      
      {Mahali && (
       <Text style={globalStyles.TaarifaBinafsiJinaLaKituo}>
     {Mahali} 
      </Text>
      )}

     {SimuYaMteja && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Simu: 0{SimuYaMteja}    
      </Text>
      )}


 {/*mwanzo wa view ya taarifa za mkopo*/}
<View style={globalStyles.TaarifaBinafsimkopo}>
{SimuYaMzaminiWa1 && (
 <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMkopoText}>
     Mzamini: 0{SimuYaMzaminiWa1}    
      </Text>
      )}
 

      <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMkatoText}>
     |   
      </Text>
      
      {SimuYaMzaminiWa2 && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaDeniText}>
     0{SimuYaMzaminiWa2}    
      </Text>
    )}

</View>
{/*mwisho wa view ya taarifa za mkopo*/}



    {/*mwanzo wa view ya taarifa za mkopo*/}
<View style={globalStyles.TaarifaBinafsimkopo}>
{KiasiAnachokopa > 0 ? (
 <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMkopoText}>
     Mkopo: {formatToThreeDigits(KiasiAnachokopa)}    
      </Text>
      ):(
    <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMkopoText}>
     Mkopo: 0   
      </Text>
      )}

      <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMkatoText}>
     |   
      </Text>
    
    {JumlaYaDeni> 0 ? (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaDeniText}>
     Deni: {formatToThreeDigits(JumlaYaDeni)}    
      </Text>
      ):(
 <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaDeniText}>
     Deni: 0    
      </Text>
      )}

</View>
{/*mwisho wa view ya taarifa za mkopo*/}




   {/*mwanzo wa view ya taarifa za mkopo*/}
<View style={globalStyles.TaarifaBinafsimkopo}>
{KiasiAlicholipa > 0 ? (
 <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMkopoText}>
     Lipwa: {formatToThreeDigits(KiasiAlicholipa)}    
      </Text>
      ):(
<Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMkopoText}>
     Lipwa: 0   
      </Text>
      )}

      <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMkatoText}>
     |   
      </Text>
      
      {RejeshoKwaSiku > 0 ? (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaDeniText}>
     Rejesho: {formatToThreeDigits(RejeshoKwaSiku)}    
      </Text>
      ):(
     <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaDeniText}>
     Rejesho: 0    
      </Text>
      )}

</View>
{/*mwisho wa view ya taarifa za mkopo*/}





  {/*mwanzo wa view ya taarifa za mwanzo wa kukopa*/}
<View style={globalStyles.TaarifaBinafsiTareheZamkopo}>
{Created && (
 <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaTareheYakukopaText}>
     {formatDate(Created)}   
      </Text>
      )}

    
       <Ionicons
        name='arrow-forward-circle' size={28} 
        //color='white'
        style={globalStyles.TaarifaBinafsiSimuYaMtejaIconTareheYakukopaText}
         />

      {Up_To && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMwishoTareheYakukopaText}>
     {formatDate(Up_To)}        
      </Text>
      )}


</View>
{/*mwanzo wa view ya taarifa za  mwanzo wa kukopa*/}












</View>
  {/*mwisho wa view ya taarifa binafsi*/}








      







<View style={{
  marginBottom:100,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>



  </ScrollView>
     


        <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 0,
            justifyContent: "space-between",
            //backgroundColor: "white",
            position:'absolute',
            bottom:0,
            //width:'100%',
            right:5,

          },
           
          ]}
        >
        {/*  <View style={{
            width:'50%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
              Bei ya jumla
            </Text>

             <Text style={{ 
              fontFamily:'Medium'
            }}>
              Tsh. {formatToThreeDigits(totalCartPrice)}/=
            </Text>
           
          </View>*/}

         

          <TouchableOpacity
         onPress={handleDeletePost}
           
            style={{
              
              padding: 10,
             // width:'100%',
              borderRadius: 6,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
            }}
          >
            
            <Text style={{
             //fontSize: 16, 
             //fontWeight: "500", 
             color: "white" ,
            // padding:13,
             backgroundColor: "#015d68",
             borderColor:'white',
             borderWidth:1,
             textAlign:'center',
             borderRadius:8,
            // width:'100%',
             fontFamily:'Light',
             paddingVertical:10,
             paddingHorizontal:20,

           }}>
              Futa
            </Text>
          </TouchableOpacity>
          

        </Pressable>
   



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
                    <Text style={globalStyles.alertTitle}>Twins Microfinance</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />
    </LinearGradient>






     )}</>
  );
};

export default DeleteMteja;

const styles = StyleSheet.create({
 
});