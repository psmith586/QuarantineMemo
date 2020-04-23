import React, { memo } from 'react'
import { View } from 'react-native'
import { Checkbox } from '@react-native-community/checkbox'

const CreateMemo = ({ navigation }) => {

  return(
    <View>
      <Checkbox />
      <Checkbox />
      <Checkbox />
      <Checkbox />
    </View>
  );

};

export default memo(CreateMemo);