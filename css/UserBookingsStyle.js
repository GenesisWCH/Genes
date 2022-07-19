import { StyleSheet } from 'react-native';

const PendingBookingsStyle = StyleSheet.create({
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
    container: {
      flex:1,
      paddingTop:22
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
      alignItems: 'center',
      justifyContent: 'flex-start',
      flex: 7,
    },
    bottom: {
      flex: 95,
    },
  });

  export default PendingBookingsStyle;