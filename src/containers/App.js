import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Styles from '../baseStyles';
import getScenes from '../components/Scenes';
import connectToProps from '../utils/reduxUtils';

const { Component, PropTypes } = React;
const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.mainColorBlue,
  },
});

const scenes = Actions.create(getScenes());


/* eslint no-unused-vars: [2, { "args": "none" }] */
class App extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    if (this.props.loggedIn) {
      Actions.courseList();
    }
  }

  render() {
    return (
      <RouterWithRedux
        style={styles.container}
        scenes={scenes}
      />
    );
  }
}


export default connectToProps(App, 'user');
