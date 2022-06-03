// Code is a modified version of RN workshop given codes by Dominic and Marcus
import {
    StyleSheet, Text, View, Image, Pressable, TextInput, ToastAndroid, Dimensions,
    Keyboard, KeyboardAvoidingView, Platform
} from "react-native";
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/index';

const { width } = Dimensions.get('window');

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const missingFieldsToast = () => {
        ToastAndroid.show(
            'Missing fields, please try again!',
            ToastAndroid.SHORT
        );
    };

    const wrongFieldsToast = () => {
        ToastAndroid.show(
            'Incorrect email/password, please try again!',
            ToastAndroid.SHORT
        );
    };

    const loginHandler = () => {
        if (email.length === 0 || password.length === 0) {
            missingFieldsToast();
            return;
        }

        return signInWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;

                console.log(user);

                restoreForm();
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;

                console.error('[loginHandler]', errorCode, errorMessage);

                wrongFieldsToast();
                return;
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
                    require('../assets/logo.png')
                }
                resizeMode='contain'
                style={styles.image}
            />

            <View style={styles.inputContainer}>
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
                <Pressable
                    //onPress={}
                    style={styles.forgotPWButton}
                    android_ripple={{ color: '#FFF' }}
                >
                    <Text style={styles.forgotPWButtonText}>Forgot Password?</Text>
                </Pressable>
                <Pressable
                    onPress={loginHandler}
                    style={styles.button}
                    android_ripple={{ color: '#FFF' }}
                >
                    <Text style={styles.buttonText}>Login</Text>
                </Pressable>
                <Pressable
                    onPress={() => navigation.navigate('Sign Up')}
                    style={styles.signUpLinkButton}
                    android_ripple={{ color: '#FFF' }}
                >
                    <Text style={styles.signUpLinkText}>New to DestiNUS? Create account here</Text>
                </Pressable>
                <Pressable
                    //onPress={}
                    style={styles.guestButton}
                    android_ripple={{ color: '#FFF' }}
                >
                    <Text style={styles.guestButton}>Continue as Guest</Text>
                </Pressable>
            </View>
        </View>
    );
};

export default LoginPage;

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