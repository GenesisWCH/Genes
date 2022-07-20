import React from "react";
import { Text, View } from 'react-native';
import styles from '../../css/SelectedPendingBookingStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from '../../firebase';
import { Timestamp, collection, doc, addDoc, getDoc, updateDoc } from "firebase/firestore";
import Toast from 'react-native-root-toast';


function SelectedPendingBooking({ route, navigation }) {
    const { slot } = route.params
    const { dateText } = route.params


    const invalidBookingToast = () => {
        let toast = Toast.show('The slot you have chosen is no longer pending. It may have been handled by another admin already.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };


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
            valid: false,
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
            valid: true,
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

    const cancelBooking = async () => {
        const docRef = doc(db, 'rooms', slot.parentDocID, 'bookings', slot.id)
        const docSnap = await getDoc(docRef);

        if (docSnap.get('status') != 'pending') {
            notPendingToast()
            return;
        }

        if (closingReason == "") {
            missingClosingReasonToast()
            return;
        }

        var currDate = new Date()
        var fsDate = Timestamp.fromDate(currDate)
        console.log(fsDate)

        const userBookingDocRef = doc(db, 'users', slot.useruid, 'userBookings', slot.userBookingID)
        // const userBookingDocSnap = await getDoc(userBookingDocRef)

        updateDoc(userBookingDocRef, {
            admin: auth.currentUser.displayName,
            adminID: auth.currentUser.uid,
            status: 'Declined',
            adminResponseTime: fsDate
        });

        updateDoc(docRef, {
            status: 'closed',
            admin: auth.currentUser.displayName,
            adminID: auth.currentUser.uid,
            adminResponseTime: fsDate,
            closingReason: closingReason
        });

        const notificationRef = collection(db, 'users', slot.useruid, "notifications")

        var message = 'Your booking at ' + slot.name +
            ' on ' + dateText + ' from ' + slot.startTime + ' to ' + slot.endTime
            + ' is cancelled as requested.'

        addDoc(notificationRef, {
            type: 'booking',
            docID: slot.id,
            admin: auth.currentUser.displayName,
            created: fsDate,
            message: message,
        });
        console.log('I pressed cancel booking!')
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
                        <Text style={styles.userDetailsText}>User: {slot.displayName}/{slot.useruid}</Text>
                        <Text style={styles.userDetailsText}>Email: {slot.email}</Text>
                        <Text style={styles.userDetailsText}>Reason: {slot.bookingReason}</Text>
                    </View>
                </View>
                <View style={styles.bookingContainer}>
                    <Pressable
                        onPress={() => approveBooking()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Approve</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => declineBooking()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Decline</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => cancelBooking()}
                        style={styles.button}>
                        <Text style={styles.buttonText}>Cancel</Text>
                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
}



export default SelectedPendingBooking;