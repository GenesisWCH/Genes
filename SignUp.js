// Code is a modified version of RN workshop part 1 exercise 2 solution
import {
    StyleSheet, Text, View, Image, Pressable, TextInput, ToastAndroid, Dimensions,
    Keyboard, KeyboardAvoidingView, Platform
} from "react-native";
import React, { useState } from 'react';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase/index';

const { width } = Dimensions.get('window');

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    //   const [isValidInput, setIsValidInput] = useState(false);
    //   const [response, setResponse] = useState('');

    const signUpToast = () => {
        ToastAndroid.show(
            'Sign Up successfully completed!',
            ToastAndroid.SHORT
        );
    };

    const missingFieldsToast = () => {
        ToastAndroid.show(
            'Missing fields, please try again!',
            ToastAndroid.SHORT
        );
    };

    const signUpHandler = () => {
        if (name.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0 || password != confirmPassword) {
            missingFieldsToast();
            return;
        }

        return createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;

                // To show the user object returned
                console.log(user);

                restoreForm();
                signUpToast();
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error('[signUpHandler]', errorCode, errorMessage);
            });
    };

    const restoreForm = () => {
        setEmail('');
        setPassword('');
        Keyboard.dismiss();
    };

    return (
        <View style={styles.container}>
            <Image
                source={
                    require('./assets/logo.png')
                }
                resizeMode='contain'
                style={styles.image}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    onChangeText={setName}
                    value={name}
                    placeholder='Name'
                    style={styles.input}
                    selectionColor='#003D7C'
                />
                <TextInput
                    onChangeText={setEmail}
                    value={email}
                    placeholder='Email'
                    keyboardType='email-address'
                    selectionColor='#003D7C'
                    style={styles.input2}
                />
                <TextInput
                    onChangeText={setPassword}
                    value={password}
                    placeholder='Password'
                    secureTextEntry={true}
                    selectionColor='#003D7C'
                    style={styles.input2}
                />
                <TextInput
                    onChangeText={setConfirmPassword}
                    value={confirmPassword}
                    placeholder='Confirm Password'
                    secureTextEntry={true}
                    selectionColor='#003D7C'
                    style={styles.input2}
                />
                <Pressable
                    onPress={signUpHandler}
                    style={styles.button}
                    android_ripple={{ color: '#FFF' }}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </View>

            {/* {isValidInput && (
                <Text style={styles.responseText}>{response}</Text>
            )} */}
        </View>
    );
};

export default SignUpPage;

const styles = StyleSheet.create({
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
        //borderColor: 'black',
        //borderWidth: 2,
        paddingHorizontal: 8,
        backgroundColor: '#D9D9D9',

    },
    input2: {
        marginVertical: 10,
        width: 250,
        height: 30,
        //borderColor: 'black',
        //borderWidth: 2,
        paddingHorizontal: 8,
        backgroundColor: '#D9D9D9',

    },
    button: {
        backgroundColor: '#75C3FB',
        marginTop: 46, // Deducting off from the marginBottom of input i.e. 4dp
        paddingHorizontal: 5,
        paddingVertical: 8,
        borderRadius: 5,
    },
    buttonText: {
        fontSize: 12,
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