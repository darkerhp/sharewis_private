import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


// Alias to connect State and Dispatch to props
export const connectToProps = (component, stateElement, actions) => {
  const mapStateToProps = state => ({ ...state[stateElement] });
  const mapDispatchToProps = dispatch => ({ ...bindActionCreators(actions, dispatch) });
  return connect(mapStateToProps, mapDispatchToProps)(component);
};

// Transform callback-expecting functions into Promises for async usage
export const promisify = (method, ...args) =>
  new Promise((resolve, reject) =>
    method(...args, (err, result) => (
      err ? reject(err) : resolve(result)
    ))
  );
