export const ADD_COMMUNITIES = 'UNPAID__ADD_COMMUNITIES';
export const REMOVE_COMMUNITIES = 'UNPAID__REMOVE_COMMUNITIES';

export const addCommunities = (communities) => ({
  type: ADD_COMMUNITIES,
  payload: { communities },
});

export const removeCommunities = (communities) => ({
  type: REMOVE_COMMUNITIES,
  payload: { communities },
});
