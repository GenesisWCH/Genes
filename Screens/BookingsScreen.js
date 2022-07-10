// Bookings tab is a work in progress and not finalised in both frontend and backend
import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Dimensions } from 'react-native';
import styles from '../css/BookingsScreenStyle';
import { isAnonymous } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../functions/LogOutHandler";
import { auth, db } from '../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { collection, collectionGroup, query, where, getDocs, Firestore } from "firebase/firestore";
import toJSDateStr from "../functions/toJSDateStr";
import BookingsList from "./BookingsList";
import ChosenBooking from "./ChosenBooking";

const levelData = [
  { label: 'Level 1', level: 1 },
  { label: 'Level 2', level: 2 },
];

const roomTypeData = [
  { label: 'Seminar', room: 'seminar' },
  { label: 'Tutorial', room: 'tutorial' },
]

// data = [
//   {label: 'string', value: {name: '', date: '', startTime: '', endTime: ''}}
// ]


function BookingsScreenMain({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [level, setLevel] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [date, setDate] = useState(null);
  const [dateText, setDateText] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);

  // Link: https://stackoverflow.com/questions/13898423/javascript-convert-24-hour-time-of-day-string-to-12-hour-time-with-am-pm-and-no
  function tConvert(time) {
    // Check correct time format and split into components
    time = time.toString().match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) { // If time format correct
      time = time.slice(1); // Remove full string match value
      time[5] = +time[0] < 12 ? 'AM' : 'PM'; // Set AM/PM
      time[0] = +time[0] % 12 || 12; // Adjust hours
    }
    return time.join(''); // return adjusted time or original string
  }

  const toTimeStr = (fsDate) => {
    var jsDate = fsDate.toDate()
    var str = jsDate.toTimeString()
    return tConvert(str.slice(0, 5))
  }

  const toLabelString = (name, startTime, endTime) => {
    var str = name + ", " + startTime + " to " + endTime
    return str
  }

  // see how to make a callback after setting a change in state
  // apparently the same timestamps are actually diff objects. how do I extract/query the correct documents?
  const filterByLevelType = async () => {
    var dummyDates = []
    var trackerDates = []
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 14)
    var futureDate2 = futureDate
    futureDate.setHours(0, 0, 0, 0)
    futureDate2.setHours(0, 0, 0, 0)
    // possible query by timestamp needed
    const datesAvail = query(collectionGroup(db, 'bookings'), where('type', '==', roomType),
      where('level', '==', level), where('date', '<=', futureDate), where('valid', '==', true), where('status', '==', 'available'));
    const querySnapshot = await getDocs(datesAvail);
    querySnapshot.forEach((doc) => {

      var currDate = doc.get('date')
      var jsDate = currDate.toDate()
      var str = toJSDateStr(jsDate)

      // TODO: extract all the dates within 14 days from now. query by range. may need to convert date to UNIX time by momentjs to query.
      // do i want my dummyDates to have a timestamp or strings? or have it contain the array objects {} and another array to keep track of the dates?
      if (!trackerDates.includes(str)) {
        trackerDates.push(str)
        dummyDates.push({ label: str, date: jsDate })
      }

    })
    console.log(trackerDates)
    console.log(dummyDates)
    setDates(dummyDates)
      ;
  }

  const search = async () => {
    var dummySlots = []
    const currDate = new Date(date.getTime())
    const currDate2 = new Date(date.getTime())
    currDate.setHours(0, 0, 0, 0)
    currDate2.setHours(23, 0, 0, 0)

    console.log(date)
    console.log(currDate)
    console.log(currDate2)

    const slotsAvail = query(collectionGroup(db, 'bookings'), where('type', '==', roomType),
      where('level', '==', level), where('valid', '==', true), where('status', '==', 'available'), where('date', '>=', currDate), where('date', '<=', currDate2));
    const querySnapshot = await getDocs(slotsAvail);
    querySnapshot.forEach((doc) => {

      var fsStartTime = doc.get('startTime')
      var fsEndTime = doc.get('endTime')
      var fsName = doc.get('name')
      var jsStartTime = toTimeStr(fsStartTime)
      var jsEndTime = toTimeStr(fsEndTime)
      var label = toLabelString(fsName, jsStartTime, jsEndTime)

      dummySlots.push({ label: label, value: { id: doc.id, name: fsName, startTime: jsStartTime, endTime: jsEndTime } })
    })
    console.log(dummySlots)
    // setData(dummySlots)
    // console.log(data)

    navigation.navigate("List of available rooms:", {
      data: dummySlots,
      dateText: dateText
    })

  }

  return (
    <SafeAreaView style={styles.page}>
      <Modal
        animationIn={"slideInRight"}
        animationOut={'slideOutRight'}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AntDesign style={styles.modalProfileIcon} name="user" size={28} color='black' />
            <Pressable
              style={[styles.button]}
            //</View>onPress={}
            >
              <Text style={styles.textStyle}>Profile</Text>

            </Pressable>
            <Pressable
              style={[styles.button]}
            //onPress={}
            >
              <Text style={styles.textStyle}>Settings</Text>

            </Pressable>
            <Pressable
              style={[styles.button]}
            >
              <Text style={styles.textStyle}>About</Text>
            </Pressable>
            <Pressable
              style={[styles.button]}
              onPress={LogOutHandler}
            >
              <Text style={styles.textStyle}>Sign Out</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.headerText}>Booking</Text>
        <Pressable style={styles.profileIcon} onPress={() => setModalVisible(true)}>
          <AntDesign name="user" size={28} color='black' />
        </Pressable>

      </View>

      <View style={styles.body}>
        {auth.currentUser.isAnonymous ?
          <Text styles={styles.headerText}> You are a guest. Bookings are only available to NUS staff and students.</Text>
          : <View>
            <Text styles={styles.headerText}>
              Bookings are made here!
            </Text>
            <Dropdown
              // level
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={levelData}
              search
              maxHeight={300}
              labelField="label"
              valueField="level"
              placeholder='Select level'
              searchPlaceholder="Search..."
              value={level}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setLevel(item.level);
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
            <Dropdown
              // type
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={roomTypeData}
              search
              maxHeight={300}
              labelField="label"
              valueField="room"
              placeholder='Room Type'
              searchPlaceholder="Search..."
              value={roomType}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setRoomType(item.room);
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
            <Dropdown
              //date
              style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
              placeholderStyle={styles.placeholderStyle}
              selectedTextStyle={styles.selectedTextStyle}
              inputSearchStyle={styles.inputSearchStyle}
              iconStyle={styles.iconStyle}
              data={dates}
              search
              maxHeight={300}
              labelField="label"
              valueField="date"
              placeholder='Select Date'
              searchPlaceholder="Search..."
              value={date}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={item => {
                setDate(item.date);
                setDateText(item.label)
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
            <Pressable
              onPress={() => search()}
              style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Search</Text>
            </Pressable>
            <Pressable
              onPress={() => filterByLevelType()}
              style={styles.searchButton}>
              <Text style={styles.searchButtonText}>Update dates</Text>
            </Pressable>
          </View>}
      </View>
    </SafeAreaView>
  );
}

const Stack = createNativeStackNavigator();

const BookingsScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Main" component={BookingsScreenMain} />
      <Stack.Screen name="List of available rooms:" component={BookingsList}
        options={{
          headerShown: true, headerStyle: {
            backgroundColor: 'darkorange',
          }
        }} />
      <Stack.Screen name="Chosen Booking" component={ChosenBooking} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'darkorange',
        }
      }} />
    </Stack.Navigator>
  )
}

export default BookingsScreen;