/* eslint import/no-extraneous-dependencies: ["error", {"peerDependencies": true}] */
/* global __DEV__ */
import Reactotron from 'reactotron-react-native';


if (__DEV__) {
  const options = {
    name: 'ShareWis ACT Android',
    server: '127.0.0.1',
    port: 9090,
  };

  Reactotron
    .configure() // we can use plugins here -- more on this later
    .connect(options); // let's connect!
}
