const Variables = {
  lightGray: '#dadada',
  mainColorBlue: '#579eff',
  mainColorLightBlue: '#a0e0fc',
  onboardingBgLightBlue: '#ecf1f3',
};

const DefaultComponents = {
  Text: {
    flex: 1,
    textAlign: 'center',
    lineHeight: 22,
    fontSize: 17,
    color: '#222',
  },
  TextInput: {
    flex: 1,
    borderWidth: 0.5,
    padding: 4,
    // borderColor: Variables.lightGray,
    borderColor: 'blue',
    fontSize: 13,
    color: '#222',
    backgroundColor: 'white',
  },
  Button: {
    flex: 1,
    fontSize: 15,
    backgroundColor: '#96D243',
    color: 'white',
    textAlignVertical: 'center',
    borderColor: 'purple',
    borderWidth: 1,
    alignSelf: 'stretch',
  },
};

export default {
  ...Variables,
  ...DefaultComponents,
};
