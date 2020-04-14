/* @flow */
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import Home from './Home';
import MemoView from './MemoView';
import SignUp from './SignUp';
import Loading from './Loading'

const Navigator = createSwitchNavigator(
  {
    Home,
    Login,
    SignUp,
    MemoView,
    Loading
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none'
  }
);

export default createAppContainer(Navigator);