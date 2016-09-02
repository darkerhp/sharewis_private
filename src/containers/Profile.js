import React from 'react';
import ReactNative from 'react-native';
import { connect } from 'react-redux';

// const { Component, PropTypes } = React;
const { PropTypes, Text, View } = ReactNative;


const Profile = (routes) =>
  <View>
    <Text>
      { routes.scene.title }
    </Text>
  </View>;

Profile.propTypes = {
  routes: PropTypes.object,
};


export default connect((
  { routes }) => ({ routes })
)(Profile);
