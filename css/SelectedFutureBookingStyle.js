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
        flexDirection: 'column',
    },
    dateText: {
        fontSize: 25,
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
        fontSize: 18,
        color: 'black',
        marginLeft: 0,
        fontWeight: 'bold',
        paddingTop: 5
    },
    input: {
        marginVertical: 20,
        borderRadius: 8,
        width: 300,
        height: 50,
        paddingHorizontal: 8,
        backgroundColor: 'white',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    }
});

export default SelectedFutureBookingStyle;