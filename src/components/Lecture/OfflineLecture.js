import React, { PropTypes } from 'react';
import ReactNative from 'react-native';
import I18n from 'react-native-i18n';

const { View, StyleSheet, Text } = ReactNative;


const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentText: {
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
  },
});


const OfflineLecture = ({ lectureContentStyleId }) =>
  (
    <View style={[lectureContentStyleId, styles.container]}>
      <View>
        <Text style={styles.contentText}>
          {I18n.t('offlineLecture')}
        </Text>
      </View>
    </View>
  );

OfflineLecture.propTypes = {
  lectureContentStyleId: PropTypes.number.isRequired,
};

export default OfflineLecture;
