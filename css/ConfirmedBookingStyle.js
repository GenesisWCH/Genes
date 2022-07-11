import { StyleSheet } from 'react-native';

const ConfirmedBookingStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(125, 129, 247)',
        alignItems: 'center',
        // justifyContent: 'center',
    },
    dateText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
        marginTop: 8,
    },
    backToMainButton: {
        backgroundColor: "darkorange",
        paddingHorizontal: 5,
        paddingVertical: 8,
        marginVertical: 3,
        alignItems: 'center',
        alignSelf: 'center',
        borderRadius: 5,
    },
    backToMainButtonText: {
        fontSize: 18,
    },
});

export default ChosenBookingStyle;