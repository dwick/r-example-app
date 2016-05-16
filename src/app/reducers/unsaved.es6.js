import { combineReducers } from 'redux'
import merge from '@r/platform/merge';
import * as unsavedActions from 'app/actions/unsaved';

const DEFAULT = new Set();

const locations = (state=DEFAULT, action={}) => {
  switch(action.type) {
    case unsavedActions.ADD_LOCATION: {
      const { location } = action.payload;
      return new Set([
        ...state,
        location,
      ]);
    }
    case unsavedActions.REMOVE_LOCATION: {
      const { location } = action.payload;
      let locations = new Set([...state]);

      locations.delete(location);

      return locations;
    }
    default: return state;
  }
}

export {
  locations,
};