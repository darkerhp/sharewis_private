import React from 'react';
import ReactNative from 'react-native';
import Hyperlink from 'react-native-hyperlink';

import BaseStyles from '../../baseStyles';
import { ACT_API_URL } from '../../constants/Api';
import BaseTranslations from '../../translations';
import redirectTo from '../../utils/linking';

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

const t = {
  ...BaseTranslations,
  noCourses: `購入済みのコースがない方は、 ${ACT_API_URL} よりお手続きを進めてください`,
};


const emptyList = () =>
  <View style={styles.courseList}>
    <Hyperlink
      style={styles.emptyList}
      linkStyle={{ color: BaseStyles.hyperlink }}
      linkText={t.actWebsite}
      onPress={redirectTo}
    >
      <Text style={styles.contentText}>
        {t.noCourses}
      </Text>
    </Hyperlink>
  </View>;


export default emptyList;
