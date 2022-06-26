
import SignUpPage from './Screens/SignUp';
import LoginPage from './Screens/Login';
import Tabs from './Tabs';

import React, { useState, useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase/index';

import { LogBox } from 'react-native';
import { RootSiblingParent } from 'react-native-root-siblings';


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
    <RootSiblingParent>
    <NavigationContainer>
      {isAuth ? <Tabs /> : <FrontPageNavigator />}
    </NavigationContainer>
    </RootSiblingParent>
  );
};

export default App;
