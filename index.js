/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './components/App';
import {name as appName} from './app.json';

import {YellowBox} from 'react-native';

YellowBox.ignoreWarnings(['Warning: ...']);

console.disableYellowBox = true;


AppRegistry.registerComponent(appName, () => App);
