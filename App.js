import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import { useFonts } from 'expo-font';

import Navs from './navigation/Navs'

export default function App() {
  const [loaded] = useFonts({
    LatoBold: require('./assets/fonts/Lato-Bold.ttf'),
    LatoRegular: require('./assets/fonts/Lato-Regular.ttf'),
    PoppinsBlack: require('./assets/fonts/Poppins-Black.ttf'),
    PoppinsBold: require('./assets/fonts/Poppins-Bold.ttf'),
    PoppinsSemiBold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    PoppinsRegular: require('./assets/fonts/Poppins-Regular.ttf'),
    OpenSansRegular: require('./assets/fonts/OpenSans-Regular.ttf'),
    OpenSansBold: require('./assets/fonts/OpenSans-Bold.ttf'),
    OpenSansSemiBold: require('./assets/fonts/OpenSans-SemiBold.ttf'),
  });

  if (!loaded) {
      return null;
  };

  return (
    <NavigationContainer>
      <Navs />
      <StatusBar style="auto"/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
