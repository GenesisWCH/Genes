// Bookings tab is a work in progress and not finalised in both frontend and backend
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingsList from "./Bookings/BookingsList";
import BookingsSearch from "./Bookings/BookingsSearch";
import BookingsMain from "./Bookings/BookingsMain";
import ChosenBooking from "./Bookings/ChosenBooking";
import ConfirmedBooking from "./Bookings/ConfirmedBooking";

const Stack = createNativeStackNavigator();

const BookingsScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen name="Main" component={BookingsMain} />
      <Stack.Screen name="Search" component={BookingsSearch} />
      <Stack.Screen name="List of available rooms:" component={BookingsList}
        options={{
          headerShown: true, headerStyle: {
            backgroundColor: 'darkorange',
          }
        }} />
      <Stack.Screen name="Chosen Booking" component={ChosenBooking} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'darkorange',
        }
      }} />
      <Stack.Screen name="Confirmed Booking" component={ConfirmedBooking} options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'darkorange',
        }
      }} />
    </Stack.Navigator>
  )
}

export default BookingsScreen;