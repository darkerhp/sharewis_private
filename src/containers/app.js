import React from "react"
import ReactNative from "react-native"
import { connect } from "react-redux"
import { fetchData } from "../actions"
import coursesScreen from '../containers/coursesScreen'

let {
  Navigator,
  StyleSheet
} = ReactNative;

class App extends React.Component {
  render() {
    return (
      <Navigator
        style={styles.container}
        initialRoute={{
          title: 'Movies',
          component: CoursesScreen
        }}
      >
      </Navigator>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
  }
});

export default App;
