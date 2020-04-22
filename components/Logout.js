import React, { memo, useState } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { emailValidator, passwordValidator } from './utils/validator'
import { logoutUser } from './utils/api'
import { Header } from 'react-native/Libraries/NewAppScreen'
import { Appbar, TextInput, Button, List } from 'react-native-paper';

export const Logout = ({ navigation }) => {
  const [email, setEmail] = useState({ value:'', error: '' });
  const [password, setPassword] = useState({ value:'', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onLogoutPressed = async () => {
    if (loading) return;

    setLoading(true);

    const response = await logoutUser();
  
      if (response.error) {
        setError(response.error);
      }
  
      setLoading(false);
  };

  return(
    <View>
      <Appbar> 
        <Appbar.Content title={'Logout'} />
      </Appbar>
      <Button 
        title='Logout' 
        loading={loading} 
        mode='contained' 
        onPress={onLogoutPressed}
      >
        Logout
      </Button>
    </View>
  );

};

export default memo(Logout);
 