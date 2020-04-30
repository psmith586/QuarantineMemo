import React, { memo, useState } from 'react'
import { TouchableOpacity, Text, View, StyleSheet, Image } from 'react-native'
import { emailValidator, passwordValidator } from './utils/validator'
import { loginUser, signInWithGoogle } from './utils/api'
import { Appbar, TextInput, Button } from 'react-native-paper';
import { GoogleSignin, GoogleSigninButton } from '@react-native-community/google-signin'
 
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

  onGoogleSignInPressed = async () => {
    if(loading) return;

    setLoading(true)
    const response = await signInWithGoogle();

    if(response.error){
      setError(response.error);
    }

    setLoading(false);
  };

  return(
    <View style = {style.page}>

      <Appbar>
        <Appbar.Content title={'Login to Quarantine Memo'} />
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
        title='Login' 
        loading={loading} 
        mode='contained' 
        onPress={onLoginPressed}
      >
        Login
      </Button>
      </View>

      <View>
      <GoogleSigninButton
        style={{ width: 192, height: 48 }}
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Dark}
        onPress={() => onGoogleSignInPressed()}
      />
      </View>

      <View style = {style.signUp}>
        <Text style = {style.text}>Don't Have an Account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style = {style.text}>Sign Up</Text>
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
        height: 300,
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

export default memo(Login);
 