import React from 'react';
import ReactNative from 'react-native';
// import { connect } from 'react-redux';
// import { fetchData } from '../actions/courses';
import Onboarding from './Onbording';
import Styles from '../styles';

const {
  Navigator,
  StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.mainColorBlue,
  },
});

/* eslint no-unused-vars: [2, { "args": "none" }] */
const App = (): Object =>
  <Navigator
    initialRoute={{
      title: 'Courses',
      index: 0,
    }}
    renderScene={(route: Object, navigator: Object): ReactComponent =>
      <Onboarding />
    }
    style={styles.container}
  />;

export default App;
