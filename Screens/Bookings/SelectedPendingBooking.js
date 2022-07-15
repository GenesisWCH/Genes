import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import styles from '../../css/SelectedPendingBookingStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../../functions/LogOutHandler";
import { auth, db } from '../../firebase';
import { collection, collectionGroup, query, where, getDocs } from "firebase/firestore";


// data = [
//   {label: 'string', value: {name: '', date: '', startTime: '', endTime: ''}}
// ]

// how to approve bookings and show it in the my bookings?
// grab the uid of the user you want to be the 'admin' and do conditonal rendering to separate what the user sees.
// i.e. anonymous user, admin user, normal user 
// create the booking and my booking page
// admin user will see 3 buttons. book, my bookings, and the pending bookings
// admin will be decided by checking user id. 
// the Firestore read write rules will be decided later.
function SelectedPendingBooking({ route, navigation }) {
    const { slot } = route.params
    const { dateText } = route.params
    const [modalVisible, setModalVisible] = useState(false);



    const approveBooking = async () => {

    }

    const declineBooking = async () => {

    }

    return (
        <SafeAreaView style={styles.page}>

            <View>

                <Pressable
                    onPress={() => search()}
                    style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Approve</Text>
                </Pressable>
                <Pressable
                    onPress={() => search()}
                    style={styles.searchButton}>
                    <Text style={styles.searchButtonText}>Decline</Text>
                </Pressable>
            </View>

        </SafeAreaView>
    );
}



export default SelectedPendingBooking;