import React, { useState, useEffect } from "react";
import { Text, View, TextInput } from 'react-native';
import styles from '../../css/ChosenBookingStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { auth, db } from '../../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { Timestamp, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, collection } from "firebase/firestore";
import Toast from 'react-native-root-toast';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

function ChosenBooking({ route, navigation }) {
  const { choice } = route.params
  const { dateText } = route.params
  const [bookingReason, setBookingReason] = useState('')
  const [bookingReasonForOthers, setBookingReasonForOthers] = useState('')
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

  const missingOthersReasonToast = () => {
    let toast = Toast.show('Please ensure you have specified a booking reason for "Others"!', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  const invalidBookingToast = () => {
    let toast = Toast.show('The slot you have chosen may have been already booked. Please go back and pick another slot.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  const confirmBooking = async () => {
    if (bookingReason == '') {
      missingReasonToast()
      return;
    }

    if (bookingReason == 'Others' && bookingReasonForOthers == '') {
      missingOthersReasonToast()
      return;
    }

    const docRef = doc(db, 'rooms', choice.parentDocID, 'bookings', choice.id)
    const docSnap = await getDoc(docRef);

    if (docSnap.get('status') != 'available' || docSnap.get('valid') != true) {
      invalidBookingToast()
      return;
    }

    
    // creating document for user bookings (users col -> user doc -> userBookings col)
    var currDate = new Date()
    var fsDate = Timestamp.fromDate(currDate)

    const userDoc = doc(db, 'users', auth.currentUser.uid)
    const newDocRef = await addDoc(collection(userDoc, "userBookings"), {
      bookingID: choice.id,
      date: dateText,
      venue: choice.name,
      startTime: choice.startTime,
      endTime: choice.endTime,
      status: 'Pending',
      requestedOn: fsDate
    });

    updateDoc(docRef, {
      valid: false,
      status: 'pending',
      useruid: auth.currentUser.uid,
      userDisplayName: auth.currentUser.displayName,
      userEmail: auth.currentUser.email,
      userBookingID: newDocRef.id,
    });

    console.log(newDocRef.id)


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