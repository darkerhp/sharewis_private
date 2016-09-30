/* eslint-disable no-undef */
/* eslint-disable import/no-extraneous-dependencies */
import 'react-native';
import renderer from 'react-test-renderer';
import React from 'react';
import Login from '../Login';
import Email from '../Login/Email';
import Facebook from '../Login/Facebook';

describe('Login', () => {
  describe('Email', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <Email />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Facebook', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <Facebook />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
  describe('Login', () => {
    it('renders correctly', () => {
      const tree = renderer.create(
        <Login />
      ).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });
});
