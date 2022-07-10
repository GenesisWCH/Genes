import { StyleSheet } from 'react-native';

const HomeScreenStyle = StyleSheet.create({
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
        backgroundColor:"white",
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
    sectionHeader: {
      paddingTop: 2,
      paddingLeft: 10,
      paddingRight: 10,
      paddingBottom: 2,
      fontSize: 14,
      fontWeight: 'bold',
      backgroundColor: 'silver',
    },
    item: {
      padding: 10,
      fontSize: 18,
      height: 100,
    },
    container: {
      flex:1,
      paddingTop:22
    },
    directionbutton: {
      backgroundColor: "orange",
      width: 100,
      paddingVertical: 8,
      marginVertical: 10,
      position: 'absolute',
      right: 5
    },
    welcomeText: {
      fontSize: 25, 
      color: 'black',
      fontWeight: 'bold',
      backgroundColor: 'white',
      paddingLeft: 5,
    },
    listButton: {
      backgroundColor: "white",
      textAlign: "center",
      width: 300,
      fontSize: 60,
      paddingTop: 20,
      paddingLeft: 10,
      height:100,
    },
    item: {
      flexDirection: 'row'
    },
    image: {
      width: 50,
      height: 50,
    },
    backButton: {
      position: 'absolute',
      bottom: 50
    }
  });

  export default HomeScreenStyle;