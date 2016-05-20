import './App.less';
import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { UrlSync } from '@r/platform/components';

import { AppMainPage } from 'app/pages/AppMainPage';
import Header from 'app/components/Header';

const T = React.PropTypes;

export default class App extends React.Component {
  static propTypes = {
    authenticated: T.bool.isRequired,
  };

  render() {
    return (
      <div className="App">
        <Header
          authenticated={ this.props.authenticated }
          url={ this.props.url }/>
        <AppMainPage />
        <UrlSync/>
      </div>
    );
  }
}

const selector = createSelector(
  (state, props) => props,
  (state, /*props*/) => state.session,
  (state, /*props*/) => state.platform.currentPage,
  (props, session, currentPage) => {
    return {
      authenticated: !!session.isValid,
      url: currentPage.url,
    };
  }
);

export default connect(selector)(App);
