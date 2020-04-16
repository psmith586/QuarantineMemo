import auth from '@react-native-firebase/auth';


export const signUpUser = async ({ name, email, password }) => {
  try {
    await auth().createUserWithEmailAndPassword(email, password);
    auth().currentUser.updateProfile({
      displayName: name
    });
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