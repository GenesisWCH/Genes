import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import styles from '../../css/SelectedPendingBookingStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../../functions/LogOutHandler";
import { auth, db } from '../../firebase';
import { Timestamp, collection, collectionGroup, query, where, doc, addDoc, getDocs, updateDoc } from "firebase/firestore";


function SelectedPendingBooking({ route, navigation }) {
    const { slot } = route.params
    const { dateText } = route.params

    useEffect(() => {
        console.log(slot)
        console.log(dateText)
    }, []);


    // what if this action is invalid? like status is no longer pending. throw a toast instead.
    const approveBooking = async () => {
        const docRef = doc(db, 'rooms', slot.parentDocID, 'bookings', slot.id)
        updateDoc(docRef, {
            status: 'booked',
        });

        var currDate = new Date()
        var fsDate = Timestamp.fromDate(currDate)

        const userDoc = doc(db, 'users', slot.useruid)
        const colRef = collection(userDoc, "userBookings")
        addDoc(colRef, {
            bookingID: slot.id,
            admin: auth.currentUser.displayName,
            date: dateText,
            venue: slot.name,
            startTime: slot.startTime,
            endTime: slot.endTime,
            status: 'Approved',
            created: fsDate
        });

        const notificationRef = collection(userDoc, "notifications")

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


        updateDoc(docRef, {
            status: 'available',
            valid: true,
        });

        var currDate = new Date()
        var fsDate = Timestamp.fromDate(currDate)

        const userDoc = doc(db, 'users', slot.useruid)
        const colRef = collection(userDoc, "userBookings")
        addDoc(colRef, {
            bookingID: slot.id,
            admin: auth.currentUser.displayName,
            date: dateText,
            venue: slot.name,
            startTime: slot.startTime,
            endTime: slot.endTime,
            status: 'Declined',
            created: fsDate
        });

        const notificationRef = collection(userDoc, "notifications")

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
                        style={styles.approveButton}>
                        <Text style={styles.approveButtonText}>Approve</Text>
                    </Pressable>
                    <Pressable
                        onPress={() => declineBooking()}
                        style={styles.approveButton}>
                        <Text style={styles.approveButtonText}>Decline</Text>
                    </Pressable>
                </View>
            </View>

        </SafeAreaView>
    );
}



export default SelectedPendingBooking;