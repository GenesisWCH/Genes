import { StyleSheet } from 'react-native';

const PendingBookingsStyle = StyleSheet.create({
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
    item: {
      padding: 10,
      height: 70,
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems: 'center'
    },
    container: {
      flex:1,
      paddingTop:22
    },
    leftCol: {
      flex: 30,
    },
    rightCol: {
      flex: 70,
    },
    itemText: {
        fontSize: 20,
    },
    refreshButton: {
      backgroundColor: "darkorange",
        paddingHorizontal: 5,
        paddingVertical: 8,
        marginVertical: 3,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginHorizontal: 50,
    },
    refreshButtonText: {
      fontSize: 18
    },
  });

  export default PendingBookingsStyle;