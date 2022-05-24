
import SignUpPage from './SignUp';
import LoginPage from './Login';
import HomeScreen from './HomeScreen';

import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { MaterialIcons } from '@expo/vector-icons';
import { auth } from './firebase/index';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs(); //Ignore all log notifications

const Stack = createNativeStackNavigator();
const innerStack = createNativeStackNavigator();

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    // Mounting function
    const unsubscribeAuthStateChanged = onAuthStateChanged(
        auth,
        (authenticatedUser) => {
            if (authenticatedUser) {
                setIsAuth(true);
            } else {
                setIsAuth(false);
            }
        }
    );
    return unsubscribeAuthStateChanged;
  }, []);
  
  const FrontPageNavigator = () => (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="Sign Up" component={SignUpPage} />
      </Stack.Navigator>
    );

  const logoutHandler = () => {
      signOut(auth).then(() => {
          setIsAuth(false);
          setUser({});
      });
  };

  const LogoutIcon = () => (
    <TouchableOpacity onPress={logoutHandler}>
        <MaterialIcons name="logout" size={28} color="#407BFF" />
    </TouchableOpacity>
);

// to set up inner pages with createbottomtabs
const InnerNavigator = () => (
  <innerStack.Navigator initialRouteName='Home'>
      <innerStack.Screen name="Home" 
      options={{
        headerTitle: 'Home',
        headerRight: () => <LogoutIcon />,
    }}
    component={HomeScreen} 
    />
  </innerStack.Navigator>
);

  return (
    <NavigationContainer>
      {isAuth ? <InnerNavigator /> : <FrontPageNavigator />}
    </NavigationContainer>
  );
};

export default App;
