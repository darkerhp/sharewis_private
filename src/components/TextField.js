import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

const TextField = props => {
  const { input: { value, onChange }, ...otherProps } = props;

  return (
    <TextInput
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
  input: PropTypes.object.isRequired
};

export default TextField;
