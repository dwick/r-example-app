import { BaseHandler, METHODS } from '@r/platform/router';
import * as platformActions from '@r/platform/actions';

import routes from 'app/router/routes';

export default class LandingPageHandler extends BaseHandler {
  async [METHODS.GET](dispatch, getState, utils) {
    if (getState().session.isValid) {
      return dispatch(platformActions.navigateToUrl('get', routes.getUrl('dashboard')));
    }

    return dispatch(platformActions.setPage(routes.getUrl('landing')));
  }
}
