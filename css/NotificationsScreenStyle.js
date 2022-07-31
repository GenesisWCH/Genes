import { StyleSheet, Dimensions } from 'react-native';

const NotificationsStyle = StyleSheet.create({
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
iconView: {
  flexDirection: 'row',
  justifyContent: 'space-evenly',
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
  leftCol: {
    flex: 70,
  },
  rightCol: {
    flex: 30,
  },
  typeText: {
    fontSize: 20,
  },
  refreshButton: {
    backgroundColor: "darkorange",
    paddingHorizontal: 5,
    paddingVertical: 8,
    borderRadius: 5,
    marginVertical: 10,
  },
  refreshButtonText: {
    fontSize: 18
  },
  top: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 10,
  },
  bottom: {
    flex: 90,
  },
});

export default NotificationsStyle;