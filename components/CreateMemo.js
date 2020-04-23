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
  const [note, setNote] = useState({ value: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSubmitPressed = async () => {

    if(loading) return;
    
    let checkBlock = {
      hasCough: '',
      hasFever: '',
      hasFatigue: '',
      hasBreathing: '',
    };

    {/*handle checkboxes*/}
    if (cough) {
      checkBlock.hasCough = 'yes'
    }else{
      checkBlock.hasCough = 'no'
    }

    if (fever) {
      checkBlock.hasFever = 'yes'
    }else{
      checkBlock.hasFever = 'no'
    }

    if (fatigue) {
      checkBlock.hasFatigue = 'yes'
    }else{
      checkBlock.hasFatigue = 'no'
    }

    if (breathing) {
      checkBlock.hasBreathing = 'yes'
    }else{
      checkBlock.hasBreathing = 'no'
    }

    setLoading(true);

    const response = await createMemo( date, location, checkBlock, note );

    if (response.error){
      setError(response.error);
      setLoading(false);
    } else {

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
        onPress={() => setFever({ checked: !fatigue.checked })}
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