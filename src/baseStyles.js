const Variables = {
  hyperlink: '#2980b9',
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
    padding: 4,
    borderColor: Variables.lightGray,
    borderWidth: 1,
    fontSize: 13,
    color: '#222',
    backgroundColor: 'white',
  },
  Button: {
    flex: 1,
    fontSize: 15,
    backgroundColor: '#96D243',
    color: 'white',
    borderColor: 'purple',
    borderWidth: 1,
    alignSelf: 'stretch',
    textAlignVertical: 'center',
  },
};

export default {
  ...Variables,
  ...DefaultComponents,
};