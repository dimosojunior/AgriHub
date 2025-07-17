import React, { useState,useCallback,useRef, useEffect } from 'react';
import  {
  View,StyleSheet,Image,
  ActivityIndicator,
  ImageBackground,
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

const MtejaDetails = ({navigation, route}) => {



   const { 
    postId,
    JinaKamiliLaMteja,
    SimuYaMteja,
    SimuYaMzaminiWa1,
    SimuYaMzaminiWa2,
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
    reg_no,
    JumlaYaFainiZote,
    Up_To
   
   } = route.params



  let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});




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





// kwaajili ya kupata taarifa za aliyelogin
const [userData, setUserData] = useState({});
  const [userToken, setUserToken] = useState('');

  const [totalRejeshoLeo, setTotalRejeshoLeo] = useState(0);

 const [queryset, setQueryset] = useState([]);
const [current_page, setcurrent_page] = useState(1);
const [isLoading, setIsLoading] = useState(false);
const [loading, setLoading] = useState(false);
const [endReached, setEndReached] = useState(false)
const [isPending, setPending] = useState(true);

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
   const url = EndPoint + `/GetMarejeshoYoteYaMtejaView/?reg_no=${reg_no}&JinaKamiliLaMteja=${JinaKamiliLaMteja}&page=${current_page}&page_size=500`
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
  if (number !== null) {
    return number.toLocaleString('en-US', {
      minimumFractionDigits: 0, // Ensure two decimal places
      maximumFractionDigits: 2, // Limit to two decimal places
      minimumIntegerDigits: 1, // Ensure at least one integer digit
    });
  }
  return null;
};






// New Component for Table Row
const TableRowComponent = ({ item}) => {

  

  return (
    <Pressable>
      

{/*mwanzo wa Full taarifa za marejesho*/}

<View 
style={[globalStyles.FullTaarifaZaMarejeshoContainer,
  {
    borderWidth:0,
    marginBottom:0,
    marginTop:0,
    marginVertical:5,
    marginHorizontal:10,
  }

  ]}
>
  

{/*mwanzo wa Left View*/} 
<View 
style={globalStyles.FullTaarifaZaMarejeshoLeftContainer}
>
<Text 
style={globalStyles.FullTaarifaZaMarejeshoLeftText}
 >{formatDate(item.Created)}</Text>
</View>
{/*mwanzo wa Left View*/} 



{/*mwanzo wa Right View*/} 
<View 
style={globalStyles.FullTaarifaZaMarejeshoRightContainer}
>
{item.RejeshoLililoPokelewaLeo > 0 ? (
<Text 
style={globalStyles.FullTaarifaZaMarejeshoRightText}
 >{formatToThreeDigits(item.RejeshoLililoPokelewaLeo)}</Text>
 ):(


 <View style={{
  flexDirection:'row',
  alignItems:'center',

 }}>

{JumlaYaFainiZote > 0 ? (


    <FontAwesome name='user-times' 
        
      size={30}
      //color="black" 
      style={[globalStyles.ItemHomeScreenLeftContainerIcon,
        {
          marginRight:10,
        }

        ]}      
       />
):(
 <FontAwesome name='check-square-o' 
        
      size={30}
      //color="black" 
      style={[globalStyles.ItemHomeScreenLeftContainerIcon,
        {
          marginRight:10,
        }

        ]}      
       />

)}

<Text 
style={[globalStyles.FullTaarifaZaMarejeshoRightText,
  {
    color:'red',
    fontFamily:'Medium',
  }

  ]}
 >{formatToThreeDigits(item.FainiKwaSiku)}</Text>
 </View>

 )}

</View>
{/*mwanzo wa Right View*/} 


</View>

{/*mwiso wa Full taarifa za marejesho*/}

    </Pressable>
  )

    
}


  return (

     <>{!fontsLoaded ? (<View/>):(

               <>


 {!isPending ? (



   

    <LinearGradient colors={['#015d68', '#000']} style={globalStyles.container}>

<MinorHeader />

<ScrollView 
keyboardShouldPersistTaps="handled"
onScroll={handleScroll} scrollEventThrottle={16}

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

  }}>Taarifa za mkataba wa  {JinaKamiliLaMteja}</Text>
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


 {/*mwanzo wa view ya taarifa za mkopo*/}
<View style={globalStyles.TaarifaBinafsimkopo}>
{SimuYaMzaminiWa1 && (
 <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMkopoText}>
     Mzn: 0{SimuYaMzaminiWa1}    
      </Text>
      )}
 

      <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaMkatoText}>
     |   
      </Text>
      
      {SimuYaMzaminiWa2 && (
       <Text style={globalStyles.TaarifaBinafsiSimuYaMtejaDeniText}>
     0{SimuYaMzaminiWa2}    
      </Text>
    )}

</View>
{/*mwisho wa view ya taarifa za mkopo*/}


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










{/*mwanzo wa marejesho yake heading*/}

<View 
style={globalStyles.TaarifaBinafsiMarejeshoYakeHeadingContainer}

>
  
  <Text 

  style={globalStyles.TaarifaBinafsiMarejeshoYakeHeadingText}

 >MAREJESHO YAKE</Text>
</View>

{/*mwisho wa marejesho yake heading*/}
     
        


         {queryset && queryset.length > 0 ? (


      <>


    {setLoading===true?(<ActivityIndicator/>):(

             <>

                   {queryset.map((item, index) => {
          return <TableRowComponent item={item} key={item.id || index} />;
          })}
        
          {isLoading&&(<ActivityIndicator/>)}
          </>
          )}

    

      </>  

   ) :(
   <View style={[globalStyles.noitemTextContainer,{}]}>
  <Text style={globalStyles.noitemText}>hukuna Taarifa
  </Text>


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
         onPress={() => navigation.navigate("Home Stack")}
           
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
            {totalRejeshoLeo > 0 ? (
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
            // width:'100%',
             fontFamily:'Light',
             paddingVertical:10,
             paddingHorizontal:20,

           }}>
              Jumla: {formatToThreeDigits(totalRejeshoLeo)}
            </Text>
            ):(
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
            // width:'100%',
             fontFamily:'Light',
             paddingVertical:10,
             paddingHorizontal:20,

           }}>
              Jumla: 0
            </Text>
            )}
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
    </LinearGradient>




                ):(

<LotterViewScreen />

)}

    

    </>



     )}</>
  );
};

export default MtejaDetails;

const styles = StyleSheet.create({
 
});