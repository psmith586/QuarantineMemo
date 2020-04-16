/* @flow */

import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default class MemoView extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Single Memo</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
