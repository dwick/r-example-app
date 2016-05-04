import merge from '@r/platform/merge';
import * as moddedSubActions from '../actions/moddedSubs';

const DEFAULT = {
  ids: [],
  data: {}
};

export default function(state=DEFAULT, action={}) {
  switch(action.type) {
    case moddedSubActions.SET_MOD_SUBS_IDS: {
      const { ids } = action.payload;
      return merge(state, { ids });
    }

    case moddedSubActions.SET_MOD_SUBS_DATA: {
      const { data } = action.payload;
      return merge(state, { data });
    }

    default: return state;
  }
}
