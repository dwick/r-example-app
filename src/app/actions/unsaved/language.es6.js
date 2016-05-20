export const ADD_LANGUAGES = 'UNPAID__ADD_LANGUAGES';
export const REMOVE_LANGUAGES = 'UNPAID__REMOVE_LANGUAGES';

export const addLanguages = (languages) => ({
  type: ADD_LANGUAGES,
  payload: { languages },
});

export const removeLanguages = (languages) => ({
  type: REMOVE_LANGUAGES,
  payload: { languages },
});
