import React from 'react';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import MessageOutlinedIcon from '@mui/icons-material/MessageOutlined';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';
import { Typography } from '@mui/material';
import './Post.css';

const Post = () => {
  return (
    <Stack className='post'>
      <Toolbar>
        <Grid container>
          <Grid item xs={4}>
            <Avatar src='https://www.casino-king.com/images/articles/elon-musk.jpg' />
          </Grid>
          <Grid item xs={8}>
            <Box sx={{ float: 'right' }} paddingY={1}>
              <MoreVertIcon />
            </Box>
          </Grid>
        </Grid>
      </Toolbar>
      <img
        src='https://cdn.forbes.co/2021/04/Elon-Musk-nueva-1280x720-Reuters.jpg'
        alt=''
      />
      <Toolbar>
        <FavoriteBorderIcon />
        <MessageOutlinedIcon sx={{ marginLeft: 2 }} />
        <SendOutlinedIcon sx={{ marginLeft: 2 }} />
      </Toolbar>
      <Typography className='post_likes' sx={{ marginLeft: 1 }}>
        456 Likes
      </Typography>
      <Typography className='post_caption' sx={{ marginLeft: 1 }}>
        Portobello mushrooms creamy cauliflower alfredo sauce peppermint
        ultimate sandwiches falafel bites Thai super chili cherries cauliflower
        paprika grenadillo crumbled lentils. Cool off crispy figs roasted
        brussel sprouts eating together cool cucumbers Bulgarian carrot ghost
        pepper basmati cherry bomb pepper lime mango crisp spiced pumpkin chili
        spicy simmer chai tea hearty plums apple vinaigrette picnic Thai dragon
        pepper sweet potato black bean chili dip.
      </Typography>
      <Typography sx={{ fontSize: 12, marginLeft: 1, marginTop: 1 }}>
        1 day ago
      </Typography>
    </Stack>
  );
};

export default Post;
