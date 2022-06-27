// Bookings tab is a work in progress and not finalised in both frontend and backend
import React, { useState } from "react";
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
import { collection, collectionGroup, query, where, getDocs, Firestore } from "firebase/firestore";

const levelData = [
  { label: 'Level 1', level: '1' },
  { label: 'Level 2', level: '2' },
];

const roomTypeData = [
  { label: 'Seminar', room: 'seminar' },
  { label: 'Tutorial', room: 'tutorial' },
]

const dateData = [
  { label: '1 July 2022', date: '1 July 2022' },
  { label: '2 July 2022', date: '2 July 2022' },
]

const startTimeData = [
  { label: '1 July 2022', date: '1 July 2022' },
  { label: '2 July 2022', date: '2 July 2022' },
]

function BookingsScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [level, setLevel] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [date, setDate] = useState(null);
  const [isFocus, setIsFocus] = useState(false);
  const [data, setData] = useState(null);
  const [dummyData, setDummyData] = useState(null);

  const currDate = new Date()

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

  const filterByLevelType = async (level, roomType) => {
    setData([])
    setDummyData([])
    const futureDate = new Date();
    futureDate.setDate(futureDate.getDate() + 14)
    const datesAvail = query(collectionGroup(db, 'bookings'), where('type', '==', roomType),
    where('level', '==', level));
      const querySnapshot = await getDocs(datesAvail);
      querySnapshot.forEach((doc) => {
        // if (data.some(e => e.date == doc.date)) { // if date is already in array collection

        // }
        if (!dummyData.includes(doc.date)) {
          console.log(doc.date)
          // dummyData.push(doc.date)
          // const day = doc.date.toDate().getDate().toString()
          // const month = getMonthWord(doc.date.toDate().getMonth())
          // const year = doc.date.toDate().getFullYear().toString()
          // const str = day + " " + month + " " + year
          // console.log(str)
          // data.push({ label: str, date: doc.date })
        }
      });
    }
  
    // ,
    // where('level', '==', level), where('valid', '==', true), where('status', '==', 'available')

  // const filterTest = async (level, roomType) => {
  //   // setData([])
  //   // const futureDate = new Date();
  //   // futureDate.setDate(futureDate.getDate() + 14)
  //   const datesAvail = query(collection(db, 'rooms'), where('type', '==', roomType));
  //   const querySnapshot = await getDocs(datesAvail);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  //   });

  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  //   });
  // }




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
          : <Text styles={styles.headerText}>Bookings are made here!</Text>}
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
          data={dateData}
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
        <Pressable style={styles.searchButton}>
          <Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

export default BookingsScreen;