import React from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import BaseStyles from '../baseStyles';

const { PropTypes } = React;
const { Linking, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  menuWrapper: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 30,
  },
  menuIcon: {
    fontSize: 32,
    color: '#999',
    marginRight: 10,
  },
  menuText: {
    fontSize: 17,
    color: '#33bcd0',
  },
});

const MenuItem = ({ text, iconName, linkingUrl }) =>
  <View style={styles.menuWrapper}>
    <Icon style={styles.menuIcon} name={iconName} />
    <Text style={styles.menuText} onPress={() => linkingUrl && Linking.openURL(linkingUrl)}>
      {text}
    </Text>
  </View>;

MenuItem.propTypes = {
  text: PropTypes.string,
  iconName: PropTypes.string,
  linkingUrl: PropTypes.string,
};

export default MenuItem;
