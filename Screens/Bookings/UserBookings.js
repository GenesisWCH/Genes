import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from 'react-native';
import styles from '../../css/UserBookingsStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { toLabelString } from "../../functions/timeFunctions";


// the Firestore read write rules will be decided later.
function UserBookings() {
  const [bookings, setBookings] = useState([]);
  const [reset, setReset] = useState(true);

  useEffect(() => {
    const refreshBookings = async () => {
      var dummyBookings = []
      const userSlots = collection(db, 'users', auth.currentUser.uid, 'userBookings');
      const querySnapshot = await getDocs(userSlots);
      querySnapshot.forEach((docSnapshot) => {

        console.log(docSnapshot.id)

        var jsStartTime = docSnapshot.get('startTime')
        var jsEndTime = docSnapshot.get('endTime')
        var fsName = docSnapshot.get('venue')
        var label = toLabelString(fsName, jsStartTime, jsEndTime)
        var dateText = docSnapshot.get('date')

        var status = docSnapshot.get('status')
        var key = dateText + " " + label
        dummyBookings.push({
          key: key, label: label, dateText: dateText, status: status
        })

      })
      setBookings(dummyBookings)
      console.log(bookings)
      setReset(false)

    };
    if (reset) {
      refreshBookings();
    }
  }, [reset]);


  const refreshBookings = async () => {
    setReset(true)
  };

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

              {item.status == 'Approved'
                ? <View style={styles.rightApprovedCol}>
                  <Text style={styles.itemText}>{item.status}</Text>
                </View>
                : <View style={styles.rightDeclinedCol}>
                  <Text style={styles.itemText}>{item.status}</Text>
                </View>
              }
            </View>
          </View>
        }
        keyExtractor={item => item.key}
      />
    </SafeAreaView>
  );
}

export default UserBookings;