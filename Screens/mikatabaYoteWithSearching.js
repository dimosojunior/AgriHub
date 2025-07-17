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

const MikatabaYote = ({ navigation }) => {
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


  

 //kwa ajili ya kurefresh pages
  const [refresh, setRefresh] = useState(false);

  const pullMe =() => {
    setRefresh(true)

    setTimeout (() => {
      setRefresh(false)
    }, 10)
  }



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
    const fetchTokenAndData = async () => {
      const token = await AsyncStorage.getItem('userToken');
      setUserToken(token);
      if (token) {
        setIsLoading(true);
        getItems(token);
      }
    };
    fetchTokenAndData();
  }, []);



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
   const url = EndPoint + `/GetAllWatejaWoteView/?page=${current_page}&page_size=500`
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

const handlePressDetailsPage = (item) =>
    navigation.navigate('Mteja Details Page', { item });




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

      <TouchableOpacity
        style={[
          globalStyles.cell,
          globalStyles.buttoncolumn,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
        onPress={() => handlePressDetailsPage(item)}
      >
        <MaterialCommunityIcons
          name="gesture-tap-button"
          size={30}
          style={globalStyles.TableIconColor}
        />
      </TouchableOpacity>

 {userData && userData.is_admin === true && (
      <TouchableOpacity
        style={[
          globalStyles.cell,
          globalStyles.buttoncolumn,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
        onPress={() => DeletehandlePress(item)}
      >
        <FontAwesome name="pencil-square-o" size={30} style={globalStyles.TableIconColorUpdate} />
      </TouchableOpacity>
      )}

 {userData && userData.is_admin === true && (
      <TouchableOpacity
        style={[
          globalStyles.cell,
          globalStyles.buttoncolumn,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
        onPress={() => DeletehandlePress(item)}
      >
        <FontAwesome name="trash-o" size={30} style={globalStyles.TableIconColorDelete} />
      </TouchableOpacity>
      )}

    </View>
  )

    // hili bano la chini ni la if ya juu kama mtu akitype   
}

 if (item.JinaKamiliLaMteja.toLowerCase().includes(input.toLowerCase())) {




  return (
    <View key={item.id} style={globalStyles.row2}>
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

      <TouchableOpacity
        style={[
          globalStyles.cell,
          globalStyles.buttoncolumn,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
        onPress={() => handlePressDetailsPage(item)}
      >
        <MaterialCommunityIcons
          name="gesture-tap-button"
          size={30}
          style={globalStyles.TableIconColor}
        />
      </TouchableOpacity>

 {userData && userData.is_admin === true && (
      <TouchableOpacity
        style={[
          globalStyles.cell,
          globalStyles.buttoncolumn,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
        onPress={() => DeletehandlePress(item)}
      >
        <FontAwesome name="pencil-square-o" size={30} style={globalStyles.TableIconColorUpdate} />
      </TouchableOpacity>
      )}

 {userData && userData.is_admin === true && (
      <TouchableOpacity
        style={[
          globalStyles.cell,
          globalStyles.buttoncolumn,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
        onPress={() => DeletehandlePress(item)}
      >
        <FontAwesome name="trash-o" size={30} style={globalStyles.TableIconColorDelete} />
      </TouchableOpacity>
      )}

    </View>
  )




  // hili bano la chini ni la if ya pili mwisho
  }


};



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
              Taarifa za mikataba yote
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
            refreshing={refresh}
            onRefresh={() => pullMe()}
            />
           }
         showsVerticalScrollIndicator={false}
       
          onScroll={handleScroll} scrollEventThrottle={16}
            >

            {queryset && queryset.length > 0 ? (


      <>

              <View style={globalStyles.table}>
                <View style={[globalStyles.row, globalStyles.header]}>
                  <Text style={[globalStyles.cell2, globalStyles.firstNameColumn]}>Jina</Text>
                  <Text style={[globalStyles.cell2, globalStyles.tarehecolumn]}>Tarehe</Text>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>Mkopo</Text>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>Lipwa</Text>
                  <Text style={[globalStyles.cell2, globalStyles.otherColumns]}>Deni</Text>
                  <Text style={[globalStyles.cell2, globalStyles.buttoncolumn]}>Hali</Text>
                   {userData && userData.is_admin === true && (
                  <Text style={[globalStyles.cell2, globalStyles.buttoncolumn]}>Badiliisha</Text>
                  )}

                    {userData && userData.is_admin === true && (
                  <Text style={[globalStyles.cell2, globalStyles.buttoncolumn]}>Futa</Text>
                  )}
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
              Jumla: {WatejaWote}
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
                    <Text style={globalStyles.alertTitle}>Mfugaji Smart</Text>
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

export default MikatabaYote;
