import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { queueAction } from '../actions/netInfo';

export const mapStateToProps = key =>
  state => ({
    ...state[key],
    isOnline: state.netInfo.isConnected,
  });


export const mapDispatchToProps = actions =>
  dispatch => ({ ...bindActionCreators(actions, dispatch) });


export const connectState = key =>
  component => connect(mapStateToProps(key))(component);


export const connectActions = actions =>
  component => connect(null, mapDispatchToProps(actions))(component);


export const dispatchOrQueue = (dispatch, state) =>
  (action, params = undefined) => {
    // Online mode, dispatch action
    if (state.netInfo.isConnected) dispatch(action(params));
    // Offline mode, queue action
    dispatch(queueAction(action, params));
  };
