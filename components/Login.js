import React, { memo, useState } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { emailValidator, passwordValidator } from './utils/validator'
import { loginUser } from './utils/api'
import { Header } from 'react-native/Libraries/NewAppScreen'
import { Appbar, TextInput, Button, List } from 'react-native-paper';

export const Login = ({ navigation }) => {
  const [email, setEmail] = useState({ value:'', error: '' });
  const [password, setPassword] = useState({ value:'', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onLoginPressed = async () => {
    if (loading) return;

    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });

      return;
    }

    setLoading(true);

    const response = await loginUser({
      email: email.value,
      password: password.value
    });

    if (response.error) {
      setError(response.error);
    }

    setLoading(false);
  };

  return(
    <View>
      <Appbar> 
        <Appbar.Content title={'Login'} />
      </Appbar>

      <TextInput
        label='Email'
        returnKeyType='next'
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize='none'
        autoCompleteType='email'
        textContentType='emailAddress'
        keyboardType='email-address'
      />

      <TextInput
        label='Password'
        returnKeyType='done'
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
        autoCapitalize='none'
      />

      <Button 
        title='Login' 
        loading={loading} 
        mode='contained' 
        onPress={onLoginPressed}
      >
        Login
      </Button>

      <View>
        <Text>Don't Have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

};

export default memo(Login);
 