// Bookings tab is a work in progress and not finalised in both frontend and backend
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


function UserBookings({ navigation }) {
  const [data, setData] = useState([]);

  
  return (
    <SafeAreaView style={styles.page}>
      
      

        <View>
          
          
          <Pressable
            // onPress={}
            style={styles.searchButton}>
            <Text style={styles.searchButtonText}>Search</Text>
          </Pressable>
        </View>
    </SafeAreaView>
  );
}



export default UserBookings;