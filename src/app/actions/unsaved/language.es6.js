export const ADD_LANGUAGE = 'UNPAID__ADD_LANGUAGE';
export const REMOVE_LANGUAGE = 'UNPAID__REMOVE_LANGUAGE';

export const addLanguage = (lang) => ({
  type: ADD_LANGUAGE,
  payload: { lang },
});

export const removeLanguage = (lang) => ({
  type: REMOVE_LANGUAGE,
  payload: { lang },
});
