/**
* @flow
*/
import ReactNative from 'react-native';

const { Platform } = ReactNative;

const Variables = {
  hyperlink: '#2980b9',
  backgroundColor: '#579eff',
  onboardingBackgroundColor: '#ecf1f3',
  borderColor: '#ddd',
  textColor: '#525252',
  navbarHeight: Platform.select({
    ios: 65,
    android: 55,
  }),
  navBarBackgroundColor: '#1288d8',
  disabledButtonColor: '#dadada',
};

const DefaultComponents = {
  ContainerWithNavbar: {
    flex: 1,
    paddingTop: Variables.navbarHeight,
    paddingBottom: Variables.navbarHeight,
  },
  Text: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
  },
  TextInput: {
    flex: 1,
    padding: 4,
    fontSize: 13,
    color: '#222',
    backgroundColor: 'white',
  },
  Button: {
    flex: 1,
    fontSize: 15,
    color: 'white',
  },
};

export default {
  ...Variables,
  ...DefaultComponents,
};
