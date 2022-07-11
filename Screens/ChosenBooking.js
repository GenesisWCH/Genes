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
import { doc, getDocs, collectionGroup, query, where, setDoc, updateDoc } from "firebase/firestore";
import SimpleSelectButton from 'react-native-simple-select-button';
import toJSDateStr from "../functions/toJSDateStr";
import Toast from 'react-native-root-toast';

const reasonDATA = [
  { label: 'Personal Use', reason: 'Personal Use' },
  { label: 'Club Activities', reason: 'Club Activities' },
]


function ChosenBooking({ route, navigation }) {
  const { choice } = route.params
  const { dateText } = route.params
  const [bookingReason, setBookingReason] = useState('')
  const [isFocus, setIsFocus] = useState(false);

  useEffect(() => {
    console.log(dateText)
    console.log(choice)
  }, []);

  const missingReasonToast = () => {
    let toast = Toast.show('Please ensure you have selected a booking reason!', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  const confirmBooking = async () => {
    // write data. 
    // valid -> false
    // status -> pending

    if (bookingReason == '') {
      missingReasonToast()
      return;
    }

    const docRef = doc(db, 'rooms', choice.parentDocID, 'bookings', choice.id)
    updateDoc(docRef, {
      valid: false,
      status: 'pending',
    });

    setDoc(docRef, {
      bookingReason: bookingReason
    }, { merge: true });

    console.log('Booked', choice.name, 'with id:', choice.id)

    navigation.navigate('Confirmed Booking', {
      choice: choice,
      dateText: dateText
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.dateText}>You have chosen:</Text>
        <Text style={styles.dateText}>{choice.name}</Text>
        <Text style={styles.dateText}>{dateText}</Text>
        <Text style={styles.dateText}>{choice.startTime} to {choice.endTime}</Text>
      </View>
      <View style={styles.bookingContainer}>
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
          placeholder='Select booking reason'
          searchPlaceholder="Search..."
          value={bookingReason}
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
    </View>
  )
}

export default ChosenBooking;