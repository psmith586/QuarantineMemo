import React, { memo, useState } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Appbar, Button, Checkbox } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DatePicker from 'react-native-datepicker'
import { createMemo } from './utils/db-api'

export const CreateMemo = ({ navigation }) => {

  const [date, setDate] = useState({ value: '2020-04-23'});
  const [temp, setTemp] = useState({ value: '' });
  const [location, setLocation] = useState({ value: '' });
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
    setNote({ value: '' });
    setCough({ checked: false });
    setFever({ checked: false });
    setFatigue({ checked: false });
    setBreathing({ checked: false });
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

  return(
    <View>
      <Appbar>
        <Appbar.Content title={'Create Memo'}/>
      </Appbar>

      {/*date*/}
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

      {/*temperature*/}
        <TextInput
          label='Temperature'
          returnKeyType='next'
          value={temp.value}
          onChangeText={text => setTemp({ value: text })}
        />

      {/*location*/}
      <TextInput 
        label='Location'
        returnKeyType='next'
        value={location.value}
        onChangeText={text => setLocation({ value: text })}
      />
      {/*checkbox forms*/}

      <View style = {style.listItem}>
      <Checkbox
        status={cough.checked ? 'checked' : 'unchecked'}
        onPress={() => setCough({ checked: !cough.checked })}
      />
      <Text style = {style.listText}>Cough</Text>
      </View>

      <View style = {style.listItem}>
      <Checkbox 
        status={fever.checked ? 'checked' : 'unchecked'}
        onPress={() => setFever({ checked: !fever.checked })}
      />
      <Text style = {style.listText}>Fever</Text>
      </View>

      <View style = {style.listItem}>
      <Checkbox 
        status={fatigue.checked ? 'checked' : 'unchecked'}
        onPress={() => setFatigue({ checked: !fatigue.checked })}
      />
      <Text style = {style.listText}>Fatigue</Text>
      </View>

      <View style = {style.listItem}>
      <Checkbox 
        status={breathing.checked ? 'checked' : 'unchecked'}
        onPress={() => setBreathing({ checked: !breathing.checked })}
      />
      <Text style = {style.listText}>Difficulty Breathing</Text>
      </View>

      <View style = {style.listItem}>
      <Checkbox 
        status={headache.checked ? 'checked' : 'unchecked'}
        onPress={() => setHeadache({ checked: !headache.checked })}
      />
      <Text style = {style.listText}>Headache</Text>
      </View>

      <View style = {style.listItem}>
      <Checkbox 
        status={throat.checked ? 'checked' : 'unchecked'}
        onPress={() => setThroat({ checked: !throat.checked })}
      />
      <Text style = {style.listText}>Sore Throat</Text>
      </View>

      <View style = {style.listItem}>
      <Checkbox 
        status={smell.checked ? 'checked' : 'unchecked'}
        onPress={() => setSmell({ checked: !smell.checked })}
      />
      <Text style = {style.listText}>Loss of Taste/Smell</Text>
      </View>

      <View style = {style.listItem}>
      <Checkbox 
        status={chills.checked ? 'checked' : 'unchecked'}
        onPress={() => setChills({ checked: !chills.checked })}
      />
      <Text style = {style.listText}>Chills/Shaking</Text>
      </View>

      <View style = {style.listItem}>
      <Checkbox 
        status={pain.checked ? 'checked' : 'unchecked'}
        onPress={() => setPain({ checked: !pain.checked })}
      />
      <Text style = {style.listText}>Muscle Pain</Text>
      </View>

      {/*notes input*/}
      <TextInput
        label='Notes'
        returnKeyType='done'
        value={note.value}
        onChangeText={text => setNote({value: text})}
      />

      <Button onPress={() => onSubmitPressed()}>Submit</Button>

      <View>
        <TouchableOpacity onPress={() => navigation.navigate('memos')}>
          <Text>Home</Text>
        </TouchableOpacity>
      </View>

    </View>
  );

};

const style = StyleSheet.create({
  listItem: {
    flexDirection: 'row'
  },
  listText: {
    padding: 10
  }
});

export default memo(CreateMemo);