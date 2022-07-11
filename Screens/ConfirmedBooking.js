import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Dimensions } from 'react-native';
import styles from '../css/ConfirmedBookingStyle';
import { isAnonymous } from "firebase/auth";
import { AntDesign } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';




function ConfirmedBooking({ route, navigation }) {
    const { choice } = route.params
    const { dateText } = route.params

    useEffect(() => {
        console.log(dateText)
        console.log(choice)
    }, []);

    const backToMain = ( {navigation} ) => {
        navigation.navigate('Main')
    }

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>
                Your booking has{'\n'}
                been confirmed!
            </Text>
            <Text style={styles.dateText}>{choice.name}</Text>
            <Text style={styles.dateText}>{dateText}</Text>
            <Text style={styles.dateText}>{choice.startTime} to {choice.endTime}</Text>
            <Pressable
            onPress={backToMain}
            style={styles.backToMainButton}>
                <Text style={styles.backToMainButtonText}>Back to bookings</Text>
            </Pressable>
        </View>
    )
}


export default ConfirmedBooking;