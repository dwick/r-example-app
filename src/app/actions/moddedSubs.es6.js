export const SET_MOD_SUBS_IDS = 'MOD_SUBS__SET_MOD_SUBS_IDS';
export const SET_MOD_SUBS_DATA = 'MOD_SUBS__SET_MOD_SUBS_DATA';

export const setModSubIds = ids => ({
  type: SET_MOD_SUBS_IDS,
  payload: { ids }
});

export const setModSubData = data => ({
  type: SET_MOD_SUBS_DATA,
  payload: { data } 
});

