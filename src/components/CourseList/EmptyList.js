import React from 'react';
import ReactNative from 'react-native';
import Hyperlink from 'react-native-hyperlink';
import I18n from 'react-native-i18n';
import Spinner from 'react-native-loading-spinner-overlay';

import BaseStyles from '../../baseStyles';
import redirectTo from '../../utils/linking';

const { PropTypes } = React;
const { StyleSheet, Text, View } = ReactNative;

const styles = StyleSheet.create({
  courseList: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    ...BaseStyles.Text,
    textAlignVertical: 'center',
  },
  emptyList: {
    flex: 1,
    margin: 30,
  },
});


const emptyList = ({ isFetching }) =>
  <View style={styles.courseList}>
    <Spinner visible={isFetching} />
    <Hyperlink
      style={styles.emptyList}
      linkStyle={{ color: BaseStyles.hyperlink }}
      linkText={I18n.t('actWebsite')}
      onPress={redirectTo}
    >
      <Text style={styles.contentText}>
        {I18n.t('noCourses')}
      </Text>
    </Hyperlink>
  </View>;

emptyList.propTypes = {
  isFetching: PropTypes.bool.isRequired,
};


export default emptyList;
