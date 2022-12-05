const express = require('express');
const homeRouter = express.Router();

const createHomeRouter = (postsRepository) => {
  homeRouter.get('/home', async (req, res) => {
    if (!req.username) {
      res.status(401);
      res.send();
      return;
    }
    const result = await postsRepository.findPostsFromFollowingUsers(
      req.username
    );
    const posts = result.rows;
    res.status(200);
    res.send({ posts: posts });
  });

  return homeRouter;
};

module.exports = createHomeRouter;
