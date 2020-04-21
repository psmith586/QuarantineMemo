/* @flow */
import React, { memo, useState } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { emailValidator, nameValidator, passwordValidator } from './utils/validator'
import { signUpUser } from './utils/api'
import { Header } from 'react-native/Libraries/NewAppScreen'
import { Appbar, TextInput, Button, List } from 'react-native-paper';

export const signupTitle = 'sign up';

export const SignUp = ({ navigation }) => {
  const [name, setName] = useState({ value:'', error: '' });
  const [email, setEmail] = useState({ value:'', error: '' });
  const [password, setPassword] = useState({ value:'', error: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const onSignUpPressed = async () => {
    if (loading) return;

    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || nameError || passwordError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });

      return;
    }

    setLoading(true);

    const response = await signUpUser({
      name: name.value,
      email: email.value,
      password: password.value
    });

    if (response.error) {
      setError(response.error);
    }

    setLoading(false);

  };

  return (
    <View>
      <Appbar> 
        <Appbar.Content title={'Sign Up'} />
      </Appbar>
      <TextInput
        label='Username'
        returnKeyType='next'
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}  
      />

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
        title='SignUp'
        loading={loading}
        mode='contained'
        onPress={onSignUpPressed}
      >
        Sign Up
      </Button>

      <View>
        <Text>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text>Login</Text>
        </TouchableOpacity>
      </View>
    </View>  
  );
};

export default memo(SignUp);