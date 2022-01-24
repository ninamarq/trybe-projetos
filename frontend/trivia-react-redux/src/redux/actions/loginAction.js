import fetchToken from '../../services/userToken';

export const SET_USER = 'SET_USER';
export const REQUEST_API = 'REQUEST_API';
export const RECEIVED_API = 'RECEIVED_API';
export const FAILED_REQUEST = 'FAILED_REQUEST';

export const setUser = (name, email) => ({
  type: SET_USER,
  name,
  email,
});

export const requestAPI = () => ({
  type: REQUEST_API,
});

export const receivedAPI = (token) => ({
  type: RECEIVED_API,
  token,
});

export const failedAPI = (err) => ({
  type: FAILED_REQUEST,
  err,
});

export const getToken = () => async (dispatch) => {
  const response = await fetchToken();
  const { token } = response;
  localStorage.setItem('token', token);
  dispatch(receivedAPI(token));
};
