import React from 'react';
import { TextInput } from 'react-native';

const { PropTypes } = React;


const TextField = (props) => {
  const { style, meta: { error, touched } } = props;
  // touched is a flag set by redux-form when the onBlur event occurs
  // (when the form is submitted)


  return (
    <TextInput
      // Let's only change the text color instead of showing error messages
      style={(touched && error) ? [style, { color: 'red' }] : style}
      underlineColorAndroid="transparent"
      selectTextOnFocus
      {...props}
    />
  );
};

/* eslint forbid-prop-types: [false] */
TextField.propTypes = {
  style: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};


export default TextField;
