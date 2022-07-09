// Bookings tab is a work in progress and not finalised in both frontend and backend
import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
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
import { collection, collectionGroup, query, where, getDocs, Firestore, connectFirestoreEmulator } from "firebase/firestore";

const levelData = [
  { label: 'Level 1', level: 1 },
  { label: 'Level 2', level: 2 },
];

const roomTypeData = [
  { label: 'Seminar', room: 'seminar' },
  { label: 'Tutorial', room: 'tutorial' },
]

const dateData = [
  { label: '20 July 2022', date: '20 July 2022' },
  { label: '21 July 2022', date: '21 July 2022' },
]

const startTimeData = [
  { label: '1 July 2022', date: '1 July 2022' },
  { label: '2 July 2022', date: '2 July 2022' },
]


function BookingsList({ route, navigation }) {
  const {data} = route.param

}


function BookingsScreenMain() {
  const [modalVisible, setModalVisible] = useState(false);
  const [level, setLevel] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [date, setDate] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState([]);
  const [dates, setDates] = useState([]);
  const [dummyData, setDummyData] = useState([]);

  // useEffect(() => {

  //   // const getDates = () => {
  //   //   var dummyDates = []
  //   //   var currDate = new Date()
  //   //   var nextDate = new Date()
  //   //   for (var i=0; i < 15; i++){
  //   //     nextDate.setDate(currDate.getDate() + i)
  //   //     nextDate.setHours(0,0,0,0)
  //   //     var day = nextDate.getDate()
  //   //     var month = getMonthWord(nextDate.getMonth())
  //   //     var year = nextDate.getFullYear()
  //   //     var string = day + " " + month + " " + year
  //   //     dummyDates.push({label: string, value: nextDate})
  //   //   }

  //   //   setDates(dummyDates)
  //   // };
  //   // getDates();

  //   filterByLevelType()
  // }, []);



  const getMonthWord = (month) => {
    // switch cases for converting 0 to 11 to strings by month
    switch (month) {
      case 0:
        return "Jan"
      case 1:
        return "Feb"
      case 2:
        return "Mar"
      case 3:
        return "Apr"
      case 4:
        return "May"
      case 5:
        return "Jun"
      case 6:
        return "Jul"
      case 7:
        return "Aug"
      case 8:
        return "Sep"
      case 9:
        return "Oct"
      case 10:
        return "Nov"
      case 11:
        return "Dec"
      default:
        return;
    }
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
      where('level', '==', level), where('date', '<=', futureDate));
    const querySnapshot = await getDocs(datesAvail);
    querySnapshot.forEach((doc) => {
      // if (data.some(e => e.date == doc.date)) { // if date is already in array collection

      // }
      var currDate = doc.get('date')
      // console.log(currDate)
      var jsDate = currDate.toDate()
      // jsDate.setHours(0, 0, 0, 0)
      console.log(jsDate)

      var day = jsDate.getDate()
      var month = getMonthWord(jsDate.getMonth())
      var year = jsDate.getFullYear()
      var str = day + " " + month + " " + year
      // console.log(str)


      // TODO: extract all the dates within 14 days from now. query by range. may need to convert date to UNIX time by momentjs to query.
      // do i want my dummyDates to have a timestamp or strings? or have it contain the array objects {} and another array to keep track of the dates?
      if (!trackerDates.includes(str)) {
        // console.log(doc.date)
        // trackerDates.push(jsDate)
        trackerDates.push(str)
        // var day = jsDate.getDate()
        // var month = getMonthWord(jsDate.getMonth())
        // var year = jsDate.getFullYear()
        // var str = day + " " + month + " " + year
        // console.log(str)
        dummyDates.push({ label: str, date: jsDate })
      }

    })
    console.log(trackerDates)
    console.log(dummyDates)
    setDates(dummyDates)
      ;
  }

  const search = async () => {
    var dummyDates = []
    var trackerDates = []
    var currDate = new Date();
    var currDate2 = currDate
    curreDate.setHours(0, 0, 0, 0)
    currDate2.setHours(23, 59, 0, 0)
    // possible query by timestamp needed
    const datesAvail = query(collectionGroup(db, 'bookings'), where('type', '==', roomType),
      where('level', '==', level), where('date', '>=', currDate), where('date', '<=', currDate2));
    const querySnapshot = await getDocs(datesAvail);
    querySnapshot.forEach((doc) => {
      // if (data.some(e => e.date == doc.date)) { // if date is already in array collection

      // }
      var currDate = doc.get('date')
      // console.log(currDate)
      var jsDate = currDate.toDate()
      // jsDate.setHours(0, 0, 0, 0)
      console.log(jsDate)

      var day = jsDate.getDate()
      var month = getMonthWord(jsDate.getMonth())
      var year = jsDate.getFullYear()
      var str = day + " " + month + " " + year
      // console.log(str)


      // TODO: extract all the dates within 14 days from now. query by range. may need to convert date to UNIX time by momentjs to query.
      // do i want my dummyDates to have a timestamp or strings? or have it contain the array objects {} and another array to keep track of the dates?
      if (!trackerDates.includes(str)) {
        // console.log(doc.date)
        // trackerDates.push(jsDate)
        trackerDates.push(str)
        // var day = jsDate.getDate()
        // var month = getMonthWord(jsDate.getMonth())
        // var year = jsDate.getFullYear()
        // var str = day + " " + month + " " + year
        // console.log(str)
        dummyDates.push({ label: str, date: jsDate })
      }

    })
    console.log(trackerDates)
    console.log(dummyDates)
    setDates(dummyDates)
      ;
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
                // filterTest(level, roomType)
                filterByLevelType(level, roomType)
                console.log('yes there is change!')
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
      <Stack.Screen name="List of available rooms:" component={BookingsList} />
    </Stack.Navigator>
  )
}

export default BookingsScreen;