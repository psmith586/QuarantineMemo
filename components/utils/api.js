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
  auth().signOut();
  
};

//google sign in handlers
//on sign in with google button, create user doc
export const signInWithGoogle = async () => {

  try{
    await GoogleSignin.hasPlayServices();
    
    const data = await GoogleSignin.signIn();

    const credential = auth.GoogleAuthProvider.credential(
      data.idToken,
      data.serverAuthCode,
    );

    await auth().signInWithCredential(credential);

      let newUserDoc = {
        userID: auth().currentUser.uid,
        username: auth().currentUser.displayName,
        email: auth().currentUser.email,
      }

      firestore().collection('users')
      .add(newUserDoc)
      .catch(error => {console.log(error)});

  }catch(error){
    console.log('flag at google sign in');
  }

}; 