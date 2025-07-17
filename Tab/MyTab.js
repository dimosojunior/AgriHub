
import * as React from 'react';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//import Header from '../Header/header';

import {NavigationContainer} from '@react-navigation/native';

import { StyleSheet, Text,Dimensions, View, Button,Platform } from 'react-native';


import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons, FontAwesome,AntDesign, FontAwesome5} from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';

//import MyStack from '../Stack/MyStack';
import ProfileHomeScreen from '../Profile/ProfileHomeScreen';
import Test from '../Screens/Test';
const Tab = createBottomTabNavigator();

function MyTab( {navigation}){

//   const getTabBarVisibility = route => {
//   console.log("ROUTE NAME");
//   const routeName = getFocusedRouteNameFromRoute(route) ?? 'Feed';
//   console.log(routeName);

//   if (routeName === 'Welcome Stack') {
//     return 'none';
//   }
//   return 'flex';

// };

  return (
  //kama unatumia drawer navigator na stack navigator haina haja ya kus
  //sorround hii stack.navigator na NavigationContainer ila km unatumia
  //stack navigation peke yake basi tumia NavigationContainer

// <NavigationContainer>
    <Tab.Navigator
          screenOptions={({route}) =>({
      	headerShown:false,
        tabBarShowLabel:false,
        tabBarStyle:{
          // backgroundColor:"#233329",
          backgroundColor:"green",
          paddingVertical:5,
          borderTopColor:'black',
           borderWidth:1,
          elevation: 3,

          shadowOffset: { width: 0, height: 0 },
          shadowColor: Platform.OS === "android" ? 'black' : "black",
          shadowOpacity: 1,
          shadowRadius: 2,
           //height:200,


        },
        tabBarActiveTintColor: 'blue',
        tabBarInactiveTintColor: 'red',
        // tabBarIcon:({focused, color, size}) =>{
        //   let iconName;
        //   if (route.name === 'HomeTab'){
        //     iconName = focused ? 'home' : 'home-outline'
        //   }
        //   else if (route.name === 'Qrcode') {
        //     iconName = focused ? 'qr-code' : 'qr-code-outline'

        //   }
        //   return <MaterialIcons name={iconName} size={focused? 35: size} color="white" />

        // }
        

      })}
      >
      
      <Tab.Screen
      name="Home Tab"
      component={HomeScreen}
      options={ ({route}) => ({
        

      // tabBarStyle:  {
      // display:getTabBarVisibility(route),
      // //backgroundColor:'yellow'
      //    },

        title:"Home Tab",
        tabBarIcon: ({focused}) => (
            <MaterialIcons  
            name="home"
            size={focused ? 35 :35}
            color={focused ? 'wheat' : 'white'}

            />

            ),
      })}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='Smart Invigilation App' />,
      //     })}
      />




 <Tab.Screen
      name="ProfileHomeScreen Tab"
      component={ProfileHomeScreen}
      options={ ({route}) => ({
        

      // tabBarStyle:  {
      // display:getTabBarVisibility(route),
      // //backgroundColor:'yellow'
      //    },

        title:"ProfileHomeScreen Tab",
        tabBarIcon: ({focused}) => (
            <AntDesign  
            name="user"
            size={focused ? 35 :35}
            color={focused ? 'wheat' : 'white'}

            />

            ),
      })}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='Smart Invigilation App' />,
      //     })}
      />


{/*
<Tab.Screen
      name="Test Tab"
      component={Test}
      options={ ({route}) => ({
        

      // tabBarStyle:  {
      // display:getTabBarVisibility(route),
      // //backgroundColor:'yellow'
      //    },

        title:"Test Tab",
        tabBarIcon: ({focused}) => (
            <AntDesign  
            name="book"
            size={focused ? 35 :35}
            color={focused ? 'wheat' : 'white'}

            />

            ),
      })}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='Smart Invigilation App' />,
      //     })}
      />
*/}



     



      </Tab.Navigator>
      	// </NavigationContainer>

    );
  }



  //Hii Function inatumika kutoa tab bar style in signin stack


  export default MyTab;