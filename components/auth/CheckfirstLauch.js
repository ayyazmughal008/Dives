import React from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
    
const HAS_LAUNCHED = 'hasLaunched';

export function setAppLaunched() {
   AsyncStorage.setItem(HAS_LAUNCHED, 'true');
}

export default async function checkIfFirstLaunch() {
  try {
    const hasLaunched = await AsyncStorage.getItem(HAS_LAUNCHED);
    if (hasLaunched === null) {
      setAppLaunched();
      return true;
    }
    return false;
  } catch (error) {
    console.log(error)
    return false;

  }
}