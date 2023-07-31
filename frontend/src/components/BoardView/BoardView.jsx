import styles from './BoardView.module.css'
import axios from 'axios';
import { useEffect, useState, useParams } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PostView from '../PostView/PostView'

export default function BoardView( ){
  const [ posts, setPosts ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();
  const URL = useSelector(state => state.URL.API_URL)

  useEffect(() => {

    axios({
      method: "get",
      url: `${URL}api/v1/articles`,
      // headers: {
      //   Authorization: `Token ${this.$store.state.token}`,
      // }
      })
      .then((res) => {
        console.log(res.data);
        setPosts(res.data.slice(0, 10));
      })
      .catch((err) => console.log(err))
    return () => {  
      console.log('unmounted')
     }}, []);

  return(
    <div>
      {posts.map((post, index) => (
        <div key={index}>
          <PostView post={post}/>
        </div>
      ))}
    </div>
  );
}