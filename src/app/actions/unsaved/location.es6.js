export const ADD_LOCATION = 'UNPAID__ADD_LOCATION';
export const REMOVE_LOCATION = 'UNPAID__REMOVE_LOCATION';

export const addLocation = (location, { include }) => ({
  type: ADD_LOCATION,
  payload: { location, include },
});

export const removeLocation = (location) => ({
  type: REMOVE_LOCATION,
  payload: { location },
});
