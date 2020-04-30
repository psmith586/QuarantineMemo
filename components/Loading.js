/* @flow */
import React, { memo, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import auth from '@react-native-firebase/auth'
import { GoogleSignin } from '@react-native-community/google-signin'

const Loading = ({ navigation }) => {

  try{
    GoogleSignin.signInSilently();
  }catch(error){
    navigation.navigate('Login');
  }

  if (GoogleSignin.isSignedIn()){
    navigation.navigate('SideMenu');
  }

  auth().onAuthStateChanged(user => {
    if (user) {
      navigation.navigate('SideMenu');
    }else {
      navigation.navigate('Login');
    }
  });

  return(
    <View>
      <ActivityIndicator size='large' />
    </View>
  );

};

export default memo(Loading);