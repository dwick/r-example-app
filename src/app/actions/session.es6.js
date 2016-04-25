export const SET_SESSION = 'SESSION__SET_SESSION';
export const DESTROY_SESSION = 'SESSION__DESTROY_SESSION';

export const setSession = session => ({
  type: SET_SESSION,
  payload: { session },
});

export const destroySession = () => ({
  type: DESTROY_SESSION,
});
