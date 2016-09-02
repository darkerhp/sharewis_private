import React from 'react';
import { StyleSheet } from 'react-native';
import { Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Styles from '../styles';
import scenes from '../actions/scenes';


const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.mainColorBlue,
  },
});


/* eslint no-unused-vars: [2, { "args": "none" }] */
const App = () =>
  <RouterWithRedux
    style={styles.container}
    scenes={scenes}
  />;


export default App;
