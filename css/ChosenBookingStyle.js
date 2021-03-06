import { StyleSheet } from 'react-native';

const ChosenBookingStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(125, 129, 247)',
    },
    textContainer: {
        flex: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    bookingContainer: {
        flex: 60,
    },
    dateText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 8,
    },
    confirmBookingButton: {
        backgroundColor: "darkorange",
        paddingHorizontal: 5,
        paddingVertical: 8,
        marginVertical: 3,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    confirmBookingButtonText: {
        fontSize: 18,
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
    input: {
        marginVertical: 20,
        borderRadius: 8,
        width: 300,
        height: 50,
        paddingHorizontal: 8,
        backgroundColor: 'white',
    },
    inputContainer: {
        alignItems: 'center'
    },
});

export default ChosenBookingStyle;