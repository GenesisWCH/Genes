// Bookings tab is a work in progress and not finalised in both frontend and backend
import React, { useState, useEffect } from "react";
import { Text, View, TextInput } from 'react-native';
import styles from '../../css/ChosenBookingStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { auth, db } from '../../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { doc, getDoc, getDocs, setDoc, updateDoc, collection } from "firebase/firestore";

import Toast from 'react-native-root-toast';

const reasonDATA = [
  { label: 'Personal Use', reason: 'Personal Use' },
  { label: 'Club Activities', reason: 'Club Activities' },
]

function ChosenBooking({ route, navigation }) {
  const { choice } = route.params
  const { dateText } = route.params
  const [bookingReason, setBookingReason] = useState('')
  const [ bookingReasonForOthers, setBookingReasonForOthers ] = useState('')
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
      const getBookingReasons = async () => {
        const querySnapshot = await getDocs(collection(db, "bookingReasons"));
        setData(querySnapshot.docs.map((doc) => ({ label: doc.id, reason: doc.id })))
      };
      getBookingReasons();
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
      useruid: auth.currentUser.uid,
      userDisplayName: auth.currentUser.displayName,
      userEmail: auth.currentUser.email
    });

    if (bookingReason == 'Others') {
      setDoc(docRef, {
        bookingReason: bookingReasonForOthers
      }, { merge: true });

      const othersDoc = doc(db, 'bookingReasons', 'Others')
      const docSnap = await getDoc(othersDoc);
      const reasonsList = docSnap.get('reasons');
      reasonsList.push(bookingReasonForOthers)
      updateDoc(othersDoc, {
        reasons: reasonsList
      });

    } else {
      setDoc(docRef, {
        bookingReason: bookingReason
      }, { merge: true });
    }

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
          data={data}
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
        <View style={styles.inputContainer}>
        <TextInput
          onChangeText={setBookingReasonForOthers}
          value={bookingReasonForOthers}
          placeholder='Reason for others'
          selectionColor='#003D7C'
          style={styles.input}
        />
        </View>
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