import React, { Component, PropTypes } from 'react';
import Drawer from 'react-native-drawer';
import { Actions, DefaultRenderer } from 'react-native-router-flux';
import SideMenu from '../containers/SideMenu';

const drawerStyles = {
  drawer: { shadowColor: '#333333', shadowOpacity: 0.9, shadowRadius: 3 },
};

export default class NavigationDrawer extends Component {
  static propTypes = {
    navigationState: PropTypes.shape({}).isRequired,
    onNavigate: PropTypes.func.isRequired,
  };

  render() {
    const { navigationState: { children, key, open }, onNavigate } = this.props;
    return (
      <Drawer
        ref={ref => (this.navigator = ref)}
        type="displace"
        open={open}
        onClose={() => Actions.refresh({ key, open: false })} // NOTE Landscape時に呼び出されてしまう。問題が起こるかも
        content={<SideMenu />}
        tapToClose
        openDrawerOffset={0.15}
        panCloseMask={0.2}
        // panOpenMask={0.9} FIXME swipeで開かないように
        negotiatePan
        styles={drawerStyles}
        tweenHandler={ratio => ({
          main: { opacity: Math.max(0.4, 1 - ratio) },
        })}
      >
        <DefaultRenderer navigationState={children[0]} onNavigate={onNavigate} />
      </Drawer>
    );
  }
}
