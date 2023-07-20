import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { setAccessToken } from '../../store/loginSlice'
import { useNavigate } from 'react-router-dom'

const serverURL = 'http://70.12.247.35:8080'

export default function useRequestLogin(email, password){

  const dispatch = useDispatch();

  const requestLogin = async (email, password) => {
  
    try {
      const response = await axios.post(`${serverURL}/api/auth/login`, {
        email: email,
        password: password,
      });
  
      console.log(response.headers);
  
      const accessToken = response.headers.authorization;
      dispatch(setAccessToken(accessToken));
  
      localStorage.setItem('refresh_token', response.headers.refresh_token);
      alert('성공');
      // useNavigate('/');
    } catch (err) {
      console.log(err);
      alert('실패: 이메일 혹은 비밀번호를 확인하세요.');
    }
  };
}

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