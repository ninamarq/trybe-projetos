const fetchQuestionAPI = async (token) => {
  // const token = localStorage.getItem('token');
  try {
    const response = await fetch(`https://opentdb.com/api.php?amount=5&token=${token}`);
    const json = await response.json();
    const { results } = json;
    return results;
  } catch (err) {
    return err;
  }
};

export default fetchQuestionAPI;
