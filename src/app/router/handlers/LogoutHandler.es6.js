import { BaseHandler, METHODS } from '@r/platform/router';
import * as platformActions from '@r/platform/actions';

import routes from 'app/router/routes';
import Session from 'app/models/Session';
import * as sessionActions from 'app/actions/session';

export default class LogoutHandler extends BaseHandler {
  async [METHODS.POST](dispatch, getState, utils) {
    await getState().session.logout();

    dispatch(sessionActions.destroySession());
    dispatch(platformActions.navigateToUrl('get', routes.getUrl('landing')));
  }
}
