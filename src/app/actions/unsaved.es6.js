export const ADD_LOCATION = 'UNPAID__ADD_LOCATION';
export const REMOVE_LOCATION = 'UNPAID__REMOVE_LOCATION';

export const addLocation = location => ({
  type: ADD_LOCATION,
  payload: { location },
});

export const removeLocation = location => ({
  type: REMOVE_LOCATION,
  payload: { location },
});
