export const SET_SCORE = 'SET_SCORE';
export const SET_ANSWERS = 'SET_ANSWERS';
export const SAVE_PLAYERS = 'SAVE_PLAYERS';

export const setScore = (payload) => ({ type: SET_SCORE, payload });

export const setAnswers = (payload) => ({ type: SET_ANSWERS, payload });

export const savePlayers = (name, score, picture) => {
  const actualRank = JSON.parse(localStorage.getItem('ranking')) || [];
  const dataRanking = {
    name,
    score,
    picture,
  };
  localStorage.setItem('ranking', JSON.stringify([...actualRank, dataRanking]));
  return ({
    type: SAVE_PLAYERS,
    payload: {
      name,
      score,
      picture,
    },
  });
};
