const server = require('./server');

const app = server.listen(8000, () => {
  console.log('Listening on port 8000!!');
});

module.exports = app;
