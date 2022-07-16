import { StyleSheet } from 'react-native';

const SelectedPendingBookingStyle = StyleSheet.create({
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
        flex: 60,
        alignItems: 'center',
        justifyContent: 'center'
    },
    userDetailsContainer: {
        flex: 60,
        justifyContent: 'center'
    },
    bookingContainer: {
        flex: 40,
        flexDirection: 'row',
    },
    dateText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 8,
        alignSelf: 'center',
    },
    approveButton: {
        backgroundColor: "darkorange",
        paddingHorizontal: 5,
        paddingVertical: 8,
        marginVertical: 3,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
        marginHorizontal: 50,
    },
    approveButtonText: {
        fontSize: 18,
    },
    userDetailsText: {
        fontSize: 20,
        color: 'black',
        marginLeft: 10,
        fontWeight: 'bold',
        paddingTop: 5
    }
});

export default SelectedPendingBookingStyle;