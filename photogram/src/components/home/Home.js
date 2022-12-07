import React, { useEffect, useState } from 'react';
import Toolbar from '@mui/material/Toolbar';
import CustomAppBar from '../CustomAppBar';
import Post from './Post';
import { home } from '../../api/api';

const Home = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    const result = await home(token);

    console.log(result);
    // return result.data.posts;
  };

  useEffect(() => {
    const posts = fetchPosts();
    setPosts(posts);
  }, []);

  console.log(posts);

  // const renderedPosts = posts.map(post => )

  return (
    <React.Fragment>
      <CustomAppBar />
      {/* To make visible the contents under the AppBar check this out, that's why we need that extra Toolbar Component
      https://mui.com/material-ui/react-app-bar/ */}
      <Toolbar />
      <Post />
      <Post />
      <Post />
    </React.Fragment>
  );
};

export default Home;
