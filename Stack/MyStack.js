
import * as React from 'react';
import {useState, useEffect, useContext} from 'react';

import {createStackNavigator} from '@react-navigation/stack';


import {NavigationContainer} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import SigninScreen from '../AccountScreens/SigninScreen';
import SignupScreen from '../AccountScreens/SignupScreen';

import OtherUserRegistration from '../AccountScreens/OtherUserRegistration';
import BuyerRegistration from '../AccountScreens/BuyerRegistration';
// import UpdateScreen from '../AccountScreens/UpdateScreen';
// import PreLoaderScreen from '../Screens/PreLoaderScreen';
// import AccountSelection from '../Screens/AccountSelection';

// import SendOTPScreen from '../AccountScreens/SendOTPScreen';
// import VerifyOTPScreen from '../AccountScreens/VerifyOTPScreen';
import ChangePasswordScreen from '../AccountScreens/ChangePasswordScreen';

import WelcomeScreen from '../Screens/WelcomeScreen';
import HomeScreen from '../Screens/HomeScreen';
import MikatabaYote from '../Screens/MikatabaYote';
import DeleteMteja from '../Screens/DeleteMteja';

import JazaRejesho from '../Marejesho/JazaRejesho';
import MikatabaHai from '../Screens/MikatabaHai';
import MtejaDetails from '../Screens/MtejaDetails';

import NjeYaMkatabaWote from '../Screens/NjeYaMkatabaWote';
import NJeYaMkatabaLeo from '../Screens/NJeYaMkatabaLeo';

import MarejeshoYaLeo from '../Marejesho/MarejeshoYaLeo';
import FainiZaLeo from '../Marejesho/FainiZaLeo';

import RipotiYaSiku from '../Screens/RipotiYaSiku';
import FutaRipoti from '../Screens/FutaRipoti';

import HawajarejeshaJana from '../Screens/HawajarejeshaJana';

import JazaFaini from '../Marejesho/JazaFaini';

import WamemalizaHawajakopaTena from '../Screens/WamemalizaHawajakopaTena';

import OngezaKituo from '../Screens/OngezaKituo';

import PreLoaderScreen from '../Screens/PreLoaderScreen';


import VituoVilivyosajiliwa from '../Screens/VituoVilivyosajiliwa';
import DeleteKituo from '../Screens/DeleteKituo';

import TaarifaZaVituo from '../Screens/TaarifaZaVituo';
import DeleteTaarifaZaKituo from '../Screens/DeleteTaarifaZaKituo';

import TumaUjumbe from '../Screens/TumaUjumbe';

import RenewMteja from '../Wateja/RenewMteja';
import AddMteja from '../Wateja/AddMteja';

import FutaRejesho from '../Marejesho/FutaRejesho';

import FutaFaini from '../Marejesho/FutaFaini';

import Empty from '../Screens/Empty';



import AllFarmers from '../Farmers/AllFarmers';
import FarmerDetail from '../Farmers/FarmerDetail';
import UpdateFarmer from '../Farmers/UpdateFarmer';

import AllBuyers from '../Buyers/AllBuyers';
import BuyerDetail from '../Buyers/BuyerDetail';
import UpdateBuyer from '../Buyers/UpdateBuyer';

import AllTransporters from '../Transporters/AllTransporters';
import TransporterDetail from '../Transporters/TransporterDetail';
import UpdateTransporter from '../Transporters/UpdateTransporter';

import AllStakeHolders from '../StakeHolders/AllStakeHolders';
import StakeHolderDetail from '../StakeHolders/StakeHolderDetail';
import UpdateStakeHolder from '../StakeHolders/UpdateStakeHolder';


import AllCollectors from '../Collectors/AllCollectors';
import CollectorDetail from '../Collectors/CollectorDetail';
import UpdateCollector from '../Collectors/UpdateCollector';


import AddTaarifaZaWakulima from '../TaarifaZaWakulima/AddTaarifaZaWakulima';
import AllTaarifaZaWakulima from '../TaarifaZaWakulima/AllTaarifaZaWakulima';
import ViewTaarifa from '../TaarifaZaWakulima/ViewTaarifa';
import AllCartItems from '../TaarifaZaWakulima/AllCartItems';
import ProductsOrders from '../TaarifaZaWakulima/ProductsOrders';
import ProductsOrdersItems from '../TaarifaZaWakulima/ProductsOrdersItems';

import DeleteTaarifaZaWakulima from '../TaarifaZaWakulima/DeleteTaarifaZaWakulima';
import UpdateTaarifaZaWakulima from '../TaarifaZaWakulima/UpdateTaarifaZaWakulima';




import AddStocksCollection from '../StocksCollection/AddStocksCollection';
import AllStocksCollection from '../StocksCollection/AllStocksCollection';
import DeleteStocksCollection from '../StocksCollection/DeleteStocksCollection';
import StocksCollectionCartItems from '../StocksCollection/StocksCollectionCartItems';
import StocksCollectionOrders from '../StocksCollection/StocksCollectionOrders';
import StocksCollectionOrdersItems from '../StocksCollection/StocksCollectionOrdersItems';
import ViewStocksCollection from '../StocksCollection/ViewStocksCollection';
import UpdateStocksCollection from '../StocksCollection/UpdateStocksCollection';

import LoadingTransporters from '../StocksCollection/LoadingTransporters';

import TransportLoadingOrders from '../StocksCollection/TransportLoadingOrders';
import TransportLoadingOrdersItems from '../StocksCollection/TransportLoadingOrdersItems';

import YourTransportLoadingData from '../StocksCollection/YourTransportLoadingData';

import MapScreen from '../StocksCollection/MapScreen';

import TransporterLocationSender from '../StocksCollection/TransporterLocationSender';
import BuyerTrackVehicleScreen from '../StocksCollection/BuyerTrackVehicleScreen';

const Stack = createStackNavigator();

function MyStack( {navigation}){

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

  isAppFirstLaunched != null &&(
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

{isAppFirstLaunched && (
<Stack.Screen
      name="Welcome Screen"
      component={WelcomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

)}

 <Stack.Screen
      name="Signin Stack"
      component={SigninScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

<Stack.Screen
      name="Other User Registration"
      component={OtherUserRegistration}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


   <Stack.Screen
      name="Buyer Registration"
      component={BuyerRegistration}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



       <Stack.Screen
      name="Home Stack"
      component={HomeScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

            <Stack.Screen
      name="Mikataba Yote"
      component={MikatabaYote}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

           <Stack.Screen
      name="Delete Mteja"
      component={DeleteMteja}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

 
   {/*        <Stack.Screen
      name="Jaza Rejesho"
      component={JazaRejesho}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
*/}


  {/*<Stack.Screen
      name="Jaza Faini"
      component={JazaFaini}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />
*/}

   <Stack.Screen
      name="Wamemaliza Hawajakopa Tena"
      component={WamemalizaHawajakopaTena}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


         <Stack.Screen
      name="Mikataba Hai"
      component={MikatabaHai}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

              <Stack.Screen
      name="Mteja Details"
      component={MtejaDetails}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

         <Stack.Screen
      name="Nje Ya Mkataba Leo"
      component={NJeYaMkatabaLeo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

               <Stack.Screen
      name="Nje Ya Mkataba Wote"
      component={NjeYaMkatabaWote}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


             <Stack.Screen
      name="Marejesho Ya Leo"
      component={MarejeshoYaLeo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


              <Stack.Screen
      name="Faini Za Leo"
      component={FainiZaLeo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


                <Stack.Screen
      name="Ripoti Ya Siku"
      component={RipotiYaSiku}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

                <Stack.Screen
      name="Futa Ripoti"
      component={FutaRipoti}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


                  <Stack.Screen
      name="Ongeza Kituo"
      component={OngezaKituo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


      


       <Stack.Screen
      name="Badili Password"
      component={ChangePasswordScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


        <Stack.Screen
      name="Hawajarejesha Jana"
      component={HawajarejeshaJana}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />




        <Stack.Screen
      name="Vituo Vilivyosajiliwa"
      component={VituoVilivyosajiliwa}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


         <Stack.Screen
      name="Delete Kituo"
      component={DeleteKituo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


            <Stack.Screen
      name="Taarifa Za Vituo"
      component={TaarifaZaVituo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



            <Stack.Screen
      name="Delete Taarifa Za Kituo"
      component={DeleteTaarifaZaKituo}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


              <Stack.Screen
      name="Tuma Ujumbe"
      component={TumaUjumbe}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


               <Stack.Screen
      name="Renew Mteja"
      component={RenewMteja}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

               <Stack.Screen
      name="Sajili Mteja"
      component={AddMteja}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />





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
      />


      <Stack.Screen
      name="Empty Screen"
      component={Empty}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />






  <Stack.Screen
      name="All Farmers"
      component={AllFarmers}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



 <Stack.Screen
      name="Farmer Detail"
      component={FarmerDetail}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


 <Stack.Screen
      name="Update Farmer"
      component={UpdateFarmer}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />






       <Stack.Screen
      name="All Buyers"
      component={AllBuyers}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



 <Stack.Screen
      name="Buyer Detail"
      component={BuyerDetail}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


 <Stack.Screen
      name="Update Buyer"
      component={UpdateBuyer}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />





   <Stack.Screen
      name="All Transporters"
      component={AllTransporters}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



 <Stack.Screen
      name="Transporter Detail"
      component={TransporterDetail}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


 <Stack.Screen
      name="Update Transporter"
      component={UpdateTransporter}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



   <Stack.Screen
      name="All StakeHolders"
      component={AllStakeHolders}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



 <Stack.Screen
      name="StakeHolder Detail"
      component={StakeHolderDetail}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


 <Stack.Screen
      name="Update StakeHolder"
      component={UpdateStakeHolder}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />





<Stack.Screen
      name="All Collectors"
      component={AllCollectors}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



 <Stack.Screen
      name="Collector Detail"
      component={CollectorDetail}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


 <Stack.Screen
      name="Update Collector"
      component={UpdateCollector}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



     <Stack.Screen
      name="Add Taarifa Za Wakulima"
      component={AddTaarifaZaWakulima}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



  <Stack.Screen
      name="All Taarifa Za Wakulima"
      component={AllTaarifaZaWakulima}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


       <Stack.Screen
      name="View Taarifa"
      component={ViewTaarifa}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


    <Stack.Screen
      name="All Cart Items"
      component={AllCartItems}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



    <Stack.Screen
      name="Products Orders"
      component={ProductsOrders}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

       <Stack.Screen
      name="Products Orders Items"
      component={ProductsOrdersItems}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



  <Stack.Screen
      name="Delete Taarifa Za Wakulima"
      component={DeleteTaarifaZaWakulima}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


  <Stack.Screen
      name="Update Taarifa Za Wakulima"
      component={UpdateTaarifaZaWakulima}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



      <Stack.Screen
      name="Add Stocks Collection"
      component={AddStocksCollection}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


       <Stack.Screen
      name="All Stocks Collection"
      component={AllStocksCollection}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


   <Stack.Screen
      name="Delete Stocks Collection"
      component={DeleteStocksCollection}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

         <Stack.Screen
      name="Update Stocks Collection"
      component={UpdateStocksCollection}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


         <Stack.Screen
      name="Stocks Collection Cart Items"
      component={StocksCollectionCartItems}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


            <Stack.Screen
      name="Stocks Collection Orders"
      component={StocksCollectionOrders}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

               <Stack.Screen
      name="Stocks Collection Orders Items"
      component={StocksCollectionOrdersItems}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

                 <Stack.Screen
      name="View Stocks Collection"
      component={ViewStocksCollection}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



             <Stack.Screen
      name="Loading Transporters"
      component={LoadingTransporters}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


         <Stack.Screen
      name="Transport Loading Orders"
      component={TransportLoadingOrders}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

               <Stack.Screen
      name="Transport Loading Orders Items"
      component={TransportLoadingOrdersItems}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />



              <Stack.Screen
      name="Your Transport Loading Data"
      component={YourTransportLoadingData}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


                <Stack.Screen
      name="View Map"
      component={MapScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

           <Stack.Screen
      name="Transporter Location Sender"
      component={TransporterLocationSender}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />


                 <Stack.Screen
      name="Buyer Track Vehicle Screen"
      component={BuyerTrackVehicleScreen}
      // options={ () => ({ 
      //       headerLeft: () => <Header  title='About Page' />,
      //     })}
      />

      

      </Stack.Navigator>
      //	</NavigationContainer>

      ) 
//bano la kufunga if is first launched



    );
  }
  export default MyStack;