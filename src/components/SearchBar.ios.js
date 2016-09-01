import React from 'react';
import ReactNative from 'react-native';

const { PropTypes } = React;

const {
  ActivityIndicatorIOS,
  TextInput,
  StyleSheet,
  View,
} = ReactNative;

const styles = StyleSheet.create({
  searchBar: {
    marginTop: 64,
    padding: 3,
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBarInput: {
    fontSize: 15,
    flex: 1,
    height: 30,
  },
  spinner: {
    width: 30,
  },
});


class SearchBar extends React.Component {
  componentDidMount() {
    return;
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          onChange={this.props.onSearchChange}
          placeholder="Search a course..."
          onFocus={this.props.onFocus}
          style={styles.searchBarInput}
        />
        <ActivityIndicatorIOS
          animating={this.props.isLoading}
          style={styles.spinner}
        />
      </View>
    );
  }
}

SearchBar.propTypes = {
  query: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  onFocus: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default SearchBar;
