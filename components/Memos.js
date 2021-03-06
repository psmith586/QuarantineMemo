/* @flow */
// https://invertase.io/blog/getting-started-with-cloud-firestore-on-react-native
import React, { useState, useEffect, memo, View } from 'react'
import {FlatList, StyleSheet, Image} from 'react-native';
import { Appbar, Text, Button, List, DefaultTheme } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import auth from '@react-native-firebase/auth';

/* this is the entry point for the file */
export const Memos = ({ navigation }) => {
  const [ aMemo, setAMemo ] = useState(''); // for adding to DB
  const [ loading, setLoading ] = useState(true); // for realtime update
  const [ memos, setMemos ] = useState([]); // for rendering

  const ref = firestore().collection('memos');
  /* "Every time a document is created, deleted or modified on the collection, 
     this method will trigger and update component state in realtime" */
  useEffect(() => {
    return ref.onSnapshot(querySnapshot => {
      const list = [];
      querySnapshot.forEach(doc => {
        if(auth().currentUser.uid == doc.data().uid) {
          list.push({
            id: doc.id,
            data: doc.data()
          });
        }
      });

      setMemos(list);

      if (loading) {
        setLoading(false);
      }
    });
  }, []);

  function getNumOfLocations(data) {
    if (data.location == null) return 0;
    return (data.location.split(", ").length);
  }

  function getNumOfSymptoms(data) {
    var sum = 0;
    if( data.breathing === "yes") sum++;
    if( data.chills    === "yes") sum++;
    if( data.cough     === "yes") sum++;
    if( data.fatigue   === "yes") sum++;
    if( data.fever     === "yes") sum++;
    if( data.headache  === "yes") sum++;
    if( data.pain      === "yes") sum++;
    if( data.smell     === "yes") sum++;
    if( data.throat    === "yes") sum++;
    return sum;
  }

  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  function formatDate(date) {
    var tokens = date.split("-");
    return (months[parseInt(tokens[1]-1)] + " " + parseInt(tokens[2]) + ", " + tokens[0]);
  }

  /* this renders each DB entry in 'memo_test' */
  function RenderEachMemo({ id, data }) {
    var temperature = (parseFloat(data.temp)).toFixed(2) + "°F";
    var locations = (getNumOfLocations(data) + " Location(s)").padStart(25, ' ');
    var symptoms = (getNumOfSymptoms(data) + " Symptom(s)").padStart(25, ' ');
    if(data.date.includes("-")) {
      data.date = formatDate(data.date);
    }
    return (
      <List.Item
        title={data.date}
        descriptionNumberOfLines={3}
        description={ temperature + locations + symptoms }
        onPress={() => navigation.navigate('memo', { 
          id,
          data
        })}
      />
    )
  }
  
  /* Render to Phone */
  return (    
    <>
      {/* Similar to NavBar but without navigation */}
      <Appbar>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={'Daily Memos'} />
        <Appbar.Action icon="magnify" onPress={() => console.log('Pressed search')} />
      </Appbar>

      {/* render each DB entry */}
      <FlatList
        data={memos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <RenderEachMemo {...item }  />}
      />

      <Button 
        mode="contained"
        dark={true}
        color="#2EB6B1"
        style={{marginBottom:20, marginTop:20, marginLeft:60, marginRight:60}}
        onPress={() => navigation.navigate('createMemo')}>Create Memo</Button>
      
      {/* Text bar for user to enter info */}
      {/* <TextInput label={'New Memo'} value={aMemo} onChangeText={setAMemo} /> */}
      {/* Button that triggers new entry to DB */}
      {/* <Button onPress={() => addMemo()}>New Memo</Button> */}
    </>
  );
};

export default memo(Memos);
