import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { createStackNavigator } from '@react-navigation/stack';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import Home from './Home';
import SingUp from './SingUp';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'

export default function RootLayout() {

  const Stack = createStackNavigator()
  
  const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

  if (!publishableKey) {
    throw new Error('Add EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY to your .env file')
  }

  return (
    <ClerkProvider publishableKey={'pk_test_dXNhYmxlLXN0b3JrLTMyLmNsZXJrLmFjY291bnRzLmRldiQ'}>
      <Stack.Navigator initialRouteName='SingUp'>
        <Stack.Screen name='Home' component={Home} options={{headerShown:false}}/>
        <Stack.Screen name='SingUp' component={SingUp} options={{headerShown:false}}/>
      </Stack.Navigator>
    </ClerkProvider>
  );
}
