import React, {useEffect} from 'react';
import AppNavContainer from './src/navigators';
import {SafeAreaProvider} from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <AppNavContainer />
    </SafeAreaProvider>
  );
}
