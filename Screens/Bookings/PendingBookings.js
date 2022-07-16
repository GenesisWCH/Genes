import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import styles from '../../css/PendingBookingsStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../../functions/LogOutHandler";
import { auth, db } from '../../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { collection, collectionGroup, query, where, getDocs } from "firebase/firestore";
import { toJSDateStr, toLabelString, toTimeStr } from "../../functions/timeFunctions";


// data = [
//   {label: 'string', value: {name: '', date: '', startTime: '', endTime: ''}}
// ]

// how to approve bookings and show it in the my bookings?
// grab the uid of the user you want to be the 'admin' and do conditonal rendering to separate what the user sees.
// i.e. anonymous user, admin user, normal user 
// create the booking and my booking page
// admin user will see 3 buttons. book, my bookings, and the pending bookings
// admin will be decided by checking user id. 
// the Firestore read write rules will be decided later.
function PendingBookings({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [bookings, setBookings] = useState([]);


  useEffect(() => {
    const getPendingBookings = async () => {
      const slotsAvail = query(collectionGroup(db, 'bookings'), where('status', '==', 'pending'));
      const querySnapshot = await getDocs(slotsAvail);
      querySnapshot.forEach((doc) => {

        // query for user details here based on uid
        // need to update booking feature where there is writing of user id.

        var fsStartTime = doc.get('startTime')
        var fsEndTime = doc.get('endTime')
        var fsName = doc.get('name')
        var parentDocID = doc.get('parentDocID')
        var jsStartTime = toTimeStr(fsStartTime)
        var jsEndTime = toTimeStr(fsEndTime)
        var label = toLabelString(fsName, jsStartTime, jsEndTime)

        dummySlots.push({ label: label, value: { id: doc.id, name: fsName, startTime: jsStartTime, endTime: jsEndTime, parentDocID: parentDocID } })
      })
      console.log(dummySlots)
      setBookings(dummySlots)
      // console.log(data)

      // navigation.navigate("Selected Pending Booking", {
      //   data: data,
      //   dateText: dateText
      // })

    };
    getPendingBookings();
  }, []);

  // flesh out the flatlist and how data is extracted from firestore, including querying for user details to put inside var bookings
  return (
    <SafeAreaView style={styles.page}>
      <FlatList
        data={DATA}
        renderItem={({ item }) =>
            <View>
              <Pressable
              onPress={() => navigation.navigate(item.navi)}
              style={styles.item}
              >
              <Image style={styles.image} source={{uri:item.image}} />
              <Text key={index}>{item.text}</Text>
              </Pressable>
            </View>
          }
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
}



export default PendingBookings;