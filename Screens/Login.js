// Code is a modified version of RN workshop given codes by Dominic and Marcus
import {
    Text, View, Image, Pressable, TextInput,
    Keyboard, KeyboardAvoidingView
} from "react-native";
import React, { useState } from 'react';
import { signInWithEmailAndPassword, sendPasswordResetEmail, signInAnonymously } from "firebase/auth";
import { auth } from '../firebase/index';
import Toast from 'react-native-root-toast';
import styles from '../css/LoginStyle';

const LoginPage = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const missingFieldsToast = () => {
       let toast = Toast.show('Missing fields, please try again!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 3000);
    };

    const wrongFieldsToast = () => {
        let toast = Toast.show('Incorrect email/password, please try again!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 3000);
    };

    const passwordResetToast = () => {
        let toast = Toast.show('An email has been sent to reset your password. Please check your spam.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const guestToast = () => {
        let toast = Toast.show('You signed in as a guest.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    // toast is working. email can only be sent if the domain is ready.
    const passwordResetHandler = () => {
        passwordResetToast();
        return sendPasswordResetEmail(auth, email)
            .then(() => {
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });
    }

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
                wrongFieldsToast();
                const errorCode = error.code;
                const errorMessage = error.message;
                console.error('[loginHandler]', errorCode, errorMessage);
            });
    };

    const restoreForm = () => {
        setEmail('');
        setPassword('');
        Keyboard.dismiss();
    };

    const guestHandler = () => {
        guestToast();
        return signInAnonymously(auth)
        .then(() => {
          // Signed in..
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ...
        });
    }

    return (
        <KeyboardAvoidingView style={styles.container}>
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
                    onPress={passwordResetHandler}
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
                    onPress={guestHandler}
                    style={styles.guestButton}
                    android_ripple={{ color: '#FFF' }}
                >
                    <Text style={styles.guestButton}>Continue as Guest</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
    );
};

export default LoginPage;