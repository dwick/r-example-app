import { combineReducers } from 'redux'
import merge from '@r/platform/merge';
import * as unsavedActions from 'app/actions/unsaved';

const DEFAULT = new Set();

export const communities = (state=DEFAULT, action={}) => {
  switch(action.type) {
    case unsavedActions.ADD_COMMUNITIES: {
      const { payload } = action;
      const additions = Array.isArray(payload.communities) ?
        payload.communities : [payload.communities];

      return new Set([
        ...state,
        ...additions,
      ]);
    }
    case unsavedActions.REMOVE_COMMUNITIES: {
      const { payload } = action;
      const removals = Array.isArray(payload.communities) ?
        payload.communities : [payload.communities];

      let communities = new Set([...state]);

      removals.forEach(community => {
        communities.delete(community);
      });

      return communities;
    }
    default: return state;
  }
}
