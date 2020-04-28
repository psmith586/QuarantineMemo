/* @flow */
import React, { memo, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image } from 'react-native'
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
    <View style = {style.page}>

      <Appbar>
        <Appbar.Content title={'Sign Up For Quarantine Memo'} />
      </Appbar>

      <Button
        style = {style.logoView}
        icon={({ size, color }) => (
          <Image source={require('./resources/logo.png')} style={style.logo}/>
        )}>
      </Button>

      <Text style = {style.appName}>Quarantine Memo</Text>

      <View style = {style.form}>

      <TextInput
        label='Username'
        returnKeyType='next'
        value={name.value}
        onChangeText={text => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
        style = {style.formField}
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
        style = {style.formField}
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
        style = {style.formField}
      />

      <View style = {style.formSubmit}>
      <Button
        title='SignUp'
        loading={loading}
        mode='contained'
        onPress={onSignUpPressed}
      >
        Sign Up
      </Button>
      </View>

      <View style = {style.signUp}>
        <Text style = {style.text}>Already have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style = {style.text}>Login</Text>
        </TouchableOpacity>
      </View>

      </View>

    </View>  
  );
};

const style = StyleSheet.create({
    page: {
        backgroundColor: "#A7DBE7",
        alignItems: 'center',
        height: 1000
    },
    logo: {
        width: 110,
        height: 110
    },
    logoView: {
        width: 300,
        paddingTop: 30,
        paddingRight: 75
    },
    appName: {
        color: '#FFFFFF',
        fontSize: 36,
        paddingTop: 10,
        paddingBottom: 30
    },
    form: {
        paddingTop: 30,
        backgroundColor: "#E0E6ED",
        width: 350,
        height: 360,
        alignItems: 'center',
        paddingBottom: 50,
        borderRadius: 5
    },
    formField: {
        width: 300,
        borderRadius: 4
    },
    formSubmit: {
        paddingTop: 15,
        width: 300
    },
    signUp: {
       width: 300,
       color: '#8492A6',
       paddingTop: 15,
    },
    text: {
        color: '#8492A6',
        fontSize: 18
    }
});

export default memo(SignUp);