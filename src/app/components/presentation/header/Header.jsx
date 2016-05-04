import './Header.less';
import React from 'react';

export default class Header extends React.Component {
  render() {
    return (
      <div className='Header'>
        <div className='Header__logo'><a href='/dashboard'>Moddit</a></div>
      </div>
    );
  }
}
