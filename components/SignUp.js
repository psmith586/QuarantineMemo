/* @flow */
import React, { memo, useState } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, Linking, ScrollView } from 'react-native'
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
    <ScrollView>
    <View style = {style.page}>

      <Appbar>
        <Appbar.Content title={'Sign Up For Quarantine Memo'} />
      </Appbar>

      <Image source={require('./resources/logo.png')} style={style.logo}/>

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

      <View style = {style.privacy}>
      <Text style = {style.text}>By signing up, you agree to our </Text>
      <Text
        onPress={ ()=> Linking.openURL('https://www.dropbox.com/s/9dnz88lpejr1ier/Privacy_Policy.pdf?dl=0') }
        style = {style.linkText}>
        Privacy Policy
      </Text>
      </View>

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
        <Text style = {style.text}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style = {style.linkText}>Login</Text>
        </TouchableOpacity>
      </View>

      </View>

    </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
    page: {
        backgroundColor: "#A7DBE7",
        alignItems: 'center',
        height: 800
    },
    logo: {
        width: 110,
        height: 110,
        marginTop: 30
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
        height: 350,
        alignItems: 'center',
        paddingBottom: 50,
        borderRadius: 5,
        paddingBottom: 10
    },
    formField: {
        width: 300,
        borderRadius: 4
    },
    formSubmit: {
        paddingTop: 13,
        width: 300
    },
    signUp: {
       width: 300,
       color: '#8492A6',
       flexDirection: 'row',
       paddingTop: 6
    },
    text: {
        color: '#8492A6',
        fontSize: 14
    },
    privacy: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 10,
        width: 300
    },
    linkText: {
        color: '#336699',
        textDecorationLine: 'underline'
    }
});

export default memo(SignUp);