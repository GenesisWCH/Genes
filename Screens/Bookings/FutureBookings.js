import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from 'react-native';
import styles from '../../css/FutureBookingsStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../../firebase';
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { toLabelString, toTimeStr, toJSDateStr } from "../../functions/timeFunctions";
import Toast from 'react-native-root-toast';


function FutureBookings({ navigation }) {
    const [bookings, setBookings] = useState(null);
    const [reset, setReset] = useState(true);

    useEffect(() =>
        navigation.addListener('focus', () => setReset(true)),
        []);

    useEffect(() => {
        const getFutureBookings = async () => {
            const dummyBookings = []
            const futureDate = new Date();
            const futureDate2 = new Date();
            futureDate2.setDate(futureDate2.getDate() + 14)
            futureDate.setHours(0, 0, 0, 0)
            futureDate2.setHours(0, 0, 0, 0)

            const slotsAvail = query(collectionGroup(db, 'bookings'), where('date', '>=', futureDate), where('date', '<=', futureDate2));
            const querySnapshot = await getDocs(slotsAvail);
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

                var status = docSnapshot.get('status')
                var uid = docSnapshot.get('useruid')
                var displayName = docSnapshot.get('userDisplayName')
                var email = docSnapshot.get('userEmail')
                var userBookingID = docSnapshot.get('userBookingID')
                var admin = docSnapshot.get('admin')
                var adminID = docSnapshot.get('adminID')
                var adminResponseTimeCheck = docSnapshot.get('adminResponseTime')
                if (adminResponseTimeCheck == "") {
                    var adminResponseTime = ""
                } else {
                    var adminResponseTime = toJSDateStr(adminResponseTimeCheck.toDate()) + ", " + toTimeStr(adminResponseTimeCheck)
                }

                var key = dateText + " " + label

                dummyBookings.push({
                    key: key, label: label, dateText: dateText,
                    value: {
                        id: docSnapshot.id, name: fsName, startTime: jsStartTime, endTime: jsEndTime, parentDocID: parentDocID,
                        useruid: uid, userBookingID: userBookingID, status: status,
                        admin: admin, adminID: adminID, adminResponseTime: adminResponseTime,
                        displayName: displayName, email: email,
                        bookingReason: bookingReason
                    }
                })
            })

            setBookings(dummyBookings)
            console.log('bookings:', bookings)
            setReset(false)
        };

        if (reset) {
            getFutureBookings()
        }

        if (bookings != null && bookings == false) {
            console.log('\ncalling toast\n')
            noFutureDatesToast()
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

    const noFutureDatesToast = () => {
        let toast = Toast.show('There are no booking slots for the next 14 days.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const refreshFutureBookings = async () => {
        setReset(true)
        refreshToast()
    };

    return (
        <SafeAreaView style={styles.page}>
            <View style={styles.top}>
                <Pressable
                    onPress={() => refreshFutureBookings()}
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
                                onPress={() => navigation.navigate('Selected Future Booking Slot', {
                                    slot: item.value,
                                    dateText: item.dateText
                                })}
                                style={styles.item}
                            >
                                <View style={styles.leftCol}>
                                    <Text style={styles.itemText}>{item.dateText}</Text>
                                    <Text style={styles.itemText}>{item.label}</Text>
                                </View>

                                {item.value.status == 'booked'
                                    ? <View style={styles.rightApprovedCol}>
                                        <Text style={styles.itemText}>Approved</Text>
                                    </View>
                                    : item.value.status == 'closed'
                                        ? <View style={styles.rightClosedCol}>
                                            <Text style={styles.itemText}>Closed</Text>
                                        </View>
                                        : item.value.status == 'available'
                                            ? <View style={styles.rightAvailableCol}>
                                                <Text style={styles.itemText}>Available</Text>
                                            </View>
                                            : <View style={styles.rightPendingCol}>
                                                <Text style={styles.itemText}>Pending</Text>
                                            </View>
                                }

                            </Pressable>
                        </View>
                    }
                    keyExtractor={item => item.key}
                />
            </View>
        </SafeAreaView>
    );
}

export default FutureBookings;