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

const FarmerDetail = ({navigation, route}) => {

  const [loadingTime, setLoadingTime] = useState(0);


   const { 
    postId,
    id,
    full_name,
     reg_no,
    NidaNo,
    Education,
    FarmerSize,
    date_of_birth,
    country,
    region,
    district,
    ward,
    gender,
    PARTICIPATION_GROUPS,
    FarmersOwnership,
    MobileNumber,
    TelNumber,
    Username,
    Email,
    Created,
    FarmerImage,
    Crops
   
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



//------------HII NDO ILIKUWA YA MWANZO


 //  useEffect(() => {
 //    AsyncStorage.getItem("userToken").then(token => {
 //      setUserToken(token)
 //    })
 //    fetchUserData();
 //  }, [userData]);

 //  const fetchUserData = async () => {
 //    try {
 //      const userDataJSON = await AsyncStorage.getItem('userData');
 //      if (userDataJSON) {
 //        const parsedUserData = JSON.parse(userDataJSON);
 //        setUserData(parsedUserData);

 //        //console.log(parsedUserData);
 //        //console.log(userDataJSON);
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


//const [isPending, setPending] = useState(false);
const [selectedProduct, setSelectedProduct] = useState(null);
const [KiasiChaRejeshoChaSiku, setKiasiChaRejeshoChaSiku] = useState(0);
 const [isDoubled, setIsDoubled] = useState(false);

 const [isPending2, setPending2] = useState(false);










 const handleDeletePost = async () => {
    const token = await AsyncStorage.getItem('token');
    //setUserToken(token);
    //console.log("USER", userToken);
    try {
      await axios.delete(EndPoint + `/DeleteFarmerPostView/${postId}/delete/?full_name=${full_name}&reg_no=${reg_no}`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
      showAlertFunction('data deleted successfully');
      navigation.goBack();  // Navigate back to the previous screen
    } catch (error) {
      showAlertFunction('something went wrong');
      //console.log(error);
    }
  };





//---------------DISPLAY TAARIFA ZA WAKULIMA---------------------

const [queryset, setQueryset] = useState([]);
  const [current_page, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  //const [userData, setUserData] = useState({});
 // const [userToken, setUserToken] = useState('');
  const [isPending, setIsPending] = useState(true);



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
        //setcurrent_page(1); // Reset page when refetching
        getItems(token); // Start fetching from the first page
      }
    } catch (error) {
      console.error('Error fetching token:', error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      setIsPending(true); // Set pending to true immediately when entering the screen
      fetchUserData();
      fetchTokenAndData();

      return () => {
        //setQueryset([]); // Reset queryset to avoid stale data
        setCurrentPage(1); // Reset pagination
        setEndReached(false); // Ensure endReached is reset for new focus
      };
    }, [])
  );



const [JumlaYaWote, setJumlaYaWote] = useState(0);

const getItems = (token) => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setIsPending(false);
    return;
  } else {
    setIsLoading(true);
    //console.log('USERTOKEN', userToken);
    //setPending(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetAllTaarifaZaWakulimaForSpecificFarmerView/?full_name=${full_name}&reg_no=${reg_no}&page=${current_page}&page_size=500`
    // console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`, // Add the Authorization header here
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset && data.queryset.length > 0) {
          setQueryset(data.queryset);
           setJumlaYaWote(data.JumlaYaWote); // Set the total amount

        
        
          setIsLoading(false);
          setLoading(false);
          setCurrentPage(current_page + 1);
          setIsPending(false);

          // console.log("NEW CRRRENT", current_page);
          console.log(queryset);

        } else {
          setIsLoading(false);
          setEndReached(true);
          setLoading(false);
          setIsPending(false);
          console.log("Error fetching data");;
        }
      });
  }
};








//console.log("Test userToken", userToken);

 const renderLoader = () => {
    return (
      isLoading ?
        <View style={globalStyles.loaderStyle}>
          <ActivityIndicator size="large" color="red" />
        </View> : null
    );
  };

  // const loadMoreItem = () => {
  //   setcurrent_page(current_page + 1);
  // };

  // useEffect(() => {
  //   setLoading(true)
  //   getItems();
  // }, []);


 const handleScroll = (event) =>{
    const {layoutMeasurement, contentOffset, contentSize} = event.nativeEvent;
    const scrollEndY = layoutMeasurement.height + contentOffset.y
    const contetHeight = contentSize.height

    if (scrollEndY >= contetHeight - 50) {
      getItems()
    }
  }





const CartCard = ({item, index}) => {
  


 return (


<Pressable>
  




{/*mwanzo wa Taarifa za zao husika*/}

{item && item.CropType && item.CropType.Crops && (
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

  }}>Full informations of this crop - ({item.CropType.Crops})</Text>
</View>
)}
      




<View style={{
  flexDirection: 'column',
  paddingHorizontal: 20,
  marginTop: 20,
  marginBottom: 30,
}}>

  {[
    { label: 'Produce (Production Data)', value: item.Produce },
    { label: 'Collection Point Name', value: item.CenterName?.CenterName },
    { label: 'Collection Point Location', value: item.CenterName?.Location },
    { label: 'Warehouse Size', value: item.CenterName?.WarehouseSize },
    

    { label: 'Crop Type', value: item.CropType?.Crops },
    { label: 'Estimated Produce', value: item.EstimatedProduce },
    { label: 'Estimated Weight Per Bag', value: item.EstimatedWeightPerBag },
    { label: 'Farm Price Per Bag', value: item.FarmPricePerBag },
    { label: 'Storage', value: item.Storage },
    { label: 'Quantity Stored (Number of Bags)', value: item.QuantityStored },
    { label: 'Total Price For All Bags', value: item.TotalPriceForAllBags },
    { label: 'Initial Storage', value: item.InitialStorage },
    { label: 'Initial Quantity Stored', value: item.InitialQuantityStored },
    { label: 'Harversted On', value: formatDate(item.HarverstedOn) },
    { label: 'Date Dispatch To Centre', value: formatDate(item.DateDispatchToCentre) },
    { label: 'Acreage', value: item.Acreage },
    { label: 'Crop Category', value: item.CropCategory },
    { label: 'Created By', value: item.Created_By },
    { label: 'Created', value: formatDate(item.Created) },
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

  {/* Delete Button */}

  {((userData && userData.is_collector === true) || (userData && userData.username === Username))  && (

  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#b00020',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    }}
   // onPress={handleDeletePost}
   onPress={() => navigation.navigate("Delete Taarifa Za Wakulima", { ...item, postId: item.id } )}
  

  >
    <FontAwesome name="trash" size={20} color="#fff" />
    <Text style={{
      color: '#fff',
      marginLeft: 8,
      fontFamily: 'Medium'
    }}>
      Delete
    </Text>
  </TouchableOpacity>
  )}

  {/* Update Button */}

  {((userData && userData.is_collector === true) || (userData && userData.username === Username))  && (

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
      Update
    </Text>
  </TouchableOpacity>
  )}
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
      <Text style={globalStyles.loaderText}>Loading data</Text>
      <Text style={globalStyles.loaderCounter2}>please wait...</Text>
    </View>
  </View>
)}







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

  }}>Full Informations Of {full_name}</Text>
</View>





  <View style={[globalStyles.TaarifaBinafsiMainContainernoo,
  {
    alignItems:'center',
  }

  ]}>

  
  {FarmerImage ? (
      <Image
     style={globalStyles.TaarifaBinafsiMtejaImage}
      source={{
      uri: EndPoint + '/' + FarmerImage
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
     username: {Username}    
      </Text>
      
      {NidaNo && (
       <Text style={globalStyles.TaarifaBinafsiJinaLaKituo}>
    Nida No:  {NidaNo} 
      </Text>
      )}

      </View>

     {/* mwisho wa image*/}







{/*mwanzo wa view ya taarifa binafsi*/}
<View style={[globalStyles.TaarifaBinafsiMainContainer,
  {
    alignItems:'flex-start',
    //backgroundColor:'red',
  }

  ]}>

      {date_of_birth && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Date of Birth: {formatDate(date_of_birth)}    
      </Text>
      )}

     {MobileNumber && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Mobile Number: 0{MobileNumber}    
      </Text>
      )}

      {TelNumber && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Telephone Number: {TelNumber}    
      </Text>
      )}

     {Email && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Email: {Email}    
      </Text>
      )}

     {Education && Education.Education && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Education Level: {Education.Education}    
      </Text>
      )}


     {gender && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Gender: {gender}    
      </Text>
      )}


     {country && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Country: {country}    
      </Text>
      )}

      {region && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Region: {region}    
      </Text>
      )}


       {district && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     District: {district}    
      </Text>
      )}

       {ward && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     ward: {ward}    
      </Text>
      )}

        {PARTICIPATION_GROUPS && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Participation in Groups: {PARTICIPATION_GROUPS}    
      </Text>
      )}


         {FarmersOwnership && FarmersOwnership.FarmersOwnership && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMteja}>
     Farmer Ownership: {FarmersOwnership.FarmersOwnership}    
      </Text>
      )}










   {Crops && Crops.length > 0 && (
      <View style={{
        backgroundColor:'wheat',
        padding:10,
        borderRadius:8,
        marginTop:20,
        width:'100%',
      }}>
  <Text style={[globalStyles.VyakulaPriceCartItemsText,
    {
      color:'black',
      fontFamily:'Medium',
    }
    ]}>
    Cultivated Crops: <Text style={{ 
      color: 'green', 
      fontFamily: 'Bold',
       }}>
      {Crops.map((chanjo) => chanjo.Crops).join(', ')}
    </Text>
  </Text>
  </View>
        )}
          











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

  {/* Delete Button */}
  {((userData && userData.is_collector === true) || (userData && userData.username === Username))  && (

  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#b00020',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    }}
    onPress={handleDeletePost}
  >
    <FontAwesome name="trash" size={20} color="#fff" />
    <Text style={{
      color: '#fff',
      marginLeft: 8,
      fontFamily: 'Medium'
    }}>
      Delete
    </Text>
  </TouchableOpacity>
  )}

  {/* Update Button */}
  {((userData && userData.is_collector === true) || (userData && userData.username === Username))  && (

  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#00796b',
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
    }}
    onPress={() => navigation.navigate("Update Farmer", 
            {
               postId,
                id,
                full_name,
                 reg_no,
                NidaNo,
                Education,
                FarmerSize,
                date_of_birth,
                country,
                region,
                district,
                ward,
                gender,
                PARTICIPATION_GROUPS,
                FarmersOwnership,
                MobileNumber,
                TelNumber,
                Username,
                Email,
                Created,
                FarmerImage,
                Crops

             } 
            )}
        

  >
    <FontAwesome name="edit" size={20} color="#fff" />
    <Text style={{
      color: '#fff',
      marginLeft: 8,
      fontFamily: 'Medium'
    }}>
      Update
    </Text>
  </TouchableOpacity>
  )}


</View>

  {/*mwisho wa view ya taarifa binafsi*/}








   {queryset && queryset.length > 0 ? (

    <>


  {setLoading===true?(<ActivityIndicator/>):(

             <>

                   {queryset.map((item, index) => {
          return <CartCard item={item} key={item.id || index} />;
          })}
        
          {isLoading&&(<ActivityIndicator/>)}
          </>
          )}


</>

   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>There is no any farm details  added !!
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
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>



  </ScrollView>
     

{((userData && userData.is_collector === true) || (userData && userData.username === Username))  && (

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

          // onPress={() => navigation.navigate("Add Taarifa Za Wakulima", 
          //   {
          //      postId,
          //       id,
          //       full_name,
          //        reg_no,
          //       NidaNo,
          //       Education,
          //       FarmerSize,
          //       date_of_birth,
          //       country,
          //       region,
          //       district,
          //       ward,
          //       gender,
          //       PARTICIPATION_GROUPS,
          //       FarmersOwnership,
          //       MobileNumber,
          //       TelNumber,
          //       Username,
          //       Email,
          //       Created,
          //       FarmerImage,
          //       Crops

          //    } 
          //   )}
        
           
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
                    <Text style={globalStyles.alertTitle}>AgriHub</Text>
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
        <View style={{ flex: 1,marginTop:height/4, 
          justifyContent: 'center',
         alignItems: 'center', 
        // backgroundColor:'red',
         width:width,
       }}>
          <View style={[globalStyles.ModalViewViewProduct,{
            width:width-20,

          }]}>
            <Text style={globalStyles.ModalTitleViewProduct}>Choose Operation</Text>

                 


            

            <View style={[globalStyles.ButtonConatinerViewProduct,

             {
              justifyContent:'center',
              alignItems:'center',
              flexDirection:'column',
             // backgroundColor:'red',
             }
              ]}>
                   
            <TouchableOpacity 
            style={[globalStyles.ButtonAddViewProduct,{
              marginBottom:20,
              //backgroundColor:'red',
              //height:0,

            }]}  
           // onPress={addCartItem} 
            onPress={() => navigation.navigate("Add Taarifa Za Wakulima", 
            {
               postId,
                id,
                full_name,
                 reg_no,
                NidaNo,
                Education,
                FarmerSize,
                date_of_birth,
                country,
                region,
                district,
                ward,
                gender,
                PARTICIPATION_GROUPS,
                FarmersOwnership,
                MobileNumber,
                TelNumber,
                Username,
                Email,
                Created,
                FarmerImage,
                Crops

             } 
            )}
        
            >
              <FontAwesome name='plus-circle' 
      size={28}
      color='white'  
      
       />
                <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>
                Add New Farm Informations</Text>
            </TouchableOpacity>

                <TouchableOpacity 
            style={globalStyles.ButtonAddViewProduct}  
           // onPress={addCartItem} 
             onPress={() => navigation.navigate("Add Stocks Collection", 
            {
               postId,
                id,
                full_name,
                 reg_no,
                NidaNo,
                Education,
                FarmerSize,
                date_of_birth,
                country,
                region,
                district,
                ward,
                gender,
                PARTICIPATION_GROUPS,
                FarmersOwnership,
                MobileNumber,
                TelNumber,
                Username,
                Email,
                Created,
                FarmerImage,
                Crops

             } 
            )}
            >
              <FontAwesome name='plus-circle' 
      size={28}
      color='wheat'  
      
       />
                <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>
                Add New Stock</Text>
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

export default FarmerDetail;

const styles = StyleSheet.create({

  

 checkboxContainer: {
    width: '100%',
    marginBottom: 20,
    //backgroundColor:'red',
    marginTop:20,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxLabel: {
    marginLeft: 8,
    //fontSize: 16,
    fontFamily: 'Light',
    color:'white',
  },

 
});