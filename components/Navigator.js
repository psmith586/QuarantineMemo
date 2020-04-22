/* @flow */
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import Home from './Memos';
import MemoView from './MemoView';
import SignUp from './SignUp';
import Loading from './Loading';
import SideMenu from './SideMenu';

const Navigator = createSwitchNavigator(
  {
    Home,
    Login,
    SignUp,
    MemoView,
    SideMenu,
    Loading
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none'
  }
);

export default createAppContainer(Navigator);