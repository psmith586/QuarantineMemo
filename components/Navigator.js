/* @flow */
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Login from './Login';
import Memos from './Memos';
import MemoView from './MemoView';
import SignUp from './SignUp';
import Loading from './Loading';
import SideMenu from './SideMenu';
import CreateMemo from './CreateMemo';
import InfoPage from './InfoPage';

const Navigator = createSwitchNavigator(
  {
    Memos,
    Login,
    SignUp,
    MemoView,
    SideMenu,
    Loading,
    CreateMemo,
    InfoPage
  },
  {
    initialRouteName: 'Loading',
    headerMode: 'none'
  }
);

export default createAppContainer(Navigator);