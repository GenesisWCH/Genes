import { StyleSheet } from 'react-native';

const SelectedFutureBookingStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(125, 129, 247)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textContainer: {
        flex: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    slotTextContainer: {
        flex: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userDetailsContainer: {
        flex: 50,
        justifyContent: 'center'
    },
    bookingContainer: {
        flex: 40,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    dateText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 8,
        alignSelf: 'center',
    },
    button: {
        backgroundColor: "darkorange",
        paddingHorizontal: 5,
        paddingVertical: 8,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
    },
    userDetailsText: {
        fontSize: 25,
        color: 'black',
        marginLeft: 10,
        fontWeight: 'bold',
        paddingTop: 5
    }
});

export default SelectedFutureBookingStyle;