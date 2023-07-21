import axios from 'axios'

const serverURL = 'http://70.12.247.35:8080'

// access_token 요청
export const requestAccessToken = async (refresh_token) => {
  return await axios
    .post(`${serverURL}/token/refresh/`, {
      refresh: refresh_token,
    })
    .then((response) => {
      return response.data.access;
    })
    .catch((e) => {
      console.log(e.response.data);
    });
};

// access_token 확인 후 없으면 요청
export const checkAccessToken = async (refresh_token) => {
  if (axios.defaults.headers.common["Authorization"] === undefined) {
    return await requestAccessToken(refresh_token).then((response) => {
      return response;
    });
  } else {
    return axios.defaults.headers.common["Authorization"].split(" ")[1];
  }
};