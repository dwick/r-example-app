import { BaseHandler, METHODS } from '@r/platform/router';
import * as platformActions from '@r/platform/actions';

export default class LandingPage extends BaseHandler {
  async [METHODS.GET](dispatch, getState, utils) {
    if(getState().session.isValid) {
      return dispatch(platformActions.navigateToUrl('get', '/dashboard'));
    }

    return dispatch(platformActions.setPage('/'));
  }
}
