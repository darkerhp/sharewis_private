import React from 'react';
import { TextInput } from 'react-native';

const { PropTypes } = React;


const TextField = (props) => {
  const {
    style,
    input: { value, onChange },
    meta: { error, touched },
    ...otherProps,
  } = props;

  return (
    <TextInput
      // Let's only change the text color instead of showing error messages
      style={(touched && error) ? [style, { color: 'red' }] : style}
      underlineColorAndroid="transparent"
      onChangeText={text => onChange(text)}
      value={value}
      selectTextOnFocus
      {...otherProps}
    />
  );
};

/* eslint-disable react/forbid-prop-types */
TextField.propTypes = {
  style: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
};


export default TextField;
