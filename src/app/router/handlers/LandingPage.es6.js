import { BaseHandler, METHODS } from '@r/platform/router';
import * as platformActions from '@r/platform/actions';

export default class LandingPage extends BaseHandler {
  async [METHODS.GET](dispatch, getState, utils) {
    const { originalUrl } = this;

    this.setPage('%%landingpage');
  }
}
