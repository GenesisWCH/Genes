// Bookings tab is a work in progress and not finalised in both frontend and backend
import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Dimensions } from 'react-native';
import styles from '../css/ChosenBookingStyle';
import { isAnonymous } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../functions/LogOutHandler";
import { auth, db } from '../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { collection, collectionGroup, query, where, getDocs, Firestore, connectFirestoreEmulator } from "firebase/firestore";
import SimpleSelectButton from 'react-native-simple-select-button';
import toJSDateStr from "../functions/toJSDateStr";

const reasonDATA = [
    { label: 'Personal Use', reason: 'Personal Use'},
    { label: 'Club Activities', reason: 'Club Activities' },
    
]


function ChosenBooking({ route, navigation }) {
    const { choice } = route.params
    const { dateText } = route.params // shown as text above
    const { bookingReason, setBookingReason } = useState('')

    useEffect(() => {
        console.log(dateText)
        console.log(choice)
    }, []);

    const confirmBooking = ( {navigation} ) => {
        // write data. 
        // valid -> false
        // status -> pending
        


        navigation.navigate('Confirmed Booking', {
            choice: choice,
            dateText: dateText
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>You have chosen:</Text>
            <Text style={styles.dateText}>{choice.name}</Text>
            <Text style={styles.dateText}>{dateText}</Text>
            <Text style={styles.dateText}>{choice.startTime} to {choice.endTime}</Text>
            <Dropdown
              // level
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={reasonDATA}
              search
              maxHeight={300}
              labelField="label"
              valueField="reason"
              placeholder='Select booing reason'
              searchPlaceholder="Search..."
              value={level}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setBookingReason(item.reason);
                setIsFocus(false);
              }}
              renderLeftIcon={() => (
                <AntDesign
                  style={styles.icon}
                  color={isFocus ? 'blue' : 'black'}
                  name="Safety"
                  size={20}
                />
              )}
            />
            <Pressable
            onPress={confirmBooking}
            style={styles.confirmBookingButton}>
                <Text style={styles.confirmBookingButtonText}>Book</Text>
            </Pressable>
        </View>
    )
}

export default ChosenBooking;