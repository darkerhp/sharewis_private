/* eslint no-console: ["error", { allow: ["error", "log"] }] */
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


class App extends Component {
  static propTypes = {
    loggedIn: PropTypes.bool.isRequired,
  };

  componentWillMount() {
    console.log('Are we logged in ?', this.props.loggedIn);
    console.log(this.props);
    this.scenes = Actions.create(
      getScenes(this.props.loggedIn)
    );
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


export default connectToProps(App, 'user');
