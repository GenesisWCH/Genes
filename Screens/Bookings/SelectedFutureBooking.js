import React, { useState } from "react";
import { Text, View } from 'react-native';
import styles from '../../css/SelectedPendingBookingStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from '../../firebase';
import { Timestamp, collection, doc, addDoc, getDoc, updateDoc } from "firebase/firestore";
import Toast from 'react-native-root-toast';
import { TextInput } from "react-native-web";


function SelectedFutureBooking({ route, navigation }) {
    const { slot } = route.params
    const { dateText } = route.params
    const [closingReason, setClosingReason] = useState("")


    const invalidBookingToast = () => {
        let toast = Toast.show('The slot you have chosen is no longer pending. It may have been handled by another admin already.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    // close booking. need to notify user if it is declined.
    const closeBooking = async () => {

    }

    const openBooking = async () => {

    }

    const cancelBooking = async () => {

    }



    const approveBooking = async () => {
        const docRef = doc(db, 'rooms', slot.parentDocID, 'bookings', slot.id)
        const docSnap = await getDoc(docRef);

        if (docSnap.get('status') != 'pending' || docSnap.get('valid') != false) {
            invalidBookingToast()
            return;
        }

        var currDate = new Date()
        var fsDate = Timestamp.fromDate(currDate)
        console.log(fsDate)

        const userBookingDocRef = doc(db, 'users', slot.useruid, 'userBookings', slot.userBookingID)
        updateDoc(userBookingDocRef, {
            admin: auth.currentUser.displayName,
            adminID: auth.currentUser.uid,
            status: 'Approved',
            adminResponseTime: fsDate
        });

        updateDoc(docRef, {
            status: 'booked',
            admin: auth.currentUser.displayName,
            adminID: auth.currentUser.uid,
            adminResponseTime: fsDate,
        });

        const notificationRef = collection(db, 'users', slot.useruid, "notifications")

        var message = 'Your booking at ' + slot.name + ' on ' + dateText + ' from ' + slot.startTime + ' to ' + slot.endTime + ' is approved!'

        addDoc(notificationRef, {
            type: 'booking',
            docID: slot.id,
            admin: auth.currentUser.displayName,
            created: fsDate,
            message: message
        });
        console.log('I pressed approve!')
        navigation.goBack()
    }

    const declineBooking = async () => {
        const docRef = doc(db, 'rooms', slot.parentDocID, 'bookings', slot.id)
        const docSnap = await getDoc(docRef);

        if (docSnap.get('status') != 'pending' || docSnap.get('valid') != false) {
            invalidBookingToast()
            return;
        }

        var currDate = new Date()
        var fsDate = Timestamp.fromDate(currDate)
        console.log(fsDate)

        const userBookingDocRef = doc(db, 'users', slot.useruid, 'userBookings', slot.userBookingID)
        updateDoc(userBookingDocRef, {
            admin: auth.currentUser.displayName,
            adminID: auth.currentUser.uid,
            status: 'Declined',
            adminResponseTime: fsDate
        });

        updateDoc(docRef, {
            status: 'available',
            admin: auth.currentUser.displayName,
            adminID: auth.currentUser.uid,
            adminResponseTime: fsDate,
        });

        const notificationRef = collection(db, 'users', slot.useruid, "notifications")

        var message = 'Your booking at ' + slot.name + ' on ' + dateText + ' from ' + slot.startTime + ' to ' + slot.endTime + ' is declined.'

        addDoc(notificationRef, {
            type: 'booking',
            docID: slot.id,
            admin: auth.currentUser.displayName,
            created: fsDate,
            message: message
        });
        console.log('I pressed decline!')
        navigation.goBack()
    }

    return (
        <SafeAreaView style={styles.container}>
            <View>
                <View style={styles.textContainer}>
                    <View style={styles.slotContainer}>
                        <Text style={styles.dateText}>{dateText}</Text>
                        <Text style={styles.dateText}>{slot.name}</Text>
                        <Text style={styles.dateText}>{slot.startTime} to {slot.endTime}</Text>
                        <Text style={styles.dateText}>{slot.id}</Text>


                    </View>
                    <View style={styles.userDetailsContainer}>
                        {slot.status == 'available'
                            ? <Text style={styles.dateText}>Status: Available</Text>
                            : slot.status == 'pending'
                                ? <Text style={styles.dateText}>Status: Pending</Text>
                                : slot.status == 'booked'
                                    ? <Text style={styles.dateText}>Status: Booked</Text>
                                    : <Text style={styles.dateText}>Status: Closed</Text>}
                        {slot.admin == true
                            ? <Text style={styles.userDetailsText}>Admin: {slot.admin}/{slot.adminID}</Text>
                            : <Text style={styles.userDetailsText}>Admin: None</Text>}
                        {slot.adminResponseTime == true
                            ? <Text style={styles.userDetailsText}>Admin Response Time: {slot.adminResponseTime}</Text>
                            : <Text style={styles.userDetailsText}>Admin Response Time: None</Text>}
                        {slot.displayName == true
                            ? <Text style={styles.userDetailsText}>
                                User: {slot.displayName}/{slot.useruid}</Text>
                            : <Text style={styles.userDetailsText}>User: None</Text>}
                        {slot.email == true
                            ? <Text style={styles.userDetailsText}>Email: {slot.email}</Text>
                            : <Text style={styles.userDetailsText}>Email: None</Text>}
                        {slot.bookingReason == true
                            ? <Text style={styles.userDetailsText}>Reason: {slot.bookingReason}</Text>
                            : <Text style={styles.userDetailsText}>Reason: None</Text>
                        }
                    </View>
                </View>
                <View style={styles.bookingContainer}>
                    <TextInput
                        onChangeText={setClosingReason}
                        value={bookingReasonForOthers}
                        placeholder='Reason for others'
                        selectionColor='#003D7C'
                        style={styles.input}
                    />
                    {slot.status == 'pending'
                        ? <View><Pressable
                            onPress={() => approveBooking()}
                            style={styles.button}>
                            <Text style={styles.buttonText}>Approve</Text>
                        </Pressable>
                            <Pressable
                                onPress={() => declineBooking()}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Decline</Text>
                            </Pressable>
                        </View>
                        : slot.status == 'closed'
                        ? <Pressable
                        onPress={() => openBooking()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Open Booking</Text>
                    </Pressable>
                    : slot.status == 'available'
                    ? <Pressable
                    onPress={() => closeBooking()}
                    style={styles.button}>
                    <Text style={styles.buttonText}>Close Booking</Text>
                </Pressable>
                : <Pressable
                onPress={() => cancelBooking()}
                style={styles.button}>
                <Text style={styles.buttonText}>Close Booking</Text>
            </Pressable>}

                </View>
            </View>
        </SafeAreaView>
    );
}



export default SelectedFutureBooking;