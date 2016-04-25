import React from 'react';
import { PageSelector, Page } from '@r/platform/page';

import { LandingPage } from 'app/pages/LandingPage/LandingPage';
import { CreateCampaign } from 'app/pages/CreateCampaign/CreateCampaign';
import { Dashboard } from 'app/pages/Dashboard/Dashboard';
import { Login } from 'app/pages/Login/Login';

import routes from 'app/router/routes';

const renderLoginPage = () => (<Login />);

export const AppMainPage = () => (
  <PageSelector>
    <Page
      url={ routes.getUrl('landing') }
      component={ LandingPage }
    />
    <Page
      url={ routes.getUrl('create-campaign') }
      component={ CreateCampaign }
    />
    <Page
      url={ routes.getUrl('dashboard') }
      component={ Dashboard }
    />
    <Page
      url={ routes.getUrl('login') }
      component={ renderLoginPage }
    />
  </PageSelector>
);
