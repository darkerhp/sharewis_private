import React from 'react';
import { TextInput } from 'react-native';

const { PropTypes } = React;


const TextField = props => {
  const { style, meta: { error, touched } = props;

  return (
    <TextInput
      styles=[style, {touched && error && {color: 'red'}}]
      underlineColorAndroid="transparent"
      selectTextOnFocus
      {...props}
    />
  );
};

TextField.propTypes = {
  input: PropTypes.object.isRequired,
};


export default TextField;
