import 'react-native';
import React from 'react';
import Root from '../root';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

describe('Root', () => {

  it('renders correctly', () => {
    const tree = renderer.create(
      <Root />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });

});
