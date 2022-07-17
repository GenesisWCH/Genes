import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from 'react-native';
import styles from '../../css/PendingBookingsStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../../functions/LogOutHandler";
import { auth, db } from '../../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { collection, collectionGroup, query, where, doc, getDoc, getDocs } from "firebase/firestore";
import { toJSDateStr, toLabelString, toTimeStr } from "../../functions/timeFunctions";


// the Firestore read write rules will be decided later.
// biggest issue is rendering data in flatlist properly. i.e. without saving file again and the bookings that are approved/declined being removed from list
function PendingBookings({ navigation }) {
  const [bookings, setBookings] = useState(null);
  const [trackerKeys, setTrackerKeys] = useState([]);

  // useEffect(() => {

  //   const getPendingBookings = async () => {
  //     var tracker = []
  //     var dummyBookings = []
  //     const pendingSlots = query(collectionGroup(db, 'bookings'), where('status', '==', 'pending'));
  //     const querySnapshot = await getDocs(pendingSlots);
  //     querySnapshot.forEach(async (docSnapshot) => {

  //       console.log(docSnapshot.id)


  //       var fsStartTime = docSnapshot.get('startTime')
  //       var fsEndTime = docSnapshot.get('endTime')
  //       var fsName = docSnapshot.get('name')
  //       var parentDocID = docSnapshot.get('parentDocID')
  //       var bookingReason = docSnapshot.get('bookingReason')
  //       var jsStartTime = toTimeStr(fsStartTime)
  //       var jsEndTime = toTimeStr(fsEndTime)
  //       var label = toLabelString(fsName, jsStartTime, jsEndTime)
  //       var dateText = toJSDateStr(fsStartTime.toDate())

  //       var uid = docSnapshot.get('user')
  //       const userDoc = doc(db, 'users', uid)
  //       const docSnap = await getDoc(userDoc);
  //       var displayName = docSnap.get('displayName');
  //       var email = docSnap.get('email');
  //       var key = dateText + " " + label

  //       if (!tracker.includes(key)) {
  //         tracker.push(key)
  //         dummyBookings.push({
  //           key: key, label: label, dateText: dateText,
  //           value: {
  //             id: docSnapshot.id, name: fsName, startTime: jsStartTime, endTime: jsEndTime, parentDocID: parentDocID,
  //             useruid: uid, displayName: displayName, email: email, bookingReason: bookingReason
  //           }
  //         })
  //       }
  //     })
  //     setBookings(dummyBookings)
  //     console.log(bookings)
  //   };
  //   getPendingBookings();
  // }, []);


  const getPendingBookings = async () => {
    var tracker = []
    var dummyBookings = []
    const pendingSlots = query(collectionGroup(db, 'bookings'), where('status', '==', 'pending'));
    const querySnapshot = await getDocs(pendingSlots);
    querySnapshot.forEach(async (docSnapshot) => {

      console.log(docSnapshot.id)

      var fsStartTime = docSnapshot.get('startTime')
      var fsEndTime = docSnapshot.get('endTime')
      var fsName = docSnapshot.get('name')
      var parentDocID = docSnapshot.get('parentDocID')
      var bookingReason = docSnapshot.get('bookingReason')
      var jsStartTime = toTimeStr(fsStartTime)
      var jsEndTime = toTimeStr(fsEndTime)
      var label = toLabelString(fsName, jsStartTime, jsEndTime)
      var dateText = toJSDateStr(fsStartTime.toDate())

      var uid = docSnapshot.get('user')
      const userDoc = doc(db, 'users', uid)
      const docSnap = await getDoc(userDoc);
      var displayName = docSnap.get('displayName');
      var email = docSnap.get('email');
      var key = dateText + " " + label

      if (!tracker.includes(key)) {
        tracker.push(key)
        dummyBookings.push({
          key: key, label: label, dateText: dateText,
          value: {
            id: docSnapshot.id, name: fsName, startTime: jsStartTime, endTime: jsEndTime, parentDocID: parentDocID,
            useruid: uid, displayName: displayName, email: email, bookingReason: bookingReason
          }
        })
      }
    })
    setBookings(dummyBookings)
    console.log(bookings)

  };

  return (
    <SafeAreaView style={styles.page}>
      <Pressable
        onPress={() => getPendingBookings()}
        style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>Refresh Bookings</Text>
      </Pressable>
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
    </SafeAreaView>
  );
}



export default PendingBookings;