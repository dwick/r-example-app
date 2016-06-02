export const ADD_INTERESTS = 'UNPAID__ADD_INTERESTS';
export const REMOVE_INTERESTS = 'UNPAID__REMOVE_INTERESTS';

export const addInterests = (interests) => ({
  type: ADD_INTERESTS,
  payload: { interests },
});

export const removeInterests = (interests) => ({
  type: REMOVE_INTERESTS,
  payload: { interests },
});
