/* global __DEV__ */
import Mixpanel from 'react-native-mixpanel';

export const mixpanel = store => next => (action) => {
  if (action.type === 'REACT_NATIVE_ROUTER_FLUX_PUSH'
    || action.type === 'REACT_NATIVE_ROUTER_FLUX_RESET') {
    Mixpanel.track(`アプリ ${action.key}ページ 表示`);
  }

  next(action);
};

export default mixpanel;
