import React, { useState,useCallback,useRef, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  RefreshControl,
  Keyboard,
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

const StocksCollectionOrdersItems = ({navigation, route}) => {


//const navigation = useNavigation();

 const [loadingTime, setLoadingTime] = useState(0);


 const { 
    total_price,
    order_status,
    closed_order_state,
    id,


   } = route.params



  const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Poppins-Bold.ttf'),
    Medium: require('../assets/fonts/Poppins-Medium.ttf'),
    SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Thin: require('../assets/fonts/Poppins-Thin.ttf'),
    Light: require('../assets/fonts/Poppins-Light.ttf'),
  });

 //const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
//const [isPending, setPending] = useState(true);


const [queryset, setQueryset] = useState([]);
const [isPending, setisPending] = useState(true);

const [queryset2, setQueryset2] = useState([]);
const [fainiisPending, setfainiPending] = useState(true);


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


  

// kwaajili ya kupata taarifa za aliyelogin
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');



  const fetchUserData = async () => {
    try {
      const userDataJSON = await AsyncStorage.getItem('userData');
      if (userDataJSON) {
        setUserData(JSON.parse(userDataJSON));
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const fetchTokenAndData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
       if (token) {
        //setIsLoading(true);

        // Call getItems
        //await getItems(token);

        // Call getOrderedItems
        await getOrderedItems(token);

        // Call getTransportLoading
        await getTransportLoading(token);
   // setIsLoading(false);
        
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setPending(true); // Set pending to true immediately when entering the screen
      fetchUserData();
      fetchTokenAndData();

      return () => {
        //setQueryset([]); // Reset queryset to avoid stale data
        //setcurrent_page(1); // Reset pagination
       // setEndReached(false); // Ensure endReached is reset for new focus
      };
    }, [])
  );




const [totalRejeshoLeo, setTotalRejeshoLeo] = useState(0);
const [JumlaYaWote2, setJumlaYaWote2] = useState(0);

const [totalRejeshoLeo2, setTotalRejeshoLeo2] = useState(0);



const getOrderedItems = async (token) => {
  setisPending(true);

  const url = `${EndPoint}/GetStocksCollectionOrderItemsView/?id=${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();

    if (data.queryset.length > 0) {
      setQueryset(data.queryset);
      setMainTotalPrice(data.main_total_price);
      //setTotalRejeshoLeo2(data.total_rejesho_leo); 
    }
  } catch (error) {
    console.error("Error in getOrderedItems:", error);
  } finally {
    setisPending(false);
  }
};




const getTransportLoading = async (token) => {
  setfainiPending(true);

  const url = `${EndPoint}/GetAllTransportLoadingForSpecificBuyerView/?BuyerUsername=${BuyerUsername}&BuyerRegNo=${BuyerRegNo}&id=${id}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();

    if (data.queryset2.length > 0) {
      setQueryset2(data.queryset2);
      setJumlaYaWote2(data.JumlaYaWote2); 
    }
  } catch (error) {
    console.error("Error in getTransportLoading:", error);
  } finally {
    setfainiPending(false);
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
    return number
      ? number.toLocaleString('en-US', {
          minimumFractionDigits: 0,
          maximumFractionDigits: 2,
        })
      : null;
  };

  const handlePress = (item) => navigation.navigate('Home', { item });
  const DeletehandlePress = (item) =>
    navigation.navigate('Delete Mteja', { ...item, postId: item.id });

const handlePressPokeaMarejesho = (item) =>
    navigation.navigate('Jaza Rejesho', { ...item });


const handlePressPokeaFaini = (item) =>
    navigation.navigate('Jaza Faini', { ...item });
    // navigation.reset({
    //     index: 0,
    //     routes: [{ name: 'Jaza Faini', ...item }],
    //   }); 
        

// //-----------Fetch wateja wote








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






// New Component for Table Row
const MarejeshoYaLeoComponent = ({ item}) => {

 
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








// New Component for Table Row
const FainiZaLeoComponent = ({ item}) => {

 return (


<Pressable>
  




{/*mwanzo wa Taarifa za zao husika*/}

{item.TransporterFullName  && (
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

  }}>Full informations of this Transporter - ({item.TransporterFullName})</Text>
</View>
)}
      




<View style={{
  flexDirection: 'column',
  paddingHorizontal: 20,
  marginTop: 20,
  marginBottom: 30,
}}>

  {[
    { label: 'Full Name', value: item.TransporterFullName },
    { label: 'Mobile Number', value: item.TransporterMobileNumber },
    { label: 'Email', value: item.TransporterEmail },
    
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


{/* Last Row with Delete and Update buttons */}
<View
  style={{
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
    marginTop: 10,
    borderTopColor: '#ccc',
    borderTopWidth: 1,
  }}>

 

  {/* Update Button */}
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#00796b',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    }}
    // onPress={() => {
    //   // Weka navigation au logic ya update hapa
    //   navigation.navigate('UpdatePostScreen', { postId }); // mfano
    // }}
    onPress={() => navigation.navigate("Update Taarifa Za Wakulima", { ...item, postId: item.id } )}
  
  >
    <FontAwesome name="edit" size={20} color="#fff" />
    <Text style={{
      color: '#fff',
      marginLeft: 8,
      fontFamily: 'Medium'
    }}>
      View To Confirm
    </Text>
  </TouchableOpacity>
</View>














{/*mwisho wa Taarifa za zao husika*/}





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
         onPress={() => navigation.navigate('Loading Transporters')}
           
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
         onPress={() => navigation.navigate('Loading Transporters')}
           
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
