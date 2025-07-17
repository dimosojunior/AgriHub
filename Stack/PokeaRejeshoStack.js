
import * as React from 'react';
import {useState, useEffect, useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';


import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SigninScreen from '../AccountScreens/SigninScreen';
//import SignupScreen from '../AccountScreens/SignupScreen';
// import UpdateScreen from '../AccountScreens/UpdateScreen';
// import PreLoaderScreen from '../Screens/PreLoaderScreen';
// import AccountSelection from '../Screens/AccountSelection';

// import SendOTPScreen from '../AccountScreens/SendOTPScreen';
// import VerifyOTPScreen from '../AccountScreens/VerifyOTPScreen';



import MarejeshoWatejaWoteHai from '../Marejesho/MarejeshoWatejaWoteHai';

import JazaRejesho from '../Marejesho/JazaRejesho';
import JazaFaini from '../Marejesho/JazaFaini';

import FutaRejesho from '../Marejesho/FutaRejesho';

import FutaFaini from '../Marejesho/FutaFaini';

const Stack = createStackNavigator();

function PokeaRejeshoStack( {navigation}){

  // hii ni kwa ajili ya zile slide za mwanzo km mtu ameshaingia na akaziona
// basi akiingia kwa mara ya pili asizione tena
  const [isAppFirstLaunched, setIsAppFirstLaunched] = useState(null);
  
  useEffect(() => {
    async function check(){

     const appData = await AsyncStorage.getItem('isAppFirstLaunched');
    console.log(appData);
    if (appData == null) {
      setIsAppFirstLaunched(true);
      AsyncStorage.setItem('isAppFirstLaunched', 'false');
    }else {
      setIsAppFirstLaunched(false);
    }



    }
    check()
   
  }, []);

// mwisho hap wa hizo codes za slides za mwanzo

 


  return (

  //isAppFirstLaunched != null &&(
  //kama unatumia drawer navigator na stack navigator haina haja ya kus
  //sorround hii stack.navigator na NavigationContainer ila km unatumia
  //stack navigation peke yake basi tumia NavigationContainer

 //<NavigationContainer>
    <Stack.Navigator
    //initialRouteName="Home Stack"
      screenOptions={{
      	headerShown:false,
        headerStyle:{
          backgroundColor:"green",
           //height:100,

        },
        headerTintColor:"white",
        headerTitleStyle: {
              fontWeight: 'bold',
            },
      }}
      >





 <Stack.Screen
      name="Pokea Rejesho HomeScreen"
      component={MarejeshoWatejaWoteHai}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


  
 
           <Stack.Screen
      name="Jaza Rejesho"
      component={JazaRejesho}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


       <Stack.Screen
      name="Jaza Faini"
      component={JazaFaini}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


{/*
  <Stack.Screen
      name="Futa Rejesho"
      component={FutaRejesho}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


   <Stack.Screen
      name="Futa Faini"
      component={FutaFaini}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />*/}



      </Stack.Navigator>
      //	</NavigationContainer>

  

    );
  }
  export default PokeaRejeshoStack;