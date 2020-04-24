/* @flow */
// https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native
import React, { useState, useEffect, memo } from 'react'
import {FlatList} from 'react-native';
import { Appbar, TextInput, Button, List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';
import { MemoView } from './MemoView'

/* this is the entry point for the file */
export const Memos = ({ navigation }) => {
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
    await ref.add({
      content: aMemo,
      userID: auth().currentUser.uid
    });
    setAMemo('');
  }

  /* this renders each DB entry in 'memo_test' */
  function RenderEachMemo({ id, userID, content }) {
    var temp = 98.7;
    var numOfLocations = 1;
    var numOfSymp = 0;
    var space = "        ";
    if(auth().currentUser.uid == userID){
      return (
        <List.Item
          title={content}
          description={temp + "°F" + space 
           + numOfLocations + " Location(s)" + space
           + numOfSymp + " Symptom(s)"}
          onPress={() => navigation.navigate('memo', { docID: id })}
        />
      );
    } else {
      return null 
    }
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
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderEachMemo {...item} />}
      />

      {/* Text bar for user to enter info */}
      <TextInput label={'New Memo'} value={aMemo} onChangeText={setAMemo} />

      {/* Button that triggers new entry to DB */}
      <Button onPress={() => addMemo()}>New Memo</Button>
    </>
  );
};

export default memo(Memos);
