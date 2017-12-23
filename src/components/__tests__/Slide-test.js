/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Slide from '../Onboarding/Slide';

jest.mock('../../utils/linking', () => () => 'redirectTo');
jest.mock('react-native-i18n', () => ({ currentLocale: () => '' }));

describe('Slide', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Slide />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
