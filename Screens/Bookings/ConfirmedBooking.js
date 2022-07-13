import React, { useState, useEffect } from "react";
import { Text, View } from 'react-native';
import styles from '../../css/ConfirmedBookingStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';


function ConfirmedBooking({ route, navigation }) {
    const { choice } = route.params
    const { dateText } = route.params
    
    const backToMain = () => {
        navigation.navigate('Main')
    }

    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
            <Text style={styles.text}>
                Your booking has{'\n'}
                been confirmed!
            </Text>
            <Text style={styles.text2}>{choice.name}</Text>
            <Text style={styles.text2}>{dateText}</Text>
            <Text style={styles.text2}>{choice.startTime} to {choice.endTime}</Text>
            </View>
            <View style={styles.bookingContainer}>
            <Pressable
            onPress={backToMain}
            style={styles.backToMainButton}>
                <Text style={styles.backToMainButtonText}>Back to bookings</Text>
            </Pressable>
            </View>
        </View>
    )
}


export default ConfirmedBooking;