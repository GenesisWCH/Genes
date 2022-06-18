import { StyleSheet } from 'react-native';

const BookingsScreenStyle = StyleSheet.create({
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
    dropdown: {
        height: 50,
        borderColor: 'gray',
        borderWidth: 0.5,
        borderRadius: 8,
        marginHorizontal: 10,
        marginVertical: 5,
        paddingHorizontal: 8,
        backgroundColor: 'white',
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
    timeText: {
        fontSize: 20,
        marginLeft: 5
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', 
    },
    searchButton: {
        backgroundColor: 'white',
        marginTop: 46,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 5,
    },
    searchButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    }
});

export default BookingsScreenStyle;