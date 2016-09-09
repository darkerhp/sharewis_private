import React from 'react';
import { TextInput } from 'react-native';

const { PropTypes } = React;


const TextField = props => {
  const { input: { value, onChange } } = props;

  return (
    <TextInput
      onChangeText={text => onChange(text)}
      value={value}
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
