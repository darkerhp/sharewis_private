import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


// Alias to connect State and Dispatch to props
//  * component: a React Component
//  * stateKey: a props key or an array of keys
//  * actions: a module of action creators
const connectToProps = (component, stateKey, actions) => {
  let mapStateToProps;
  const keys = (typeof stateKey == 'string') ? [stateKey] : stateKey;
  mapStateToProps = oldState => {
    let newState = {};
    for (const key of keys) {
      newState = {
        ...newState,
        ...oldState[key],
      };
    }
    return newState;
  };
  if (!actions) {
    return connect(mapStateToProps)(component);
  }
  const mapDispatchToProps = dispatch => ({ ...bindActionCreators(actions, dispatch) });
  return connect(mapStateToProps, mapDispatchToProps)(component);
};

export default connectToProps;
