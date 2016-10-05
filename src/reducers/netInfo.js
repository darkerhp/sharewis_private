import * as types from '../constants/ActionTypes';


const initialState = {
  isConnected: false,
  queuedActions: [],
};

export default function netInfoReducer(state = initialState, action) {
  switch (action.type) {
    case types.MIDDLEWARE_NETINFO:
      return { ...state, ...action.payload };
    case types.SYNC_QUEUE_ACTION:
      return {
        ...state,
        queuedActions: [
          ...state.queuedActions,
          action.queuedAction,
        ],
      };
    default:
      return state;
  }
}
