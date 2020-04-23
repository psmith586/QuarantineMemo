/* @flow */
// https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native
import React, { useState, useEffect, memo } from 'react'
import {FlatList} from 'react-native';
import { Appbar, TextInput, Button, List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { Drawer } from './App'

/* this renders each DB entry in 'memo_test' */
function Memo({ userID, content }) {
  let uid = auth().currentUser.uid // current user id 
  if(auth().currentUser.uid == userID){
    return (
      <List.Item
        title={content}
      />
    );
  } else {
    return null 
  }
}

/* this is the entry point for the file */
export const Memos = () => {
  const [ aMemo, setAMemo ] = useState(''); // for adding to DB
  const [ loading, setLoading ] = useState(true); // for realtime update
  const [ memos, setMemos ] = useState([]); // for rendering

  const ref = firestore().collection('memo_user');
  
  /* "Every time a document is created, deleted or modified on the collection, 
     this method will trigger and update component state in realtime" */
  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { userID, content } = doc.data();
        list.push({
          id: doc.id,
          content,
          userID
        });
      });

      setMemos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  /* Add memo to DB */
  async function addMemo() {
    let uid = auth().currentUser.uid // current user id 
    await ref.add({
      content: aMemo,
      userID: uid
    });
    setAMemo('');
  }
  
  /* Render to Phone */
  return (    
    <>
      {/* Similar to NavBar but without navigation */}
      <Appbar> 
        <Appbar.Content title={'Memos'} />
      </Appbar>

      {/* render each DB entry */}
      <FlatList 
        style={{flex: 1}}
        data={memos}
        renderItem={({ item }) => <Memo {...item} />}
      />

      {/* Text bar for user to enter info */}
      <TextInput label={'New Memo'} value={aMemo} onChangeText={setAMemo} />

      {/* Button that triggers new entry to DB */}
      <Button onPress={() => addMemo()}>New Memo</Button>
    </>
  );
};

export default memo(Memos);
