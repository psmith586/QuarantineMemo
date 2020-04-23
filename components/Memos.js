/* @flow */
// https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native
import React, { useState, useEffect, memo } from 'react'
import {FlatList, View} from 'react-native';
import { Appbar, TextInput, Button, List } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth'
import { logoutUser } from './utils/api'

import { Drawer } from './App'

/* this renders each DB entry in 'memo_test' */
function Memo({ content }) {
  return (
    <List.Item
      title={content}
    />
  );
}

/* this is the entry point for the file */
export const Memos = ({ navigation }) => {
  const [ loading, setLoading ] = useState(true); // for realtime update
  const [ memos, setMemos ] = useState([]); // for rendering

  const ref = firestore().collection('memo_test');


  
  /* "Every time a document is created, deleted or modified on the collection, 
     this method will trigger and update component state in realtime" */
  useEffect(() => {
    let mounted = true; // fixed warning https://www.debuggr.io/react-update-unmounted-component/
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        const { content } = doc.data();
        list.push({
          id: doc.id,
          content
        });
      });

      setMemos(list);

      if (loading) {
        setLoading(false);
      }
      mounted = false; // fixed warning
    });
  }, []);
  
  /* Render to Phone */
  return (    
    <>
      {/* Similar to NavBar but without navigation */}
      <Appbar> 
        <Appbar.Content title={'Memos'} subtitle={auth().currentUser.displayName}/>
      </Appbar>

      {/* render each DB entry */}
      <FlatList 
        style={{flex: 1}}
        data={memos}
        renderItem={({ item }) => <Memo {...item} />}
      />

      {/* Button that triggers new entry to DB */}
      <Button onPress={() => navigation.navigate('createMemo')}>Create Memo</Button>

      {/*Logout button*/}
      <Button
        title='Logout'
        mode='contained'
        onPress={logoutUser}
      >
        Logout
      </Button>
    </>
  );
};

export default memo(Memos);
