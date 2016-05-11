import { BaseHandler, METHODS } from '@r/platform/router';
import * as platformActions from '@r/platform/actions';

import Session from './../../models/Session';
import * as sessionActions from '../../actions/session';

export default class Logout extends BaseHandler {
  async [METHODS.POST](dispatch, getState, utils) {
    await getState().session.logout();

    dispatch(sessionActions.destroySession());
    dispatch(platformActions.navigateToUrl('get', '/'));
  }
}
