
import  {View,StyleSheet,Image,Text,TouchableOpacity,FlatList,Dimensions} from 'react-native';

// import {WalletCoinCard} from './WalletCoinCard';
// import {CoinCard} from './CoinCard';
import { useNavigation } from '@react-navigation/native';

import {MaterialIcons,Entypo,MaterialCommunityIcons,FontAwesome5, Ionicons,Feather,AntDesign, FontAwesome} from '@expo/vector-icons';


import React, {useState, useEffect, useContext} from 'react';
import {globalStyles} from '../Styles/GlobalStyles';
import {useFonts} from 'expo-font';

export default function MinorHeader(  {title} ) {

    let [fontsLoaded] = useFonts({
    
    'Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../assets/fonts/Poppins-Light.ttf'),
    
    
  
});



const navigation = useNavigation();

   
  const goBackPage = () => {
    //navigation.navigate(screenName);
    navigation.goBack();
  }

const GoHome = () => {
    navigation.navigate('Home Stack');
  }



  const [greeting, setGreeting] = useState('');

  // Function to get the current time and set the greeting based on the time
  const setGreetingBasedOnTime = () => {
    const currentHour = new Date().getHours();

    if (currentHour >= 5 && currentHour < 12) {
      setGreeting('GOOD MORNING');
    } else if (currentHour >= 12 && currentHour <= 15) {
      setGreeting('GOOD AFTERNOON');
    } else if (currentHour > 15 && currentHour <= 18) {
      setGreeting('GOOD EVENING');
    } else {
      setGreeting('GOOD NIGHT');
    }

  };

  // Use useEffect to set the initial greeting and update it when needed
  useEffect(() => {
    setGreetingBasedOnTime();
  }, []);



  return (

     <>{!fontsLoaded ? (<View/>):(
  
 <View style={{
  backgroundColor:'#015d68',
  marginBottom: 10,
}}>          
             


      <View style={styles.headerbar}>
          <TouchableOpacity 
          onPress={goBackPage}
          >
            
        
                   <Ionicons name='arrow-back' 
      size={28} onPress={goBackPage} 
      style={globalStyles.iconHeaderFile}
      color="white"
       />

                
          </TouchableOpacity>

         <Text style={{fontSize:16,
            fontFamily:"Regular",
            color:'white'}}>{greeting}</Text>
         <TouchableOpacity 
           onPress={GoHome}
          >
          <FontAwesome name="home" size={26} color="white"/>
          </TouchableOpacity>
      </View>





              








          </View>

     )}</>
  );
}

const styles = StyleSheet.create({
      headerbar:{
        paddingTop:30,
        // paddingBottom:20,
        paddingHorizontal:20,
        flexDirection:"row",
        backgroundColor:"#015d68",
        alignItems:"center",
        justifyContent:"space-between",
        marginBottom:20
    },
    filters:
    {
        flexDirection:"row",
        marginTop:10,
        marginHorizontal:5,
        justifyContent:"space-between"
    },
    footer:{
      position:"absolute",
      left:1,
      right:1,
      bottom:0,
      backgroundColor:"#fff",
      paddingHorizontal:25,
      paddingTop:20
    }
     });

