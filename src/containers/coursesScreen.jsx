/**
 * @flow
 */

import React from 'react';
import ReactNative from 'react-native';
// import SearchBar from '../components/searchBar'
// import CourseList from '../components/coursesList'
// import { connect } from 'react-redux';
// import { searchCourses, getCoursesNextPage, focusedOnSearch } from '../actions/courses';

const { PropTypes } = React;
const {
  View,
  StyleSheet,
} = ReactNative;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});


class CoursesScreen extends React.Component {
  constructor(props) {
    super(props);
    this.onSearchChange = this.onSearchChange.bind(this);
    this.onSearchFocus = this.onSearchFocus.bind(this);
  }

  componentDidMount() {
    return;
    // this.props.searchCourses('');
  }

  onSearchChange(event: Object) {
    return event;
    // const query = event.nativeEvent.text.toLowerCase();
    // this.props.searchCourses(query);
  }

  onSearchFocus() {
    // this.refs is deprecated
    // if (this.refs.coursesList) {
    //   this.refs.coursesList.scrollUpList();
    // }
  }

  render() {
    // const { courses, query, isLoading } = this.props;

    return (
      <View style={styles.container}>
      {/*
      <SearchBar
        query={query}
        onSearchChange={this.onSearchChange}
        isLoading={isLoading}
        onFocus={this.onSearchFocus}
      >
      </SearchBar>

      <CourseList ref="coursesList" {...this.props}>
      </CourseList>
      */}
      CourseList
      </View>
    );
  }
}

CoursesScreen.propTypes = {
  query: PropTypes.string.isRequired,
  courses: PropTypes.array.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasCoursesToDisplay: PropTypes.bool.isRequired,
  isLoadingTail: PropTypes.bool.isRequired,
};

// function mapStateToProps(state, props) {
//   const { filter, courses, isLoading, hasCoursesToDisplay, isLoadingTail } = state.coursesData;
//
//   return {
//     query: filter,
//     courses,
//     isLoading,
//     hasCoursesToDisplay,
//     isLoadingTail,
//   };
// }

// export default connect(mapStateToProps, {
  // searchCourses, getCoursesNextPage, focusedOnSearch
// })(CoursesScreen);
