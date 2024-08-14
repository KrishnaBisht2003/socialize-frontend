import { useContext, useEffect, useState } from 'react';
import "./feed.css"
import Share from '../share/Share';
import Post from '../post/Post';
// import {Posts} from '../../dummyData';
import axios from "axios";

import { AuthContext } from '../../context/AuthContext';

axios.defaults.baseURL = 'https://socialize-backend-nmng.onrender.com/api';


export default function Feed({ username }) {
  // console.log(username);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = username
        ? await axios.get("/posts/profile/" + username)
        : await axios.get("/posts/timeline/64f6b914e339f5603df69cb5");
      // const res = await axios.get("posts/timeline/" + user._id)
      setPosts(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
      // console.log(res.data);
    }
    fetchPosts();
  }, [username, user._id]);

  return (
    <div className="feed">
      {/* <input type = "text" onChange={e => setText(e.target.value)}/> */}
      <div className="feedWrapper">
        {username === user.username && <Share />}
        {posts.map((p) => {

          return (

            <Post key={p._id} post={p} />
          )
        })
        }

      </div>
    </div>
  )
}
