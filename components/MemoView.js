/* @flow */

import React, { memo } from 'react'
import { Appbar, Button, List, DefaultTheme } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';

export const MemoView = ({ route, navigation }) => {
  const { id, data } = route.params; // we will need to pass id to "edit memo"

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
            description={data.temp + "°F"} 
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
              <List.Item title="Sore Throat?" description={data.throat}/>
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
