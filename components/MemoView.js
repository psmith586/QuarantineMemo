/* @flow */

import React, { useState, useEffect, memo } from 'react'
import { Appbar, TextInput, Button, List, Text } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'

export const MemoView = ({ route, navigation }) => {
  /* catch docID */
  const { docID } = route.params;

  /* get data from doc */
  
  return (    
    <>
      {/* Similar to NavBar but without navigation */}
      <Appbar> 
        <Appbar.Content title={'Memo'} />
      </Appbar>
      <Text>DocID = "{docID}"</Text>
      {/* <Text>UserID = "{newData}"</Text> */}
      {/* <Text>Content = "{data.content}"</Text> */}
    </>
  );
}

export default memo(MemoView);
