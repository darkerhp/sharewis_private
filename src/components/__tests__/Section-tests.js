/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Section from '../CourseDetails/Section';

describe('Section', () => {
  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Section
          lecture={{
            title: 'Title'
          }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
