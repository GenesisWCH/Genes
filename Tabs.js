import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import {  signOut } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from './firebase/index';

function HomeScreen() {
  return (
    <View style={styles.page}>
      <Text> Welcome to DestiNUS </Text>
    </View>
  );
}

function NotificationsScreen() {
  return (
    <View style={styles.page}>
      <Text>Notifications will be displayed here!</Text>
    </View>
  );
}

function LocationsScreen() {
  return (
    <View style={styles.page}>
      <Text> Locations will be displayed here! </Text>
    </View>
  );
}

function BookingsScreen() {
  return (
    <View style={styles.page}>
      <Text styles={styles.headerText}> Bookings are made here! </Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function Tabs() {

  const logoutHandler = () => {
    signOut(auth).then(() => {
        setIsAuth(false);
        setUser({});
    });
};

const LogoutIcon = () => (
  <TouchableOpacity onPress={logoutHandler}>
      <MaterialIcons name="logout" size={28} color='darkorange' />
  </TouchableOpacity>
);
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

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'blue',
          tabBarInactiveTintColor: 'black',
          tabBarActiveBackgroundColor: 'darkorange',
          tabBarInactiveBackgroundColor: 'darkorange',
        })}
      >
        <Tab.Screen options={{
        headerRight: () => <LogoutIcon />,
        headerStyle: {
          backgroundColor: 'rgb(125, 129, 247)',
        },
        headerTintColor: 'darkorange'
    }}
        screenOptions={{headerShown: false}}
         name="Home" component={HomeScreen} />
        <Tab.Screen options={{
        headerRight: () => <LogoutIcon />, 
        headerStyle: {
          backgroundColor: 'rgb(125, 129, 247)',
        },
        headerTintColor: 'darkorange'
    }} 
        screenOptions={{ headerShown: false }}
         name="Notifications" component={NotificationsScreen} />
        <Tab.Screen options={{
        headerRight: () => <LogoutIcon />,
        headerStyle: {
          backgroundColor: 'rgb(125, 129, 247)',
        },
        headerTintColor: 'darkorange'
    }}
        screenOptions={{ headerShown: false }}
         name="Locations" component={LocationsScreen} />
        <Tab.Screen options={{
        headerRight: () => <LogoutIcon />,
        headerStyle: {
          backgroundColor: 'rgb(125, 129, 247)',
        },
        headerTintColor: 'darkorange'
    }}
        screenOptions={{ headerShown: false }}
         name="Bookings" component={BookingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'rgb(125, 129, 247)', 
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  headerText: {
    color: 'darkorange'
  }
});