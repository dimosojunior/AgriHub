import React, { useState,useCallback, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
  Modal,
  Dimensions,
  Pressable,
  Platform,Text,TouchableOpacity,TextInput,FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

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

import {CustomCard} from '../RenderedComponents/CustomCard';
import MinorHeader from '../Header/MinorHeader';


//  import { BannerAd, BannerAdSize, TestIds, InterstitialAd, AdEventType, RewardedInterstitialAd, RewardedAdEventType } from 'react-native-google-mobile-ads';


// const adUnitId = __DEV__ ? TestIds.REWARDED_INTERSTITIAL : 'ca-app-pub-4524511699441606/6815431262';
// const adUnitId2 = __DEV__ ? TestIds.INTERSTITIAL : 'ca-app-pub-4524511699441606/7007002951';

// const interstitial = InterstitialAd.createForAdRequest(adUnitId2, {
//   requestNonPersonalizedAdsOnly: true
// });

// const rewardedInterstitial = RewardedInterstitialAd.createForAdRequest(adUnitId, {
//   requestNonPersonalizedAdsOnly: true
// });



const { width, height } = Dimensions.get('window');


export default function MgawanyoWaHuduma ({navigation, route}) {




   // MWANZO WA ADS
  // const [interstitialLoaded, setInterstitialLoaded] = useState(false);
  // const [rewardedInterstitialLoaded, setRewardedInterstitialLoaded] = useState(false);
  
  // const loadInterstitial = () => {
  //   const unsubscribeLoaded = interstitial.addAdEventListener(
  //     AdEventType.LOADED,
  //     () => {
  //       setInterstitialLoaded(true);
  //     }
  //   );

  //   const unsubscribeClosed = interstitial.addAdEventListener(
  //     AdEventType.CLOSED,
  //     () => {
  //       setInterstitialLoaded(false);
  //       interstitial.load();
  //     }
  //   );

  //   interstitial.load();

  //   return () => {
  //     unsubscribeClosed();
  //     unsubscribeLoaded();
  //   }
  // }

  // const loadRewardedInterstitial = () => {
  //   const unsubscribeLoaded = rewardedInterstitial.addAdEventListener(
  //     RewardedAdEventType.LOADED,
  //     () => {
  //       setRewardedInterstitialLoaded(true);
  //     }
  //   );

  //   const unsubscribeEarned = rewardedInterstitial.addAdEventListener(
  //     RewardedAdEventType.EARNED_REWARD,
  //     reward => {
  //       console.log(`User earned reward of ${reward.amount} ${reward.type}`);
  //     }
  //   );

  //   const unsubscribeClosed = rewardedInterstitial.addAdEventListener(
  //     AdEventType.CLOSED,
  //     () => {
  //       setRewardedInterstitialLoaded(false);
  //       rewardedInterstitial.load();
  //     }
  //   );

  //   rewardedInterstitial.load();

  //   return () => {
  //     unsubscribeLoaded();
  //     unsubscribeClosed();
  //     unsubscribeEarned();
  //   }
  // };

  // useEffect(() => {
  //   const unsubscribeInterstitialEvents = loadInterstitial();
  //   const unsubscribeRewardedInterstitialEvents = loadRewardedInterstitial();

  //   return () => {
  //     unsubscribeInterstitialEvents();
  //     unsubscribeRewardedInterstitialEvents();
  //   };
  // }, [])


// MWISHO WA ADS


   const { 
    
    id,
    JinaLaHuduma 
   } = route.params

// hizi nimeamua kuzifanya constant kwasababu kwenye page
// ya All Orders hizi zote zimepokelewa na meme hapa sichagui
// aina ya kuku wala umri wake natak user akaone orders zake
// bila kupitia kule kwenye kukokotoa
  
  const totalCartPrice = 0;
   const totalCartKilos = 0;
   const KukuId = 1;
   const UmriwaKukuId = 1;



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



  // const nav = useNavigation();
  // const DATA = [
  //   {
  //     id: 1,
  //     name: "Bajeti Ya Chakula",
  //     backgroundColor:"#6BC5E8",
  //     imagesrc:im1
      
  //   },
  //   {
  //     id: 2,
  //     name: "Kumbusho La Shamba",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im2
  //   },

  //   {
  //     id: 3,
  //     name: "Kitabu Shamba",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im3
  //   },

  //   {
  //     id: 4,
  //     name: "Jamii Ya Mfugaji",
  //     backgroundColor:"#3A9EC2",
  //     imagesrc:im4
  //   }


  // ];




//FOR SEARCHING
const [input, setInput] = useState('');

//Load more
const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);




const [modalVisible, setModalVisible] = useState(false);
const [isModalVisible, setIsModalVisible] = useState(false); // New state variable
const [displayContentsState, setdisplayContentsState] = useState(false);




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





 const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [company_name, setcompany_name] = useState('');

  const [Location, setLocation] = useState('');
  const [Maelezo, setMaelezo] = useState('');

  const [Role, setRole] = useState('');

 const [isLoading2, setIsLoading2] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem("userToken").then(token => {
      setUserToken(token)
    })
  }, [userData]);

  useEffect(() => {
    checkLoggedIn();
  }, [userToken]);

  const checkLoggedIn = async () => {
    setIsLoading2(true);
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
        setIsLoading2(false);
        setEmail(userData.email);
        setUsername(userData.username);
        setPhone(userData.phone);
        setcompany_name(userData.company_name);
         setMaelezo(userData.Maelezo);
          setLocation(userData.Location);
           // setRole(userData.Role.Role);
           // console.log("ROLll", Location);

        
         

      } catch (error) {
        handleErrorMessage(error);

      }
    }
  };

  const [error, setError] = useState(null);
 
  const emailRegex = /\S+@\S+\.\S+/;

  const handleErrorMessage = (error) => {
    if (error.response) {
      // Handle server errors here if needed
      setIsLoading2(false);
    } if (error.message === 'Network Error') {
      showAlertFunction('Tatizo la mtandao, washa data na ujaribu tena.');
      setIsLoading2(false);
    } else {
      showAlertFunction('Kuna tatizo kwenye ubadilishaji wa taarifa zako');
      setIsLoading2(false);
    }
  };










const getItems = () => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetMgawanjoWaHudumaView/?id=${id}&page=${current_page}&page_size=2`
    // console.log(url);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset.length > 0) {
          setQueryset([...queryset, ...data.queryset]);
          setIsLoading(false);
          setLoading(false);
          setcurrent_page(current_page + 1);
          setPending(false);

          // console.log("NEW CRRRENT", current_page);
          // console.log(queryset);

        } else {
          setIsLoading(false);
          setEndReached(true);
          setLoading(false);
          setPending(false);
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

  useEffect(() => {
    setLoading(true)
    getItems();
  }, []);











  const transportItem = ({item}) => {

    if (input === ""){

    return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameHomeScreen}

                 >{item.JinaLaHuduma}</Text>


               <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.PichaYaHuduma ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaHuduma
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>
              

         



                  <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreen}

                   // onPress={() => 
                   //  navigation.navigate('Angalia Huduma', item)}
                    onPress={() => {


          
          if (item.JinaLaHuduma === 'Matumizi Ya Chakula') {
            navigation.navigate('Aina Za Kuku', item);
          } 

          if (item.JinaLaHuduma === 'Kokotoa Mchanganyiko Wa Chakula') {
            navigation.navigate('Kokotoa Aina Za Kuku', item);
          }

            if (item.JinaLaHuduma === 'Maktaba Ya Lishe') {
            navigation.navigate('Maktaba Ya Lishe HomeScreen', item);
          }

            if (item.JinaLaHuduma === 'Muongozo Wa Lishe') {
            navigation.navigate('Muongozo Wa Lishe HomeScreen', item);
          }

            if (item.JinaLaHuduma === 'Matumizi Sahihi Ya Incubator') {
            navigation.navigate('Matumizi Ya Indibata HomeScreen', item);
          }


            if (item.JinaLaHuduma === 'Duka Lako') {
            navigation.navigate('Get All Duka Lako Items', item);
          }

            if (item.JinaLaHuduma === 'Uza Au Nunua Kuku/Mayai Kwa Haraka Hapa') {
            navigation.navigate('Uza Au Nunua Kuku Kwa Haraka', item);
          }
            


          

          
          if (!Location == '') {

              if (item.JinaLaHuduma === 'Jamii Ya Wafugaji') {
            navigation.navigate('Jamii Ya Mfugaji HomeScreen', item);
          }

              if (item.JinaLaHuduma === 'Kusafisha Banda') {
            navigation.navigate('Kusafisha Banda HomeScreen', item);
          }

          if (item.JinaLaHuduma === 'Ratiba Ya Chanjo') {
            navigation.navigate('Chanjo Umri Wa Kuku', item);
          }

          if (item.JinaLaHuduma === 'Kumbusho La Uatamiaji Wa Mayai') {
            navigation.navigate('Kumbusho La Uatamiaji AinaZaNdege', item);
          }

           if (item.JinaLaHuduma === 'Kumbusho La Mabadiliko Ya Lishe') {
            navigation.navigate('Aina Ya Kuku MabadilikoYaLishe', item);
          }




     }else{
       setIsModalVisible(true); // Update state when modal opens
        setModalVisible(true);
     }




          
        }}



                   >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreen}
                  >Ingia</Text>
                  </TouchableOpacity>
                </View>
                <View>
                 
                </View>
              </View>
           </CustomCard>


           )




     // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if(item.JinaLaHuduma.toLowerCase().includes(input.toLowerCase())){


 return (

      <CustomCard >
              <View 
              style={globalStyles.AppItemContainerHomeScreen}
              >
                <View style={{
                  //justifyContent:"space-between",
                }}>
                  <Text 

                  style={globalStyles.AppItemNameHomeScreen}

                 >{item.JinaLaHuduma}</Text>


               <View 
                style={globalStyles.AppItemImageContainerHomeScreen}
              >
              {item.PichaYaHuduma ? ( 
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={{
                      uri: EndPoint + '/' + item.PichaYaHuduma
                    }}
                      
                      >
                  </Image>
                  ):(
                  <Image

                  style={globalStyles.AppItemImageHomeScreen}
                   source={require('../assets/500.png')} 
                  >
                  </Image>
                )}
               </View>
              

         



                  <TouchableOpacity 

                  style={globalStyles.AppItemButtonHomeScreen}

                   // onPress={() => 
                   //  navigation.navigate('Angalia Huduma', item)}
                    onPress={() => {


          
          if (item.JinaLaHuduma === 'Matumizi Ya Chakula') {
            navigation.navigate('Aina Za Kuku', item);
          } 

          if (item.JinaLaHuduma === 'Kokotoa Mchanganyiko Wa Chakula') {
            navigation.navigate('Kokotoa Aina Za Kuku', item);
          }

            if (item.JinaLaHuduma === 'Maktaba Ya Lishe') {
            navigation.navigate('Maktaba Ya Lishe HomeScreen', item);
          }

            if (item.JinaLaHuduma === 'Muongozo Wa Lishe') {
            navigation.navigate('Muongozo Wa Lishe HomeScreen', item);
          }

            if (item.JinaLaHuduma === 'Matumizi Sahihi Ya Incubator') {
            navigation.navigate('Matumizi Ya Indibata HomeScreen', item);
          }

            if (item.JinaLaHuduma === 'Duka Lako') {
            navigation.navigate('Get All Duka Lako Items', item);
          }

            if (item.JinaLaHuduma === 'Uza Au Nunua Kuku/Mayai Kwa Haraka Hapa') {
            navigation.navigate('Uza Au Nunua Kuku Kwa Haraka', item);
          }
            


          

          
          if (!Location == '') {
            if (item.JinaLaHuduma === 'Jamii Ya Wafugaji') {
            navigation.navigate('Jamii Ya Mfugaji HomeScreen', item);
          }

              if (item.JinaLaHuduma === 'Kusafisha Banda') {
            navigation.navigate('Kusafisha Banda HomeScreen', item);
          }

          if (item.JinaLaHuduma === 'Ratiba Ya Chanjo') {
            navigation.navigate('Chanjo Umri Wa Kuku', item);
          }


          if (item.JinaLaHuduma === 'Kumbusho La Uatamiaji Wa Mayai') {
            navigation.navigate('Kumbusho La Uatamiaji AinaZaNdege', item);
          }

            if (item.JinaLaHuduma === 'Kumbusho La Mabadiliko Ya Lishe') {
            navigation.navigate('Aina Ya Kuku MabadilikoYaLishe', item);
          }


     }else{
       setIsModalVisible(true); // Update state when modal opens
        setModalVisible(true);
     }




          
        }}



                   >
                    <Text 
                    style={globalStyles.AppItemButtonTextHomeScreen}
                  >Ingia</Text>
                  </TouchableOpacity>
                </View>
                <View>
                 
                </View>
              </View>
           </CustomCard>


           )





// hili bano la chini ni la if ya pili mwisho
  }



// mwisho wa render
  };




  return (

       <>{!fontsLoaded ? (<View/>):(

          <View style={[globalStyles.container,
             

            ]}>





<MinorHeader title={JinaLaHuduma} />



    <View style={globalStyles.searchbarOtherPages}>

                 <View style={globalStyles.searchbarIconContainerOtherPages}>
                    <Ionicons name="search-outline" 
                    size={25} 
                    color={COLORS.black} 

                    style={globalStyles.AppIConHomeScreenOtherPages}

                      />
                    </View>

                    <View style={globalStyles.searchbarInputContainerOtherPages}>
                    <TextInput 
                    value={input} onChangeText ={(text) => setInput(text)}
                    placeholder="Tafuta" 
                     placeholderTextColor='black'
                    style={globalStyles.AppInputHomeScreenOtherPages}
                    
                    ></TextInput>
                    </View>

                  </View>



              <View style={[globalStyles.bottomview,
                { 
              

               opacity: isModalVisible ? 
              0.1 : 1
               }

                ]}>
            



                <Text
                style={globalStyles.AppChaguaHudumaTextHomeScreen}  
                
                >Mgawanyo Wa Huduma</Text>


            {/*mwanzo wa Item View*/}
                <View 
                style={globalStyles.AppFlatListContainerHomeScreen} 
               
                >

{ !isLoading2 ? (
  <>
      
      { queryset && queryset.length > 0 ? (
        <>

         {setLoading===true?(<ActivityIndicator/>):(
      <>

                    <FlatList
                    data={queryset}
                    renderItem={transportItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}

                    ListFooterComponent={renderLoader}
                    onEndReached={getItems}
                    onEndReachedThreshold={0.5}
                  />


                        </>
      )}

         </>



      ) : (
       

 <View style={[globalStyles.noitemTextContainer,{backgroundColor:COLORS.white}]}>
  <Text style={globalStyles.noitemText}>Hakuna huduma iliyopo kwasasa!! !
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
 </>

):(
<LotterViewScreen />


)} 
                </View>

          {/*Mwisho wa item View*/}





               
                </View>










{JinaLaHuduma === "Bajeti Ya Chakula" && (
<View style={{
  marginBottom:100,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>
)}

{/*mwanzo kwaajili ya kupress order*/}
{JinaLaHuduma === "Bajeti Ya Chakula" && (

  <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 20,
            justifyContent: "space-between",
            backgroundColor: "white",
            position:'absolute',
            bottom:0,
            width:'100%',

          },
           
          ]}
        >
          <View style={{
            width:'50%',
          }}>
            <Text style={{ 
              fontFamily:'Medium'
            }}>
            Tazama michanganyo yako ya mwanzo
            </Text>
           
          </View>

          <TouchableOpacity

        onPress={() =>
        navigation.navigate('All Orders')}

      
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
             backgroundColor: "green",
             borderColor:'white',
             borderWidth:1,
             textAlign:'center',
             borderRadius:8,
             width:'100%',
             fontFamily:'Light',
             paddingVertical:10,

           }}>
              Tazama
            </Text>
          </TouchableOpacity>
        </Pressable>
)}









{/*MODAL FOR MAKING ORDER*/}

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
          setIsModalVisible(false); // Reset state when modal closes
        }}
      >
    
   
        <View style={{ 
         flex: 1,
         marginTop:height/4,
         //justifyContent: 'center', 
         alignItems: 'center',
          //backgroundColor: 'red' 
        }}>
          <View style={[
            globalStyles.ModalViewViewProduct,
            {
              backgroundColor:'green',
              justifyContent: 'center', 
             alignItems: 'center',
             //height:height/4,
             width:'90%',


            }



            ]}>
          
            <Text style={[globalStyles.ModalTitleViewProduct,
              {
                textAlign:'center',
                fontFamily:'Medium',

              }
              ]}>
              
            
              Inaonekana kuna tatizo kwenye usajili wako,
              usajili wako haujakamilika, tafadhali kamilisha usajili
              ili uweze kupata na kuona huduma zingine.            
            
            </Text>


                


          
            

            <View style={[globalStyles.ButtonConatinerViewProduct,

              {
                'marginTop':100,
              }

              ]}>

              <TouchableOpacity 
                    style={globalStyles.ButtonCloseViewProduct} 
                      onPress={() => {
    
                        setIsModalVisible(false); // Update state when modal opens
                        setModalVisible(false);
                      }}
                     >
                        <Text style={globalStyles.ConfirmCancelButtonTextViewProduct}>Sitisha</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity 
                    style={[globalStyles.ButtonAddViewProduct,
                      {
                            backgroundColor:'black'
                          }
                      ]}  
                    //onPress={addCartItem}
                    onPress={() => {
                      setModalVisible(false);
                      setIsModalVisible(false); // Reset state when modal closes
                     //setdisplayContentsState(true);
                     navigation.navigate('Update Stack');
                    }}
                                 >
                        <Text 
                        style={[
                          globalStyles.ConfirmCancelButtonTextViewProduct,
                          {
                            //backgroundColor:'black'
                          }
                          ]}>Malizia Usajili</Text>
                    </TouchableOpacity>
            </View>
          </View>
        </View>
        
        
      </Modal>



          </View>


          )}</>

          );
}

const styles = StyleSheet.create({
 
});