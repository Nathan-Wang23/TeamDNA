import React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/LoginScreen';
import HomeScreen from './screens/HomeScreen';
import CreateScreen from './screens/CreateScreen';
import NewsScreen from './screens/NewsScreen';
import CoversScreen from './screens/CoversScreen';



import routes from './constants/routes';

const Stack = createStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerShown: false
        }}
      >
        <Stack.Screen name={routes.Login} component={LoginScreen} />
        <Stack.Screen name={routes.Home} component={HomeScreen} />
        <Stack.Screen name={routes.Create} component={CreateScreen} />
        <Stack.Screen name={routes.News} component={NewsScreen} />
        <Stack.Screen name={routes.Covers} component={CoversScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}