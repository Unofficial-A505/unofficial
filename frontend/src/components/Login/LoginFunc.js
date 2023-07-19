import axios from 'axios'
import { useDispatch } from 'react-redux'
import { setAccessToken } from '../../store/loginSlice'
import { useNavigate } from 'react-router-dom'

const serverURL = 'http://70.12.247.35:8080'

const requestLogin = async (email, password)=>
  await axios.post(
    `${serverURL}/api/auth/login`,
    {
      email: email,
      password: password,
    },
    // 헤더에 Authorization 항목이 있는 요청
    // { withCredentials: true }
  )
  .then((res)=>{
    alert('성공')
    // console.log(res.headers)
    // token이 필요한 API 요청 시 header Authorization에 token 담아서 보내기
    // axios.defaults.headers.common[
    //   "Authorization"
    // ] = `Bearer ${res.data.access_token}`
    useDispatch(setAccessToken(`${res.headers.authorization}`))
    localStorage.setItem('refresh_token', `${res.headers.refresh_token}`)
    // useNavigate('/')
  })
  .catch((err) => {
    console.log(err)
    alert("실패: 이메일 혹은 비밀번호를 확인하세요.")
  })

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

export default requestLogin