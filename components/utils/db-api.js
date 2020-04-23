import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const createMemo = async ({ date, location, checkBlock, note }) => {

    let userId = auth().currentUser.uid;

    let newMemo = {
        uid: userId,
        date: date.value,
        location: location.value,
        cough: checkBlock.hasCough,
        fever: checkBlock.hasFever,
        fatigue:checkBlock.hasFatigue,
        breathing: checkBlock.hasBreathing,
        note: note.value
    };

    const ref = firestore().collection('memos');

    ref.add(newMemo);
  
};

export const getAllMemos = () => {
    return firestore.getMemos();
};