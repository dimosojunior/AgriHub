import React, { useState,useCallback,useRef, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
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

import DirectHeader from '../Header/DirectHeader';
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

const JazaFaini = ({navigation, route}) => {

   const { 
    //postId,
    id,
    JinaKamiliLaMteja,
    SimuYaMteja,
    EmailYaMteja,
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
    Up_To,
    JumlaYaFainiZote
   
   } = route.params




  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});

const [modalVisible, setModalVisible] = useState(false);
const [cart, setCart] = useState([]);

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


const [isPending, setPending] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const [KiasiChaFainiChaSiku, setKiasiChaFainiChaSiku] = useState(0);




 const [isPending2, setPending2] = useState(false);

const addCartItem = async () => {
  if (!KiasiChaFainiChaSiku) {
    setPending2(false); 
    //Alert.alert('Error', 'Please enter a quantity of product(s) you want to order');
    Alert.alert("Tafadhali, ingiza kiasi cha faini");
    return;
  }



  setPending2(true);


  setModalVisible(false);
   

  try {
    const response = await axios.post(
      EndPoint + `/MalipoYaFainiCartView/?JinaKamiliLaMteja=${JinaKamiliLaMteja}`,
      {
        Mteja: id,
        KiasiChaFainiChaSiku: parseInt(KiasiChaFainiChaSiku),

      },
      {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      }
    );
    

    
        
    // Ensure that the response contains the 'id' of the newly added item
    
      // Update the local cart items list with the new item
      const newItem = {
        id: response.data.id, // Use the 'id' from the response data
        Mteja: id,
        KiasiChaFainiChaSiku: parseInt(KiasiChaFainiChaSiku),
        //price: itemPrice,
      };
      // const updatedCart = [...cart, newItem];
      // setCart(updatedCart);

      // Close the modal and reset the selected product and quantity
      // setModalVisible(false);
      //setSelectedProduct(null);
      setKiasiChaFainiChaSiku('');

      setPending2(false);
     
     Alert.alert("umefanikiwa kupokea faini ya mteja" + " " + JinaKamiliLaMteja);
     //setShouldReload(true); 
      navigation.replace('Pokea Rejesho HomeScreen'); 

     // Increment the displayedItemsCount
    //setDisplayedItemsCount((prevCount) => prevCount + 1);
   
   } catch (error) {
    setModalVisible(false);
     setPending2(false);
     console.log("ERROR", error);
    //Alert.alert('Error', 'Failed to add item to cart');
     if (error.response && error.response.data && error.response.data.error) {
      Alert.alert(error.response.data.error);
      setPending2(false);
      setModalVisible(false);
    } else {
      Alert.alert("Imeshindikana kupokea faini ya mteja" + " " + JinaKamiliLaMteja);
      setPending2(false);
      setModalVisible(false);
    }
    
    
  }
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

  }}>Pokea faini ya {JinaKamiliLaMteja}</Text>
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

        {JumlaYaFainiZote && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Faini: {JumlaYaFainiZote}    
      </Text>
      )}




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
           // width:'100%',
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
         //onPress={handleDeletePost}
           onPress={() => {
        //setSelectedProduct();
        setModalVisible(true);
        }}
           
            style={{
              
              padding: 10,
              //width:'100%',
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
             //width:'100%',
             fontFamily:'Light',
             paddingVertical:10,
             paddingHorizontal:20,

           }}>
              Pokea Faini
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


{/*MODAL FOR MAKING ORDER*/}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={globalStyles.KeyboardAvoidingViewModalViewProduct}

    >
    <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1,marginTop:height/4, 
          justifyContent: 'center', alignItems: 'center',
            }}>
          <View style={globalStyles.ModalViewViewProduct}>
            <Text style={globalStyles.ModalTitleViewProduct}>Pokea Rejesho</Text>

                    <Text 
                    style={globalStyles.EnterQuntityTextViewProduct}
                    > Weka kiasi cha faini anacholipa</Text>
                    < View style={globalStyles.inputViewProduct}>
                        <FontAwesome style={globalStyles.InputIconViewProduct}
                         name='pencil'
                         color="white"
                         />
                        <TextInput 
                        style={[globalStyles.textInputViewProduct,
                          {
                            color:'white',
                          }

                          ]}  
                        //placeholder=' Quantity' 
                        value={KiasiChaFainiChaSiku}
                  onChangeText={text => setKiasiChaFainiChaSiku(text)}
                  keyboardType="numeric"
                  placeholderTextColor="white"
                        />
                    </View>
                



          
            

            <View style={[globalStyles.ButtonConatinerViewProduct,

             {
              justifyContent:'center',
              alignItems:'center',
             }
              ]}>
                  {/*  <TouchableOpacity style={globalStyles.ButtonCloseViewProduct}  onPress={() => setModalVisible(false)} >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Ondoa</Text>
                    </TouchableOpacity>*/}
                    <TouchableOpacity 
                    style={globalStyles.ButtonAddViewProduct}  
                    onPress={addCartItem} >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Kubali</Text>
                    </TouchableOpacity>
            </View>
          </View>
        </View>
        </ScrollView>
        </KeyboardAvoidingView>
      </Modal>




       
    </LinearGradient>





     )}</>
  );
};

export default JazaFaini;

const styles = StyleSheet.create({
 
});