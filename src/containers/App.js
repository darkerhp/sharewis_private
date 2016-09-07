/* eslint no-console: ["error", { allow: ["error", "log"] }] */
import React from 'react';
import { StyleSheet } from 'react-native';
import { Actions, Router } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Styles from '../baseStyles';
import getScenes from '../components/Scenes';
import connectToProps from '../utils/reduxUtils';

const { PropTypes } = React; const RouterWithRedux = connect()(Router);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Styles.mainColorBlue,
  },
});


const App = ({ loggedIn }) => {
  const scenes = Actions.create(
    getScenes(loggedIn)
  );

  return (
    <RouterWithRedux
      style={styles.container}
      scenes={scenes}
    />
  );
};

App.propTypes = {
  loggedIn: PropTypes.bool.isRequired,
};


export default connectToProps(App, 'user');
