import { StyleSheet } from 'react-native';

const BookingsSearchStyle = StyleSheet.create({
    page: {
        backgroundColor: 'rgb(125, 129, 247)',
        flex: 1,
        flexDirection: 'column'
    },
    headerText: {
        fontSize: 20,
        alignSelf: 'center'
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
    searchButton: {
        backgroundColor: 'white',
        marginVertical: 23,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 5,
        alignSelf: 'center',
    },
    searchButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
});


export default BookingsSearchStyle;