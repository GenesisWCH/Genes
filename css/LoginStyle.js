import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const LoginStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        marginTop: 0,
        width: width * 0.7,
        height: 240,
        alignSelf: 'center'
    },
    inputContainer: {
        alignItems: 'center'
    },
    input: {
        marginTop: 0,
        marginBottom: 10,
        width: 250,
        height: 30,
        paddingHorizontal: 8,
        backgroundColor: '#D9D9D9',
    },
    input2: {
        marginVertical: 10,
        width: 250,
        height: 30,
        paddingHorizontal: 8,
        backgroundColor: '#D9D9D9',
    },
    button: {
        backgroundColor: '#75C3FB',
        marginTop: 46,
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    forgotPWButton: {
        marginVertical: 0,
        width: 250,
        height: 30,
        paddingHorizontal: 8,
        backgroundColor: '#FFFFFF',
    },
    forgotPWButtonText: {
        marginTop: 0,
        color: 'black',
        backgroundColor: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#0B5497'
    },
    signUpLinkText: {
        marginTop: 0,
        backgroundColor: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign: 'center',
        color: '#0B5497'
    },
    signUpLinkButton: {
        marginVertical: 10,
        width: 250,
        height: 30,
        paddingHorizontal: 8,
        backgroundColor: '#FFFFFF',
    },
    guestButton: {
        marginTop: 0,
        backgroundColor: '#FFFFFF',
        fontSize: 12,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textAlign: 'center',
        color: '#0B5497'
    },
});

export default LoginStyle;