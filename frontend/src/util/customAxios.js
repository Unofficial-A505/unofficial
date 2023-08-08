import axios from "axios";
import store from "../store/store";
import { setAccessToken, setAuthUserEmail } from "../../store/loginSlice";

const customAxios = axios.create({
  baseURL: `${process.env.REACT_APP_SERVER}`,
});

// Add a request interceptor
customAxios.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const accessToken = state.authUser.accessToken; // Replace with your access token path in Redux
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
customAxios.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    console.log(error);
    const originalRequest = error.config;
    if (
      (error.response?.status === 404 || error.response?.status === 401) &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      const refreshToken = localStorage.getItem("REFRESH_TOKEN");
      // Replace '/refresh' with your refresh token endpoint

      const res = await axios.post(
        `${process.env.REACT_APP_SERVER}/api/auth/reissue`,
        { params: {} },
        { headers: { REFRESH_TOKEN: refreshToken } }
      ).catch(()=> {
        alert("로그인 만료")
        store.dispatch(setAccessToken(""))
        store.dispatch(setAuthUserEmail(""))
        localStorage.setItem("REFRESH_TOKEN","")
        location.href("/")
      });
      if (res.status === 201) {
        store.dispatch({
          type: "UPDATE_ACCESS_TOKEN",
          payload: res.data.accessToken,
        }); // Dispatch an action to update the access token in Redux
        return customAxios(originalRequest);
      }
    }
    return Promise.reject(error);
  }
);

export default customAxios;
