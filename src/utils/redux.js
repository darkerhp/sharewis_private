import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

export const mapStateToProps = key =>
  state => ({ ...state[key] });

export const mapDispatchToProps = actions =>
  dispatch => ({ ...bindActionCreators(actions, dispatch) });


export const connectState = key =>
  component => connect(mapStateToProps(key))(component);

export const connectActions = actions =>
  component => connect(null, mapDispatchToProps(actions))(component);
