import React, { PropTypes } from 'react';
import { TextInput } from 'react-native';

const TextField = (props) => {
  const {
    // style,
    input: { value, onChange },
    // meta: { error, touched },
    ...otherProps
  } = props;

  return (
    <TextInput
      // style={(touched && error) ? [style, { color: 'red' }] : style}
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
  // style: PropTypes.object.isRequired,
  // meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
};


export default TextField;
