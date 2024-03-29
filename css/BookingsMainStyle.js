import { StyleSheet } from 'react-native';

const BookingsMainStyle = StyleSheet.create({
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
        alignItems: 'center',
        justifyContent: 'center',
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
        marginVertical: 3,
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
    bodyButton: {
        backgroundColor: 'white',
        marginVertical: 23,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 5,
        alignSelf: 'center',
    },
    bodyButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    guestText: {
        fontSize: 20,
        marginHorizontal: 10,
    },
});

export default BookingsMainStyle;