import 'less/component-animations.less';
import 'less/grid.less';
import 'less/navs.less';
import 'less/navbar.less';

import './Header.less';

import classNames from 'classnames';
import React from 'react';
import { Anchor } from '@r/platform/components';

import HelpMenu from 'app/components/HelpMenu/HelpMenu';
import Logo from 'app/components/Logo/Logo';
import Logout from 'app/components/Logout/Logout';
import routes from 'app/router/routes';

const T = React.PropTypes;

export default class Header extends React.Component {
  static propTypes = {
    authenticated: T.bool.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
    };

    this._onClick = this._onClick.bind(this);
  }

  _onClick() {
    this.setState({ expanded: !this.state.expanded });
  }

  render() {
    var showLogin = this.props.url !== routes.getUrl('login');

    return (
      <header className='Header navbar navbar-default navbar-static-top' role='banner'>
        <div className='container'>
          <div className='navbar-header'>
            <button 
              type='button'
              className='navbar-toggle collapsed'
              aria-expanded={ this.state.expanded }
              onClick={ this._onClick }
            >
              <span className='sr-only'>Toggle navigation</span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
              <span className='icon-bar'></span>
            </button>
            <Anchor
              className='navbar-brand'
              href={ routes.getUrl(this.props.authenticated ?
                'dashboard' : 'landing') }
            >
              <Logo />
              <span className='sr-only'>Reddit</span> Ads
            </Anchor>
          </div>
          <nav className={ classNames('navbar-collapse collapse', { in: this.state.expanded }) }>
            <div className='navbar-right'>
              <ul className='nav navbar-nav'>
                <HelpMenu tag='li' className='navbar-link'/>
              </ul>
              {
                this.props.authenticated ?
                  <Logout className='navbar-form' /> :
                  showLogin ?
                    <Anchor className='navbar-btn btn btn-primary' href={ routes.getUrl('login') }>
                      login
                    </Anchor> : null
              }
            </div>
          </nav>
        </div>
      </header>
    );
  }
}
