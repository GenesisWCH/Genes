import * as React from 'react';
import { Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';

function HomeScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> Welcome to DestiNUS </Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Notifications will be displayed here!</Text>
    </View>
  );
}

function LocationsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> Locations will be displayed here! </Text>
    </View>
  );
}

function BookingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text> Bookings are made here! </Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <NavigationContainer independent={true}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
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

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'black',
        })}
      >
        <Tab.Screen 
        screenOptions={{ headerShown: false }}
         name="Home" component={HomeScreen} />
        <Tab.Screen 
        screenOptions={{ headerShown: false }}
         name="Notifications" component={NotificationsScreen} />
        <Tab.Screen 
        screenOptions={{ headerShown: false }}
         name="Locations" component={LocationsScreen} />
        <Tab.Screen 
        screenOptions={{ headerShown: false }}
         name="Bookings" component={BookingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}