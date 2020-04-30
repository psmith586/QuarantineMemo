/* @flow */
import React from 'react'
import Navigator from './Navigator'
import '@react-native-firebase/auth'
import '@react-native-firebase/firestore'
import '@react-native-firebase/messaging'

//import NotificationsManager from './utils/NotificationsManager'

import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';

 const theme = {
    ...DefaultTheme,
    dark: false,
    roundness: 8,
    colors: {
      primary: '#336699',
      accent: '#0D3B66',
      background: '#FFFFFF',
      surface: '#FAFBFB',
      text: '#0D3B66',
      disabled: '#2EB6B1',
      error: '#8190A5',
      disabled: '#BEC6C6',
      placeholder: '#336699',
      backdrop: '#FAFBFB',
    },
    fonts: {
    },
  }

export default function App() {
  return(
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  )
}