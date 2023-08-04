import styles from './BoardView.module.css'
import axios from 'axios';
import { useEffect, useState, useParams } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PostView from '../PostView/PostView'
import customAxios from "../../util/customAxios";

export default function BoardView( ){
  const [ posts, setPosts ] = useState([]);
  const [ currentPage, setCurrentPage ] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  useEffect(() => {

    customAxios({
      method: "get",
      url: `/api/v1/articles`,
      headers: {
        // Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2OTIxNjE1MzcsInN1YiI6ImFjY2Vzcy10b2tlbiIsImh0dHBzOi8vbG9jYWxob3N0OjgwODAiOnRydWUsInVzZXJfaWQiOjEsInJvbGUiOiJST0xFX0FETUlOIn0.-yKThjZOeyLxvlpVzVHxMAfEw2jbtwVZ-wcX0pYWdgJETpiALTD3H0re8KngsVHx3Zu_rzF8wB_24jkAmv6O5g`,
      }
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