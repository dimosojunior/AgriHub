
import { StyleSheet,Platform,TextInput,ActivityIndicator,
  Pressable, Text,Animated,ScrollView, View,Image, 
  Button, FlatList,TouchableOpacity,Modal,
  TouchableWithoutFeedback, Keyboard,Dimensions,
  
   
  KeyboardAvoidingView 
   } from 'react-native';
import React, {useState,useRef,useCallback, useEffect, useContext} from 'react';

import {globalStyles} from '../Styles/GlobalStyles';

import { EndPoint } from "../Constant/links";
import useFetch from '../useFetch';
import { useFonts } from 'expo-font';
import AwesomeAlert from 'react-native-awesome-alerts';
import LotterViewScreen from '../Screens/LotterViewScreen';
import Header from '../Header/header';
import MinorHeader from '../Header/MinorHeader';

// import theme from '../theme/theme';
// import themeContext from '../theme/themeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';

import COLORS  from '../Constant/colors';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');




const AllBuyers = ({ navigation }) => {

  const [loadingTime, setLoadingTime] = useState(0);


  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [queryset, setQueryset] = useState([]);
  const [current_page, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [endReached, setEndReached] = useState(false);
  const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [isPending, setIsPending] = useState(true);

   const [modalVisible, setModalVisible] = useState(false);
 const [isModalVisible, setIsModalVisible] = useState(false); // New state variable

const [input, setInput] = useState('');

  
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

  // useFocusEffect(
  //   useCallback(() => {
  //     setIsPending(true); // Set pending to true immediately when entering the screen
  //     fetchUserData();
  //     fetchTokenAndData();

  //     return () => {
  //       //setQueryset([]); // Reset queryset to avoid stale data
  //       setCurrentPage(1); // Reset pagination
  //       setEndReached(false); // Ensure endReached is reset for new focus
  //     };
  //   }, [])
  // );



useFocusEffect(
  useCallback(() => {
    let interval;
    setIsPending(true);
    setLoadingTime(0);

    // start timer
    interval = setInterval(() => {
      setLoadingTime((prev) => prev + 1);
    }, 1000);

    fetchUserData();
    fetchTokenAndData();

    return () => {
      setCurrentPage(1);
      setEndReached(false);
      clearInterval(interval);
      setLoadingTime(0);
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
   const url = EndPoint + `/GetAllBuyersView/?page=${current_page}&page_size=500`
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




const removeUserSubmittedData = async (postId) => {
  setIsPending(true);
    const token = await AsyncStorage.getItem('token');
    //setUserToken(token);
    //console.log("postId", postId);
    try {
       await axios.delete(EndPoint + `/DeleteKumbushoLaChanjoByUserItsSelfView/${postId}/delete/`, {
      //await axios.delete(EndPoint + `/DeleteKumbushoLaMabadilikoYaLisheByUserItsSelfView/?KumbushoID=${KumbushoID}`, {
        headers: {
          Authorization: `Token ${userToken}`,
        },
      });
       setQueryset(queryset.filter((item) => item.id !== postId));
      setIsPending(false);

      showAlertFunction('Umefanikiwa kufuta kumbusho');
      navigation.navigate('Historia Za Kumbusho Za Ratiba Ya Chanjo');  // Navigate back to the previous screen
    

    } catch (error) {
       setIsPending(false);
      showAlertFunction('Imeshindikana kufuta kumbusho');
     
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
 
const CartCard = ({item, index}) => {
  
 //mwanzo wa search
   if (input === ""){

 return (



      <Pressable
      style={[
        globalStyles.VyakulaCartItemsContainerHistoria,
        
      ]} >

{/*OverdoseCartItemsContainer*/}
        <View 
        style={[globalStyles.VyakulaLeftCartItemsContainer,
          {
            width:'50%',
          }

          ]}
        >

         {item.full_name && ( 
          <Text 
           style={globalStyles.VyakulaItemNameCartItemsText}
         >
            {item.full_name}
          </Text>)}


        

{item.MobileNumber && (
           <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Mobile Number:  <Text style={{
              color:'green',
              fontFamily:'Bold',
              marginBottom:15,
            }}>
               0{item.MobileNumber} 
            </Text> 
          </Text>
      )}



       {/*mwanzo wa button*/}
          <TouchableOpacity
           onPress={() => navigation.navigate("Buyer Detail", { ...item, postId: item.id } )}
           style={globalStyles.VyakulaAddButtonContainerCartItems}
                 >
              <Text
               style={[
                globalStyles.VyakulaAddButtonTextCartItems,
                {
                  backgroundColor:'#015d68',
                }
              ]}
            
              >
                View
              </Text>
            </TouchableOpacity>
             {/*mwisho wa button*/}
          
        </View>



        <Pressable 

        style={globalStyles.VyakulaImageContainerCartItems}
        >
         

        
       {item && item.profile_image ? (
        <Image style={globalStyles.FarmerImage} 
        source={{ uri: EndPoint + '/' + item.profile_image }}             
         />):(

         <Image style={globalStyles.FarmerImage} 
        source={require("../assets/profile.jpg")}
         />)}

         <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Amesajiliwa: {formatDate(item.Created)}
          </Text>





        </Pressable>
      </Pressable>






)


    // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if (item.full_name.toLowerCase().includes(input.toLowerCase())) {


 return (



      <Pressable
      style={[
        globalStyles.VyakulaCartItemsContainerHistoria,
        
      ]} >

{/*OverdoseCartItemsContainer*/}
        <View 
        style={[globalStyles.VyakulaLeftCartItemsContainer,
          {
            width:'50%',
          }

          ]}
        >

         {item.full_name && ( 
          <Text 
           style={globalStyles.VyakulaItemNameCartItemsText}
         >
            {item.full_name}
          </Text>)}


        

{item.MobileNumber && (
           <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Mobile Number:  <Text style={{
              color:'green',
              fontFamily:'Bold',
              marginBottom:15,
            }}>
               0{item.MobileNumber} 
            </Text> 
          </Text>
      )}



       {/*mwanzo wa button*/}
          <TouchableOpacity
           onPress={() => navigation.navigate("Buyer Detail", { ...item, postId: item.id } )}
           style={globalStyles.VyakulaAddButtonContainerCartItems}
                 >
              <Text
               style={[
                globalStyles.VyakulaAddButtonTextCartItems,
                {
                  backgroundColor:'#015d68',
                }
              ]}
            
              >
                View
              </Text>
            </TouchableOpacity>
             {/*mwisho wa button*/}
          
        </View>



        <Pressable 

        style={globalStyles.VyakulaImageContainerCartItems}
        >
         

        
       {item && item.profile_image ? (
        <Image style={globalStyles.FarmerImage} 
        source={{ uri: EndPoint + '/' + item.profile_image }}             
         />):(

         <Image style={globalStyles.FarmerImage} 
        source={require("../assets/profile.jpg")}
         />)}

         <Text 
          style={globalStyles.VyakulaPriceCartItemsText}
        >
          
            Amesajiliwa: {formatDate(item.Created)}
          </Text>





        </Pressable>
      </Pressable>






)




 // hili bano la chini ni la if ya pili mwisho
  }


}
  
return (

    <>{!fontsLoaded ? (<View/>):(


    

     <LinearGradient colors={['#015d68', '#000']} style={globalStyles.container}>
   
         
         {isPending && (
  <View style={globalStyles.loaderOverlay}>
    <View style={globalStyles.loaderContent}>
      <ActivityIndicator size="large" color="#fff" />
      <Text style={globalStyles.loaderText}>Loading Buyers...</Text>
      <Text style={globalStyles.loaderCounter}> {loadingTime}s</Text>
    </View>
  </View>
)}





  <MinorHeader title="Historia Zako"/>

      















 <Text
style={globalStyles.AppChaguaHudumaTextHomeScreen}  

>All Buyers</Text>


 <View style={globalStyles.searchbarOtherPages}>
            <View style={globalStyles.searchbarIconContainerOtherPages}>
              <Ionicons
                name="search-outline"
                size={25}
                color={COLORS.black}
                style={globalStyles.AppIConHomeScreenOtherPages}
              />
            </View>
            <View style={globalStyles.searchbarInputContainerOtherPages}>
              <TextInput
                value={input}
                onChangeText={(text) => setInput(text)}
                placeholder="full name"
                placeholderTextColor="black"
                style={globalStyles.AppInputHomeScreenOtherPages}
              />
            </View>
          </View>

  
   {queryset && queryset.length > 0 ? (

    <>
 {setLoading===true?(<ActivityIndicator/>):(
      <>
      
      <FlatList
        data={queryset}
        renderItem={CartCard}
        keyExtractor={(item) => item.id.toString()}
        ListFooterComponent={renderLoader}
        onEndReached={getItems}
        onEndReachedThreshold={0.5}
      />
      </>
      )}
       


</>

   ) :(
   <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>There is no any data is added !!
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
  marginBottom:50,
}}>

</View>


{/*mwanzo kwaajili ya kupress order*/}





        <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
           // backgroundColor: "white",
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
         //onPress={makeOrder}
              onPress={() =>
        navigation.navigate('Home Stack')}
       
           
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
             //backgroundColor: "green",
             borderColor:'white',
             borderWidth:1,
             textAlign:'center',
             borderRadius:8,
             //width:'100%',
             fontFamily:'Light',
             paddingVertical:10,
             paddingHorizontal:10,

           }}>
              {JumlaYaWote}
            </Text>
          </TouchableOpacity>

          
        </Pressable>
   









     <AwesomeAlert
                show={showAlert}
                showProgress={false}
                // title="Vyakula Stores"
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

export default AllBuyers;

const styles = StyleSheet.create({});
