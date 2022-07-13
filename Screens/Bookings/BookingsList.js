import React, { useState, useEffect } from "react";
import { Text, View, FlatList, Dimensions } from 'react-native';
import styles from '../../css/BookingsListStyle';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import SimpleSelectButton from 'react-native-simple-select-button';

function BookingsList({ route, navigation }) {
    const { data } = route.params
    const { dateText } = route.params // shown as text above
    const [choice, setChoice] = useState(null);

    useEffect(() => {
        console.log(dateText)
        console.log(data)
    }, []);

    const selectBooking = async () => {
        // console.log(choice)
        navigation.navigate("Chosen Booking", {
            choice: choice,
            dateText: dateText,
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{dateText}</Text>
            <View style={{
                marginVertical: 5,
                width: (Dimensions.get('screen').width - 65),
            }}>
                <FlatList
                    data={data}
                    keyExtractor={item => item.label}
                    extraData={choice}
                    renderItem={
                        ({ item }) =>
                            <SimpleSelectButton
                                onPress={() => setChoice(item.value)}
                                isChecked={choice === item.value}
                                text={item.label}
                                textSize={14}
                                iconName="checkcircleo"
                                iconColor="#fff"
                                iconSize={14}
                                buttonDefaultColor="#e5e5e5"
                                buttonSelectedColor="#ff9c5b"
                                textDefaultColor="#333"
                                textSelectedColor="#fff"
                            />
                    }
                />
            </View>
            <Pressable
                onPress={selectBooking}
                style={styles.selectBookingButton}>
                <Text style={styles.selectBookingButtonText}>Select Booking</Text>
            </Pressable>
        </View>
    );
}


export default BookingsList;