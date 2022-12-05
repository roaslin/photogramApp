const express = require('express');
const homeRouter = express.Router();

const createHomeRouter = () => {
  homeRouter.get('/home', async (req, res) => {
    res.status(401);
    res.send();
  });

  return homeRouter;
};

module.exports = createHomeRouter;
