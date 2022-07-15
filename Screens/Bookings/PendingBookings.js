import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import styles from '../../css/BookingsSearchStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../../functions/LogOutHandler";
import { auth, db } from '../../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { collection, collectionGroup, query, where, getDocs } from "firebase/firestore";
import toJSDateStr from "../../functions/toJSDateStr";


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
  const [data, setData] = useState([]);


  useEffect(() => {
    const getPendingBookings = async () => {
      const querySnapshot = await getDocs(collection(db, "map"));
      setData(querySnapshot.docs.map((doc) => ({ label: doc.id, value: doc.id })))
    };
    getPendingBookings();
  }, []);


  


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
              style={styles.button}
            //</View>onPress={}
            >
              <Text style={styles.textStyle}>Profile</Text>

            </Pressable>
            <Pressable
              style={styles.button}
            //onPress={}
            >
              <Text style={styles.textStyle}>Settings</Text>

            </Pressable>
            <Pressable
              style={styles.button}
            >
              <Text style={styles.textStyle}>About</Text>
            </Pressable>
            <Pressable
              style={styles.button}
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
        <View>
          <Text styles={styles.headerText}>
            Bookings are made here! {auth.currentUser.uid}
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
          <Pressable
            onPress={() => filterByLevelType()}
            style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Update dates</Text>
          </Pressable>
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
        </View>
      </View>
    </SafeAreaView>
  );
}



export default PendingBookings;