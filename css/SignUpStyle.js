import { StyleSheet } from 'react-native';

const SignUpStyle = StyleSheet.create({
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
    responseText: {
        color: 'black',
        fontSize: 20,
        fontWeight: 'bold',
        marginTop: 40,
        backgroundColor: '#D9D9D9'
    }
});

export default SignUpStyle;