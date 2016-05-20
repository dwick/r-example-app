import { combineReducers } from 'redux'
import merge from '@r/platform/merge';
import * as unsavedActions from 'app/actions/unsaved';

const DEFAULT = new Set();

const locationsFactory = ({ include }) => {
  return (state=DEFAULT, action={}) => {
    switch(action.type) {
      case unsavedActions.ADD_LOCATIONS: {
        const { payload } = action;
        const additions = Array.isArray(payload.locations) ?
          payload.locations : [payload.locations];

        if (include === payload.include) {
          return new Set([
            ...state,
            ...additions,
          ]);
        }

        return state;
      }
      case unsavedActions.REMOVE_LOCATIONS: {
        const { payload } = action;
        const removals = Array.isArray(payload.locations) ?
          payload.locations : [payload.locations];

        let locations = new Set([...state]);

        removals.forEach(location => {
          locations.delete(location);
        });

        return locations;
      }
      default: return state;
    }
  }
}

const includeLocations = locationsFactory({ include: true });
const excludeLocations = locationsFactory({ include: false });

export {
  includeLocations,
  excludeLocations,
};
