
import SignUpPage from './SignUp';
import LoginPage from './Login';
import Tabs from './Tabs';

import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from './firebase/index';

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const Stack = createNativeStackNavigator();

const App = () => {
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
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

  return (
    <NavigationContainer>
      {isAuth ? <Tabs /> : <FrontPageNavigator />}
    </NavigationContainer>
  );
};

export default App;
