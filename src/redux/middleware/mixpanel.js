/* global __DEV__ */
import Mixpanel from 'react-native-mixpanel';
import { ActionConst } from 'react-native-router-flux';

export const mixpanel = store => next => action => {
  if (action.type === ActionConst.PUSH || action.type === ActionConst.RESET) {
    Mixpanel.track(`アプリ ${action.key}ページ 表示`);
  }

  next(action);
};

export default mixpanel;
