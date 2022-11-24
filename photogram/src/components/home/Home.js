import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import CustomAppBar from '../CustomAppBar';
import Post from './Post';

const Home = () => {
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
