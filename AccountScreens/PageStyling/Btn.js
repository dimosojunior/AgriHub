
import React from 'react';
import {View,TextInput, Text,Dimensions, Touchable, TouchableOpacity} from 'react-native';
import {useFonts} from 'expo-font';

export default function Btn({bgColor, btnLabel, textColor, Press}) {

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

    <View
    // onPress={Press}
      style={{
        backgroundColor: "green",
        borderRadius: 10,
        alignItems: 'center',
        width: width-200,
        paddingVertical: 10,
        marginTop: 20,
        marginBottom:20,
      }}>
      <Text style={{color: "white", fontFamily:'Light'}}>
        {btnLabel}
      </Text>
    </View>
     )}</>
  );
}
