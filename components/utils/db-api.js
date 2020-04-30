import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const createMemo = async (
  { date,
    temp,
    location, 
    hasCough, 
    hasFever, 
    hasFatigue, 
    hasBreathing,
    hasHeadache,
    hasChills,
    hasPain,
    hasSmell,
    hasThroat, 
    note 
  }
) => {
    try{
      let userId = auth().currentUser.uid;

      let newMemo = {
        uid: userId,
        date: date,
        temp: temp,
        location: location,
        cough: hasCough,
        fever: hasFever,
        fatigue: hasFatigue,
        breathing: hasBreathing,
        headache: hasHeadache,
        chills: hasChills,
        pain: hasPain,
        smell: hasSmell,
        throat: hasThroat,
        note: note
      };

      const ref = firestore().collection('memos');
    
      ref.add(newMemo);

      return {};
    }catch(error){
      return {
        error: error.code
      };
    }   
};

export const getAllMemos = () => {
    return firestore.getMemos();
};

export const saveTokenToDatabase = (token) => {
  // Assume user is already signed in
  const userId = auth().currentUser.uid;

  // Add the token to the users datastore
  firestore()
    .collection('users')
    .doc(userId)
    .update({
      tokens: firestore.FieldValue.arrayUnion(token),
    }).catch(error => {
      console.log(error);
    });
  };