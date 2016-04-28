import { BaseHandler, METHODS } from '@r/platform/router';
import * as platformActions from '@r/platform/actions';

export default class LandingPage extends BaseHandler {
  //empty route
  async [METHODS.GET]() {}
}
