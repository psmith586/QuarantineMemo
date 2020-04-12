/* @flow */
import React, {Component} from 'react';
//nav
import Navigator from './Navigator';
//redux
import {createStore} from 'redux';
import {Provider} from 'react-redux';
//import thunk from 'redux-thunk';
import rootReducer from './reducers';

//const middleware = applyMiddeware(thunk);
const store = createStore(rootReducer);

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Navigator />
      </Provider>
    );
  }
}
