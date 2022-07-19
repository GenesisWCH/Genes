import React, { useState } from "react";
import { Text, View } from 'react-native';
import styles from '../../css/BookingsMainStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../../functions/LogOutHandler";
import { auth } from '../../firebase';

function BookingsMain({ navigation }) {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <SafeAreaView style={styles.page}>
            <Modal
                animationIn={"slideInRight"}
                animationOut={'slideOutRight'}
                isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <AntDesign style={styles.modalProfileIcon} name="user" size={28} color='black' />
                        <Pressable
                            style={styles.button}
                        //</View>onPress={}
                        >
                            <Text style={styles.textStyle}>Profile</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                        //onPress={}
                        >
                            <Text style={styles.textStyle}>Settings</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                        >
                            <Text style={styles.textStyle}>About</Text>
                        </Pressable>
                        <Pressable
                            style={styles.button}
                            onPress={LogOutHandler}
                        >
                            <Text style={styles.textStyle}>Sign Out</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <View style={styles.header}>
                <Text style={styles.headerText}>Booking</Text>
                <Pressable style={styles.profileIcon} onPress={() => setModalVisible(true)}>
                    <AntDesign name="user" size={28} color='black' />
                </Pressable>
            </View>
            <View style={styles.body}>
                {auth.currentUser.isAnonymous
                    ? <Text style={styles.guestText}>You are a guest. Bookings are only available for NUS staff and students.</Text>
                    : auth.currentUser.uid == 'PmdSTWIMA8eCv13mAC4ex7TwrHS2' || auth.currentUser.uid == 'k6TZAj2oIBMC8hvMaK73MYKdRRr2'
                        ? <View>
                            <Pressable
                                onPress={() => navigation.navigate('Search')}
                                style={styles.bodyButton}>
                                <Text style={styles.bodyButtonText}>Book a room</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('My Bookings')}
                                style={styles.bodyButton}>
                                <Text style={styles.bodyButtonText}>My bookings</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('Pending Bookings')}
                                style={styles.bodyButton}>
                                <Text style={styles.bodyButtonText}>Pending Bookings</Text>
                            </Pressable>
                        </View>
                        : <View>
                            <Pressable
                                onPress={() => navigation.navigate('Search')}
                                style={styles.bodyButton}>
                                <Text style={styles.bodyButtonText}>Book a room</Text>
                            </Pressable>
                            <Pressable
                                onPress={() => navigation.navigate('My Bookings')}
                                style={styles.bodyButton}>
                                <Text style={styles.bodyButtonText}>My bookings</Text>
                            </Pressable>
                        </View>}
            </View>
        </SafeAreaView >
    );
}


export default BookingsMain;