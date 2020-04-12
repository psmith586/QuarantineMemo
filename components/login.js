/* @flow */
import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';

import Logo from './Logo';
import {TextInput} from 'react-native-gesture-handler';

//redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateEmail, updatePassword, login} from './actions/User';

//firebase
import auth from '@react-native-firebase/auth';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({updateEmail, updatePassword, login});
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

class Login extends Component {
  handleLogin = () => {
    const {email, password} = this.state;

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => this.props.navigation.navigate('Home'))
      .catch(error => console.log(error));
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Logo />
        </View>
        <View style={styles.loginForm}>
          <TextInput
            value={this.props.user.email}
            onChangeText={email => this.props.updateEmail(email)}
            placeholder="Email"
          />
          <TextInput
            value={this.props.user.password}
            onChangeText={password => this.props.updatePassword(password)}
            placeholder="Password"
            secureTextEntry={true}
          />
        </View>
        <Button title="Login" onPress={this.handleLogin} />
        <Button title="Sign Up" onPress={this.navigation.navigate('SignUp')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logo: {
    alignSelf: 'center',
  },
  loginForm: {
    alignSelf: 'auto',
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
