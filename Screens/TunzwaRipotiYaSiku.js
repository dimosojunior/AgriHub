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

import MinorHeader from '../Header/MinorHeader';
import { useFocusEffect } from '@react-navigation/native';
import { getFormatedDate } from "react-native-modern-datepicker";
import DatePicker from "react-native-modern-datepicker";
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

const { width, height } = Dimensions.get('screen');

const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center;">
    <h1 style="font-size: 50px; font-family: Helvetica Neue; font-weight: normal;">
      Gegwajo Microfinance
    </h1>
    <img
      src="https://d30j33t1r58ioz.cloudfront.net/static/guides/sdk.png"
      style="width: 90vw;" />
  </body>
</html>
`;


const RipotiYaSiku = ({ navigation }) => {
  const [fontsLoaded] = useFonts({
    Bold: require('../assets/fonts/Poppins-Bold.ttf'),
    Medium: require('../assets/fonts/Poppins-Medium.ttf'),
    SemiBold: require('../assets/fonts/Poppins-SemiBold.ttf'),
    Regular: require('../assets/fonts/Poppins-Regular.ttf'),
    Thin: require('../assets/fonts/Poppins-Thin.ttf'),
    Light: require('../assets/fonts/Poppins-Light.ttf'),
  });

const [totalRejeshoLeo, setTotalRejeshoLeo] = useState(0);

 const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);

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

//   useEffect(() => {
//     fetchUserData();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const userDataJSON = await AsyncStorage.getItem('userData');
//       if (userDataJSON) {
//         const parsedUserData = JSON.parse(userDataJSON);
//         setUserData(parsedUserData);

//         //console.log(parsedUserData);
//         //console.log(userDataJSON);
//       }
//     } catch (error) {
//       // console.log(error);
//     }
//   };

// //console.log("USERDATA USERNAME", userData.username);

//  useEffect(() => {
//     const fetchTokenAndData = async () => {
//       const token = await AsyncStorage.getItem('userToken');
//       setUserToken(token);
//       if (token) {
//         setIsLoading(true);
//         getItems(token);
//       }
//     };
//     fetchTokenAndData();
//   }, []);


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
      setPending(true); // Set pending to true immediately when entering the screen
      fetchUserData();
      fetchTokenAndData();

      return () => {
        //setQueryset([]); // Reset queryset to avoid stale data
        setcurrent_page(1); // Reset pagination
        setEndReached(false); // Ensure endReached is reset for new focus
      };
    }, [])
  );



const getItems = (token) => {
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
   const url = EndPoint + `/GetRipotiSikuYaLeoView/?page=${current_page}&page_size=500`
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
      const url = EndPoint + `/GetRipotiSikuYaLeoView/?page=1&page_size=500`;
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
        setTotalRejeshoLeo(data.total_rejesho_leo); // Set the total amount

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


  const formatDate2 = (dateString) => {
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

const handlePressDetailsPage = (item) =>
    navigation.navigate('Mteja Details', { ...item });




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








//-----------filter data by date-----------------
const [startDate, setStartDate] = useState(null);
 const [modalVisible, setModalVisible] = useState(false);
 const [isRange, setisRange] = useState(false);

  //const [endDate, setEndDate] = useState(null);

  // Utility function to format the date as "YYYY-MM-DD"
  const formatDate = (dateString) => {
    if (!dateString) {
      return null;
    }
    const [year, month, day] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };

  useEffect(() => {
    if (startDate) {
      handleFilterByDate();
      //setisPending(true);
    }
  }, [startDate]);




  const handleFilterByDate = () => {
  // Convert the selected dates to the desired format (e.g., "YYYY-MM-DD")
  const formattedStartDate = formatDate(startDate);

  if (!startDate) {
    // Check if the startDate is not selected
    Alert.alert("Tafadhali chagua tarehe husika.");
    return;
  }

  setPending(true);

  axios
    .get(`${EndPoint}/FilterRipotiYaSikuByDate/?startDate=${formattedStartDate}`, {
      headers: {
        Authorization: `Token ${userToken}`, // Add the Authorization header here
      },
    })
    .then((response) => {
      const { queryset, total_rejesho_leo } = response.data;
      setQueryset(queryset);
      setTotalRejeshoLeo(total_rejesho_leo);
      setModalVisible(false);
      setPending(false);
      setisRange(true);
    })
    .catch((error) => {
      console.error("Error fetching filtered data: ", error);
      setModalVisible(false);
      setPending(false);
    });
};


// Function to format the datetime to date
  const formatToShortDate = (dateTimeString) => {
    if (!dateTimeString) {
      return "";
    }
    const date = new Date(dateTimeString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
  };









//----------------PRINTING RECEIPT-----------------

 const [selectedPrinter, setSelectedPrinter] = React.useState();
 const [order, setOrder] = useState([]);
 //const [modalVisibleReceipt, setModalVisibleReceipt] = useState(false);

const [SharedClicked, setSharedClicked] = useState(false);




  const print = async () => {
    setSharedClicked(true);
    //setModalVisible(false);
    console.log("Clicked print");
    
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    await Print.printAsync({
      html: createDynamicTable(),
      printerUrl: selectedPrinter?.url, // iOS only

    });

    setSharedClicked(false);
    //setModalVisible(false);
    console.log("Print Ends");
  }

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    const { uri } = await Print.printToFileAsync({
      html
    });
    
    await shareAsync(uri, { UTI: '.pdf', mimeType: 'application/pdf' });
  }

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  }


 const createDynamicTable = () => {
  var rows1 = '';
  var rows2 = '';
  var rows3 = '';
  var rows4 = '';

  for (let i in queryset) {
    const item = queryset[i];
    
    rows1 += `
      <tr>
        <td>${item.IdadiYaMikopoYaLeo}</td>
        <td>${item.IdadiYaMikatabaMipyaLeo}</td>
        <td>${item.IdadiYaWenyeMikatabaHai}</td>
        <td>${item.IdadiYaWaliorejeshaLeo}</td>
        <td>${item.IdadiYaFainiZilizopokelewaLeo}</td>
      </tr>
    `;
    
    rows2 += `
      <tr>
        <td>${item.JumlaMarejeshoYaLeo}</td>
        <td>${item.JumlaFainiLeo}</td>
        <td>${item.FomuNaBima}</td>
        <td>${item.BakiJana}</td>
        <td>${item.ImetokaKwaBosi}</td>
        <td>${item.ImetokaKituoJirani}</td>
        <td>${item.MapatoYaJumla}</td>
      </tr>
    `;

    rows3 += `
      <tr>
        <td>${item.Mkopo}</td>
        <td>${item.Posho}</td>
        <td>${item.ImeendaKwaBosi}</td>
        <td>${item.ImeendaKituoJirani}</td>
        <td>${item.MatumiziMengine}</td>
        <td>${item.MatumiziYaJumla}</td>
      </tr>
    `;

    rows4 += `
      <tr>
        <td>${item.Balance}</td>
      </tr>
    `;
  }

  const html = `
  <html>
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: center;
          margin: 0;
          padding: 0;
        }
        h1 {
          font-size: 24px;
          font-weight: bold;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-bottom: 20px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: center;
        }
        th {
          background-color: #f2f2f2;
          font-weight: bold;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
      </style>
    </head>
    <body>
      <h1>Gegwajo Microfinance</h1>


      <h1>Ripoti ya siku</h1>
      <!-- First Table -->
      <table>
        <tr>
          <th>MKP</th>
          <th>MKT</th>
          <th>WOTE</th>
          <th>REJ</th>
          <th>FIN</th>
        </tr>
        ${rows1}
      </table>

      <!-- Second Table -->
      <table>
        <tr>
          <th>Marejesho</th>
          <th>Faini</th>
          <th>Fomu + Bima</th>
          <th>Baki Jana</th>
          <th>Imetoka Kwa Bosi</th>
          <th>Imetoka Kwa kituo jirani</th>
          <th>Mapato Ya Jumla</th>
        </tr>
        ${rows2}
      </table>

      <!-- Third Table -->
      <table>
        <tr>
          <th>Mkopo</th>
          <th>Posho</th>
          <th>Imeenda Kwa Bosi</th>
          <th>Imeenda kituo jirani</th>
          <th>Matumizi Mengine</th>
          <th>Matumizi Ya Jumla</th>
        </tr>
        ${rows3}
      </table>

      <!-- Fourth Table -->
      <table>
        <tr>
          <th>Inakabidhiwa</th>
        </tr>
        ${rows4}
      </table>
    </body>
  </html>
  `;
  return html;
};






// New Component for Table Row
const TableRowComponent = ({ item}) => {


  return (
    <Pressable >

        <View key={item.id} style={[globalStyles.row2,
          {
            alignItems:'flex-start',
            justifyContent:'Left',
          }

          ]}>
        {item.IdadiYaMikopoYaLeo > 0 ? (
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{item.IdadiYaMikopoYaLeo}</Text>
      ):(
       <Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
      )}
     
     {item.IdadiYaMikatabaMipyaLeo > 0 ? (
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{item.IdadiYaMikatabaMipyaLeo}</Text>
      ):(
<Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
      )}
   
   {item.IdadiYaWenyeMikatabaHai > 0 ? (
      <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{item.IdadiYaWenyeMikatabaHai}</Text>
      ):(
       <Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
      )}
    
    {item.IdadiYaWaliorejeshaLeo > 0 ? (
 <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{item.IdadiYaWaliorejeshaLeo}</Text>
 ):(
 <Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
 )}

 {item.IdadiYaFainiZilizopokelewaLeo > 0 ? (
  <Text style={[globalStyles.cell, globalStyles.otherColumns]}>{item.IdadiYaFainiZilizopokelewaLeo}</Text>
  ):(
  <Text style={[globalStyles.cell, globalStyles.otherColumns]}>0</Text>
 )}

    </View>

            


{/*mwanzo wa fomu na bima*/}
      <View style={{
        flexDirection:'row',
        //justifyContent:'space-around',
        width:'90%',
        paddingVertical:15,
        alignItems:'flex-start',
        marginHorizontal:20,
      }}>
        
<Text style={{
  width:'30%',
  color:'white',

}}>Fomu na Bima</Text>

{item.FomuNaBima > 0 ? (
<Text style={{
  width:'30%',
  color:'white',
  
}}>{formatToThreeDigits(item.FomuNaBima)}</Text>
):(
<Text style={{
  width:'30%',
  color:'white',
  
}}>0</Text>
)}
      </View>

  {/*mwisho wa fomu na bima*/}

{/*mwanzo wa Full taarifa za marejesho View Ya 1*/}

<View 
style={globalStyles.FullRipotiYaSikuContainer}
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
 >Marejesho</Text>
</View>
{/*mwanzo wa Left View*/} 

{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Faini</Text>
</View>
{/*mwanzo wa Left View*/} 

{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Fomu + Bima</Text>
</View>
{/*mwanzo wa Left View*/} 


{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Baki Jana</Text>
</View>
{/*mwanzo wa Left View*/} 


{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Imetoka Kwa Bosi</Text>
</View>
{/*mwanzo wa Left View*/} 


{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Imetoka kituo jirani</Text>
</View>
{/*mwanzo wa Left View*/} 


{/*mwanzo wa Left View*/} 
{item.KituoIlichotokaHela && (
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Kituo zilipotoka</Text>
</View>
)}
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
 >Mapato ya jumla</Text>
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
{item.JumlaMarejeshoYaLeo > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.JumlaMarejeshoYaLeo)}</Text>
 ):(
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 


{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.JumlaFainiLeo > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.JumlaFainiLeo)}</Text>
 ):(
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 


{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.FomuNaBima > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.FomuNaBima)}</Text>
 ):(
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 


{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.BakiJana > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.BakiJana)}</Text>
 ):(
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 


{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.ImetokaKwaBosi > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.ImetokaKwaBosi)}</Text>
 ):(
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 


{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.KituoIlichotokaHela && item.ImetokaKituoJirani > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.ImetokaKituoJirani)}</Text>
 ):(
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 


{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.KituoIlichotokaHela && (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{item.KituoIlichotokaHela}</Text>

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
{item.MapatoYaJumla > 0 ? (
<Text 
style={[globalStyles.FullRipotiYaSikuRightText,
  {
    fontFamily:'Bold',
  }

  ]}
 >{formatToThreeDigits(item.MapatoYaJumla)}</Text>
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

{/*mwiso wa Full taarifa za marejesho View Ya 1*/}

      










{/*mwanzo wa Full taarifa za marejesho View Ya 2*/}

<View 
style={globalStyles.FullRipotiYaSikuContainer}
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
 >Mkopo</Text>
</View>
{/*mwanzo wa Left View*/} 

{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Posho</Text>
</View>
{/*mwanzo wa Left View*/} 

{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Imeenda kwa Bosi</Text>
</View>
{/*mwanzo wa Left View*/} 


{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>


<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Imeenda kituo jirani </Text>
 
</View>
{/*mwanzo wa Left View*/}


{/*mwanzo wa Left View*/} 
{item.KituoIlichoendaHela && (
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>


<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Kituo zilipokwenda </Text>
 
</View>
)}
{/*mwanzo wa Left View*/} 



{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullRipotiYaSikuLeftContainer}
>
<Text 
style={globalStyles.FullRipotiYaSikuLeftText}
 >Matumizi</Text>
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
 >Matumizi ya jumla</Text>
</View>
{/*mwanzo wa Left View*/} 




{/*mwanzo wa Left View*/} 
<View 
style={[globalStyles.FullRipotiYaSikuLeftContainer,
  {
    backgroundColor:'#012827',
    marginTop:40,
  }

  ]}
>
<Text 
style={[globalStyles.FullRipotiYaSikuLeftText,
  {
    fontFamily:'Bold',
  }

  ]}
 >Inakabidhiwa</Text>
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
{item.Mkopo > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.Mkopo)}</Text>
 ):(
 <Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 


{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.Posho > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.Posho)}</Text>
 ):(
 <Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 

{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.ImeendaKwaBosi > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.ImeendaKwaBosi)}</Text>
 ):(
 <Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 

{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.ImeendaKituoJirani > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.ImeendaKituoJirani)}</Text>
 ):(
 <Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >0</Text>
 )}
</View>
{/*mwanzo wa Right View*/} 



{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.KituoIlichoendaHela && (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{item.KituoIlichoendaHela}</Text>
 
 )}
</View>
{/*mwanzo wa Right View*/} 


{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullRipotiYaSikuRightContainer}
>
{item.MatumiziMengine > 0 ? (
<Text 
style={globalStyles.FullRipotiYaSikuRightText}
 >{formatToThreeDigits(item.MatumiziMengine)}</Text>
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
{item.MatumiziYaJumla > 0 ? (
<Text 
style={[globalStyles.FullRipotiYaSikuRightText,
  {
    fontFamily:'Bold',
  }

  ]}
 >{formatToThreeDigits(item.MatumiziYaJumla)}</Text>
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




{/*mwanzo wa Right View*/} 
<View 
style={[globalStyles.FullRipotiYaSikuRightContainer,

   {
    backgroundColor:'#012827',
    marginTop:40,
  }


  ]}
>
{item.Balance > 0 ? (
<Text 
style={[globalStyles.FullRipotiYaSikuRightText,
  {
    fontFamily:'Bold',
  }

  ]}
 >{formatToThreeDigits(item.Balance)}</Text>
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

{/*mwiso wa Full taarifa za marejesho View Ya 2*/}


<TouchableOpacity 
onPress={() => navigation.replace('Futa Ripoti', { ...item, postId: item.id })}
style={{
  width:'50%',
}}
>

{item.JumlaMarejeshoYaLeo > 0 && (
<Text style={{
  color: "white" ,
  // padding:13,
   backgroundColor: "brown",
   borderColor:'white',
   borderWidth:1,
   textAlign:'center',
   borderRadius:8,
   width:'100%',
   fontFamily:'Light',
   paddingVertical:10,
   marginLeft:20,
   marginVertical:20,
  
}}>Futa Ripoti</Text>

)}
</TouchableOpacity>


    </Pressable>
  )





};



  return (
      <>{!fontsLoaded ? (<View/>):(

            <>


 {!isPending ? (



        <View style={globalStyles.container}>
          <MinorHeader />

          <View style={{ width: '100%', marginVertical: 0 }}>
           {!isRange ? (
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
              Ripoti Ya Leo
            </Text>
            ):(
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
              Ripoti ya tarehe  {formatDate(startDate)}
            </Text>
            )}

           
  




          </View>

     
          <ScrollView 
      
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
                <View style={[globalStyles.row, globalStyles.header, 

                   {
                    alignItems:'flex-start',
                    justifyContent:'Left',
                  }

                  ]}>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>MKP</Text>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>MKT</Text>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>WOTE</Text>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>REJ</Text>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>FIN</Text>
             
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


               </>  

   ) :(
   <View style={[globalStyles.noitemTextContainer,{
    width:'80%',
   }]}>
   {!isRange ? (
  <Text style={globalStyles.noitemText}>Ripoti ya leo bado haijathibitishwa
  </Text>
  ):(
 <Text style={globalStyles.noitemText}>Ripoti ya tarehe {formatDate(startDate)} haikuthibitishwa
  </Text>
  )}


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

        <TouchableOpacity
onPress={() => setModalVisible(true)}
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
    <Text 
    style={{
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
    }}

   >Tarehe ?</Text>

</TouchableOpacity>


       
{!SharedClicked ? (

        <TouchableOpacity
//onPress={() => setModalVisible(true)}
onPress={print}

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
    <Text 
    style={{
      color: "black" ,
      // padding:13,
       backgroundColor: "wheat",
       borderColor:'white',
       borderWidth:1,
       textAlign:'center',
       borderRadius:8,
       width:'100%',
       fontFamily:'Light',
       paddingVertical:10,
    }}

   >Share</Text>

</TouchableOpacity>

):(

        <TouchableOpacity
//onPress={() => setModalVisible(true)}
//onPress={print}

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
  <ActivityIndicator size="large" color="red" /> 

</TouchableOpacity>

)}

        </Pressable>
   




      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
      <ScrollView>
        <View style={globalStyles.FilterModalmodalContainer}>
          <View style={globalStyles.FilterModalmodalContent}>
         {/* <TouchableOpacity 
          onPress ={move}>
            <Text style={globalstyles.modalTitle}>ALL</Text>
            </TouchableOpacity>*/}
            <DatePicker
              mode="calendar"
              selected={startDate}
              onDateChange={(date) => setStartDate(date)}
              format="YYYY-MM-DD" // Set the date format to "YYYY-MM-DD"
               options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "red",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "red",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: 'red',
                    borderRadius:10,
                  }}
            />

        
            <View style={[{
                      justifyContent:'space-between',
                      alignItems:'center',
                      flexDirection:'row',
                      marginVertical:15,
                      margin:6,
                    },globalStyles.ButtonConatinere]}>
                    
                    <Pressable style={[globalStyles.ButtonAdd,{
                        width:'45%',
                        backgroundColor:'red'
                    }]}  onPress={() => setModalVisible(false)} >
                        <Text style={{
                            color:'white'
                        }}>Ondoa</Text>
                    </Pressable>


                     <TouchableOpacity
              onPress={handleFilterByDate}
               
              style={[globalStyles.ButtonAdd, {
                width:'45%'
              }]}
            >
              <Text style={{  color: "white" }}>Tafuta</Text>
            </TouchableOpacity>
            </View>




          </View>
        </View>
        </ScrollView>
      </Modal>

    



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

export default RipotiYaSiku;
