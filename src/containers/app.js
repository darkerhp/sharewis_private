import React from 'react';
import ReactNative from 'react-native';
// import { connect } from 'react-redux';
// import { fetchData } from '../actions/courses';
import CoursesScreen from '../containers/coursesScreen';

const {
  Navigator,
  StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});


const App = () =>
  <Navigator
    initialRoute={{
      title: 'Courses',
      index: 0,
    }}
    /* eslint no-unused-vars: ["error", { "vars": "after-used" }] */
    renderScene={(route, navigator) =>
      <CoursesScreen />
    }
    style={styles.container}
  />;

export default App;
