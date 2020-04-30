/* @flow */
import React, { memo, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import auth from '@react-native-firebase/auth'

const Loading = ({ navigation }) => {

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