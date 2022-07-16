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
function PendingBookings({ navigation }) {
  const [bookings, setBookings] = useState([]);
  const [trackerKeys, setTrackerKeys] = useState([]); 

  useEffect(() => {
    const getPendingBookings = async () => {
      const pendingSlots = query(collectionGroup(db, 'bookings'), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(pendingSlots);
      querySnapshot.forEach(async (docSnapshot) => {

        console.log(docSnapshot.id)


        // query for user details here based on uid
        // need to update booking feature where there is writing of user id.

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

        if (!trackerKeys.includes(key)) {
          trackerKeys.push(key)
          bookings.push({ key: key, label: label, dateText: dateText, 
            value: { id: docSnapshot.id, name: fsName, startTime: jsStartTime, endTime: jsEndTime, parentDocID: parentDocID, 
              useruid: uid, displayName: displayName, email: email, bookingReason: bookingReason } })
        }
      })
      console.log(bookings)
    };
    getPendingBookings();
  }, []);


  const getPendingBookings = async () => {
    // setTrackerKeys([])
    // console.log(trackerKeys)
    const pendingSlots = query(collectionGroup(db, 'bookings'), where('status', '==', 'pending'));
    const querySnapshot = await getDocs(pendingSlots);
    querySnapshot.forEach(async (docSnapshot) => {

      console.log(docSnapshot.id)


      // query for user details here based on uid
      // need to update booking feature where there is writing of user id.

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

      if (!trackerKeys.includes(key)) {
        trackerKeys.push(key)
        bookings.push({ key: key, label: label, dateText: dateText, 
          value: { id: docSnapshot.id, name: fsName, startTime: jsStartTime, endTime: jsEndTime, parentDocID: parentDocID, 
            useruid: uid, displayName: displayName, email: email, bookingReason: bookingReason } })
      }
    })
    console.log(bookings)

  };

  // flesh out the flatlist and how data is extracted from firestore, including querying for user details to put inside var bookings
  // flatlist: 
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
                <Text>{item.dateText}</Text>
              </View>
              <View style={styles.rightCol}>
                <Text>{item.label}</Text>
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