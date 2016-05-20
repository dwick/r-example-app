import { combineReducers } from 'redux'
import merge from '@r/platform/merge';
import * as unsavedActions from 'app/actions/unsaved';

const DEFAULT = new Set();

export const languages = (state=DEFAULT, action={}) => {
  switch(action.type) {
    case unsavedActions.ADD_LANGUAGES: {
      const { payload } = action;
      const additions = Array.isArray(payload.languages) ?
        payload.languages : [payload.languages];

      return new Set([
        ...state,
        ...additions,
      ]);
    }
    case unsavedActions.REMOVE_LANGUAGES: {
      const { payload } = action;
      const removals = Array.isArray(payload.languages) ?
        payload.languages : [payload.languages];

      let languages = new Set([...state]);

      removals.forEach(language => {
        languages.delete(language);
      });

      return languages;
    }
    default: return state;
  }
}
