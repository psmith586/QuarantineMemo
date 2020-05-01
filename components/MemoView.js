/* @flow */

import React, { memo } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Appbar, Button, List, DefaultTheme} from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import { Memos } from './Memos';

export const MemoView = ({ route, navigation }) => {
  
  if(route.params === undefined) return Memos({navigation});
  const { id, data } = route.params; // we will need to pass id to "edit memo"

  return (    
    <>
      {/* Similar to NavBar but without navigation */}
      <Appbar>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={'View Memo'} />
        <Appbar.Action icon="magnify" onPress={() => console.log('Pressed search')} />
      </Appbar>
      <ScrollView style={style.page}>
          <View style={style.fieldRow}>
          <Button
            style={style.button}
            icon={({ size, color }) => (
              <Image source={require('./resources/date.png')} style={style.icon}/>
            )}>
          </Button>
          <List.Item
            style = {style.fieldList}
            title="Date"
            description={data.date}
          />
          </View>

          <View style={style.fieldRow}>
          <Button
            style={style.button}
            icon={({ size, color }) => (
              <Image source={require('./resources/temp.png')} style={style.icon}/>
            )}>
          </Button>
          <List.Item
            style = {style.fieldList}
            title="Temperature"
            description={data.temp + "°F"} 
          />
          </View>

          <View style={style.fieldRow}>
          <Button
            style={style.button}
            icon={({ size, color }) => (
              <Image source={require('./resources/location.png')} style={style.icon}/>
            )}>
          </Button>
          <List.Item
            style = {style.fieldList}
            title="Location(s)"
            description={data.location}
          />
          </View>

          <List.Accordion
              title="Symptom(s)"
              left={props => <List.Icon icon={({ size, color }) => (
               <Image source={require('./resources/symptoms.png')} style={style.icon}/>
               )} />}
          >

            <View style={style.fieldRow}>
                <Button
                    style={style.button}
                    icon={({ size, color }) => (
                    <Image source={require('./resources/cough.png')} style={style.icon}/>
                    )}>
                </Button>
                <List.Item style = {style.fieldList} title="Coughing?" description={data.cough}/>
             </View>

            <View style={style.fieldRow}>
                <Button
                    style={style.button}
                    icon={({ size, color }) => (
                    <Image source={require('./resources/fever.png')} style={style.icon}/>
                    )}>
                </Button>
                <List.Item style = {style.fieldList} title="Fever?" description={data.fever}/>
             </View>

            <View style={style.fieldRow}>
                <Button
                    style={style.button}
                    icon={({ size, color }) => (
                    <Image source={require('./resources/fatigue.png')} style={style.icon}/>
                    )}>
                </Button>
                <List.Item style = {style.fieldList} title="Feeling Fatigue?" description={data.fatigue}/>
             </View>

            <View style={style.fieldRow}>
                <Button
                    style={style.button}
                    icon={({ size, color }) => (
                    <Image source={require('./resources/breathe.png')} style={style.icon}/>
                    )}>
                </Button>
                <List.Item style = {style.fieldList} title="Trouble Breathing?" description={data.breathing}/>
             </View>

            <View style={style.fieldRow}>
                <Button
                    style={style.button}
                    icon={({ size, color }) => (
                    <Image source={require('./resources/headache.png')} style={style.icon}/>
                    )}>
                </Button>
                <List.Item style = {style.fieldList} title="Headache?" description={data.headache}/>
             </View>

            <View style={style.fieldRow}>
                <Button
                    style={style.button}
                    icon={({ size, color }) => (
                    <Image source={require('./resources/throat.png')} style={style.icon}/>
                    )}>
                </Button>
                <List.Item style = {style.fieldList} title="Sore Throat?" description={data.throat}/>
             </View>

            <View style={style.fieldRow}>
                <Button
                    style={style.button}
                    icon={({ size, color }) => (
                    <Image source={require('./resources/smell.png')} style={style.icon}/>
                    )}>
                </Button>
                <List.Item style = {style.fieldList} title="Loss of Taste or Smell?" description={data.smell}/>
             </View>

            <View style={style.fieldRow}>
                <Button
                    style={style.button}
                    icon={({ size, color }) => (
                    <Image source={require('./resources/chills.png')} style={style.icon}/>
                    )}>
                </Button>
                <List.Item style = {style.fieldList} title="Chills?" description={data.chills}/>
             </View>

            <View style={style.fieldRow}>
                <Button
                    style={style.button}
                    icon={({ size, color }) => (
                    <Image source={require('./resources/muscle.png')} style={style.icon}/>
                    )}>
                </Button>
                <List.Item style = {style.fieldList} title="Muscle Pains?" description={data.pain}/>
             </View>

          </List.Accordion>

          <View style={style.fieldRow}>
          <Button
            style={style.button}
            icon={({ size, color }) => (
              <Image source={require('./resources/notes.png')} style={style.icon}/>
            )}>
          </Button>
          <List.Item
            style = {style.fieldList}
            title="Notes"
            description={data.note}
          />
          </View>

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

const style = StyleSheet.create({
  page: {
    padding: 10
  },
  fieldRow: {
    flexDirection: 'row'
  },
  fieldList: {
    width: 300,
    flexWrap:'wrap'
  },
  button: {
    paddingTop: 10
  },
  icon: {
    width: 45,
    height: 45
  },
});

export default memo(MemoView);
