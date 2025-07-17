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


const StocksCollectionOrdersItems = ({navigation, route}) => {

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
    StocksCollectionCenterLocation


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
//const [isPending, setPending] = useState(true);
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
        showAlertFunction("item is removed successfully from your order");

         // navigation.replace('Restaurant NewSale Other ');  

     

      } 
      // else {
      //   // Handle the error if the item couldn't be removed
        
      //   //Alert.alert('Error', 'Failed to remove item from cart');
      //   //Alert.alert('item is removed successfully from your order');
      //   showAlertFunction("item is removed successfully from your order");
      // }
    })
    .catch((error) => {
      
      // Handle the error here, for example, show a user-friendly error message
      //Alert.alert('Error', 'Failed to remove item from cart');
      //Alert.alert('item is removed successfully from your order');
      showAlertFunction("item is failed successfully from your order");
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
         
         
         <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#b00020',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      justifyContent:'space-between',
    }}
   // onPress={handleDeletePost}
   //onPress={() => navigation.navigate("Delete Taarifa Za Wakulima", { ...item, postId: item.id } )}
  

  >
    <FontAwesome name="trash" size={20} color="#fff" />
    <Text style={{
      color: '#fff',
      marginLeft: 8,
      fontFamily: 'Medium'
    }}>
      Cancel order
    </Text>
  </TouchableOpacity>

           
       
          
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













     {queryset && queryset.length > 0 ? (


        <>
     

      
      <FlatList
        data={queryset}
        renderItem={CartCard}
        keyExtractor={(item) => item.id.toString()}
        // ListFooterComponent={renderLoader}
        // onEndReached={getProducts}
        // onEndReachedThreshold={0.5}
      />
      
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










<View style={{
  marginBottom:100,
}}>
  
</View>


{/*mwanzo kwaajili ya kupress order*/}



{queryset && queryset.length > 0 ? (
     
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
        // onPress={() => navigation.navigate('Loading Transporters')}
          onPress={() => navigation.navigate("Loading Transporters", 
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
              Transporters
            </Text>
            <Ionicons name="arrow-forward-circle" size={20} color="red" />
          </TouchableOpacity>
        </Pressable>
     
):(


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
        // onPress={() => navigation.navigate('Loading Transporters')}

          onPress={() => navigation.navigate("Loading Transporters", 
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
              Transporters
            </Text>
            <Ionicons name="arrow-forward-circle" size={20} color="red" />
          </TouchableOpacity>
        </Pressable>
     



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
                    <Text style={globalStyles.alertTitle}>AgroTm</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />



     </LinearGradient> 


  


    )}</>
  );
};

export default StocksCollectionOrdersItems;

const styles = StyleSheet.create({});
