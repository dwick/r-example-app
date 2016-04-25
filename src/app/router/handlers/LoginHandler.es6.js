import { BaseHandler, METHODS } from '@r/platform/router';
import * as platformActions from '@r/platform/actions';

import Session from 'app/models/Session';
import * as sessionActions from 'app/actions/session';

export default class LoginHandler extends BaseHandler {
  static PageParamsToLoginParams({ urlParams, queryParams }) {
    const { redirect } = queryParams;

    return {
      redirect,
    };
  };

  async [METHODS.GET](dispatch, getState, utils) {
    return;
  }

  async [METHODS.POST](dispatch, getState, utils) {
    const { username, password, redirect } = this.bodyParams;

    try {
      const newSession = await Session.fromLogin(username, password);
      dispatch(sessionActions.setSession(newSession));
      dispatch(platformActions.navigateToUrl('get', redirect ? redirect : '/dashboard'));
    } catch (e) {
      // TODO: Do something on login failure
      console.log('LOGIN FAILURE');
      console.log(e);
    }
  }
}
