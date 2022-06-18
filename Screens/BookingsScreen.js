import React, { useState } from "react";
import { Text, View } from 'react-native';
import styles from '../css/BookingsScreenStyle';
import { isAnonymous } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import Modal from "react-native-modal";
import { SafeAreaView } from "react-native-safe-area-context";
import LogOutHandler from "../functions/LogOutHandler";
import { auth } from '../firebase';
import { Dropdown } from 'react-native-element-dropdown';

const levelData = [
  { label: 'Level 1', level: '1' },
  { label: 'Level 2', level: '2' },
];

const roomTypeData = [
  { label: 'Seminar', room: 'Seminar' },
  { label: 'Tutorial', room: 'Tutorial' },
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

  // const renderLabel = () => {
  //   if (level || isFocus) {
  //     return (
  //       <Text style={[styles.label, isFocus && { color: 'blue' }]}>
  //         Dropdown label
  //       </Text>
  //     );
  //   }
  //   return null;
  // };

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
        {/* {renderLabel()} */}
        <Dropdown
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
        <Text style={styles.timeText}>Time:</Text>
        <View style={styles.timeContainer}>
          <Dropdown
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
          <Text style={styles.timeText}>to:</Text>
          <Dropdown
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

        </View>
        <Pressable style={styles.searchButton}>
<Text style={styles.searchButtonText}>Search</Text>
        </Pressable>
      </View>

    </SafeAreaView>


  );
}

export default BookingsScreen;