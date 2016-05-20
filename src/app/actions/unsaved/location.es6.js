export const ADD_LOCATIONS = 'UNPAID__ADD_LOCATIONS';
export const REMOVE_LOCATIONS = 'UNPAID__REMOVE_LOCATIONS';

export const addLocations = (locations, { include }) => ({
  type: ADD_LOCATIONS,
  payload: { locations, include },
});

export const removeLocations = (locations) => ({
  type: REMOVE_LOCATIONS,
  payload: { locations },
});
