/* @flow */
import React from 'react'
import Navigator from './Navigator'
import '@react-native-firebase/auth'
import '@react-native-firebase/firestore'
import { DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { GoogleSignin } from '@react-native-community/google-signin'

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

  GoogleSignin.configure({
    webClientId: '100280590667-fafncsi3vo1eci116q1p1hgt91spefil.apps.googleusercontent.com',
    offlineAccess: true,
    hostedDomain: '',
  });

  return(
    <PaperProvider theme={theme}>
      <Navigator />
    </PaperProvider>
  )
}