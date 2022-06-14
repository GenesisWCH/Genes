import { StyleSheet, Dimensions } from 'react-native';

const LocationsStyle = StyleSheet.create({
    page: {
        backgroundColor: 'rgb(125, 129, 247)', 
        flex: 1, 
        flexDirection: 'column' 
      },
      header: {
          flex: 7,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'darkorange'
      },
      headerText: {
          fontSize: 20,
          alignSelf: 'center'
      },
      profileIcon: {
          position: 'absolute',
          right: 5
      },
      body: {
          flex: 93,
      },
      centeredView: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: "flex-end",
      },
      modalView: {
        backgroundColor: "darkorange",
        padding: 15,
        alignItems: "center",
      },
      modalProfileIcon: {
        alignSelf: 'flex-end'
      },
      button: {
        backgroundColor: "darkorange",
        width: 100,
        marginVertical: 3
      },
      textStyle: {
        color: "black",
        fontSize: 20,
        fontWeight: "bold",
        textAlign: "center"
      },
      modalText: {
        textAlign: "center"
      },
    map: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
      marginTop: 44,
    },
    autoComplete: {
      flex: 0,
      position: "absolute",
      width: '100%',
      zIndex: 1,
      backgroundColor: 'white'
    },

    locatebutton: {

      
    }
    
  });

  export default LocationsStyle;