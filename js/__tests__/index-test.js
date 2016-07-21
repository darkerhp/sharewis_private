jest.unmock('../index');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import SharewisActMobile from '../index';

describe('SharewisActMobile', () => {
  it('has some welcome message', () => {
    const rootComponent = TestUtils.renderIntoDocument(
      <SharewisActMobile />
    );

    const textNode = ReactDOM.findDOMNode(
      <Text />
    );

    expect(checkboxNode.textContent).toEqual('Welcome to React Native!');

  });
});
