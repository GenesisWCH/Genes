import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from 'react-native';
import styles from '../../css/PendingBookingsStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../../firebase';
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { toJSDateStr, toLabelString, toTimeStr } from "../../functions/timeFunctions";
import Toast from 'react-native-root-toast';


function PendingBookings({ navigation }) {
  const [bookings, setBookings] = useState(null);
  const [reset, setReset] = useState(true);

  useEffect(() =>
    navigation.addListener('focus', () => setReset(true)),
    []);

  useEffect(() => {
    const getPendingBookings = async () => {
      const dummyBookings = []
      const pendingSlots = query(collectionGroup(db, 'bookings'), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(pendingSlots);
      // avoid asynchronous function within forEach. 
      querySnapshot.forEach((docSnapshot) => {


        var fsStartTime = docSnapshot.get('startTime')
        var fsEndTime = docSnapshot.get('endTime')
        var fsName = docSnapshot.get('name')
        var parentDocID = docSnapshot.get('parentDocID')
        var bookingReason = docSnapshot.get('bookingReason')
        var jsStartTime = toTimeStr(fsStartTime)
        var jsEndTime = toTimeStr(fsEndTime)
        var label = toLabelString(fsName, jsStartTime, jsEndTime)
        var dateText = toJSDateStr(fsStartTime.toDate())

        var uid = docSnapshot.get('useruid')
        var displayName = docSnapshot.get('userDisplayName')
        var email = docSnapshot.get('userEmail')
        var userBookingID = docSnapshot.get('userBookingID')

        var key = dateText + " " + label

        dummyBookings.push({
          key: key, label: label, dateText: dateText,
          value: {
            id: docSnapshot.id, name: fsName, startTime: jsStartTime, endTime: jsEndTime, parentDocID: parentDocID,
            useruid: uid, userBookingID: userBookingID,
            displayName: displayName, email: email,
            bookingReason: bookingReason
          }
        })
        // console.log('dummyBookings:', dummyBookings)
      })

      setBookings(dummyBookings)
      // console.log('bookings:', bookings)
      setReset(false)
    };

    if (reset) {
      getPendingBookings()
    }

    if (bookings != null && bookings == false) {
      console.log('\ncalling toast\n')
      noPendingDatesToast()
  }
  }, [ reset]);

  const refreshToast = () => {
    let toast = Toast.show('Please wait for a few seconds while refreshing.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
        Toast.hide(toast);
    }, 3000);
};

const noPendingDatesToast = () => {
  let toast = Toast.show('There are no rooms pending for approval.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
  });
  setTimeout(function hideToast() {
      Toast.hide(toast);
  }, 3000);
};

  const refreshPendingBookings = async () => {
    setReset(true)
    refreshToast()
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.top}>
        <Pressable
          onPress={() => refreshPendingBookings()}
          style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Refresh Bookings</Text>
        </Pressable>
      </View>
      <View style={styles.bottom}>
      <FlatList
        data={bookings}
        renderItem={({ item }) =>
          <View>
            <Pressable
              onPress={() => navigation.navigate('Selected Pending Booking', {
                slot: item.value,
                dateText: item.dateText
              })}
              style={styles.item}
            >
              <View style={styles.leftCol}>
                <Text style={styles.itemText}>{item.dateText}</Text>
              </View>
              <View style={styles.rightCol}>
                <Text style={styles.itemText}>{item.label}</Text>
              </View>
            </Pressable>
          </View>
        }
        keyExtractor={item => item.key}
      />
      </View>
    </SafeAreaView>
  );
}


export default PendingBookings;