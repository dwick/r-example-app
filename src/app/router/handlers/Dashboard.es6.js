import { BaseHandler, METHODS } from '@r/platform/router';
import * as platformActions from '@r/platform/actions';
import { collections } from '@r/api-client';
import * as moddedSubActions from '../../actions/moddedSubs';
import AuthHelper from '../../helpers/AuthHelper';

const { ModeratingSubreddits } = collections;

export default class Dashboard extends BaseHandler {
  async [METHODS.GET](dispatch, getState, utils) {
    try {
      await AuthHelper.isAuthenticated(dispatch, getState);

      const modSubCollection = await ModeratingSubreddits.fetch(getState().session.apiAuth);
      const subIds = modSubCollection.apiResponse.results.map(res => res.uuid);
      const subData = modSubCollection.apiResponse.subreddits;

      dispatch(moddedSubActions.setModSubData(subData));
      dispatch(moddedSubActions.setModSubIds(subIds));
    } catch(e) {
      //TODO: do some error handling here
      console.log('DASHBOARD GET ERROR');
      console.log(e);
    }
  }
}
