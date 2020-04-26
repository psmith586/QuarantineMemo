/* @flow */

import React, { useState, useEffect, memo } from 'react'
import { Appbar, TextInput, Button, List, Text, DefaultTheme } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'

export const MemoView = ({ route, navigation }) => {
  /* catch docID */
  const { docID } = route.params;
  // console.log(route.params.breathing);
  /* get data from doc */

  return (    
    <>
      {/* Similar to NavBar but without navigation */}
      <Appbar theme={theme}> 
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={'View Memo'} />
        <Appbar.Action icon="magnify" onPress={() => console.log('Pressed search')} />
      </Appbar>
      <List.Item
        title="Date"
        description={route.params.date}
      />
      <List.Item
        title="Temperature"
        description="Need to do this"
      />
      <List.Item
        title="Location(s)"
        description={route.params.location}
      />
      <List.Item
        title="Symptom(s)"
        description="Need to do this"
      />
      <List.Item
        title="Notes"
        description={route.params.note}
      />
      <Button 
        mode="contained"
        dark={true}
        color="#2EB6B1"
        style={{marginBottom:20, marginTop:20, marginLeft:60, marginRight:60}}
      >Edit Memo</Button>
    </>
  );
}

const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#336699'
  },
};

export default memo(MemoView);
