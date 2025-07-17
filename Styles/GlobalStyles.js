import React from 'react';
import { StyleSheet, Text,Dimensions, View, Button,Platform } from 'react-native';



const {height, width} = Dimensions.get('window');

const marginBottomItem = 10;
const paddingItem = 10;
const imgHeight = 100;
const sizeOfItem = imgHeight + paddingItem * 2 + marginBottomItem;
import COLORS  from '../Constant/colors';

 
const GlobalStyles =() => {



  return(

    <View>
      <Text>Gloal Styles</Text>
    </View>
    );


}
export default GlobalStyles;


export const globalStyles = StyleSheet.create({

//    ---------------------- ALL HOMESCREEN STYLES------------------------------------------
    
container: {
    flex:1,
    backgroundColor:'#015d68',
    width:'100%'
  },




//------------LOADING INDICATOR-------------

  loaderOverlay: {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.4)', // semi-transparent
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
},

loaderContent: {
  backgroundColor: '#015d68',
  padding: 20,
  borderRadius: 10,
  alignItems: 'center',
},

loaderText: {
  color: '#fff',
  fontSize: 18,
  fontFamily: 'Bold',
  marginTop: 10,
},

loaderCounter: {
  color: '#fff',
  fontSize: 14,
  marginTop: 5,
},



loaderCounter2: {
  color: 'wheat',
  fontSize: 14,
  marginTop: 5,
},





SignupImageJuu:{

  width:'100%',
  height:height/2 - 50,
  borderRadius:8,
  opacity:1,

},
UmriInitialImage:{

  width:'100%',
  height:height/2,
  borderRadius:8,
  opacity:1,

},

tuambieSiku:{
  fontFamily:'Medium',
  marginLeft:20,
  width:'90%',
  marginTop:15,
  marginBottom:15,
  color:'white',

},

ImagePosterColor:{
  backgroundColor: '#233329',

},

SenderProfileImage:{
  width:'50%',
  height:height/14,
  borderRadius:40,

},

//-----------------AWERESOME  ALERT----------------------

alertContainer:{
  backgroundColor:'#233329',
  borderWidth:1,
  borderColor:'white',
  alignItems:'center',
  justifyContent:'center',

},
alertContent:{
  alignItems:'center',
  justifyContent:'center',

},

alertImage:{
  width:60,
  height:60,
  borderRadius:30,
  marginTop:0,

},
alertTitle:{
  //fontSize:25,
  fontFamily:'Medium',
  color:'green',

},
alertMessage:{
  //fontSize:16,
  fontFamily:'Light',
  color:'white',
  fontFamily:'Medium',

},
alertButton:{
  width:width/4,
  textAlign:'center',
  alignItems:'center',
  justifyContent:'center',
  height:50,
  //fontSize:18,
  backgroundColor:'#1f1f1f',
  borderWidth:1,
  borderColor:'white',
  marginBottom:15,
  fontFamily:'Light',


},


 bottomview2:{
    //flex:2,
    backgroundColor:COLORS.white,
    // borderTopLeftRadius:50,
    // borderTopRightRadius:50,

    borderWidth:.2,
    borderColor:COLORS.green,
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.green : COLORS.green,
    shadowOpacity: 1,
    shadowRadius: 2,
    padding:10,
  },
  



  //---------------------MODAL STYLE-----------------

  ModalView: {
    padding: 2,
    paddingHorizontal:20,
    // width: 340,
    width:'90%',
    backgroundColor: "white",
    borderRadius: 20,
    elevation: 3,
    shadowColor: Platform.OS === "android" ? 'white' : "Lightgrey",
    shadowOpacity: 1,
    paddingBottom:30,
    marginTop:10,

  },
  ButtonClose: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "red",
    borderRadius: 5,

  },
  TaxTypeAddNewProject:{
    color:'white',
    fontFamily:"Medium",

  },


ProjectBodyinput:{
  //width: Dimensions.get('window').width,
  //flexDirection: "row",
    width: '90%',
    height: 200,
    borderColor: "white",
    borderWidth: 1,
    //alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    //justifyContent:'flex-start',
    marginHorizontal:20,



},

ProjectBodyInputIcon:{
  marginLeft: 10,

    color: 'white',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 80,
    //backgroundColor: 'red',
    //height:180,
    //paddingVertical:20,
    //justifyContent:'center',
    //alignItems:'center',
    
    borderRadius: 10,
    // justifyContent:'flex-start',


},


TableIconColorUpdate:{
  color:'wheat',
  fontFamily:'Bold',

},


  ButtonAdd: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "green",
    borderRadius: 5,


  },
  ButtonScan: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 5,

  },
  ButtonBarcode: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    //  backgroundColor:"green",
    borderRadius: 5,
    borderWidth: 1,

  }, ButtonConatiner: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: "space-between"
  },
  input: {
    flexDirection: "row",
    width: 300,
    height: 50,
    borderColor: "black",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },
  inputTax: {
    flexDirection: "row",
    width: '90%',
    height: 50,
    marginHorizontal:20,
    backgroundColor: 'green',
    // borderColor:"black",
    // borderWidth:1,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  picker: {
    width: "60%",
    height: 48,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  pickerInput: {
   // top: -7
  },

  textInput: {
    // fontSize: 20
     
    marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 100,
    backgroundColor: 'white',
    
    borderRadius: 10,
  },
  form: {
   // marginTop: 10,
    alignItems: 'center'
  },
  Inputicon: {
    fontSize: 29,
    marginRight: 10

  },
  TaxType: {
     fontFamily:'Light',
    color: "white",
    fontWeight: '400'
  },
  open: {
    width: 200,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,

  },


  ButtonAddText: {
    color: 'white',
     fontFamily:'Light',
  },



noitemTextContainer:{
  justifyContent:'center',
  alignItems:'center',
  marginTop:50,
  flex:1,
width:'100%',

},

noitemText:{
  textAlign:'center',
  color:'red',
  fontFamily:'Medium',
  //fontSize:16,
  backgroundColor:'#015d68',
  paddingHorizontal: 30,
  paddingVertical:10,
  borderRadius:10,
  marginHorizontal:30,


},


ErrorImageContainer:{
  justifyContent:'center',
  alignItems:'center',
  width:'90%',
  marginTop:20,

},
ErrorImage:{
  width:'60%',
  height:height/2,
  borderRadius:10,

},

ErrorImageContainerHomePage:{
  justifyContent:'center',
  alignItems:'center',
  width:'90%',
  marginTop:10,

},
ErrorImageHomePage:{
  width:'100%',
  height:height/2,
  borderRadius:30,

},




//-------------SEARCH FOR OTHER PAGES----------
 searchbarOtherPages:{
    flexDirection:"row",
    backgroundColor:COLORS.white,
    alignItems:"center",
    width:"90%",
    height:40,
    borderRadius:10,
    marginBottom:10,
    borderColor:COLORS.black,
    borderWidth:1,
    //paddingHorizontal:20,
    //flex:1,
    marginLeft:15,
  },
searchbarIconContainerOtherPages:{
  width:'10%',

},
searchbarInputContainerOtherPages:{
  width:'70%',

},


AppIConHomeScreenOtherPages:{
  width:'100%',
  transform: [{rotateY: '180deg'}]
},
AppInputHomeScreenOtherPages:{
  color:COLORS.black,
  marginLeft:15,
  opacity:1,
  //fontSize:16,
  fontFamily:'Light',
  width:'100%',
  //backgroundColor:'red',
  //flex:1,

},






  
//----------------------HOMESCREEN STYLES--------------------------------

ItemHomeScreenPressableContainer:{
  marginBottom:20,

},
ItemHomeScreenContainer:{
   flexDirection:"row",
    alignItems:"center",
    justifyContent:'space-between',
    backgroundColor:"#243137",
    borderRadius:15,
    paddingHorizontal:10,
    paddingVertical:10,
    width:'90%',

    //borderWidth:.2,
    borderColor:COLORS.white,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.white : COLORS.white,
    shadowOpacity: 1,
    shadowRadius: 2,
    marginHorizontal:18,
    borderTopRightRadius:0,

},
ItemHomeScreenFirstLeftContainer:{
  width:'15%',
},
ItemHomeScreenMiddleContainer:{
  flexDirection:"column",
  width:'60%',
  //backgroundColor:'green',
  justifyContent:'center',
},
ItemHomeScreenMiddleContainerText1:{
  color:'white',
  fontFamily:'Medium',
},
ItemHomeScreenMiddleContainerText2:{
  color:'white',
  fontFamily:'Medium',
  marginLeft:20,
},

ItemHomeScreenRightContainer:{
  flexDirection:"column",
   width:'15%',
},
ItemHomeScreenRightContainerIcon:{
  color:'#c07d18',
},

ItemHomeScreenLeftContainerIcon:{
  color:'#c07d18',
},

TableIconColor:{
  color:'green',
},

TableIconColorDelete:{
  color:'red',

},











//-----------------------MIKATABA YOTE STYLES-------------

 // Tablecontainer: {
 //    //flex: 1,
 //    padding: 10,
 //  },
  table: {
    // borderWidth: 1,
    // borderColor: "white",
  },
  header: {
    backgroundColor: "#015d68",
    //padding:10,
    //marginHorizontal:20,
    // borderWidth: 1,
    // borderColor: "white",
     justifyContent:'center',
    alignItems:'center',
  },
  row: {
    flexDirection: "row",
    // justifyContent:'center',
    // alignItems:'center',
  },

    row2: {
    flexDirection: "row",
    justifyContent:'center',
    alignItems:'center',
  },

  cell: {
    padding: 10,
    //textAlign: "center",

    color: "white",
    // borderWidth: 1,
    // borderColor: "white",
      //borderColor:COLORS.white,
    elevation: 3,
    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.white : COLORS.white,
    shadowOpacity: 1,
    shadowRadius: 2,
    //marginHorizontal:18,
    borderTopRightRadius:0,

    marginBottom:30,
  },

 cell2: {
    //padding: 10,
    textAlign: "center",
  // borderWidth: 1,
  //   borderColor: "white",
    color: "white",
    fontFamily:'Bold',
    //textAlign:'left',
  

  },

  idColumn: {
    width: 50,
    alignItems:'flex-start',
  },
  firstNameColumn: {
    width: 250,
    paddingVertical:15,
    // alignItems:'flex-start',
    // justifyContent:'flex-start',
  },
  tarehecolumn:{
    width: 200,
    paddingVertical:15,
    // justifyContent: "center",
    // alignItems: "center",
  },
  buttoncolumn:{
      width: 100,
    // justifyContent: "center",
    // alignItems: "center",
  },
  otherColumns: {
    width: 100,
    paddingVertical:15,
    // justifyContent: "center",
    // alignItems: "center",
  },
  buttonCell: {
    backgroundColor: "#4CAF50",
    // justifyContent: "center",
    // alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },










//------------------Taarifa Binafsi za mteja------------
TaarifaBinafsiMainContainer:{
  width:'90%',
  alignItems:'center',
  marginHorizontal:20,

},

TaarifaBinafsiMtejaImage:{
  width:100,
  height:100,
  borderRadius:50,
},
TaarifaBinafsiJinaLaMteja:{
  marginTop:10,
  color:'white',
  fontFamily:'Medium',
  fontSize:20,
},
TaarifaBinafsiJinaLaKituo:{
  marginTop:10,
  color:'white',
  fontFamily:'Regular',
  fontSize:18,

},
TaarifaBinafsiSimuYaMteja:{
  marginTop:20,
  color:'white',
  borderColor:'white',
  borderWidth:1,
  paddingHorizontal:40,
  paddingVertical:12,
  borderRadius:8,
  width:'100%',
},
TaarifaBinafsimkopo:{
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center',
  width:'90%',
  marginHorizontal:20,
  marginTop:25,
},
TaarifaBinafsiSimuYaMtejaMkopoText:{
  color:'green',
  fontFamily:'Medium',
  width:'40%',
},

TaarifaBinafsiSimuYaMtejaMkatoText:{
  color:'white',
  fontFamily:'Bold',
  width:'10%',

},

TaarifaBinafsiSimuYaMtejaDeniText:{
  color:'white',
  fontFamily:'Medium',
  width:'40%',
},


TaarifaBinafsiTareheZamkopo:{
  flexDirection:'row',
  justifyContent:'space-around',
  alignItems:'center',
  width:'90%',
  marginHorizontal:20,
  marginTop:25,

},
TaarifaBinafsiSimuYaMtejaTareheYakukopaText:{
  color:'green',
  fontFamily:'Medium',
  width:'40%',

},

TaarifaBinafsiSimuYaMtejaIconTareheYakukopaText:{
  color:'white',
  fontFamily:'Bold',
  width:'10%',

},

TaarifaBinafsiSimuYaMtejaMwishoTareheYakukopaText:{
  color:'white',
  fontFamily:'Medium',
  width:'40%',

},

TaarifaBinafsiMarejeshoYakeHeadingContainer:{
  width:'100%',
  marginVertical:0,
  marginTop:30,
},

TaarifaBinafsiMarejeshoYakeHeadingText:{
   color:'black',
  backgroundColor:'wheat',
  paddingVertical:10,
paddingHorizontal:20,
width:'90%',
marginHorizontal:10,
borderRadius:10,
fontFamily:'Medium',
},



FullTaarifaZaMarejeshoContainer:{
  width:'90%',
  alignItems:'center',
  marginHorizontal:20,
  marginTop:30,
  justifyContent:'space-between',
  flexDirection:'row',

  borderWidth:.2,
    borderColor:COLORS.white,
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.white : COLORS.white,
    shadowOpacity: 1,
    shadowRadius: 2,

    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:10,
    borderTopRightRadius:0,
    marginBottom:10

},


FullTaarifaZaMarejeshoLeftContainer:{
  width:'45%',
  alignItems:'flex-start',
  // borderColor:'white',
  // borderWidth:1,
},
FullTaarifaZaMarejeshoRightContainer:{
  width:'45%',
  alignItems:'flex-end',
  // borderColor:'white',
  // borderWidth:1,
},
FullTaarifaZaMarejeshoLeftText:{
  color:'white',
  fontFamily:'Light',

},

FullTaarifaZaMarejeshoRightText:{
  color:'white',
  fontFamily:'Light',
},







//------------PEOPLE WORKS MODAL STYLE----------------

KeyboardAvoidingViewModalViewProduct:{
  flex: 1,
  backgroundColor:'#015d68',
  justifyContent:'center',
  alignItems:'center',
  width:'100%',




},
ModalTitleViewProduct:{
  textAlign:'center',
  fontFamily:'SemiBold',
  textAlign:'center',
  color:'white',
},
ConfirmCancelButtonTextViewProduct:{
  color:'white',
  fontFamily:'Light',
  margin:10,
},

EnterQuntityTextViewProduct:{
  color:'white',
   fontFamily:'Light',
},
 inputViewProduct: {
    flexDirection: "row",
    width: 300,
    
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10
  },


  
  ModalViewViewProduct: {
    padding: 2,
    paddingHorizontal:20,
    // width: 340,
    //width:'100%',
    backgroundColor: "#063164",
    borderRadius: 20,
    elevation: 3,
    shadowColor: Platform.OS === "android" ? 'black' : "black",
    shadowOpacity: 1,
    paddingBottom:30,
    marginTop:10,
    borderWidth:1,
    borderColor:'black',


  },

  inputViewProduct: {
    flexDirection: "row",
    //width: 300,
    height: 50,
    borderColor: "white",
    borderWidth: 1,
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    width: '100%',
    marginBottom:20,
  },
   textInputViewProduct: {
    // fontSize: 20
     
    marginLeft: 10,

    color: 'black',
    fontFamily:'Light',
    width: 250,
    //backgroundColor: 'white',
    
    borderRadius: 10,
    // borderColor: "black",
    // borderWidth: 1,
    //padding:12,
    height: 50,
  },


  ButtonCloseViewProduct: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "red",
    borderRadius: 5,
    marginRight:10,

  },
  ButtonAddViewProduct: {

    alignItems: 'center',
    justifyContent: "center",
    //width: 140,
    //height: 50,
    paddingHorizontal:15,
    backgroundColor: "#015d68",
    borderRadius: 5,


  },
  ButtonScanViewProduct: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    backgroundColor: "gray",
    borderRadius: 5,

  },
  ButtonBarcodeViewProduct: {

    alignItems: 'center',
    justifyContent: "center",
    width: 140,
    height: 50,
    //  backgroundColor:"green",
    borderRadius: 5,
    borderWidth: 1,

  }, 
  ButtonConatinerViewProduct: {
    flexDirection: 'row',
    marginTop: 10,
    alignItems:'space-around',
    flex:1,
    //justifyContent: "space-between"
  },

  inputTaxViewProduct: {
    flexDirection: "row",
    width: 300,
    height: 50,
    backgroundColor: 'green',
    // borderColor:"black",
    // borderWidth:1,
    alignItems: "center",
    padding: 10,
    borderRadius: 6,
    marginTop: 10,
    justifyContent: 'space-between'
  },
  pickerViewProduct: {
    width: 170,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  pickerInputViewProduct: {
    top: -7
  },

 
  formViewProduct: {
    marginTop: 10,
    alignItems: 'center',
    flexDirection:'row',
    alignItems:'space-around',
    width:width,
    
  },
  



  InputiconViewProduct: {
    fontSize: 29,
    marginRight: 10,
    color:'white',

  },
  TaxTypeViewProduct: {
     fontFamily:'Light',
    color: "white",
    fontWeight: '400'
  },
  openViewProduct: {
    width: 200,
    height: 50,
    backgroundColor: 'yellow',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,

  },


  ButtonAddTextViewProduct: {
    color: 'white',
     fontFamily:'Light',
  },





  //---------------REPORT FILTER MODAL------------------

  FilterModalcontainer: {
    flex: 1,
    padding: 16,
  },
  FilterModalfilterButton: {
    padding: 16,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
  },
  FilterModalfilterButtonText: {
    color: "white",
    // fontWeight: "bold",
    fontFamily:'Light',
  },
  FilterModalmodalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  FilterModalmodalContent: {
    backgroundColor: "black",
    padding: 10,
    borderRadius: 8,
    width: "90%",
  },
  FilterModalmodalTitle: {
     fontFamily:'Light',
    // fontWeight: "bold",
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 6,
    color: 'white',
  },
  FilterModalapplyButton: {
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  FilterModalapplyButtonText: {
    color: "white",
    // fontWeight: "bold",
  },
  FilterModaltotalAmountText: {
     fontFamily:'Light',
    // fontWeight: "bold",
    marginTop: 20,
  },
  FilterModalorderContainer: {
    //backgroundColor: "#F8F8F8",
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
    elevation: 10,
    shadowColor: 'green',
    shadowOpacity: 1,
    flex: 1,
    flexDirection: 'row',



    //alignSelf: "center",
    borderRadius: 10,
    // shadowOpacity: 0.5,
    // shadowColor: "#000",
    shadowOffset: {
      height: 5,
      width: 5
    },
    backgroundColor: "white",
    marginVertical: 10
  },


  ReportRangeText: {
    color: 'red',
     fontFamily:'Light',
 fontFamily:'Light'

  },


  ProcessOrderReportScreenFilterReportContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 6,

  },
  ProcessOrderReportScreenFilterReportContainerText: {
    color: 'black'

  },














//---------------------RIPOTI YA SIKU-----------------------


FullRipotiYaSikuContainer:{
  //width:'90%',
  alignItems:'center',
  justifyContent:'space-between',

  marginHorizontal:0,
  marginTop:0,
  //justifyContent:'space-around',
  flexDirection:'row',

  // borderWidth:.2,
  //   borderColor:COLORS.white,
  //   elevation: 3,

  //   shadowOffset: { width: 1, height: 1 },
  //   shadowColor: Platform.OS === "android" ? COLORS.white : COLORS.white,
  //   shadowOpacity: 1,
  //   shadowRadius: 2,

    paddingHorizontal:10,
    paddingVertical:10,
    borderRadius:10,
    borderTopRightRadius:0,
    marginBottom:10,
    //width:'90%',
    width:width,
    //backgroundColor:'yellow',


},

FullRipotiYaSikuLeftMajorContainer:{
  width:'70%',
 // backgroundColor:'green',

},

FullRipotiYaSikuRightMajorContainer:{
  width:'30%',
  //backgroundColor:'red',

},



FullRipotiYaSikuLeftContainer:{
  //width:'45%',
  //alignItems:'flex-start',
  // borderColor:'white',
  // borderWidth:1,
   borderWidth:.2,
    borderColor:COLORS.white,
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.white : COLORS.white,
    shadowOpacity: 1,
    shadowRadius: 2,

    paddingHorizontal:10,
    paddingVertical:10,
    // alignItems:'center',
    // justifyContent:'center',
},
FullRipotiYaSikuRightContainer:{
  // alignItems:'center',
  // justifyContent:'center',
  //width:'45%',
  //alignItems:'flex-end',
  // borderColor:'white',
  // borderWidth:1,
   borderWidth:.2,
    borderColor:COLORS.white,
    elevation: 3,

    shadowOffset: { width: 1, height: 1 },
    shadowColor: Platform.OS === "android" ? COLORS.white : COLORS.white,
    shadowOpacity: 1,
    shadowRadius: 2,

    paddingHorizontal:10,
    paddingVertical:10,
},
FullRipotiYaSikuLeftText:{
  color:'white',
  fontFamily:'Light',

},

FullRipotiYaSikuRightText:{
  color:'white',
  fontFamily:'Light',
},



TableIconColorTumaujumbe:{
  color:'wheat',

},



ProjectBodyinput:{
  //width: Dimensions.get('window').width,
  //flexDirection: "row",
    width: '90%',
    height: 200,
    borderColor: "white",
    borderWidth: 1,
    //alignItems: "center",
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
    //justifyContent:'flex-start',
    marginHorizontal:20,



},

ProjectBodyInputIcon:{
  marginLeft: 0,
  borderWidth:1,
  borderColor:'black',
  //paddingVertical:100,
  height:100,
  paddingHorizontal:10,

    color: 'black',
    fontFamily:'Light',
    width: Dimensions.get('window').width - 80,
    //backgroundColor: 'red',
    //height:180,
    //paddingVertical:20,
    //justifyContent:'center',
    //alignItems:'center',
    
    borderRadius: 10,
    // justifyContent:'flex-start',


},

















//----------------TWINS MICROFINANCE

    TwinsMicrofinancecontainer: {
        flex: 1,
        //paddingTop: 100,
        //height:height,
    },
    TwinsMicrofinanceheader: {
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent:'space-between',
        padding: 10,
        backgroundColor: '#07595f', // Chagua rangi inayofaa
       // borderBottomWidth: 1,
       // borderBottomColor: '#ddd',
        width:"97",
        marginHorizontal:5,

        borderColor:COLORS.white,
      elevation: 3,

      shadowOffset: { width: 1, height: 1 },
      shadowColor: Platform.OS === "android" ? COLORS.white : COLORS.white,
      shadowOpacity: 1,
      shadowRadius: 2,

      marginBottom:20,
    },

    TwinsMicrofinanceImageAndText:{
      width:"40%",

    },
    TwinsMicrofinanceTextDescAndTarehe:{
      width:"50%",

    },
    TwinsMicrofinanceTarehe:{
      fontSize: 14,
      color: 'white',
      fontFamily:"Light",

    },


    TwinsMicrofinancelogo: {
        width: 50, // Rekebisha kulingana na mahitaji
        height: 50,
        marginRight: 10, // Kusogeza maandishi mbali na icon
        borderRadius:50,
    },
    TwinsMicrofinancetextContainer: {
        flex: 1, // Kufanya maandishi yajaze nafasi iliyobaki
    },
    TwinsMicrofinanceappTitle: {
        //fontSize: 18,
        //fontWeight: 'bold',
        color: 'white',
        fontFamily:"Bold",
    },
    TwinsMicrofinanceappDesc: {
        fontSize: 12,
        color: 'wheat',
        fontFamily:"Medium",
    },


    TwinsMicrofinancesection: {
        paddingHorizontal: 20,
        marginBottom: 20,
    },
    TwinsMicrofinancesectionTitle: {
       // fontSize: 18,
        //fontWeight: 'bold',
        color: 'white',
        fontFamily:"Bold",
    },
    TwinsMicrofinancesectionDesc: {
        fontSize: 12,
        color: 'wheat',
        marginBottom: 10,
        fontFamily:"Medium",
    },
    TwinsMicrofinancecard: {
        width: width * 0.4,
        // backgroundColor: 'rgba(255,255,255,0.2)',
        backgroundColor: "#015d68",
        borderRadius: 10,
        paddingBottom: 10,
        paddingTop:10,
        alignItems: 'center',
        marginHorizontal: 5,
    },

     TwinsMicrofinancecard2: {
        width: width * 0.4,
        backgroundColor: 'rgba(255,255,255,0.2)',
       // backgroundColor: "#063164",
        borderRadius: 10,
        paddingBottom: 10,
        paddingTop:10,
        alignItems: 'center',
        marginHorizontal: 5,
    },

    TwinsMicrofinancecardImage: {
        width: width * 0.4 - 10,
        height: 120,
        resizeMode: 'cover',
        borderRadius:10,
    },
    TwinsMicrofinancecardTitle: {
        //fontSize: 14,
        color: 'white',
        marginTop: 5,
        marginBottom: 5,
        fontFamily:"Light",
    },

    TwinsMicrofinancecardIcon:{

    },















VyakulaCartItemsContainerHistoria:{
     margin: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 4,
    borderColor:'white',
    borderWidth:.2,
     elevation: 2,
     paddingHorizontal:10,
     paddingVertical:10,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'white' : "white",
  shadowOpacity: 0,
  shadowRadius: 0,
  width:width - 19,
  flex:1,
  marginLeft:10,

},




//-----------------------VYAKULA VYOTE-------------------

VyakulaCartItemsContainerKubwa:{
     margin: 0,
   // flexDirection: "row",
    //justifyContent: "space-around",
    marginVertical: 4,
    borderColor:'white',
    borderWidth:.2,
     elevation: 2,
     paddingHorizontal:10,
     paddingVertical:10,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'white' : "white",
  shadowOpacity: 0,
  shadowRadius: 0,
  width:width - 19,
  flex:1,
  marginLeft:10,

},

 VyakulaCartItemsContainer:{
      margin: 0,
    flexDirection: "row",
    justifyContent: "space-around",
  //   marginVertical: 4,
  //   borderColor:'black',
  //   borderWidth:.2,
  //    elevation: 2,
  //    paddingHorizontal:10,
  //    paddingVertical:10,
  

  // shadowOffset: { width: 1, height: 1 },
  // shadowColor: Platform.OS === "android" ? 'black' : "black",
  // shadowOpacity: 0,
  // shadowRadius: 0,
  // width:width - 19,
  // flex:1,
  // marginLeft:10,


  },

VyakulaLeftCartItemsContainer:{
  width:'50%',
},
VyakulaItemNameCartItemsText:{
   fontSize: 18,
 //fontWeight: "600", 
 //width: 220 ,
 fontFamily:'Medium',
 color:'wheat',
},
VyakulaPriceCartItemsText:{
  marginTop: 4, 
 //fontSize: 15, 
 fontFamily:'Light',
 color:'white',
},
VyakulaIconCartItemsText:{
  marginTop: 5,
  borderRadius: 4,
  color:'white',
},
VyakulaIcon1CartItems:{
  paddingHorizontal: 3,
},

VyakulaDescriptionCartItems:{
 // width: 200, 
 marginTop: 8, 
 color: "white", 
 fontFamily:'Light',
 //fontSize: 16 
},

VyakulaAddButtonContainerCartItems:{
     // position: "absolute",
    // top: 95,
    // left: 20,
    // borderColor: "white",
    // borderWidth: 1,
    flexDirection: "row",
    // paddingHorizontal: 25,
    // paddingVertical: 5,
    alignItems: "center",
    //backgroundColor: "#1f1f1f",
    // borderRadius: 5,
    width:'90%',
    //justifyContent:'center',
    marginTop:15,
  },

  VyakulaAddButtonTextCartItems:{
    //fontSize: 18,
    //fontWeight: "600", 
    color: "white",
    padding:6 ,
    fontFamily:'Medium',
    backgroundColor: "green",
    paddingHorizontal: 25,
    paddingVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "white",
  },

  VyakulaImageContainerCartItems:{
    marginRight: 10,
   width:'30%'
 },

 VyakulaImageCartItems:{
  width: '100%', 
    height: 50, 
    borderRadius: 8 
  },

  VyakulaCreateOrderContainerCartItems:{
    position: "absolute",
    bottom:10,
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    
    borderRadius: 5,
    width:'100%',
    justifyContent:'center',
    marginTop:15,
  },
VyakulaCreateOrderTextCartItems:{
  //  fontSize: 18,
  // fontWeight: "600", 
  color: "white",
  padding:12 ,
  backgroundColor: "green",
  width:'100%',
  textAlign:'center',
  borderRadius:8,
  borderColor: "white",
borderWidth: 1,
fontFamily:'Light',
},


AppChaguaHudumaTextHomeScreen:{
   marginHorizontal:26,
  marginVertical:10,
  fontFamily:'Bold',
  color:'white',
  //fontWeight:"bold",
  //fontSize:18
},


FarmerImage:{
  width:70,
  height:70,
  borderRadius:8,
  marginTop:15,

},









//-----------------PEOPLES CATEGORY-----------------------

OverdoseProductsContainer:{
  width: '49%',
   backgroundColor: '#015d68',

  marginVertical: 4,
  marginRight: 4,
  borderRadius: 20,
  padding: 12,

  elevation: 3,

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'white' : "white",
  shadowOpacity: 1,
  shadowRadius: 2,

},
 

OverdoseMinorProductsContainer:{
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',


},

OverdoseDiscountProductsContainer:{
  backgroundColor: '#015d68',
  borderRadius: 40,
  alignItems: 'center',
  padding: 8,

},
OverdoseDiscountProductsText:{
  fontSize: 12,
  fontFamily:'Light',
  color: 'white',

},

OverdoseDiscountProductsImage:{
  // width: width * 0.33,
  width: '100%',
  height: height / 4.2,
  alignSelf: 'center',
  marginVertical: 8,
  borderRadius: 20,
  resizeMode: 'cover',
  },
ProductPageOverdoseDiscountProductsText:{
  color:'white',

},
OverdoseDiscountProductsNameContainer:{
  backgroundColor: '#015d68',
  padding: 8,
  borderBottomEndRadius: 20,
  borderBottomLeftRadius: 20,

  elevation: 3,

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'white' : "white",
  shadowOpacity: 1,
  shadowRadius: 2,

},
OverdoseDiscountProductsNameText:{
  //fontSize: 16,
  fontFamily:'Light',
  color: 'white',

},
OverdoseDiscountProductsPriceText:{
  //fontSize: 16,
  fontFamily:'Light',
  color: 'white',

},




//-------------OVERDOSE CART ITEMS ---------------------

 OverdoseCartItemsContainer:{
      margin: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 4,
    borderColor:'black',
    borderWidth:.2,
     elevation: 2,
     paddingHorizontal:10,
     paddingVertical:10,
  

  shadowOffset: { width: 1, height: 1 },
  shadowColor: Platform.OS === "android" ? 'white' : "white",
  shadowOpacity: 0,
  shadowRadius: 0,
  width:'100%',
  borderRadius:6,


  },

OverdoseLeftCartItemsContainer:{
  width:'70%',
},
OverdoseItemNameCartItemsText:{
   //fontSize: 18,
 //fontWeight: "600", 
 width: 220 ,
 fontFamily:'Medium',
 color:'white',
},
OverdosePriceCartItemsText:{
  marginTop: 4, 
 //fontSize: 15, 
 fontFamily:'Light',
 color:'white',
},
OverdoseIconCartItemsText:{
  marginTop: 5,
  borderRadius: 4,
  color:'white',
},
OverdoseIcon1CartItems:{
  paddingHorizontal: 3,
  color:'white',
},

OverdoseDescriptionCartItems:{
  width: 200, 
 marginTop: 8, 
 color: "wheat", 
 fontFamily:'Light',
 //fontSize: 16 
},

OverdoseAddButtonContainerCartItems:{
     // position: "absolute",
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    backgroundColor: "#1f1f1f",
    borderRadius: 5,
    width:'50%',
    justifyContent:'center',
    marginTop:15,
  },

  OverdoseAddButtonTextCartItems:{
    //fontSize: 18,
    //fontWeight: "600", 
    color: "white",
    padding:6 ,
    fontFamily:'Medium',
  },

  OverdoseImageContainerCartItems:{
    marginRight: 10,
   width:'30%'
 },

 OverdoseImageCartItems:{
  width: '100%', 
    height: 120, 
    borderRadius: 8 
  },

  OverdoseCreateOrderContainerCartItems:{
    position: "absolute",
    bottom:10,
    // top: 95,
    // left: 20,
    borderColor: "white",
    borderWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 25,
    paddingVertical: 5,
    alignItems: "center",
    
    borderRadius: 5,
    width:'100%',
    justifyContent:'center',
    marginTop:15,
  },
OverdoseCreateOrderTextCartItems:{
  //  fontSize: 18,
  // fontWeight: "600", 
  color: "white",
  padding:12 ,
  backgroundColor: "green",
  width:'100%',
  textAlign:'center',
  borderRadius:8,
  borderColor: "white",
borderWidth: 1,
fontFamily:'Light',
},







  });

















