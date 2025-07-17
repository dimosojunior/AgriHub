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
import Checkbox from 'expo-checkbox'; // Make sure to install this package

const { width, height } = Dimensions.get('screen');
const TransportLoadingOrdersItems = ({navigation, route}) => {

  const [loadingTime, setLoadingTime] = useState(0);


 const { 
    total_price,
    order_status,
    closed_order_state,
    id ,

    BuyerRegNo,
    Buyer,
    BuyerCountry,
    BuyerRegion,
    BuyerDistrict,
    BuyerWard,
    BuyerMobileNumber,
    BuyerUsername,
    BuyerEmail,
    BuyerLocation,

    FarmerFullName,
    FarmerRegNo,
    FarmerCountry,
    FarmerRegion,
    FarmerDistrict,
    FarmerWard,
    FarmerGender,
    FarmerMobileNumber,
    FarmerTelNumber,
    FarmerUsername,
    FarmerEmail,
    StocksCollectionCenterName,
    StocksCollectionCenterLocation,
    created


   } = route.params

    // To change color
const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

 const showAlertFunction = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
  };

  const hideAlert = () => {
    setShowAlert(false);
  };


 let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});







 const [modalVisible, setModalVisible] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [queryset, setQueryset] = useState([]);
  const [mainTotalPrice, setMainTotalPrice] = useState(null);
  const [refresh, setRefresh] = useState(false);

//const [isPending, setisPending] = useState(false);
const [isRange, setisRange] = useState(false);




//Load more
 // const [queryset, setOrders] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
//const [isPending, setisPending] = useState(true);
const [isPending, setisPending] = useState(false);
const [userData, setUserData] = useState({});

  

 const pullMe =() => {
    setRefresh(true)

    setTimeout (() => {
      setRefresh(false)
    }, 10)
  }


 const [userToken, setUserToken] = useState('');

//UPDATE USER TOKEN
useFocusEffect(
    React.useCallback(() => {
      const updateUserToken = async () => {
        const token = await AsyncStorage.getItem('userToken');
        setUserToken(token || '');
      };

      updateUserToken();

      // Listen for the 'updateUserToken' event
      const unsubscribe = navigation.addListener('updateUserToken', updateUserToken);

      // Cleanup the listener when the component unmounts
      return unsubscribe;
    }, [navigation])
  );






useEffect(() => {

   
    checkLoggedIn();
    // Fetch cart items only if the user is authenticated
    if (userToken) {
     setLoading(true)
     //getProducts();;
    }

  }, [userToken]);


 useEffect(() => {
    fetchUserData();
  }, [userData]);

  const fetchUserData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        const parsedUserData = JSON.parse(userDataJSON);
        setUserData(parsedUserData);
        
        //console.log("USERDATA ARE");
        //console.log(userData);
      }
    } catch (error) {
      console.log(error);
    }
  };



const checkLoggedIn = async () => {
  const token = await AsyncStorage.getItem('userToken');
  setUserToken(token);
  
  
 
};







//--------ADD TRANSPORT LOADING-----------------
 const [QuantityLoadedInVehicle, setQuantityLoadedInVehicle] = useState('');
  const [TransportFee, setTransportFee] = useState('');
  const [LoadingPoint, setLoadingPoint] = useState('');
  const [Destination, setDestination] = useState('');




  const handleSubmit = async () => {
    
    const token = await AsyncStorage.getItem('userToken');

    if (userToken) {
      const formData = new FormData();





      if (QuantityLoadedInVehicle) {
        formData.append('QuantityLoadedInVehicle', QuantityLoadedInVehicle);
    } else {
        Alert.alert('Please enter quantity loaded In a vehicle ');
        return;
    }

       if (TransportFee) {
        formData.append('TransportFee', TransportFee);
    } else {
        Alert.alert('Please enter total transport fee ');
        return;
    }

    if (LoadingPoint) {
        formData.append('LoadingPoint', LoadingPoint);
    } 

       if (Destination) {
        formData.append('Destination', Destination);
    } 

    setisPending(true);

   axios.post(EndPoint + `/AddNewTransportLoadingView/?BuyerRegNo=${BuyerRegNo}&Buyer=${Buyer}&BuyerCountry=${BuyerCountry}&BuyerRegion=${BuyerRegion}&BuyerDistrict=${BuyerDistrict}&BuyerWard=${BuyerWard}&BuyerMobileNumber=${BuyerMobileNumber}&BuyerUsername=${BuyerUsername}&BuyerEmail=${BuyerEmail}&BuyerLocation=${BuyerLocation}&FarmerFullName=${FarmerFullName}&FarmerRegNo=${FarmerRegNo}&FarmerCountry=${FarmerCountry}&FarmerRegion=${FarmerRegion}&FarmerDistrict=${FarmerDistrict}&FarmerWard=${FarmerWard}&FarmerMobileNumber=${FarmerMobileNumber}&FarmerUsername=${FarmerUsername}&FarmerEmail=${FarmerEmail}&FarmerTelNumber=${FarmerTelNumber}&FarmerGender=${FarmerGender}&id=${id}&StocksCollectionCenterName=${StocksCollectionCenterName}&StocksCollectionCenterLocation=${StocksCollectionCenterLocation}`, formData, {
        headers: {
          Authorization: `Token ${userToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }).then(response => {
        setisPending(false);
         setModalVisible(false);
        Alert.alert("Your data were added successfully, and sent to a buyer");
        //console.log("Well");
       //   setModalVisible(false);
       //  setIsModalVisible(false); // Reset state when modal closes
       // setdisplayContentsState(false);
        setQuantityLoadedInVehicle('');
        setDestination('');
        setLoadingPoint('');
        //setRegions('');
        //setDistricts('');
       // setWard('');
        setTransportFee('');
        

        

      }).catch(error => {
        setisPending(false);
        console.log(error);
         

      });
    }
  };






 useEffect(() => {
  setisPending(true);
    // Make a GET request to fetch queryset and main total price
    axios.get(`${EndPoint}/GetStocksCollectionOrderItemsView/?id=${id}`)


      .then((response) => {
        const { queryset, main_total_price } = response.data;
        setQueryset(queryset);
        
         setisRange(false);
        setMainTotalPrice(main_total_price);
        setisPending(false);
        
      })
      .catch((error) => {
        
        setisPending(false);
      });
  }, []);





const removeOrderItem = (cartId) => {
  
 
   //navigation.replace('Products Orders Items', {id}); 
   //navigation.replace('Restaurant Reports');
  // Make an API request to delete the item from the cart
  const apiUrl = `${EndPoint}/DeleteProductsOrderItem/?id=${id}&cartId=${cartId}`;
  
  
  axios
    .delete(apiUrl, {
      headers: {
        Authorization: `Token ${userToken}`,
        'Content-Type': 'application/json',
      },
    })
    .then((response) => {
      if (response.status === 204) {
        // Item removed successfully, update the cartItems state
        setQueryset(queryset.filter((item) => item.id !== cartId));
         //setIsOrderButtonVisible(false);
        // Alert.alert('item is removed successfully from your order');
        Alert.alert("item is removed successfully from your order");

         // navigation.replace('Restaurant NewSale Other ');  

     

      } 
      // else {
      //   // Handle the error if the item couldn't be removed
        
      //   //Alert.alert('Error', 'Failed to remove item from cart');
      //   //Alert.alert('item is removed successfully from your order');
      //   Alert.alert("item is removed successfully from your order");
      // }
    })
    .catch((error) => {
      
      // Handle the error here, for example, show a user-friendly error message
      //Alert.alert('Error', 'Failed to remove item from cart');
      //Alert.alert('item is removed successfully from your order');
      Alert.alert("item is failed successfully from your order");
    });
};



 
 




   // Utility function to format the date as "YYYY-MM-DD"
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














const CartCard = ({item, index}) => {
  



 return (
 
      <Pressable
      style={globalStyles.OverdoseCartItemsContainer} >


        <View 
        style={globalStyles.OverdoseLeftCartItemsContainer}
        >

         {item && item.product && item.product.CropType && item.product.CropType.Crops && (
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
           {item.product.CropType.Crops}
          </Text>)}

          
          
          <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
           Total Price:  Tsh. {formatToThreeDigits(item.price)}/=
          </Text>

           <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
           Quantity:  {item.quantity}
          </Text>

           <Text 
           style={globalStyles.OverdoseItemNameCartItemsText}
         >
           Price per bag:  {formatToThreeDigits(item.product.CropUnitPrice)}
          </Text>

          <Text 
          style={globalStyles.OverdosePriceCartItemsText}
        >
          
            Ordered By: {item.order.Buyer}
          </Text>
          
          <Text
           style={globalStyles.OverdoseIconCartItemsText}
          >
            
       
           
          </Text>
         
         

           
       
          
        </View>












      

        <Pressable 

        style={globalStyles.OverdoseImageContainerCartItems}
        >
        {item && item.product && item.CropImage ?  
          <Image
           style={globalStyles.OverdoseImageCartItems}
        source={{
          uri: EndPoint + '/' + item.product.CropImage
        }}
          />
          :

          <Image
           style={globalStyles.OverdoseImageCartItems}
        source={{
          uri: EndPoint + '/' + item.product.CropType.CropImage
        }}
          />
        }



        </Pressable>


      </Pressable>




)

}
  
  return (

    <>{!fontsLoaded ? (<View/>):(


   
     <LinearGradient colors={['#015d68', '#000']} style={globalStyles.container}>


   {isPending && (
  <View style={globalStyles.loaderOverlay}>
    <View style={globalStyles.loaderContent}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={globalStyles.loaderText}>Loading data...</Text>
      <Text style={globalStyles.loaderCounter2}>please wait...</Text>
    </View>
  </View>
)}



<MinorHeader />

<ScrollView 
keyboardShouldPersistTaps="handled"

>











     {queryset && queryset.length > 0 ? (


        <>
     

      
     
           {queryset.map((item, index) => {
          return <CartCard item={item} key={item.id || index} />;
          })}
        
      
         </>        
      


   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>There is no any data now !!
  </Text>


  <View style={globalStyles.ErrorImageContainerHomePage}>
      <Image 
          source={require('../assets/500.png')}  
           style={globalStyles.ErrorImageHomePage}
          
          //source={item.ArticleImage} 
          //resizeMode='contain'
          contentContainerStyle={{ padding: 20 }}
          
          />
  </View>




</View>

  )}  








{/*mwanzo wa Taarifa za zao husika*/}

{Buyer &&  (
<View style={{
  width:'100%',
  marginVertical:0,
  // marginHorizontal:20,
  //flex:1,
  //backgroundColor:'wheat',

}}>
  
  <Text style={{
    color:'wheat',
    // backgroundColor:'wheat',
    paddingVertical:10,
  paddingHorizontal:20,
  width:'90%',
  marginHorizontal:10,
  borderRadius:10,
  fontFamily:'Medium',
  marginTop:20,

  }}>Full informations of this order </Text>
</View>
)}
      




<View style={{
  flexDirection: 'column',
  paddingHorizontal: 20,
  marginTop: 20,
  marginBottom: 30,
}}>

  {[
    { label: 'Buyer Full Name', value: Buyer },
    { label: 'Buyer Mobile Number (Tsh)', value: BuyerMobileNumber },
    { label: 'Buyer Email', value: BuyerEmail },
    { label: 'Buyer Location', value: BuyerLocation },
    { label: 'Stocks Collection Centre Name', value: StocksCollectionCenterName },
    { label: 'Stocks Collection Centre Location', value: StocksCollectionCenterLocation },
    
    { label: 'Order Created', value: formatDate(created) },
  ].map((item, index) => (
    <View
      key={index}
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomColor: '#ccc',
        borderBottomWidth: 0.5,
      }}>
      <Text style={{
        fontFamily: 'Medium',
        color: '#eee',
        width: '45%',
      }}>{item.label}</Text>
      <Text style={{
        fontFamily: 'Regular',
        color: '#fff',
        width: '50%',
        textAlign: 'right',
      }}>{item.value ?? 'N/A'}</Text>
    </View>
  ))}

</View>









<View style={{
  marginBottom:100,
}}>
  
</View>


{/*mwanzo kwaajili ya kupress order*/}





      <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 0,
            justifyContent: "space-between",
            //backgroundColor: "white",
            position:'absolute',
            top:150,
          //  width:'100%',
          right:10,

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
        
        // setSelectedProduct(item);
         //setSelectedProduct(id);
        setModalVisible(true);
        }}
            style={{
              
              padding: 10,
             // width:'100%',
              borderRadius: 6,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:'#015d68', //"#015d68",
              gap: 10,
            }}
          >
           <FontAwesome name='plus-circle' 
      size={28}
      color='white'  
      
       />
            
         {/*   <Text style={{
             //fontSize: 16, 
             //fontWeight: "500", 
             color: "black" ,
            // padding:13,
             backgroundColor:'yellow', //"#015d68",
             borderColor:'green',
             borderWidth:1,
             textAlign:'center',
             borderRadius:8,
            // width:'100%',
             fontFamily:'Medium',
             paddingVertical:10,
             paddingHorizontal:20,

           }}>
              Add
            </Text>*/}
          </TouchableOpacity>
          

        </Pressable>



 <Pressable
          style={{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "#015d68",
            position:'absolute',
            bottom:0,
            width:'100%',

          }}
        >
          <View style={{
            width:'50%',
          }}>
            <Text style={{ fontSize: 16,color:"white", fontWeight: "600" }}>
              Total Order price
            </Text>
            <Text style={{ marginTop: 7,color:"white", fontSize: 15 }}>Tsh. 
            {formatToThreeDigits(total_price)}/=</Text>
          </View>

          <TouchableOpacity
         // onPress={makeOrder}
        // onPress={() => navigation.navigate('Your Transport Loading Data')}

          onPress={() => navigation.navigate("Your Transport Loading Data", 
            {
               total_price,
    order_status,
    closed_order_state,
    id ,

    BuyerRegNo,
    Buyer,
    BuyerCountry,
    BuyerRegion,
    BuyerDistrict,
    BuyerWard,
    BuyerMobileNumber,
    BuyerUsername,
    BuyerEmail,
    BuyerLocation,

    FarmerFullName,
    FarmerRegNo,
    FarmerCountry,
    FarmerRegion,
    FarmerDistrict,
    FarmerWard,
    FarmerGender,
    FarmerMobileNumber,
    FarmerTelNumber,
    FarmerUsername,
    FarmerEmail,
    StocksCollectionCenterName,
    StocksCollectionCenterLocation
             } 
            )}
        
           
            style={{
              
              padding: 10,
              width:'50%',
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
             backgroundColor: "#1f1f1f",
             borderColor:'green',
             borderWidth:1,
             textAlign:'center',
             borderRadius:8,
             width:'100%',
             fontFamily:'Light',
             paddingVertical:10,

           }}>
              View Your Data
            </Text>
            <Ionicons name="arrow-forward-circle" size={20} color="red" />
          </TouchableOpacity>
        </Pressable>
     

   
</ScrollView>
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






{/*MODAL FOR MAKING ORDER*/}

      <Modal
        animationType="slide"
        transparent={false}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[globalStyles.KeyboardAvoidingViewModalViewProduct,

        {
          backgroundColor:'#015d68',
        }

        ]}

    >
    <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1,marginTop:height/10, justifyContent: 'center',
         alignItems: 'center', }}>
          <View style={globalStyles.ModalViewViewProduct}>
            <Text style={globalStyles.ModalTitleViewProduct}>
             Transport Loading</Text>

                    <Text 
                    style={[globalStyles.EnterQuntityTextViewProduct,{
                      color:'wheat',
                      marginBottom:15,
                    }]}
                    > Fill your informations accurately</Text>

                    {/*mwanzo wa input*/}
                     <Text 
                    style={globalStyles.EnterQuntityTextViewProduct}
                    > Quantity Loaded In Vehicle</Text>
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
                        placeholder='number of debe' 
                   value={QuantityLoadedInVehicle} 
                  onChangeText={setQuantityLoadedInVehicle} 
                  keyboardType="numeric"
                  placeholderTextColor="wheat"
                        />

                    </View>
                     {/*mwisho wa input*/}



                       {/*mwanzo wa input*/}
                        <Text 
                    style={globalStyles.EnterQuntityTextViewProduct}
                    >Total Transport Fee</Text>
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
                        placeholder='Transport Fee' 
                     value={TransportFee}
                  onChangeText={text => setTransportFee(text)}
                  keyboardType="numeric"
                  placeholderTextColor="wheat"
                        />

                    </View>
                     {/*mwisho wa input*/}

                       {/*mwanzo wa input*/}
                       <Text 
                    style={globalStyles.EnterQuntityTextViewProduct}
                    >Location of Loading Place</Text>
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
                        placeholder='Loading Point' 
                       value={LoadingPoint}
                  onChangeText={text => setLoadingPoint(text)}
                  //keyboardType="numeric"
                  placeholderTextColor="wheat"
                        />

                    </View>
                     {/*mwisho wa input*/}


                       {/*mwanzo wa input*/}
                        <Text 
                    style={globalStyles.EnterQuntityTextViewProduct}
                    >Location of Offloading Place</Text>
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
                        placeholder='Destination' 
                       value={Destination}
                  onChangeText={text => setDestination(text)}
                  //keyboardType="numeric"
                  placeholderTextColor="wheat"
                        />

                    </View>
                     {/*mwisho wa input*/}



            

            <View style={[globalStyles.ButtonConatinerViewProduct,

             {
              justifyContent:'center',
              alignItems:'center',
             }
              ]}>
                    {/*<TouchableOpacity style={globalStyles.ButtonCloseViewProduct}  onPress={() => setModalVisible(false)} >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Ondoa</Text>
                    </TouchableOpacity>*/}
                    <TouchableOpacity 
                    style={globalStyles.ButtonAddViewProduct}  
                   onPress={handleSubmit} 
                    >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Confirm</Text>
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

export default TransportLoadingOrdersItems;

const styles = StyleSheet.create({});
