/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import OfflineLecture from '../Lecture/OfflineLecture';

jest.mock('react-native-i18n', () => ({ t: () => '' }));

describe('OfflineLecture', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(<OfflineLecture lectureContentStyleId={1} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
