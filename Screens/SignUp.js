// Code is a modified version of RN workshop given codes by Dominic and Marcus
import {
    Text, View, Image, Pressable, TextInput,
    Keyboard, KeyboardAvoidingView
} from "react-native";
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification, updateProfile } from "firebase/auth";
import { auth, db } from '../firebase/index';
import Modal from "react-native-modal";
import Toast from 'react-native-root-toast';
import styles from '../css/SignUpStyle';
import { doc, setDoc } from "firebase/firestore";


const invalidPassword = (password) => {
    const containsUpper = /[A-Z]/.test(password);
    const containsLower = /[a-z]/.test(password);
    const containsNum = /\d/.test(password);
    const containsSpecial = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(password);

    if (password.length < 6 || !containsLower || !containsUpper || !containsNum || !containsSpecial) {
        return true;
    }
    return false
}

const invalidEmail = (email) => {
    if (/@gmail.com\s*$/.test(email) || /@u.nus.edu\s*$/.test(email)) {
        return false
    }
    return true
}

const SignUpPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const signUpToast = () => {
        let toast = Toast.show('Sign Up successfully completed!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const missingFieldsToast = () => {
        let toast = Toast.show('Missing fields, please try again!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const strongPasswordToast = () => {
        let toast = Toast.show('Password is not strong enough.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const emailAlreadyInUseToast = () => {
        let toast = Toast.show('This email is already in use. Please use another one.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const invalidEmailToast = () => {
        let toast = Toast.show('This email is invalid. Please use an NUS email or gmail domain.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const matchingPasswordsToast = () => {
        let toast = Toast.show('The 2 passwords given do not match, please try again!', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };


    const signUpHandler = async () => {

        if (name.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            missingFieldsToast();
            return;
        }


        if (invalidEmail(email)) {
            invalidEmailToast()
            console.log("it does not end in @gmail or @u.nus.edu");
            return;
        }


        if (invalidPassword(password)) {
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

                sendEmailVerification(auth.currentUser)
                    .then(() => {
                        signUpToast();
                    });
                updateProfile(auth.currentUser, {
                    displayName: name
                }).then(() => {
                }).catch((error) => {
                });

                setDoc(doc(db, "users", auth.currentUser.uid), {
                    displayName: name,
                    email: email,
                  });
                  console.log('Created user with \nid:', auth.currentUser.uid, '\nname:', name, 'and \nemail:', email)
                  
            })
            .catch(error => {
                const errorCode = error.code;
                const errorMessage = error.message;

                if (errorCode == "auth/email-already-in-use") {
                    emailAlreadyInUseToast();
                }

                if (errorCode == "auth/invalid-email") {
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

export { invalidEmail, invalidPassword };