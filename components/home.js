/* @flow */

import React, { useState, memo } from 'react'
import {Text, ScrollView} from 'react-native';
import { logoutUser } from './utils/api'
import{ createMemo, getAllMemos } from './utils/db-api'
import { diffClamp } from 'react-native-reanimated';
import { Appbar, TextInput, Button } from 'react-native-paper';


import firestore from '@react-native-firebase/firestore'

const Home = () => {
  const [ aMemo, setAMemo ] = useState('');
  const ref = firestore().collection('memo_test');

  async function addMemo() {
    await ref.add({
      content: aMemo
    });
    setAMemo('');
  }

  return (
    <>
      <Appbar>
        <Appbar.Content title={'TODOs List'} />
      </Appbar>
      <ScrollView style={{flex: 1}}>
        <Text>List of TODOs!</Text>
      </ScrollView>
      <TextInput label={'New Memo'} value={aMemo} onChangeText={setAMemo} />
      <Button onPress={() => addMemo()}>Add TODO</Button>
    </>
  );
};

// const Home = () => {
  


//   return(
//     <View>
//       <Button title='createMemo' mode='outlined'>
//         Create a Memo
//       </Button>



//       <Button title='logout' mode='outlined' onPress={() => logoutUser()}>
//         Logout
//       </Button>
//     </View>
//   );
// };

export default memo(Home);
