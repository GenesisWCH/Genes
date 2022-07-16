import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from 'react-native';
import styles from '../../css/UserBookingsStyle';
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
function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [trackerKeys, setTrackerKeys] = useState([]);

  useEffect(() => {
    const refreshBookings = async () => {
      // setTrackerKeys([])
      // console.log(trackerKeys)
      const userSlots = collection(db, 'users', auth.currentUser.uid, 'userBookings');
      const querySnapshot = await getDocs(userSlots);
      querySnapshot.forEach(async (docSnapshot) => {
  
        console.log(docSnapshot.id)
  
  
        // query for user details here based on uid
        // need to update booking feature where there is writing of user id.
  
        var jsStartTime = docSnapshot.get('startTime')
        var jsEndTime = docSnapshot.get('endTime')
        var fsName = docSnapshot.get('venue')
        var label = toLabelString(fsName, jsStartTime, jsEndTime)
        var dateText = docSnapshot.get('date')
  
        var status = docSnapshot.get('status')
        var key = dateText + " " + label
  
        if (!trackerKeys.includes(key)) {
          trackerKeys.push(key)
          bookings.push({
            key: key, label: label, dateText: dateText, status: status
          })
        }
      })
      console.log(bookings)
  
    };
    refreshBookings();
  }, []);


  const refreshBookings = async () => {
    // setTrackerKeys([])
    // console.log(trackerKeys)
    const userSlots = collection(db, 'users', auth.currentUser.uid, 'userBookings');
    const querySnapshot = await getDocs(userSlots);
    querySnapshot.forEach(async (docSnapshot) => {

      console.log(docSnapshot.id)


      // query for user details here based on uid
      // need to update booking feature where there is writing of user id.

      var jsStartTime = docSnapshot.get('startTime')
      var jsEndTime = docSnapshot.get('endTime')
      var fsName = docSnapshot.get('venue')
      var label = toLabelString(fsName, jsStartTime, jsEndTime)
      var dateText = docSnapshot.get('date')

      var status = docSnapshot.get('status')
      var key = dateText + " " + label

      if (!trackerKeys.includes(key)) {
        trackerKeys.push(key)
        bookings.push({
          key: key, label: label, dateText: dateText, status: status
        })
      }
    })
    console.log(bookings)

  };

  // flesh out the flatlist and how data is extracted from firestore, including querying for user details to put inside var bookings
  // flatlist: 
  return (
    <SafeAreaView style={styles.page}>
      <Pressable
      onPress={() => refreshBookings()}
      style={styles.refreshButton}>
        <Text style={styles.refreshButtonText}>Refresh Bookings</Text>
      </Pressable>
      <FlatList
        data={bookings}
        renderItem={({ item }) =>
          <View>
            <View style={styles.item}>
              <View style={styles.leftCol}>
                <Text style={styles.itemText}>{item.dateText}</Text>
                <Text style={styles.itemText}>{item.label}</Text>
                </View>
              <View style={styles.rightCol}>
                <Text style={styles.itemText}>{item.status}</Text>
              </View>
            </View>
          </View>
        }
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}



export default UserBookings;