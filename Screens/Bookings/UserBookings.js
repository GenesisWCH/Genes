import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from 'react-native';
import styles from '../../css/UserBookingsStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";
import { auth, db } from '../../firebase';
import { collection, getDocs } from "firebase/firestore";
import { toLabelString } from "../../functions/timeFunctions";
import Toast from 'react-native-root-toast';
import { randomKeyGenerator } from "../../functions/randomKeyGenerator";


function UserBookings() {
  const [bookings, setBookings] = useState(null);
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
        var key = randomKeyGenerator(5)
        dummyBookings.push({
          key: key, label: label, dateText: dateText, status: status
        })

      })
      setBookings(dummyBookings)
      setReset(false)

    };
    if (reset) {
      refreshBookings();
    }

    if (bookings != null && bookings == false) {
      console.log('\ncalling toast\n')
      noBookingsToast()
    }
  }, [reset]);

  const refreshToast = () => {
    let toast = Toast.show('Please wait for a few seconds while refreshing.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  const noBookingsToast = () => {
    let toast = Toast.show('You have no bookings', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };


  const refreshBookings = async () => {
    setReset(true)
    refreshToast()
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.top}>
        <Pressable
          onPress={() => refreshBookings()}
          style={styles.refreshButton}>
          <Text style={styles.refreshButtonText}>Refresh Bookings</Text>
        </Pressable>
      </View>
      <View style={styles.bottom}>
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
                  : item.status == 'Declined'
                    ? <View style={styles.rightDeclinedCol}>
                      <Text style={styles.itemText}>{item.status}</Text>
                    </View>
                    : <View style={styles.rightPendingCol}>
                      <Text style={styles.itemText}>{item.status}</Text>
                    </View>
                }
              </View>
            </View>
          }
          keyExtractor={item => item.key}
        />
      </View>
    </SafeAreaView>
  );
}

export default UserBookings;