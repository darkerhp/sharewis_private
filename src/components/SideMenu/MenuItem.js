import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const { StyleSheet, Text, View } = ReactNative;

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

const MenuItem = ({ text, iconName, handlePress }) =>
  (
    <View style={styles.menuWrapper}>
      <Icon style={styles.menuIcon} name={iconName} />
      <Text style={styles.menuText} onPress={handlePress}>
        {text}
      </Text>
    </View>
  );

MenuItem.propTypes = {
  text: PropTypes.string.isRequired,
  iconName: PropTypes.string.isRequired,
  handlePress: PropTypes.func.isRequired,
};

export default MenuItem;
