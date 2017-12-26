/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import MenuItem from '../SideMenu/MenuItem';

describe('MenuItem', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <MenuItem text={'text'} iconName={'mail'} handlePress={() => null} />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
