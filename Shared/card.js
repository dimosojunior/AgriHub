import React from 'react';
import { StyleSheet, Text, View, Button,TouchableOpacity } from 'react-native';
import {globalStyles} from '../Styles/GlobalStyles';

import { Dimensions } from 'react-native';
export default function Card(props){

	return(

		<View style={styles.card}>

		<View style={styles.cardContent}>

		{props.children}
			

		</View>



			

		</View>


		);
}


const styles = StyleSheet.create({
  card: {
    // ila uidisplay verticaly ziweke
    //flex: 1,
    // height:100,
    borderRadius:6,
     width:Dimensions.get('window').width-5,
     //width:'100%',
    elevation:3,
    //backgroundColor:'black',
    shadowOffset:{width:1, height:1},
    shadowColor:'#333',
    shadowOpacity:1,
    shadowRadius:2,
    marginHorizontal:4,
    marginVertical:6,
    paddingHorizontal:20,
    
  },
  cardContent:{
  	marginHorizontal:1,
  	marginVertical:10,

    //width:Dimensions.get('window').width,
    //width:'80%'
  }
,
  });