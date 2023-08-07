import styles from './BoardView.module.css'
import axios from 'axios';
import { useEffect, useState, useParams } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import PostView from '../PostView/PostView'
import customAxios from '../../util/customAxios';

export default function BoardView(props){
  const [ currentPage, setCurrentPage ] = useState(1);
  const pageSize = 10;

  const navigate = useNavigate();

  // useEffect(() => {

  //   customAxios({
  //     method: "get",
  //     url: `${process.env.REACT_APP_SERVER}/api/best`,
  //     // headers: {
  //     //   Authorization: `Token ${this.$store.state.token}`,
  //     // }
  //     })
  //     .then((res) => {
  //       console.log(res.data);
  //       setPosts(res.data.slice(0, 10));
  //     })
  //     .catch((err) => console.log(err))
  //   return () => {  
  //     console.log('unmounted')
  //   }}, []);

  return(
    <div>
      {props.posts.map((post, index) => (
        <div key={index}>
          <PostView post={post}/>
        </div>
      ))}
    </div>
  );
}