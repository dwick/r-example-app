import * as platformActions from '@r/platform/actions';

import routes from 'app/router/routes';

export default class AuthHelper {
  static isAuthenticated = async (dispatch, getState, redirect) => {
    if (!getState().session.isValid) {
      return dispatch(platformActions.setPage(routes.getUrl('login'), {
        queryParams: {
          redirect,
        },
      }));
    }
  }
}
