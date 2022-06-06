import React, { useState } from "react";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import Pressable from 'react-native/Libraries/Components/Pressable/Pressable';
import HomeScreen from "./Screens/HomeScreen";
import NotificationsScreen from "./Screens/NotificationsScreen";
import LocationsScreen from "./Screens/LocationsScreen";
import BookingsScreen from "./Screens/BookingsScreen";
import LogOutHandler from "./functions/LogOutHandler";

const Tab = createBottomTabNavigator();

export default function Tabs() {

const LogoutIcon = () => (
  <Pressable onPress={LogOutHandler}>
      <MaterialIcons name="logout" size={28} color='black' />
  </Pressable>
);

  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator 
        screenOptions={
          
          ({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = focused
                ? 'ios-home'
                : 'ios-home-outline';
            } else if (route.name === 'Notifications') {
              iconName = focused 
               ? 'ios-notifications' 
               : 'ios-notifications-outline';
            } else if (route.name === 'Locations') {
              iconName = focused
               ? 'ios-navigate'
               : 'ios-navigate-outline';
            } else if (route.name === 'Bookings') {
              iconName = focused
              ? 'ios-calendar'
              : 'ios-calendar-outline';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'black',
          tabBarActiveBackgroundColor: 'darkorange',
          tabBarInactiveBackgroundColor: 'darkorange',
        })}
      >
        <Tab.Screen options={{
        headerShown: false
    }}
         name="Home" component={HomeScreen} 
         />
        <Tab.Screen options={{
        headerRight: () => <LogoutIcon />, 
        headerStyle: {
          backgroundColor: 'darkorange',
        },
        headerTintColor: 'black'
    }} 
        
         name="Notifications" component={NotificationsScreen} 
         />
        <Tab.Screen options={{
        headerShown: false
    }}
        
         name="Locations" component={LocationsScreen} 
         />
        <Tab.Screen options={{
        headerRight: () => <LogoutIcon />,
        headerStyle: {
          backgroundColor: 'darkorange',
        },
        headerTintColor: 'black'
    }}
        
         name="Bookings" component={BookingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


