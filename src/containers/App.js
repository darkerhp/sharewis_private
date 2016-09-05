import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Styles from '../baseStyles';
import getScenes from '../components/Scenes';


const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.mainColorBlue,
  },
});

const scenes = Actions.create(getScenes());


/* eslint no-unused-vars: [2, { "args": "none" }] */
const App = () =>
  <RouterWithRedux
    style={styles.container}
    scenes={scenes}
  />;


export default App;
