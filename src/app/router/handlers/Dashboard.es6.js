import { BaseHandler, METHODS } from '@r/platform/router';
import AuthHelper from '../../helpers/AuthHelper';
import * as platformActions from '@r/platform/actions';

export default class Dashboard extends BaseHandler {
  async [METHODS.GET](dispatch, getState, utils) {
    await AuthHelper.isAuthenticated(dispatch, getState);
  }
}
