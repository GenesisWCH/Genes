import { StyleSheet } from 'react-native';

const UserBookingsStyle = StyleSheet.create({
    page: {
      backgroundColor: 'rgb(125, 129, 247)', 
      flex: 1, 
      flexDirection: 'column' 
    },
    item: {
      padding: 10,
      height: 70,
      flexDirection: 'row',
      backgroundColor: 'white',
      alignItems: 'center'
    },
    leftCol: {
      flex: 80,
      flexDirection: 'column'
    },
    rightApprovedCol: {
        flex: 20,
        backgroundColor: 'lightgreen',
    },
    rightDeclinedCol: {
        flex: 20,
        backgroundColor: 'tomato',
    },
    rightPendingCol: {
      flex: 20,
      backgroundColor: 'gold',
  },
    itemText: {
        fontSize: 20,
    },
    refreshButton: {
      backgroundColor: "darkorange",
        paddingHorizontal: 5,
        paddingVertical: 8,
        alignSelf: 'center',
        borderRadius: 5,
    },
    refreshButtonText: {
      fontSize: 18
    },
    top: {
      justifyContent: 'flex-start',
      flex: 20,
      backgroundColor: 'red'
    },
    bottom: {
      flex: 85,
    },
    text: {
      fontSize: 15,
      marginHorizontal: 10,
    },
    textContainer: {
      flex: 50,
    },
    buttonContainer: {
      flex: 50,
    }
  });

  export default UserBookingsStyle;