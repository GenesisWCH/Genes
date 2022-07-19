import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Dimensions } from 'react-native';
import styles from '../../css/BookingsListStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { db } from '../../firebase';
import SimpleSelectButton from 'react-native-simple-select-button';
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { toLabelString, toTimeStr } from "../../functions/timeFunctions";
import Toast from 'react-native-root-toast';


function BookingsList({ route, navigation }) {
    const { level } = route.params
    const { roomType } = route.params
    const { date } = route.params
    const { dateText } = route.params
    const [bookings, setBookings] = useState(null)
    const [reset, setReset] = useState(true);
    const [choice, setChoice] = useState(null);

    const listenerFunction = () => {
        setReset(true)
        setBookings(null)
        setChoice(null)
    }

    useEffect(() =>
        navigation.addListener('focus', () =>
            listenerFunction()
        ),
        []);


    useEffect(() => {
        const getAvailableBookings = async () => {
            var dummySlots = []
            const currDate = new Date(date.getTime())
            const currDate2 = new Date(date.getTime())
            currDate.setHours(0, 0, 0, 0)
            currDate2.setHours(23, 0, 0, 0)

            const slotsAvail = query(collectionGroup(db, 'bookings'), where('type', '==', roomType),
                where('level', '==', level), where('valid', '==', true), where('status', '==', 'available'), where('date', '>=', currDate), where('date', '<=', currDate2));
            const querySnapshot = await getDocs(slotsAvail);
            querySnapshot.forEach((doc) => {

                var fsStartTime = doc.get('startTime')
                var fsEndTime = doc.get('endTime')
                var fsName = doc.get('name')
                var parentDocID = doc.get('parentDocID')
                var jsStartTime = toTimeStr(fsStartTime)
                var jsEndTime = toTimeStr(fsEndTime)
                var label = toLabelString(fsName, jsStartTime, jsEndTime)

                dummySlots.push({ label: label, value: { id: doc.id, name: fsName, startTime: jsStartTime, endTime: jsEndTime, parentDocID: parentDocID } })
            })
            setBookings(dummySlots)
            setReset(false)
        }
        if (reset) {
            console.log('\ncalling getAvailableBookings()\n')
            getAvailableBookings()
            
        }
        if (bookings != null && bookings == false) {
            console.log('\ncalling toast\n')
            unavailableDatesToast()
        }
    }, [ reset ]);


    const unavailableDatesToast = () => {
        let toast = Toast.show('There are no rooms available for booking. Please try again by going back and choosing a different room type or date.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const unselectedSlotToast = () => {
        let toast = Toast.show('Please pick a timeslot for booking.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const refreshToast = () => {
        let toast = Toast.show('Please wait for a few seconds while refreshing.', {
            duration: Toast.durations.LONG,
            position: Toast.positions.CENTER,
        });
        setTimeout(function hideToast() {
            Toast.hide(toast);
        }, 3000);
    };

    const selectBooking = async () => {
        if (bookings == false) {
            unavailableDatesToast()
            return;
        }
        if (choice == null) {
            unselectedSlotToast()
            return;
        }
        navigation.navigate("Chosen Booking", {
            choice: choice,
            dateText: dateText,
        })
    }

    const refreshAvailableBookings = () => {
        setReset(true)
        setBookings(null)
        setChoice(null)
        refreshToast()
    };

    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <Pressable
                    onPress={() => refreshAvailableBookings()}
                    style={styles.refreshButton}>
                    <Text style={styles.refreshButtonText}>Refresh</Text>
                </Pressable>
                <Text style={styles.dateText}>{dateText}</Text>
            </View>
            <View style={{
                marginVertical: 5,
                width: (Dimensions.get('screen').width - 65),
            }}>
                <FlatList
                    data={bookings}
                    keyExtractor={item => item.label}
                    extraData={choice}
                    renderItem={
                        ({ item }) =>
                            <SimpleSelectButton
                                onPress={() => setChoice(item.value)}
                                isChecked={choice === item.value}
                                text={item.label}
                                textSize={14}
                                iconName="checkcircleo"
                                iconColor="#fff"
                                iconSize={14}
                                buttonDefaultColor="#e5e5e5"
                                buttonSelectedColor="#ff9c5b"
                                textDefaultColor="#333"
                                textSelectedColor="#fff"
                            />
                    }
                />
            </View>
            <Pressable
                onPress={selectBooking}
                style={styles.selectBookingButton}>
                <Text style={styles.selectBookingButtonText}>Select Booking</Text>
            </Pressable>
        </View>
    );
}


export default BookingsList;