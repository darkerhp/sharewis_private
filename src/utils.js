import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';


const connectToProps = (component, stateElement, actions) => {
  const mapStateToProps = state => ({ ...state[stateElement] });
  const mapDispatchToProps = dispatch => ({ ...bindActionCreators(actions, dispatch) });
  return connect(mapStateToProps, mapDispatchToProps)(component);
};

export default connectToProps;
