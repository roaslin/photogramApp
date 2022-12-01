import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const getPostsFromFollowingByUserId = async (userId) => {
  return await client.get('/cacafuti');
};

export const signup = async (username, email, password) => {
  const result = await client.post('/signup', { username, email, password });
  return result;
};

export const login = async (email, password) => {
  console.log('login api call');
  const result = await client.post('/login', { email, password });
  console.log(result);
  return result;
};
