import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import styles from '../../css/BookingsSearchStyle';
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from '../../firebase';
import { Dropdown } from 'react-native-element-dropdown';
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { toJSDateStr } from "../../functions/timeFunctions";
import Toast from 'react-native-root-toast';
import { LogBox } from 'react-native';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

const levelData = [
  { label: 'Level 1', level: 1 },
  { label: 'Level 2', level: 2 },
  { label: 'Level 3', level: 3 }
];

const roomTypeData = [
  { label: 'Seminar', room: 'seminar' },
  { label: 'Tutorial', room: 'tutorial' },
]

function BookingsSearch({ navigation }) {
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
      const futureDate2 = new Date();
      futureDate2.setDate(futureDate2.getDate() + 14)
      futureDate.setHours(0, 0, 0, 0)
      futureDate2.setHours(0, 0, 0, 0)
      // possible query by timestamp needed
      const datesAvail = query(collectionGroup(db, 'bookings'), where('type', '==', roomType),
        where('level', '==', level), where('date', '>=', futureDate), where('date', '<=', futureDate2), 
        where('valid', '==', true), where('status', '==', 'available'));
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
      setDates(dummyDates)
      console.log('dates:', dates)
      if (dummyDates.length == 0) {
        unavailableDatesToast()
      } else {
        readyDatesToast()
      }
    }

    if (level != null && roomType != null) {
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

  const unavailableDatesToast = () => {
    let toast = Toast.show('There are no rooms available for booking. Please try again by choosing a different room type or date.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  const readyDatesToast = () => {
    let toast = Toast.show('The dates available for booking are ready for selection in the Dates dropdown list.', {
      duration: Toast.durations.LONG,
      position: Toast.positions.CENTER,
    });
    setTimeout(function hideToast() {
      Toast.hide(toast);
    }, 3000);
  };

  const search = async () => {
    if (level == null || roomType == null || date == null) {
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
      <View>
        <Text style={styles.headerText}>
          Please select the level and room type first. The available dates will be queried after that.
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
    </SafeAreaView>
  );
}


export default BookingsSearch;