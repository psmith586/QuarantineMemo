/* @flow */
import React, { memo } from 'react'
import '@react-native-firebase/auth'
import '@react-native-firebase/firestore'
import '@react-native-firebase/app'
import { Memos } from './Memos'
import { MemoView } from './MemoView'
import { Login } from './Login'
import { SignUp } from './SignUp'
import { Logout } from './Logout'
import { CreateMemo } from './CreateMemo'
import { InfoPage } from './InfoPage'

import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';


export const Drawer = createDrawerNavigator();

function SideMenu() {
  return (
    <NavigationContainer>
      <Drawer.Navigator>
        <Drawer.Screen name="InfoPage" component={InfoPage} />
        <Drawer.Screen name="memos" component={Memos} />
        <Drawer.Screen name='memo' component={MemoView} />
        <Drawer.Screen name="login" component={Login} />
        <Drawer.Screen name="sign up" component={SignUp} />
        <Drawer.Screen name="logout" component={Logout} />
        <Drawer.Screen name="createMemo" component={CreateMemo} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default memo(SideMenu);