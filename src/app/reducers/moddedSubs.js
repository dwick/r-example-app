import * as moddedSubActions from '../actions/moddedSubs';

const DEFAULT = {};

export default function(state=DEFAULT, action={}) {
  switch(action.type) {
    case moddedSubActions.SET_MOD_SUBS_IDS: {
      const { ids } = action.payload;
      return Object.assign({}, state, { ids });
    }

    case moddedSubActions.SET_MOD_SUBS_DATA: {
      const { data } = action.payload;
      return Object.assign({}, state, { data });
    }

    default: return state;
  }
}
