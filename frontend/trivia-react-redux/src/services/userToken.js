const TOKEN = 'https://opentdb.com/api_token.php?command=request';

const fetchToken = async () => {
  try {
    const response = await fetch(TOKEN);
    const json = await response.json();
    return json;
  } catch (err) {
    console.error(err);
  }
};

export default fetchToken;
