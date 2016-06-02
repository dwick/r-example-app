import { combineReducers } from 'redux'
import merge from '@r/platform/merge';
import * as unsavedActions from 'app/actions/unsaved';

const DEFAULT = new Set();

export const interests = (state=DEFAULT, action={}) => {
  switch(action.type) {
    case unsavedActions.ADD_INTERESTS: {
      const { payload } = action;
      const additions = Array.isArray(payload.interests) ?
        payload.interests : [payload.interests];

      return new Set([
        ...state,
        ...additions,
      ]);
    }
    case unsavedActions.REMOVE_INTERESTS: {
      const { payload } = action;
      const removals = Array.isArray(payload.interests) ?
        payload.interests : [payload.interests];

      let interests = new Set([...state]);

      removals.forEach(interest => {
        interests.delete(interest);
      });

      return interests;
    }
    default: return state;
  }
}
