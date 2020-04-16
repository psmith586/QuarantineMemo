import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'


export const signUpUser = async ({ name, email, password }) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    auth().currentUser.updateProfile({
      displayName: name
    });

    let userID = auth().currentUser.uid;
    let newUserDoc = {
      userID: userID,
      username: name,
      email: email
    };

    firestore().collection('users').add(newUserDoc);

    return {};
  } catch (error) {
    return {
      error: error.code
    };
  }
};

export const loginUser = async ({ email, password }) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);

    return {};
  } catch (error) {
    return {
      error: error.code
    };
  }
};

export const logoutUser = () => {
  auth().signOut();
};