/* @flow */
import React, {Component} from 'react';
import {View, StyleSheet, Button} from 'react-native';

//redux
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {updateEmail, updatePassword, signup} from './actions/User';
import {TextInput} from 'react-native-gesture-handler';

const mapDispatchToProps = dispatch => {
  return bindActionCreators({updateEmail, updatePassword, signup}, dispatch);
};

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

class SignUp extends Component {
  handleSignUp = () => {
    this.props.signup();
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <View style={styles.container}>
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
        <Button title="Sign Up" onPress={this.handleSignUp} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp);
