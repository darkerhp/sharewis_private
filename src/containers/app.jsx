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
    style={styles.container}
    initialRoute={{
      title: 'Courses',
      component: CoursesScreen,
    }}
  />;

export default App;
