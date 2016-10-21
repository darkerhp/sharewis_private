import { NetInfo } from 'react-native';
import _ from 'lodash';

import { fetchNetInfo, syncLectureProgress } from '../actions/netInfo';

const createOneShotMiddleware = (middleware) => {
  let hasBeenTriggered = false;
  return store => next => (action) => {
    next(action);
    if (!hasBeenTriggered) {
      hasBeenTriggered = true;
      middleware(store.dispatch);
    }
  };
};

const netInfoMiddleware = createOneShotMiddleware(async (dispatch) => {
  const handle = (isConnected) => {
    dispatch(fetchNetInfo({ isConnected }));
    if (isConnected) {
      dispatch(syncLectureProgress());
    }
  };
  const isConnected = await NetInfo.isConnected.fetch();
  handle(isConnected);
  NetInfo.isConnected.addEventListener('change', handle);
});

export default netInfoMiddleware;
