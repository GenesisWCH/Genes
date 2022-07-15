// Bookings tab is a work in progress and not finalised in both frontend and backend
import React, { useState, useEffect } from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingsList from "./Bookings/BookingsList";
import BookingsSearch from "./Bookings/BookingsSearch";
import BookingsMain from "./Bookings/BookingsMain";
import ChosenBooking from "./Bookings/ChosenBooking";
import ConfirmedBooking from "./Bookings/ConfirmedBooking";
import PendingBookings from "./Bookings/PendingBookings";
import SelectedPendingBooking from "./Bookings/SelectedPendingBooking";


const Stack = createNativeStackNavigator();


// another page for admin user. 
// create a users collection with uid as doc, and store fields on doc
// when i book, I will store another field: user uid . this will be used to query for user data 
// takes in data from firestore where bookings doc has pending status
// show username, user uid, email, booking reason (others booking reason if it exists),
// venue, start and end time, date 
// flatlist just shows date, room, time. navigate to another page with full details  
// to confirm or deny booking slot

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
      <Stack.Screen name="Chosen Booking" component={ChosenBooking} 
      options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'darkorange',
        }
      }} />
      <Stack.Screen name="Confirmed Booking" component={ConfirmedBooking} 
      options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'darkorange',
        }
      }} />
      <Stack.Screen name="Confirmed Booking" component={ConfirmedBooking} 
      options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'darkorange',
        }
      }} />
      <Stack.Screen name="Pending Bookings" component={PendingBookings} 
      options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'darkorange',
        }
      }} />
      <Stack.Screen name="Selected Pending Booking" component={SelectedPendingBooking} 
      options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'darkorange',
        }
      }} />
    </Stack.Navigator>
  )
}

export default BookingsScreen;