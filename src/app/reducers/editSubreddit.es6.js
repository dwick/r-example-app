import merge from '@r/platform/merge';
import * as editSubredditActions from '../actions/editSubreddit';

const DEFAULT = {
  navState: 'navBasic',
};

export default function(state=DEFAULT, action={}) {
  switch(action.type) {
    case editSubredditActions.SET_NAV_STATE: {
      const { navState } = action.payload;
      return merge(state, { navState });
    }

    default: return state;
  }
}
