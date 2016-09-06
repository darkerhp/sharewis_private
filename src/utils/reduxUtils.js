import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


// Alias to connect State and Dispatch to props
const connectToProps = (component, stateElement, actions) => {
  const mapStateToProps = state => ({ ...state[stateElement] });
  if (!actions) {
    return connect(mapStateToProps)(component);
  }
  const mapDispatchToProps = dispatch => ({ ...bindActionCreators(actions, dispatch) });
  return connect(mapStateToProps, mapDispatchToProps)(component);
};

export default connectToProps;
