/* eslint-disable no-alert */
//import database from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
//types
export const UPDATE_EMAIL = 'UPDATE_EMAIL';
export const UPDATE_PASSWORD = 'UPDATE_PASSWORD';
export const LOGIN = 'LOGIN';
export const SIGNUP = 'SIGNUP';

//actions
export const updateEmail = email => {
  return {
    type: UPDATE_EMAIL,
    payload: email,
  };
};

export const updatePassword = password => {
  return {
    type: UPDATE_PASSWORD,
    payload: password,
  };
};

export const login = () => {
  return async (dispatch, getState) => {
    try {
      const {email, password} = getState.user;
      const response = await auth().signInWithEmailAndPassword(email, password);
      dispatch({type: LOGIN, payload: response.user});
    } catch (err) {
      alert(err);
    }
  };
};

export const signup = () => {
  return async (dispatch, getState) => {
    try {
      const {email, password} = getState.user;
      const response = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      dispatch({type: SIGNUP, payload: response.user});
    } catch (err) {
      alert(err);
    }
  };
};
