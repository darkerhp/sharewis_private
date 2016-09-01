import React from 'react';
import ReactNative from 'react-native';

const {
  Image,
  Platform,
  ProgressBarAndroid,
  TextInput,
  StyleSheet,
  TouchableNativeFeedback,
  View,
} = ReactNative;

const IS_RIPPLE_EFFECT_SUPPORTED = Platform.Version >= 21;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#a9a9a9',
    height: 56,
  },
  searchBarInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    height: 50,
    padding: 0,
    backgroundColor: 'transparent',
  },
  spinner: {
    width: 30,
    height: 30,
  },
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 8,
  },
});


class SearchBar extends React.Component {
  static propTypes = {
    isLoading: React.PropTypes.bool.isRequired,
    onSearchChange: React.PropTypes.func.isRequired,
  }

  componentDidMount(): Function {
    this.textInput.focus();
  }

  render() {
    let loadingView;
    if (this.props.isLoading) {
      loadingView = (
        <ProgressBarAndroid
          styleAttr="Large"
          style={styles.spinner}
        />
      );
    } else {
      loadingView = <View style={styles.spinner} />;
    }

    const background = (IS_RIPPLE_EFFECT_SUPPORTED ?
      new TouchableNativeFeedback.SelectableBackgroundBorderless() :
      new TouchableNativeFeedback.SelectableBackground()
    );
    return (
      <View style={styles.searchBar}>
        <TouchableNativeFeedback
          background={background}
        >
          <View>
            <Image
              style={styles.icon}
            />
          </View>
        </TouchableNativeFeedback>
        <TextInput
          ref={(c: String): Function => { this.textInput = c; }}
          autoCapitalize="none"
          autoCorrect={false}
          autoFocus
          onChange={this.props.onSearchChange}
          placeholder="Search a movie..."
          placeholderTextColor="rgba(255, 255, 255, 0.5)"
          style={styles.searchBarInput}
        />
        {loadingView}
      </View>
    );
  }
}

export default SearchBar;
