import React, { useState } from "react";
import { Text, View, TextInput, KeyboardAvoidingView } from 'react-native';
import styles from '../../css/SelectedFutureBookingStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from '../../firebase';
import { Timestamp, collection, doc, addDoc, getDoc, updateDoc } from "firebase/firestore";
import Toast from 'react-native-root-toast';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

function SelectedFutureBooking({ route, navigation }) {
    const { slot } = route.params
    const { dateText } = route.params
    const [closingReason, setClosingReason] = useState("")
    const [texting, setTexting] = useState(false)


    const invalidBookingToast = () => {
        let toast = Toast.show('The slot you have chosen is no longer pending. It may have been handled by another admin already.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const alreadyClosedToast = () => {
        let toast = Toast.show('The slot you have chosen is already closed. It may have been handled by another admin already.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const alreadyOpenToast = () => {
        let toast = Toast.show('The slot you have chosen is already open. It may have been handled by another admin already.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const cannotCancelToast = () => {
        let toast = Toast.show('The slot you have chosen is no longer pending or booked. It may have been handled by another admin already.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const missingClosingReasonToast = () => {
        let toast = Toast.show('Please indicate a reason for closing the booking slot.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    // close booking. need to notify user if it is declined.
    const closeBooking = async () => {
        const docRef = doc(db, 'rooms', slot.parentDocID, 'bookings', slot.id)
        const docSnap = await getDoc(docRef);

        if (docSnap.get('status') == 'closed') {
            alreadyClosedToast()
            return;
        }

        if (closingReason == "") {
            missingClosingReasonToast()
            return;
        }

        var currDate = new Date()
        var fsDate = Timestamp.fromDate(currDate)
        console.log(fsDate)

        if (slot.userBookingID != '') {
            const userBookingDocRef = doc(db, 'users', slot.useruid, 'userBookings', slot.userBookingID)

            updateDoc(userBookingDocRef, {
                admin: auth.currentUser.displayName,
                adminID: auth.currentUser.uid,
                status: 'Declined',
                adminResponseTime: fsDate
            });

            const notificationRef = collection(db, 'users', slot.useruid, "notifications")

            var message = 'Your booking at ' + slot.name +
                ' on ' + dateText + ' from ' + slot.startTime + ' to ' + slot.endTime
                + ' closed due to the following reason: ' + closingReason

            addDoc(notificationRef, {
                type: 'booking',
                docID: slot.id,
                admin: auth.currentUser.displayName,
                created: fsDate,
                message: message
            });
        }

        updateDoc(docRef, {
            status: 'closed',
            admin: auth.currentUser.displayName,
            adminID: auth.currentUser.uid,
            adminResponseTime: fsDate,
            closingReason: closingReason,
            valid: false,
            userBookingID: '',
            userEmail: '',
            useruid: '',
            userDisplayName: '',
            recentAdminAction: 'Close Booking',
        });


        console.log('I pressed close booking!')
        navigation.goBack()
    }

    const openBooking = async () => {
        const docRef = doc(db, 'rooms', slot.parentDocID, 'bookings', slot.id)
        const docSnap = await getDoc(docRef);

        if (docSnap.get('status') == 'available') {
            alreadyOpenToast()
            return;
        }

        var currDate = new Date()
        var fsDate = Timestamp.fromDate(currDate)
        console.log(fsDate)

        updateDoc(docRef, {
            status: 'available',
            admin: auth.currentUser.displayName,
            adminID: auth.currentUser.uid,
            adminResponseTime: fsDate,
            recentAdminAction: 'Open up Booking',
            valid: true,
            closingReason: '',
        });
        console.log('I pressed open booking!')
        navigation.goBack()
    }

    const cancelBooking = async () => {
        const docRef = doc(db, 'rooms', slot.parentDocID, 'bookings', slot.id)
        const docSnap = await getDoc(docRef);

        if (docSnap.get('status') != 'pending' && docSnap.get('status') != 'booked') {
            cannotCancelToast()
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
            status: 'available',
            admin: auth.currentUser.displayName,
            adminID: auth.currentUser.uid,
            adminResponseTime: fsDate,
            closingReason: closingReason,
            valid: true,
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
            adminResponseTime: fsDate,
            valid: false,
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
            <KeyboardAwareScrollView>
                <View style={styles.textContainer}>
                    <View style={styles.slotContainer}>
                        <Text style={styles.dateText}>{dateText}</Text>
                        <Text style={styles.dateText}>{slot.name}</Text>
                        <Text style={styles.dateText}>{slot.startTime} to {slot.endTime}</Text>
                        <Text style={styles.dateText}>{slot.id}</Text>
                        {slot.status == 'available' && texting == false
                            ? <Text style={styles.dateText}>Status: Available</Text>
                            : slot.status == 'pending' && texting == false
                                ? <Text style={styles.dateText}>Status: Pending</Text>
                                : slot.status == 'booked' && texting == false
                                    ? <Text style={styles.dateText}>Status: Booked</Text>
                                    : <Text style={styles.dateText}>Status: Closed</Text>}
                    </View>
                    <View style={styles.userDetailsContainer}>
                        {slot.admin != ""
                            ? <Text style={styles.userDetailsText}>Admin: {slot.admin}/{slot.adminID}</Text>
                            : <Text style={styles.userDetailsText}>Admin: None</Text>}
                        {slot.adminResponseTime != ""
                            ? <Text style={styles.userDetailsText}>Admin Response Time: {slot.adminResponseTime}</Text>
                            : <Text style={styles.userDetailsText}>Admin Response Time: None</Text>}
                        {slot.displayName != ""
                            ? <Text style={styles.userDetailsText}>
                                User: {slot.displayName}/{slot.useruid}</Text>
                            : <Text style={styles.userDetailsText}>User: None</Text>}
                        {slot.email != ""
                            ? <Text style={styles.userDetailsText}>Email: {slot.email}</Text>
                            : <Text style={styles.userDetailsText}>Email: None</Text>}
                        {slot.bookingReason != ""
                            ? <Text style={styles.userDetailsText}>Reason: {slot.bookingReason}</Text>
                            : <Text style={styles.userDetailsText}>Reason: None</Text>
                        }
                    </View>
                </View>
                <View style={styles.bookingContainer}>
                    <TextInput
                        onChangeText={setClosingReason}
                        value={closingReason}
                        placeholder='Reason for Closing booking slot'
                        selectionColor='#003D7C'
                        style={styles.input}
                        onFocus={()=> setTexting(true)}
                    />
                    {slot.status == 'pending'
                        ? <View style={styles.buttonContainer}>
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
                        : slot.status == 'closed'
                            ? <Pressable
                                onPress={() => openBooking()}
                                style={styles.button}>
                                <Text style={styles.buttonText}>Open</Text>
                            </Pressable>
                            : slot.status == 'available'
                                ? <Pressable
                                    onPress={() => closeBooking()}
                                    style={styles.button}>
                                    <Text style={styles.buttonText}>Close</Text>
                                </Pressable>
                                : <View style={styles.buttonContainer}>
                                    <Pressable
                                        onPress={() => cancelBooking()}
                                        style={styles.button}>
                                        <Text style={styles.buttonText}>Cancel</Text>
                                    </Pressable>
                                    <Pressable
                                        onPress={() => closeBooking()}
                                        style={styles.button}>
                                        <Text style={styles.buttonText}>Close</Text>
                                    </Pressable>
                                </View>
                    }
                </View>
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
}



export default SelectedFutureBooking;