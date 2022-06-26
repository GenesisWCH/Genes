import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const SignUpStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        width: width * 0.7,
        height: 240,
        alignSelf: 'center'
    },
    inputContainer: {
        alignItems: 'center'
    },
    input: {
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
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        padding: 15,
        alignItems: "center",
    },
    modalText: {
        textAlign: 'left'
    },
    modalButton: {
        backgroundColor: '#75C3FB',
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 5,
    },
    modalButtonText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'black',
    },
    passwordRequirementButton: {
        width: 250,
        height: 30,
        paddingHorizontal: 8,
        backgroundColor: '#FFFFFF',
    },
    passwordRequirementButtonText: {
        fontSize: 12,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        color: '#0B5497'
    },
});

export default SignUpStyle;