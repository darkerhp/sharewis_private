/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import Home from './src/Home';


class SharewisActMobile extends Component {
  render() {
    return (
      <Home />
    );
  }
}

AppRegistry.registerComponent('SharewisActMobile', () => SharewisActMobile);
