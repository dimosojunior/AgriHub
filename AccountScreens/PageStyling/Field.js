import React from 'react';
import {black} from './Constants';
import {View,TextInput, Text,Dimensions, Touchable, TouchableOpacity} from 'react-native';
import {useFonts} from 'expo-font';


const Field = props => {

  let [fontsLoaded] = useFonts({
    
    'Bold': require('../../assets/fonts/Poppins-Bold.ttf'),
    'Medium': require('../../assets/fonts/Poppins-Medium.ttf'),
    'SemiBold': require('../../assets/fonts/Poppins-SemiBold.ttf'),
    'Regular': require('../../assets/fonts/Poppins-Regular.ttf'),
    'Thin': require('../../assets/fonts/Poppins-Thin.ttf'),
    'Light': require('../../assets/fonts/Poppins-Light.ttf'),
    
    
  
});


  const {width,height} = Dimensions.get('window');
  return (
    <>{!fontsLoaded ? (<View/>):(

    <TextInput
      {...props}
      style={{borderRadius: 8,
       color: 'white', 
       paddingHorizontal: 20, 
       width:width-70, 
       //backgroundColor: 'white',
        marginVertical: 10,
        paddingVertical:15,
        borderWidth:1,
        borderColor:'green',
        fontFamily:'Light',
    }}
      placeholderTextColor={black}></TextInput>

     )}</>
  );
};

export default Field;
