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
import FutureBookings from "./Bookings/FutureBookings";
import SelectedFutureBooking from "./Bookings/SelectedFutureBooking";


const Stack = createNativeStackNavigator();

const BookingsScreen = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
        backgroundColor: 'darkorange',
        },
      }}>
      <Stack.Screen name="Main" component={BookingsMain} 
      options={{
        headerShown: false,
      }}/>
      <Stack.Screen name="Book a room" component={BookingsSearch} />
      <Stack.Screen name="List of available rooms:" component={BookingsList}/>
      <Stack.Screen name="Chosen Booking" component={ChosenBooking}/>
      <Stack.Screen name="Confirmed Booking" component={ConfirmedBooking}/>
      <Stack.Screen name="Pending Bookings" component={PendingBookings}/>
      <Stack.Screen name="Selected Pending Booking" component={SelectedPendingBooking}/>
      <Stack.Screen name="My Bookings" component={UserBookings}/>
      <Stack.Screen name="Future Bookings" component={FutureBookings}/>
      <Stack.Screen name="Selected Future Booking Slot" component={SelectedFutureBooking}/>
    </Stack.Navigator>
  )
}


export default BookingsScreen;