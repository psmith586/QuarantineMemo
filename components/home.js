/* @flow */

import React, { memo } from 'react'
import { View, Button } from 'react-native'
import { logoutUser } from './utils/api'

const Home = () => {
  
  return(
    <View>
      <Button title='createMemo' mode='outlined'>
        Create a Memo
      </Button>

      <Button title='logout' mode='outlined' onPress={() => logoutUser()}>
        Logout
      </Button>
    </View>
  );
};

export default memo(Home);
