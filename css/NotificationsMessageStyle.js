import { StyleSheet } from 'react-native';

const NotificationsMessageStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgb(125, 129, 247)',
    },
    textContainer: {
        flex: 60,
    },
    messageContainer: {
        flex: 70,
    },
    detailsContainer: {
        flex: 30,
    },
    buttonContainer: {
        flex: 40,
        justifyContent: 'center'
    },
    text: {
        fontSize: 25,
        fontWeight: 'bold',
        color: 'black',
        paddingHorizontal: 10
    },
    detailsText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
        paddingHorizontal: 10
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
});

export default NotificationsMessageStyle;