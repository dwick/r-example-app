import './App.less';
import React from 'react';
import LandingPage from './components/landingpage/LandingPage';
import { Anchor, UrlSync } from '@r/platform/components';
import { PageSelector, Page } from '@r/platform/page';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <LandingPage />
        <UrlSync/>
      </div>
    );
  }
}
