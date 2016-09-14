import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


// Alias to connect State and Dispatch to props
const connectToProps = (component, stateKey, actions) => {
  let mapStateToProps;
  const keys = (typeof stateKey == 'string') ? [stateKey] : stateKey;
  mapStateToProps = oldState => {
    console.log('old state', oldState);
    let newState = {};
    for (const key of keys) {
      newState = {
        ...newState,
        ...oldState[key],
      };
    }
    console.log('new state', newState);
    return newState;
  };
  if (!actions) {
    return connect(mapStateToProps)(component);
  }
  const mapDispatchToProps = dispatch => ({ ...bindActionCreators(actions, dispatch) });
  return connect(mapStateToProps, mapDispatchToProps)(component);
};

export default connectToProps;
