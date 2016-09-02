import React from 'react';
import ReactNative from 'react-native';
import ReactRedux from 'react-redux';

// const { Component, PropTypes } = React;
const { PropTypes, Text, View } = ReactNative;
const { connect } = ReactRedux;


const Profile = () =>
  <View>
    <Text>
    { this.props.routes.scene.title }
    </Text>
  </View>;

Profile.propTypes = {
  routes: PropTypes.object,
};
Profile.defaultProps = {};


export default connect((
  { routes }) => ({ routes })
)(Profile);
