import { StyleSheet } from 'react-native';

const BookingsListStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(125, 129, 247)',
        alignItems: 'center',
    },
    dateText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 8,
    },
    selectBookingButton: {
        backgroundColor: "darkorange",
        paddingHorizontal: 5,
        paddingVertical: 8,
        marginVertical: 3,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    selectBookingButtonText: {
        fontSize: 18,
    },
    refreshButton: {
        backgroundColor: "darkorange",
        paddingHorizontal: 5,
        paddingVertical: 8,
        marginVertical: 10,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginHorizontal: 30,
    },
    refreshButtonText: {
        fontSize: 18
    },
    top: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default BookingsListStyle;