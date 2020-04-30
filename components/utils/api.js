import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore'
import { GoogleSignin } from '@react-native-community/google-signin';


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
  let user = auth().currentUser;
  let googleUser = GoogleSignin.getCurrentUser()
  if(user){ 
    auth().signOut();
  } else if(googleUser){
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  }

};

//google sign in handlers
//on sign in with google button, create user doc
export const signInWithGoogle = async () => {
  try{
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();

      let newUserDoc = {
        userID: userInfo.user.id,
        username: userInfo.user.name,
        email: userInfo.user.email,
      }

      firestore().collection('users')
      .add(newUserDoc)
      .catch(error => {console.log(error)});

  }catch(error){
    console.log('flag');
  }

}; 