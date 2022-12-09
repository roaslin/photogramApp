const express = require('express');
const PostCommand = require('../domain/postcommand');
const postsRouter = express.Router();

const createPostsRouter = (postsRepository) => {
  postsRouter.post('/posts', async (req, res) => {
    const userId = req.userId;
    const body = req.body;
    const dto = {
      url: body.url,
      caption: body.caption,
      lat: body.lat,
      lng: body.lng,
      userId: userId,
    };
    const newPostCommand = PostCommand.fromDto(dto);
    if (newPostCommand === 'not-valid') {
      res.status(400);
      res.send('Data is not valid');
      return;
    }
    const result = await postsRepository.save(newPostCommand);
    if (result === 'error') {
      res.status(200);
      res.send({ message: 'Something went wrong, try again' });
      return;
    }
    res.status(201);
    res.send();
  });

  return postsRouter;
};

module.exports = createPostsRouter;
