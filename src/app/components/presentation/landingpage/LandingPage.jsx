import './LandingPage.less';
import React from 'react';
import Login from '../login/Login';

export default class LandingPage extends React.Component {
  render() {
    return (
      <div className='LandingPage'>
        <div className='LandingPage__box'>
          <div className='LandingPage__title'>
            Moddit 
          </div>
          <div className='LandingPage__subtitle'>
            aka <span className='LandingPage__bold'>“tiddoM”</span> to
          </div>
          <div className='LandingPage__subtitle'>
            those who read backwards
          </div>
          <Login />
        </div>
      </div>
    );
  }
}
