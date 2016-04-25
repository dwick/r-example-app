import merge from '@r/platform/merge';
import * as sessionActions from '../actions/session';

const DEFAULT = {};

export default function(state=DEFAULT, action={}) {
  switch(action.type) {
    case sessionActions.SET_SESSION: {
      const { session } = action.payload;
      return session;
    }
    case sessionActions.DESTROY_SESSION: {
      return DEFAULT;
    }
    default: return state;
  }
}
