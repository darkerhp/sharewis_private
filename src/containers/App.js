import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Styles from '../baseStyles';
import getScenes from '../components/Scenes';
import { connectState } from '../utils/redux';

const { Component, PropTypes } = React;
const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
  },
});


@connectState('user')
class App extends Component {
  componentWillMount() {
    this.scenes = Actions.create(getScenes());
  }

  render() {
    return (
      <RouterWithRedux
        style={styles.container}
        scenes={this.scenes}
      />
    );
  }
}


export default App;
