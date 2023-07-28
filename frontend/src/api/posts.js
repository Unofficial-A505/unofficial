import axios from 'axios';

const API_URL = 'http://127.0.0.1:8000/api/v1/'

export default class Posts {
  constructor() {
  }

  async boards() {
    return axios({
      method: "get",
      url: 'http://127.0.0.1:8000/api/v1/boards/'
    })
    .then((res) => res.data)
    .catch((err) => console.log(err))
  }

}