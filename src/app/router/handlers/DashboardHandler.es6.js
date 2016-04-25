import { BaseHandler, METHODS } from '@r/platform/router';

import AuthHelper from 'app/helpers/AuthHelper';

export default class DashboardHandler extends BaseHandler {
  async [METHODS.GET](dispatch, getState, utils) {
    try {
      await AuthHelper.isAuthenticated(dispatch, getState, this.originalUrl);
    } catch(e) {
      //TODO: do some error handling here
      console.log('DASHBOARD GET ERROR');
      console.log(e);
    }
  }
}
