import React, { memo, useState } from 'react'
import { View, Text } from 'react-native'
import { TextInput, Appbar, Button, Checkbox } from 'react-native-paper'
import { TouchableOpacity } from 'react-native-gesture-handler'
import DatePicker from 'react-native-datepicker'
import { createMemo } from './utils/db-api'

export const CreateMemo = ({ navigation }) => {

  const [date, setDate] = useState({ value: '2020-04-23'});
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

      {/*location*/}
      <TextInput 
        label='Location'
        returnKeyType='next'
        value={location.value}
        onChangeText={text => setLocation({ value: text })}
      />
      {/*checkbox forms*/}
      <Checkbox 
        status={cough.checked ? 'checked' : 'unchecked'}
        onPress={() => setCough({ checked: !cough.checked })}
      />
      <Text>Cough</Text>
      
      <Checkbox 
        status={fever.checked ? 'checked' : 'unchecked'}
        onPress={() => setFever({ checked: !fever.checked })}
      />
      <Text>Fever</Text>
      
      <Checkbox 
        status={fatigue.checked ? 'checked' : 'unchecked'}
        onPress={() => setFatigue({ checked: !fatigue.checked })}
      />
      <Text>Fatigue</Text>
      
      <Checkbox 
        status={breathing.checked ? 'checked' : 'unchecked'}
        onPress={() => setBreathing({ checked: !breathing.checked })}
      />
      <Text>Difficulty Breathing</Text>

      <Checkbox 
        status={headache.checked ? 'checked' : 'unchecked'}
        onPress={() => setHeadache({ checked: !headache.checked })}
      />
      <Text>Headache</Text>

      <Checkbox 
        status={throat.checked ? 'checked' : 'unchecked'}
        onPress={() => setThroat({ checked: !throat.checked })}
      />
      <Text>Sore Throat</Text>

      <Checkbox 
        status={smell.checked ? 'checked' : 'unchecked'}
        onPress={() => setSmell({ checked: !smell.checked })}
      />
      <Text>Loss of Taste/Smell</Text>

      <Checkbox 
        status={chills.checked ? 'checked' : 'unchecked'}
        onPress={() => setChills({ checked: !chills.checked })}
      />
      <Text>Chills/Shaking</Text>

      <Checkbox 
        status={pain.checked ? 'checked' : 'unchecked'}
        onPress={() => setPain({ checked: !pain.checked })}
      />
      <Text>Muscle Pain</Text>

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

export default memo(CreateMemo);