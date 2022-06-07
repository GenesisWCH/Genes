import React, { useState } from "react";
import { Text, View } from 'react-native';
import styles from '../css/TemplateScreenStyle';
import { isAnonymous } from "firebase/auth";
import { auth } from '../firebase/index';

function BookingsScreen() {
    return (
      <View style={styles.page}>
        {auth.currentUser.isAnonymous ? 
        <Text styles={styles.headerText}> You are a guest. Bookings are only available to NUS staff and students.</Text>
        : <Text styles={styles.headerText}>Bookings are made here!</Text>}
      </View>
    );
  }

  export default BookingsScreen;