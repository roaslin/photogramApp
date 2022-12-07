import axios from 'axios';

const client = axios.create({
  baseURL: 'http://localhost:8000',
});

export const home = async (token) => {
  return await client.get('/home', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const signup = async (username, email, password) => {
  return await client.post('/signup', { username, email, password });
};

export const login = async (email, password) => {
  console.log('login api call');
  return await client.post('/login', { email, password });
};
