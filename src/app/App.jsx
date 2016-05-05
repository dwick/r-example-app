import './App.less';
import React from 'react';
import Header from './components/presentation/header/Header';
import LandingPage from './components/presentation/landingpage/LandingPage';
import Dashboard from './components/dashboard/Dashboard';
import EditSubreddit from './components/presentation/modTools/EditSubreddit';
import { Anchor, UrlSync } from '@r/platform/components';
import { PageSelector, Page } from '@r/platform/page';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <PageSelector>
          <Page
            url='/'
            component={ pageData => <LandingPage />  }
          />
          <Page
            url='/r/:subreddit'
            component={ pageData => <div>Hello Buddy</div> }
          />
          <Page
            url='/r/:subreddit/edit'
            component={ pageData => <EditSubreddit /> }
          />
          <Page
            url='/dashboard'
            component={ pageData => <Dashboard /> }
          />
        </PageSelector>
        <UrlSync/>
      </div>
    );
  }
}

