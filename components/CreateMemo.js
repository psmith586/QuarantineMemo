import React, { memo, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native'
import { TextInput, Appbar, Button, Checkbox } from 'react-native-paper'
import DatePicker from 'react-native-datepicker'
import { createMemo } from './utils/db-api'
import Geolocation from '@react-native-community/geolocation'

export const CreateMemo = ({ navigation }) => {

  const [date, setDate] = useState({ value: '2020-04-23'});
  const [temp, setTemp] = useState({ value: '' });
  const [location, setLocation] = useState({ value: '' });
  const [geoLocation, setGeoLocation] = useState({ value: '' });
  const [cough, setCough] = useState({ checked: false });
  const [fever, setFever] = useState({ checked: false });
  const [fatigue, setFatigue] = useState({ checked: false });
  const [breathing, setBreathing] = useState({ checked: false });
  const [headache, setHeadache] = useState({ checked: false });
  const [chills, setChills] = useState({ checked: false });
  const [pain, setPain] = useState({ checked: false });
  const [throat, setThroat] = useState({ checked: false });
  const [smell, setSmell] = useState({ checked: false });
  const [note, setNote] = useState({ value: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const setInitialState = () => {
    setTemp({value: ''})
    setDate({ value: '2020-04-23' })
    setLocation({ value: '' });
    setGeoLocation({ value: '' });
    setNote({ value: '' });
    setCough({ checked: false });
    setFever({ checked: false });
    setFatigue({ checked: false });
    setBreathing({ checked: false });
    setLoading(false);
  };

  const onSubmitPressed = async () => {

    if(loading) return;

    let hasCough = (cough.checked ? 'yes' : 'no');
    let hasFever = (fever.checked ? 'yes' : 'no');
    let hasFatigue = (fatigue.checked ? 'yes' : 'no');
    let hasBreathing = (breathing.checked ? 'yes' : 'no');
    let hasHeadache = (headache.checked ? 'yes' : 'no');
    let hasChills = (chills.checked ? 'yes' : 'no');
    let hasPain = (pain.checked ? 'yes' : 'no');
    let hasThroat = (throat.checked ? 'yes' : 'no');
    let hasSmell = (smell.checked ? 'yes' : 'no');

    setLoading(true);

    const response = await createMemo({
      date: date.value,
      temp: temp.value,
      location: location.value,
      geoLocation: geoLocation.value,
      hasCough: hasCough,
      hasFever: hasFever,
      hasFatigue: hasFatigue,
      hasBreathing: hasBreathing,
      hasHeadache: hasHeadache,
      hasChills: hasChills,
      hasPain: hasPain,
      hasSmell: hasSmell,
      hasThroat: hasThroat, 
      note: note.value 
    });

    if (response.error){
      setError(response.error);
      setLoading(false);
    } else {
      setInitialState();
      navigation.navigate('memos'); 
    }

  };
  
  const getLocaton = () => {
    navigator.geolocation.getCurrentPosition(position => {
      const location = JSON.stringify(position);
      setLocation(location);    
    },
    error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  const getLocaton = async () => {
    await Geolocation.getCurrentPosition(position => {
      const location = JSON.stringify(position);
      setGeoLocation({ value: location });
    },
    error => Alert.alert(error.message),
      {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return(
    <ScrollView>
      <Appbar>
        <Appbar.Action icon="menu" onPress={() => navigation.toggleDrawer()} />
        <Appbar.Content title={'Create Memo'}/>
        <Appbar.Action icon="magnify" onPress={() => console.log('Pressed search')} />
      </Appbar>

      {/*date*/}
      <View style={style.fieldView}>
          <Image source={require('./resources/date.png')} style={style.fieldViewIcon}/>
          <Text style={style.fieldViewTitle}>Date</Text>
      </View>

      <View style = {style.fieldViewInput}>
      <DatePicker
        date={date.value}
        mode='date'
        placeholder='Select Date'
        format='YYYY-MM-DD'
        minDate='2020-04-23'
        maxDate='2022-12-31'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
        onDateChange={(date) => setDate({value: date})}
      />
      </View>

      {/*temperature*/}
      <View style={style.fieldView}>
          <Image source={require('./resources/temp.png')} style={style.fieldViewIcon}/>
          <Text style={style.fieldViewTitle}>Temperature</Text>
      </View>
      <View style = {style.fieldViewInput}>
        <TextInput
          placeholder = 'Type your temperature here'
          returnKeyType='next'
          value={temp.value}
          onChangeText={text => setTemp({ value: text })}
          style = {style.fieldViewInputText}
        />
      </View>

      {/*location*/}
      <View style={style.fieldView}>
          <Image source={require('./resources/location.png')} style={style.fieldViewIcon}/>
          <Text style={style.fieldViewTitle}>Location(s)</Text>
      </View>
      <View style = {style.fieldViewInput}>
        <Button onPress={() => getLocaton()}>
          Set Location
        </Button>
      </View>

      <Text style = {style.or}>OR</Text>

      <View style = {style.fieldViewInput}>
        <Button style = {style.button} onPress={() => getLocaton()}>
          Set Location
        </Button>
      </View>


      <View style={style.fieldView}>
          <Image source={require('./resources/symptoms.png')} style={style.fieldViewIcon}/>
          <Text style={style.fieldViewTitle}>Symptom(s)</Text>
      </View>

      {/*checkbox forms*/}
      <View style = {style.symptomViewItem}>
          <Checkbox
            status={cough.checked ? 'checked' : 'unchecked'}
            onPress={() => setCough({ checked: !cough.checked })}
          />
          <Image source={require('./resources/cough.png')} style={style.symptomViewIcon}/>
          <Text style = {style.symptomViewText}>Cough</Text>
      </View>

      <View style = {style.symptomViewItem}>
          <Checkbox
            status={fever.checked ? 'checked' : 'unchecked'}
            onPress={() => setFever({ checked: !fever.checked })}
          />
          <Image source={require('./resources/fever.png')} style={style.symptomViewIcon}/>
          <Text style = {style.symptomViewText}>Fever</Text>
      </View>

      <View style = {style.symptomViewItem}>
          <Checkbox
            status={fatigue.checked ? 'checked' : 'unchecked'}
            onPress={() => setFatigue({ checked: !fatigue.checked })}
          />
          <Image source={require('./resources/fatigue.png')} style={style.symptomViewIcon}/>
          <Text style = {style.symptomViewText}>Fatigue</Text>
      </View>

      <View style = {style.symptomViewItem}>
          <Checkbox
            status={breathing.checked ? 'checked' : 'unchecked'}
            onPress={() => setBreathing({ checked: !breathing.checked })}
          />
          <Image source={require('./resources/breathe.png')} style={style.symptomViewIcon}/>
          <Text style = {style.symptomViewText}>Difficulty Breathing</Text>
      </View>

      <View style = {style.symptomViewItem}>
          <Checkbox
            status={headache.checked ? 'checked' : 'unchecked'}
            onPress={() => setHeadache({ checked: !headache.checked })}
          />
          <Image source={require('./resources/headache.png')} style={style.symptomViewIcon}/>
          <Text style = {style.symptomViewText}>Headache</Text>
      </View>

      <View style = {style.symptomViewItem}>
          <Checkbox
            status={throat.checked ? 'checked' : 'unchecked'}
            onPress={() => setThroat({ checked: !throat.checked })}
          />
          <Image source={require('./resources/throat.png')} style={style.symptomViewIcon}/>
          <Text style = {style.symptomViewText}>Sore Throat</Text>
      </View>

      <View style = {style.symptomViewItem}>
          <Checkbox
            status={smell.checked ? 'checked' : 'unchecked'}
            onPress={() => setSmell({ checked: !smell.checked })}
          />
          <Image source={require('./resources/smell.png')} style={style.symptomViewIcon}/>
          <Text style = {style.symptomViewText}>Loss of Taste/Smell</Text>
      </View>

      <View style = {style.symptomViewItem}>
          <Checkbox
            status={chills.checked ? 'checked' : 'unchecked'}
            onPress={() => setChills({ checked: !chills.checked })}
          />
          <Image source={require('./resources/chills.png')} style={style.symptomViewIcon}/>
          <Text style = {style.symptomViewText}>Chills/Shaking</Text>
      </View>

      <View style = {style.symptomViewItem}>
          <Checkbox
            status={pain.checked ? 'checked' : 'unchecked'}
            onPress={() => setPain({ checked: !pain.checked })}
          />
          <Image source={require('./resources/muscle.png')} style={style.symptomViewIcon}/>
          <Text style = {style.symptomViewText}>Muscle Pain</Text>
      </View>

      {/*notes input*/}
      <View style={style.fieldView}>
          <Image source={require('./resources/notes.png')} style={style.fieldViewIcon}/>
          <Text style={style.fieldViewTitle}>Notes</Text>
      </View>
      <View style = {style.fieldViewInput}>
        <TextInput
            placeholder='Type additional notes here'
            returnKeyType='done'
            value={note.value}
            onChangeText={text => setNote({value: text})}
            style = {style.fieldViewInputText}
        />
      </View>

      <View style = {style.fieldViewInput}>
      <Button onPress={() => onSubmitPressed()} style = {style.button}>Submit</Button>
      </View>

      <View style = {{height:30}}></View>

    </ScrollView>
  );

};

const style = StyleSheet.create({
  fieldView: {
    flexDirection: 'row',
    paddingTop: 20,
    paddingLeft: 20
  },
  fieldViewIcon: {
    width: 45,
    height: 45
  },
  fieldViewTitle: {
    fontSize: 20,
    paddingTop: 10,
    fontWeight: 'bold',
    color: '#0D3B66',
    paddingLeft: 10
  },
  fieldViewInput: {
    paddingLeft: 65
  },
  fieldViewInputText: {
    width: 300,
    height: 40
  },
  symptomViewItem: {
    flexDirection: 'row',
    padding: 10,
    paddingLeft: 70,
    alignItems: 'center'
  },
  symptomViewIcon: {
    width: 60,
    height: 60
  },
  symptomViewText: {
    padding: 10,
    color: '#0D3B66',
    fontSize: 16
  },
  button: {
    marginTop: 10,
    width: 300,
    backgroundColor: "#E0E6ED"
  },
  or: {
    marginLeft: 65,
    fontSize: 18,
    marginTop: 13,
    color: "#336699"
  }
});

export default CreateMemo;