import React from "react";
import { Text, View } from 'react-native';
import styles from '../css/NotificationsMessageStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import { SafeAreaView } from "react-native-safe-area-context";


function NotificationsMessage({ route, navigation }) {
    const { details } = route.params


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.textContainer}>
                <View style={styles.messageContainer}>
                    <Text style={styles.text}>{details.message}</Text>
                </View>
                <View style={styles.detailsContainer}>
                    <Text style={styles.detailsText}>Sent by: {details.admin}</Text>
                    <Text style={styles.detailsText}>Created: {details.datetimeText}</Text>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <Pressable
                    onPress={() => navigation.goBack()}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    );
}



export default NotificationsMessage;