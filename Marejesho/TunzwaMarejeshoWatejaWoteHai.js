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

const { width, height } = Dimensions.get('screen');

const MarejeshoWatejaWoteHai = ({navigation}) => {


//const navigation = useNavigation();





  const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Poppins-Bold.ttf'),
    Medium: require('../assets/fonts/Poppins-Medium.ttf'),
    SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Thin: require('../assets/fonts/Poppins-Thin.ttf'),
    Light: require('../assets/fonts/Poppins-Light.ttf'),
  });

 const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);


const [marejesho_queryset, setmarejesho_queryset] = useState([]);
const [marejeshoisPending, setmarejeshoPending] = useState(true);

const [faini_queryset, setfaini_queryset] = useState([]);
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

  useEffect(() => {
    fetchUserData();
  }, []);

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

//console.log("USERDATA USERNAME", userData.username);



 useEffect(() => {
  const fetchDataSequentially = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);

      if (token) {
        setIsLoading(true);

        // Call getItems
        await getItems(token);

        // Call getMarejeshoYaLeo
        await getMarejeshoYaLeo(token);

        // Call getFainiZaLeo
        await getFainiZaLeo(token);
    setIsLoading(false);
        
      }
    } catch (error) {
      console.error("Hey Error fetching data:", error);
      setIsLoading(false);
    }
  };

  fetchDataSequentially();
}, []);


const [totalRejeshoLeo, setTotalRejeshoLeo] = useState(0);
const [totalFainiLeo, setTotalFainiLeo] = useState(0);

// const getItems = async (token) => {
//   if (endReached) {
//     setLoading(false);
//     setIsLoading(false);
//     setPending(false);
//     return;
//   }

//   setIsLoading(true);

//   const url = `${EndPoint}/GetMarejeshoWatejaWoteHaiView/?page=${current_page}&page_size=500`;
//   try {
//     const response = await fetch(url, {
//       method: 'GET',
//       headers: {
//         Authorization: `Token ${token}`,
//       },
//     });
//     const data = await response.json();

//     if (data.queryset.length > 0) {
//       setQueryset(data.queryset);
//       // setcurrent_page((prevPage) => prevPage + 1);
//       // setEndReached(false);

//       setIsLoading(false);
//       setLoading(false);
//       setcurrent_page(current_page + 1);
//       setPending(false);

//     } else {
//       setIsLoading(false);
//       setEndReached(true);
//       setLoading(false);
//       setPending(false);

//     }
//   } catch (error) {
//     console.error("Error in getItems:", error);
//   } finally {
//     setIsLoading(false);
//     setPending(false);
//     setLoading(false);
//     setEndReached(false);
//   }
// };


const getItems = async (token) => {
  if (endReached) {
    setLoading(false);
    setIsLoading(false);
    setPending(false);
    return;
  } else {
    setIsLoading(true);
    //console.log('USERTOKEN', userToken);
    //setPending(true);
    //const url = EndPoint + `/GetAllUniversities/?page=${current_page}&page_size=2`;
   const url = EndPoint + `/GetMarejeshoWatejaWoteHaiView/?page=${current_page}&page_size=500`
    // console.log(url);
    fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Token ${token}`, // Add the Authorization header here
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.queryset.length > 0) {
          setQueryset(data.queryset);
          setTotalRejeshoLeo(data.total_rejesho_leo); // Set the total amount

        
        
          setIsLoading(false);
          setLoading(false);
          setcurrent_page(current_page + 1);
          setPending(false);

          // console.log("NEW CRRRENT", current_page);
          console.log(queryset);

        } else {
          setIsLoading(false);
          setEndReached(true);
          setLoading(false);
          setPending(false);
          console.log("Error fetching data");;
        }
      });
  }
};



const getMarejeshoYaLeo = async (token) => {
  setmarejeshoPending(true);

  const url = `${EndPoint}/GetMarejeshoWatejaWoteHaiView2/`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();

    if (data.marejesho_queryset.length > 0) {
      setmarejesho_queryset(data.marejesho_queryset);
      setTotalRejeshoLeo(data.total_rejesho_leo); 
    }
  } catch (error) {
    console.error("Error in getMarejeshoYaLeo:", error);
  } finally {
    setmarejeshoPending(false);
  }
};




const getFainiZaLeo = async (token) => {
  setfainiPending(true);

  const url = `${EndPoint}/GetFainiWatejaWoteHaiView2/`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Token ${token}`,
      },
    });
    const data = await response.json();

    if (data.faini_queryset.length > 0) {
      setfaini_queryset(data.faini_queryset);
      setTotalFainiLeo(data.total_faini_leo); 
    }
  } catch (error) {
    console.error("Error in getFainiZaLeo:", error);
  } finally {
    setfainiPending(false);
  }
};



 //kwa ajili ya kurefresh pages
   const [refresh, setRefresh] = useState(false);

  // const pullMe =() => {
  //   setRefresh(true)

  //   setTimeout (() => {
  //     setRefresh(false)
  //   }, 10)
  // }

const handleRefresh = async () => {
  setRefresh(true);
  setEndReached(false); // Reset to allow loading more data
  setcurrent_page(1); // Reset to the first page

  try {
    const token = await AsyncStorage.getItem('userToken');
    if (token) {
      // Call getItems with the token and reset page
      const url = EndPoint + `/GetMarejeshoWatejaWoteHaiView/?page=1&page_size=500`;
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `Token ${token}`,
        },
      });
      const data = await response.json();

      if (data.queryset.length > 0) {
        setQueryset(data.queryset); // Replace with new data
        //setcurrent_page(2); // Prepare for next page

         setIsLoading(false);
          setLoading(false);
          setcurrent_page(current_page + 1);
          setPending(false);
          console.log('Page is Refreshed');

      } else {
        console.log('No new data available');
      }
    }
  } catch (error) {
    console.error('Error refreshing data:', error);
  } finally {
    setRefresh(false); // Stop the refresh animation
     setPending(false);
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
    navigation.replace('Jaza Rejesho', { ...item });




//-----------Fetch wateja wote

const [WatejaWote, setWatejaWote] = useState(0);
const [ActiveProjects, setActiveProjects] = useState(0);

// Fetch Wateja Data
useEffect(() => {
  const fetchWatejaData = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Get the token
      if (token) {
        const response = await axios.get(EndPoint + '/CountAllWatejaWoteView/', {
          headers: {
            Authorization: `Token ${token}`, // Pass the token in the header
          },
        });
        const { wateja_wote, wateja_hai } = response.data;
        setWatejaWote(wateja_wote);
        setActiveProjects(wateja_hai);
      } else {
        console.error("No user token found");
      }
    } catch (error) {
      console.error("Error fetching Wateja data:", error);
    }
  };

  fetchWatejaData();
}, []);




// New Component for Table Row
const TableRowComponent = ({ item}) => {

  //mwanzo wa search
   if (input === ""){


  return (
    <View key={item.id} style={globalStyles.row2}>
    {userData && userData.is_cashier === true && (
      <TouchableOpacity
        style={[
          globalStyles.cell,
          globalStyles.buttoncolumn,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
        onPress={() => handlePressPokeaMarejesho(item)}
      >
        <MaterialCommunityIcons
          name="gesture-tap-button"
          size={30}
          style={globalStyles.TableIconColor}
        />
      </TouchableOpacity>
      )}

      <Text style={[globalStyles.cell, globalStyles.firstNameColumn]}>{item.JinaKamiliLaMteja}</Text>
      <Text style={[globalStyles.cell, globalStyles.tarehecolumn]}>{formatDate(item.Created)}</Text>
      {item.KiasiAnachokopa > 0 ? (
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{formatToThreeDigits(item.KiasiAnachokopa)}</Text>
     ):(
     <Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
     )}


      {item.KiasiAlicholipa > 0 ? (
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{formatToThreeDigits(item.KiasiAlicholipa)}</Text>
      ):(
       <Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
      )}

      {item.JumlaYaDeni > 0 ? (
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{formatToThreeDigits(item.JumlaYaDeni)}</Text>
       ):(
       <Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
       )}



    </View>
  )

    // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if (item.JinaKamiliLaMteja.toLowerCase().includes(input.toLowerCase())) {




  return (
    <View key={item.id} style={globalStyles.row2}>
    {userData && userData.is_cashier === true && (
      <TouchableOpacity
        style={[
          globalStyles.cell,
          globalStyles.buttoncolumn,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
        onPress={() => handlePressPokeaMarejesho(item)}
      >
        <MaterialCommunityIcons
          name="gesture-tap-button"
          size={30}
          style={globalStyles.TableIconColor}
        />
      </TouchableOpacity>
      )}

      <Text style={[globalStyles.cell, globalStyles.firstNameColumn]}>{item.JinaKamiliLaMteja}</Text>
      <Text style={[globalStyles.cell, globalStyles.tarehecolumn]}>{formatDate(item.Created)}</Text>
      {item.KiasiAnachokopa > 0 ? (
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{formatToThreeDigits(item.KiasiAnachokopa)}</Text>
     ):(
     <Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
     )}


      {item.KiasiAlicholipa > 0 ? (
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{formatToThreeDigits(item.KiasiAlicholipa)}</Text>
      ):(
       <Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
      )}

      {item.JumlaYaDeni > 0 ? (
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{formatToThreeDigits(item.JumlaYaDeni)}</Text>
       ):(
       <Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
       )}



    </View>
  )



  // hili bano la chini ni la if ya pili mwisho
  }


};














// New Component for Table Row
const MarejeshoYaLeoComponent = ({ item}) => {

  return (

    <Pressable>
      

    <View 
style={[globalStyles.FullRipotiYaSikuContainer,
  {
    width:'90%',
  }]}
>

<Pressable 
style={globalStyles.FullRipotiYaSikuLeftMajorContainer}
>
  


{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >{item.JinaKamiliLaMteja}</Text>
</View>
{/*mwanzo wa Left View*/} 

{/*mwanzo wa Left View*/} 
<View 
style={[globalStyles.FullRipotiYaSikuLeftContainer,
  {
    backgroundColor:'#c07d18',
  }

  ]}
>
<Text 
style={[globalStyles.FullRipotiYaSikuLeftText,
  {
    fontFamily:'Bold',
  }

  ]}
 >Jumla</Text>
</View>
{/*mwanzo wa Left View*/} 


</Pressable>





{/*Right start here----------------------------------------------------*/}

<Pressable 
style={globalStyles.FullRipotiYaSikuRightMajorContainer}
>
 

{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.RejeshoLililoPokelewaLeo > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.RejeshoLililoPokelewaLeo)}</Text>
 ):(
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 




{/*mwanzo wa Right View*/} 
<View 
style={[globalStyles.FullRipotiYaSikuRightContainer,

   {
    backgroundColor:'#c07d18',
  }


  ]}
>
{totalRejeshoLeo > 0 ? (
<Text 
style={[globalStyles.FullRipotiYaSikuRightText,
  {
    fontFamily:'Bold',
  }

  ]}
 >{formatToThreeDigits(totalRejeshoLeo)}</Text>
 ):(
<Text 
style={[globalStyles.FullRipotiYaSikuRightText,
  {
    fontFamily:'Bold',
  }

  ]}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 


</Pressable>


</View>



    </Pressable>
   
  )
  
}








// New Component for Table Row
const FainiZaLeoComponent = ({ item}) => {

  return (

  
    <Pressable>
      

    <View 
style={[globalStyles.FullRipotiYaSikuContainer,
  {
    width:'90%',
  }]}
>

<Pressable 
style={globalStyles.FullRipotiYaSikuLeftMajorContainer}
>
  


{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >{item.JinaKamiliLaMteja}</Text>
</View>
{/*mwanzo wa Left View*/} 

{/*mwanzo wa Left View*/} 
<View 
style={[globalStyles.FullRipotiYaSikuLeftContainer,
  {
    backgroundColor:'#c07d18',
  }

  ]}
>
<Text 
style={[globalStyles.FullRipotiYaSikuLeftText,
  {
    fontFamily:'Bold',
  }

  ]}
 >Jumla</Text>
</View>
{/*mwanzo wa Left View*/} 


</Pressable>





{/*Right start here----------------------------------------------------*/}

<Pressable 
style={globalStyles.FullRipotiYaSikuRightMajorContainer}
>
 

{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.FainiKwaSiku > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.FainiKwaSiku)}</Text>
 ):(
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 




{/*mwanzo wa Right View*/} 
<View 
style={[globalStyles.FullRipotiYaSikuRightContainer,

   {
    backgroundColor:'#c07d18',
  }


  ]}
>
{totalFainiLeo > 0 ? (
<Text 
style={[globalStyles.FullRipotiYaSikuRightText,
  {
    fontFamily:'Bold',
  }

  ]}
 >{formatToThreeDigits(totalFainiLeo)}</Text>
 ):(
<Text 
style={[globalStyles.FullRipotiYaSikuRightText,
  {
    fontFamily:'Bold',
  }

  ]}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 


</Pressable>


</View>



    </Pressable>
   
  )
  
}

  return (
      <>{!fontsLoaded ? (<View/>):(

            <>


 {!isPending ? (



        <View style={globalStyles.container}>
          <MinorHeader />

          <View style={{ width: '100%', marginVertical: 0 }}>
            <Text
              style={{
                color: 'white',
                paddingVertical: 10,
                paddingHorizontal: 20,
                width: '90%',
                marginHorizontal: 10,
                borderRadius: 10,
                fontFamily: 'Medium',
              }}
            >
              Pokea rejesho la mteja
            </Text>
          </View>

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
                placeholder="Ingiza jina"
                placeholderTextColor="black"
                style={globalStyles.AppInputHomeScreenOtherPages}
              />
            </View>
          </View>

          <ScrollView 
         //   keyboardShouldPersistTaps="handled"
         //      refreshControl={
         //    <RefreshControl
         //    refreshing={refresh}
         //    onRefresh={() => pullMe()}
         //    />
         //   }
         // showsVerticalScrollIndicator={false}
       
         //  onScroll={handleScroll} scrollEventThrottle={16}
         
          horizontal
          >
            <ScrollView 

            keyboardShouldPersistTaps="handled"
              refreshControl={
            <RefreshControl
            refreshing={refresh} onRefresh={handleRefresh}
            />
           }
         showsVerticalScrollIndicator={false}
       
          onScroll={handleScroll} scrollEventThrottle={16}
            >

            {queryset && queryset.length > 0 ? (


      <>

              <View style={globalStyles.table}>
                <View style={[globalStyles.row, globalStyles.header]}>
                {userData && userData.is_cashier === true && (
                <Text style={[globalStyles.cell2, globalStyles.buttoncolumn]}>Lipa</Text>
                )}
                  <Text style={[globalStyles.cell2, globalStyles.firstNameColumn]}>Jina</Text>
                  <Text style={[globalStyles.cell2, globalStyles.tarehecolumn]}>Tarehe</Text>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>Mkopo</Text>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>Lipwa</Text>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>Deni</Text>
                  
                </View>

                {/* Render Table Rows */}
             {setLoading===true?(<ActivityIndicator/>):(

             <>

                   {queryset.map((item, index) => {
          return <TableRowComponent item={item} key={item.id || index} />;
          })}
        
          {isLoading&&(<ActivityIndicator/>)}
          </>
          )}
         
              </View>
         
        {/* mwanzo wa kudisplay marejesho ya leo na faini za leo   */}   
        <View style={{

        }}>





               <Text style={{
                color:'white',
                fontFamily:'Regular',
                marginLeft:20,
                marginTop:30,
                fontSize:18,
               }}>
                 Marejesho ya leo
               </Text>


     {marejesho_queryset && marejesho_queryset.length > 0 ? (


      <>

       {marejesho_queryset.map((item, index) => {
          return <MarejeshoYaLeoComponent item={item} key={item.id || index} />;
          })}
        
</>
):(
 
  <Text style={[globalStyles.noitemText,
    {
      textAlign:'Left',
      backgroundColor:'rgba(0,0,0,0)',
      marginLeft:0,
    }


    ]}>hukuna marejesho ya leo
  </Text>

)}





               <Text style={{
                color:'white',
                fontFamily:'Regular',
                marginLeft:20,
                marginTop:30,
                fontSize:18,
               }}>
                 Faini za leo
               </Text>


      {faini_queryset && faini_queryset.length > 0 ? (


      <>
 
           {faini_queryset.map((item, index) => {
          return <FainiZaLeoComponent item={item} key={item.id || index} />;
          })}
        
       
</>
):(
 
  <Text style={[globalStyles.noitemText,
    {
      textAlign:'Left',
      backgroundColor:'rgba(0,0,0,0)',
      marginLeft:0,
    }


    ]}>hukuna faini za leo
  </Text>

)}








         </View>
          {/* mwanzo wa kudisplay marejesho ya leo na faini za leo   */}  
               </>  

   ) :(
   <View style={[globalStyles.noitemTextContainer,{}]}>
  <Text style={globalStyles.noitemText}>hukuna Taarifa
  </Text>


</View>

  )} 


            </ScrollView>
          </ScrollView>






<View style={{
  marginBottom:100,
}}>
  {/*<Text style={{
    color:'white',
  }}>Vuta juu</Text>*/}
</View>





        <Pressable
          style={[{
            flexDirection: "row",
            alignItems: "center",
            padding: 0,
            justifyContent: "space-between",
            //backgroundColor: "white",
            position:'absolute',
            bottom:0,
            width:'100%',

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
         //onPress={() => navigation.navigate("Home Stack")}
           
            style={{
              
              padding: 10,
              width:'100%',
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
             backgroundColor: "black",
             borderColor:'white',
             borderWidth:1,
             textAlign:'center',
             borderRadius:8,
             width:'100%',
             fontFamily:'Light',
             paddingVertical:10,

           }}>
              Jumla: {ActiveProjects}
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
                    <Text style={globalStyles.alertTitle}>Gegwajo Microfinance</Text>
                    <Text style={globalStyles.alertMessage}>{alertMessage}</Text>
                  </View>
                }
              />
        </View>
  

                ):(

<LotterViewScreen />

)}

    

    </>


     )}</>
    
  );
};

export default MarejeshoWatejaWoteHai;
