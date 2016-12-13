import React, { Component, PropTypes } from 'react';
import { StyleSheet } from 'react-native';
import { Actions, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Styles from '../baseStyles';
import getScenes from '../components/Scenes';
import { initApp } from '../actions/ui';

const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.backgroundColor,
  },
});


@connect(({ user }) => ({ user }), dispatch => ({
  initialize() {
    dispatch(initApp());
  },
}))
class App extends Component {
  static propTypes = {
    initialize: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.scenes = Actions.create(getScenes());
    this.props.initialize();
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
