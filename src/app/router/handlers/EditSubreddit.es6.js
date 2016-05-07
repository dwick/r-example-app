import { BaseHandler, METHODS } from '@r/platform/router';
import { collections } from '@r/api-client';
import AuthHelper from '../../helpers/AuthHelper';
import * as platformActions from '@r/platform/actions';
import * as editSubredditActions from '../../actions/editSubreddit';
import * as moddedSubActions from '../../actions/moddedSubs';

const { ModeratingSubreddits } = collections;

export default class EditSubreddit extends BaseHandler {
  async [METHODS.GET](dispatch, getState, utils) {
    await AuthHelper.isAuthenticated(dispatch, getState);

    const modSubCollection = await ModeratingSubreddits.fetch(getState().session.apiAuth);
    const subIds = modSubCollection.apiResponse.results.map(res => res.uuid);
    const subData = modSubCollection.apiResponse.subreddits;
    
    dispatch(moddedSubActions.setModSubData(subData));
    dispatch(moddedSubActions.setModSubIds(subIds));
  }

}
