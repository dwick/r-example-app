import 'less/buttons.less';
import 'less/forms.less';

import './styles.less';

import React from 'react';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { METHODS } from '@r/platform/router';
import { Form } from '@r/platform/components';

import LoginHandler from 'app/router/handlers/LoginHandler';
import routes from 'app/router/routes';


const selector = createSelector(
  (state, props) => props,
  (state, /*props*/) => state.platform.currentPage,
  (pageProps, currentPage) => {
    return LoginHandler.PageParamsToLoginParams(currentPage);
  }
);

const Login = connect(selector)((props) => {
  return (
    <div className='Login'>
      <div className='container'>
        <div className='row'>
          <div className='col-xs-offset-3 col-xs-6'>
            <h2>Login</h2>
            <Form method={ METHODS.POST } action={ routes.getUrl('login') }>
              <input type='hidden' name='redirect' value={ props.redirect }/>
              <div className='form-group'>
                <input className='form-control' name='username' placeholder='username'/>
              </div>
              <div className='form-group'>
                <input className='form-control' name='password' placeholder='password' type='password'/>
              </div>
              <div><button className='btn btn-primary pull-right' type='submit'>login</button></div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
});

export default Login;
