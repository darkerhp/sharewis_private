import React from 'react';
import { TextInput } from 'react-native';

const { PropTypes } = React;


const TextField = (props) => {
  const {
    style,
    input: {value, onChange },
    meta: { error, touched },
    ...otherProps,
  } = props;

  console.log('render TextField:', value, error, touched);
  return (
    <TextInput
      // Let's only change the text color instead of showing error messages
      style={(touched && error) ? [style, { color: 'red' }] : style}
      underlineColorAndroid="transparent"
      onChangeText={value => onChange(value)}
      value={value}
      selectTextOnFocus
      {...otherProps}
    />
  );
};

/* eslint forbid-prop-types: [false] */
TextField.propTypes = {
  style: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,
};


export default TextField;
