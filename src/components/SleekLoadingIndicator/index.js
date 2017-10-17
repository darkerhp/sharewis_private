import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';

import LoadingIndicator from './LoadingIndicator';

const {
  View,
  Text,
  StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


class SleekLoadingIndicator extends Component {
  static propTypes = {
    text: PropTypes.string,
    loading: PropTypes.bool,
  };

  static defaultProps = {
    text: 'Loading...',
    loading: true,
  };

  render() {
    if (!this.props.loading) return null;
    return (
      <View style={styles.container}>
        <LoadingIndicator text={this.props.text} />
      </View>
    );
  }

}

export default SleekLoadingIndicator;
