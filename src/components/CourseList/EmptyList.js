import React from 'react';
import PropTypes from 'prop-types';
import ReactNative from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';

import BaseStyles from '../../lib/baseStyles';
import redirectTo from '../../utils/linking';

const { Platform, StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: BaseStyles.courseListBackgroundColor
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
    margin: 30
  }
});

/**
 * リンククリックハンドラ
 * iOSの場合は何もしない
 * @param isOnline
 * @param url
 */
const handlePress = url => {
  if (Platform.OS === 'ios') return;
  redirectTo(url);
};

const emptyList = ({ contentText }) => (
  <View style={styles.container}>
    <Hyperlink
      linkStyle={Platform.OS !== 'ios' && { color: BaseStyles.hyperlink }}
      linkText={I18n.t('actWebsite')}
      onPress={handlePress}
    >
      <Text style={styles.contentText}>{contentText}</Text>
    </Hyperlink>
  </View>
);

emptyList.propTypes = {
  contentText: PropTypes.string.isRequired
};

export default emptyList;
