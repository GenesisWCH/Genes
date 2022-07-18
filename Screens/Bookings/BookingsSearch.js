// Bookings tab is a work in progress and not finalised in both frontend and backend
import React, { useState, useEffect } from "react";
import { Text, View, FlatList } from 'react-native';
import styles from '../../css/BookingsSearchStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../../functions/LogOutHandler";
import { auth, db } from '../../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { toJSDateStr } from "../../functions/timeFunctions";
import Toast from 'react-native-root-toast';

const levelData = [
  { label: 'Level 1', level: 1 },
  { label: 'Level 2', level: 2 },
  { label: 'Level 3', level: 3 }
];

const roomTypeData = [
  { label: 'Seminar', room: 'seminar' },
  { label: 'Tutorial', room: 'tutorial' },
]

// the Firestore read write rules will be decided later.
function BookingsSearch({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [level, setLevel] = useState(null);
  const [roomType, setRoomType] = useState(null);
  const [date, setDate] = useState(null);
  const [dateText, setDateText] = useState('');
  const [isFocus, setIsFocus] = useState(false);
  const [dates, setDates] = useState([]);


  useEffect(() => {
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

        if (!trackerDates.includes(str)) {
          trackerDates.push(str)
          dummyDates.push({ label: str, date: jsDate })
        }
  
      })
      console.log(trackerDates)
      console.log(dummyDates)
      setDates(dummyDates)
      console.log('dates:', dates)
      if (dummyDates.length == 0) {
        unavailableDatesToast()
      }
    }
    
    if (level != null && roomType!= null) {
      filterByLevelType();
    }
  }, [level, roomType]);


  const missingFieldsToast = () => {
    let toast = Toast.show('Missing fields, please try again!', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  

  const search = async () => {
    if (level == null || roomType == null || date == null ) {
      missingFieldsToast()
      return;
    }

    navigation.navigate("List of available rooms:", {
      level: level,
      roomType: roomType,
      date: date,
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



export default BookingsSearch;