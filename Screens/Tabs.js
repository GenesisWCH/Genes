import React from "react";
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from "./HomeScreen";
import NotificationsScreen from "./NotificationsScreen";
import LocationsScreen from "./LocationsScreen";
import BookingsScreen from "./BookingsScreen";

const Tab = createBottomTabNavigator();

export default function Tabs() {

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
        })
      }

      >
        <Tab.Screen options={{
        headerShown: false,
        tabBarHideOnKeyboard: true
    }}
         name="Home" 
         component={HomeScreen} 
         />
        <Tab.Screen options={{
        headerShown: false,
        tabBarHideOnKeyboard: true
    }} 
         name="Notifications" 
         component={NotificationsScreen} 
         />
        <Tab.Screen options={{
        headerShown: false,
        tabBarHideOnKeyboard: true
    }}
         name="Locations" 
         component={LocationsScreen} 
         />
        <Tab.Screen options={{
        headerShown: false,
        tabBarHideOnKeyboard: true
    }}
         name="Bookings" 
         component={BookingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}


