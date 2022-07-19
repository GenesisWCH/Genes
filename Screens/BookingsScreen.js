import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BookingsList from "./Bookings/BookingsList";
import BookingsSearch from "./Bookings/BookingsSearch";
import BookingsMain from "./Bookings/BookingsMain";
import ChosenBooking from "./Bookings/ChosenBooking";
import ConfirmedBooking from "./Bookings/ConfirmedBooking";
import PendingBookings from "./Bookings/PendingBookings";
import SelectedPendingBooking from "./Bookings/SelectedPendingBooking";
import UserBookings from "./Bookings/UserBookings";


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
      <Stack.Screen name="My Bookings" component={UserBookings} 
      options={{
        headerShown: true, headerStyle: {
          backgroundColor: 'darkorange',
        }
      }} />
    </Stack.Navigator>
  )
}

export default BookingsScreen;