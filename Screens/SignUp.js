
import {
    StyleSheet, Text, View, Image, Pressable, TextInput, ToastAndroid, Dimensions,
    Keyboard, KeyboardAvoidingView
} from "react-native";
import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase/index';
import Modal from "react-native-modal";
const { width } = Dimensions.get('window');
import Toast from 'react-native-root-toast';

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const signUpToast = () => {
        ToastAndroid.show(
            'Sign Up successfully completed!',
            ToastAndroid.SHORT
        );
        let toast = Toast.show('Sign Up successfully completed!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 3000);
    };

    const missingFieldsToast = () => {
        ToastAndroid.show(
            'Missing fields, please try again!',
            ToastAndroid.SHORT
        );
        let toast = Toast.show('Missing fields, please try again!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 3000);
    };

    const strongPasswordToast = () => {
        ToastAndroid.show(
            'Password is not strong enough.',
            ToastAndroid.SHORT
        );
        let toast = Toast.show('Password is not strong enough.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 3000);
    };

    const emailAlreadyInUseToast = () => {
        ToastAndroid.show(
            'This email is already in use. Please use another one.',
            ToastAndroid.SHORT
        );
        let toast = Toast.show('This email is already in use. Please use another one.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 3000);
    };

    const invalidEmailToast = () => {
        ToastAndroid.show(
            'This email is invalid. Please use an NUS email domain.',
            ToastAndroid.SHORT
        );
        let toast = Toast.show('This email is invalid. Please use an NUS email domain.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 3000);
    };


    const matchingPasswordsToast = () => {
        ToastAndroid.show(
            'The 2 passwords given do not match, please try again!',
            ToastAndroid.SHORT
        );
        let toast = Toast.show('The 2 passwords given do not match, please try again!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
          });
          setTimeout(function hideToast() {
            Toast.hide(toast);
          }, 3000);
    };

    const signUpHandler = () => {
        if (name.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            missingFieldsToast();
            return;
        }

        const containsUpper = /[A-Z]/.test(password);
        const containsLower = /[a-z]/.test(password);
        const containsNum = /\d/.test(password);
        const containsSpecial = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

        if (password.length < 6 || !containsLower || !containsUpper || !containsNum || !containsSpecial) {
            strongPasswordToast();
            return;
        }

        if (password != confirmPassword) {
            matchingPasswordsToast();
            return;
        }

        return createUserWithEmailAndPassword(auth, email, password)
            .then(userCredentials => {
                const user = userCredentials.user;

                console.log(user);

                restoreForm();
                signUpToast();
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == "auth/email-already-in-use") {
                    emailAlreadyInUseToast();
                } else if (errorCode == "auth/invalid-email") {
                    invalidEmailToast();
                }

                console.error('[signUpHandler]', errorCode, errorMessage);
            });
    };

    const restoreForm = () => {
        setEmail('');
        setPassword('');
        Keyboard.dismiss();
    };

    return (
        <KeyboardAvoidingView style={styles.container}>
            <Modal
                animationIn={"slideInUp"}
                animationOut={'slideOutUp'}
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>
                            Password Requirements:{'\n'}
                            1. Minimum 6 characters{'\n'}
                            2. Contains at least 1 uppercase and 1 lowercase letter{'\n'}
                            3. Contains at least 1 number{'\n'}
                            4. Contains at least 1 special character e.g. `!@#$%^*_+\-=\\;':"\\|,.\/?~
                        </Text>
                        <Pressable
                            style={styles.modalButton}
                            onPress={() => setModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Back</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Image
                source={
                    require('../assets/logo.png')
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
                    style={styles.passwordRequirementButton}
                    onPress={() => setModalVisible(true)}
                    >
                    <Text style={styles.passwordRequirementButtonText}>Password Requirement</Text>
                </Pressable>
                <Pressable
                    onPress={signUpHandler}
                    style={styles.button}
                    android_ripple={{ color: '#FFF' }}
                >
                    <Text style={styles.buttonText}>Sign Up</Text>
                </Pressable>
            </View>
        </KeyboardAvoidingView>
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
    }
});