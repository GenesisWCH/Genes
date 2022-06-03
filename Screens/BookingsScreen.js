import React, { useState } from "react";
import { Text, View } from 'react-native';
import styles from '../css/TemplateScreenStyle';

function BookingsScreen() {
    return (
      <View style={styles.page}>
        <Text styles={styles.headerText}> Bookings are made here! </Text>
      </View>
    );
  }

  export default BookingsScreen;