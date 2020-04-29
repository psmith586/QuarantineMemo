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
        <Drawer.Screen name="Information Page" component={InfoPage} />
        <Drawer.Screen name="Daily Memos" component={Memos} />
        <Drawer.Screen name='Create A Memo' component={CreateMemo} />
        <Drawer.Screen name="View Memo" component={MemoView} />
        <Drawer.Screen name="Log In" component={Login} />
        <Drawer.Screen name="Log Out" component={Logout} />
        <Drawer.Screen name="Sign Up" component={SignUp} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default memo(SideMenu);