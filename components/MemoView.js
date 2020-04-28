/* @flow */

import React, { useState, useEffect, memo } from 'react'
import { Appbar, TextInput, Button, List, Text, DefaultTheme } from 'react-native-paper';
import firestore from '@react-native-firebase/firestore'
import { ScrollView } from 'react-native-gesture-handler';

function getSymptoms(data) {
  var result = "";
  if( data.breathing === "yes") result += "";
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

export const MemoView = ({ route, navigation }) => {
  const { id, data } = route.params;

  state = {
    expanded: true
  }

  _handlePress = () =>
    this.setState({
      expanded: !this.state.expanded
    });

  return (    
    <>
      {/* Similar to NavBar but without navigation */}
      <Appbar theme={theme}> 
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={'View Memo'} />
        <Appbar.Action icon="magnify" onPress={() => console.log('Pressed search')} />
      </Appbar>
      <ScrollView>
          <List.Item
            title="Date"
            description={data.date}
          />
          <List.Item
            title="Temperature"
            description={data.temp}
          />
          <List.Item
            title="Location(s)"
            description={data.location}
          />
          <List.Accordion
              title="Symptom(s)"
              left={props => <List.Icon {...props} icon="folder" />}
          >
              <List.Item title="Trouble Breathing?" description={data.breathing}/>
              <List.Item title="Chills?" description={data.chills}/>
              <List.Item title="Coughing?" description={data.cough}/>
              <List.Item title="Feeling Fatigue?" description={data.fatigue}/>
              <List.Item title="Fever?" description={data.fever}/>
              <List.Item title="Headache?" description={data.headache}/>
              <List.Item title="Any Pains?" description={data.pain}/>
              <List.Item title="Loss of Taste or Smell?" description={data.smell}/>
              <List.Item title="Sour Throat?" description={data.throat}/>
          </List.Accordion>
          <List.Item
            title="Notes"
            description={data.note}
          />
          <Button 
            mode="contained"
            dark={true}
            color="#2EB6B1"
            style={{marginBottom:20, marginTop:20, marginLeft:60, marginRight:60}}
          >Edit Memo</Button>
      </ScrollView>
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
