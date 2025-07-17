import React from 'react';
import {black} from './Constants';
import {View,TextInput,StyleSheet, Text,Dimensions, Touchable, TouchableOpacity} from 'react-native';
import {useFonts} from 'expo-font';


const LoginField = props => {

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
      style={styles.textinput}
      placeholderTextColor={black}></TextInput>

   )}</>
  );
};

export default LoginField;


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    topContainer: {
        marginTop: 100,
        alignItems: 'center',
    },
    title: {
        // color: COLORS.white,
        fontWeight: 'bold',
        //fontSize: SIZES.h1 * 1.5
    },
    subtitle: {
        // color: COLORS.white,
       // fontSize: SIZES.h4,
        paddingTop: 3,
    },
    dataContainer: {
        marginTop: 50,
    },
    textinput: {
        // color: COLORS.white,
        //fontSize: SIZES.h3,
        //borderBottomColor: COLORS.lightGrey,
        borderBottomWidth: 1,
        paddingVertical: 15,
        marginHorizontal: 15,
        marginVertical: 5,
    },
    btnContainer: {
        marginTop: 50,
    },
    button1: {
        //backgroundColor: COLORS.primary,
        padding: 20,
        marginHorizontal: 30,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    btnText: {
        // color: COLORS.white,
        fontWeight: 'bold',
        //fontSize: SIZES.h4,
    },
    button2: {
        flexDirection: 'row',
        //backgroundColor: COLORS.blue,
        padding: 15,
        borderRadius: 10,
        marginHorizontal: 30,
        marginVertical: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        marginRight: 10,
    },
    text: {
        // color: COLORS.white,
        textAlign: 'center',
        marginTop: 10,
        fontWeight: '600',
        //fontSize: SIZES.h5,
    },
    bottomContainer: {
        justifyContent: 'center',
        marginTop: 50,
    }
});
