import 'less/buttons.less';

import './LandingPage.less';

import React from 'react';
import routes from 'app/router/routes';
import { Anchor } from '@r/platform/components';

export const LandingPage = (props) => {
  return (
    <div className='LandingPage' role="main">
      <div className='LandingPage__masthead'>
        <div className='container'>
          <div className='row'>
            <div className='col-md-8'>
              <h2 className='LandingPage__title'>
                <strong>promote on reddit</strong> and reach more than 234 million engaged and passionate users through a flexible programmatic platform.
              </h2>
            </div>
            <div className='col-md-4 top-gutter-xs top-gutter-sm'>
              <div className='bottom-gutter-xs-and-up'>
                <Anchor href={ routes.getUrl('create-campaign')} className='LandingPage__call-to-action btn'>
                  create an ad
                </Anchor>
              </div>
              <p className='lead text-center'>
                budget larger than $30k?
                <br />
                <Anchor href="#" className='LandingPage__sales-contact'>
                  contact our sales team
                </Anchor>
              </p>
            </div>
          </div>
        </div>
        <div className='LandingPage__illustration'>
          <div className='container'>
            <div className='LandingPage__genuine-engagement-graphic' />
            <div className='LandingPage__passionate-communities-graphic' />
            <div className='LandingPage__air-dancer-snoo-graphic' />
            <div className='LandingPage__flexible-platform-graphic' />
          </div>
        </div>
      </div>
      <div className='container'>
        <div className='bottom-gutter-xs-and-up'>
          <h3 className='text-center'>wow, ads. such platform!</h3>
        </div>
        <div className='row'>
          <div className='col-md-4 bottom-gutter-xs bottom-gutter-sm'>
            <h4>genuine engagement</h4>
            <p>reddit users cast more than 21 million votes a day.</p>
          </div>
          <div className='col-md-4 bottom-gutter-xs bottom-gutter-sm'>
            <h4>passionate communities</h4>
            <p>reddit users participate in more than 10,000 active, user-created communities.</p>
          </div>
          <div className='col-md-4 bottom-gutter-xs bottom-gutter-sm'>
            <h4>flexible platform</h4>
            <p>find your audience by interest, location, and communities.</p>
          </div>
        </div>
        <hr />
      </div>
    </div>
  );
}
