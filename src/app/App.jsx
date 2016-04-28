import './App.less';
import React from 'react';
import LandingPage from './components/landingpage/LandingPage';
import { Anchor, UrlSync } from '@r/platform/components';
import { PageSelector, Page } from '@r/platform/page';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

const T = React.PropTypes;

export class App extends React.Component {
  static propTypes = {
    pageType: T.string.isRequired,
  };

  render() {
    return (
      <div>
        { this.props.pageType == '%%landingpage' ? <LandingPage /> : null }
        <UrlSync/>
      </div>
    );
  }
}

const selector = createSelector(
  state => state.platform.currentPage.page,
  (pageType) => ({ pageType })
);

export default connect(selector)(App);
