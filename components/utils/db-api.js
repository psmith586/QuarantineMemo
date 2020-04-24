import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const createMemo = async ({ date, location, hasCough, hasFever, hasFatigue, hasBreathing, note }) => {
  try{
      let userId = auth().currentUser.uid;

      let newMemo = {
        uid: userId,
        date: date,
        location: location,
        cough: hasCough,
        fever: hasFever,
        fatigue: hasFatigue,
        breathing: hasBreathing,
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