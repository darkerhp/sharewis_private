/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import TextField from '../TextField';

describe('TextField', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <TextField
          input={{
            value: 'text',
            onChange: () => null
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
