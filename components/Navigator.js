/* @flow */
import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import Home from './Home';
import MemoView from './MemoView';
import SignUp from './SignUp';

const Navigator = createSwitchNavigator({
    Login: {
        screen: Login,
    },
    SignUp: {
        screen: SignUp,
    },
    Home: {
        screen: Home,
    },
    MemoView: {
        screen: MemoView,
    },
    initialRouteName: 'Login',
});

export default createAppContainer(Navigator);