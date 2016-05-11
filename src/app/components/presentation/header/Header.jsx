import './Header.less';
import React from 'react';
import Logout from '../logout/Logout';

export default class Header extends React.Component {
  render() {
    return (
      <div className='Header'>
        <div className='Header__logo'><a href='/dashboard'>Moddit</a></div>
        <div className='Header__user'><Logout /></div>
      </div>
    );
  }
}
