import * as platformActions from '@r/platform/actions';

export default class AuthHelper {
  static isAuthenticated = async (dispatch, getState) => {
    if (!getState().session.isValid) {
      return dispatch(platformActions.setPage('/'));
    }
  }
}
