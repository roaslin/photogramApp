import apiClient from './apiClient';

export const getPostsFromFollowingByUserId = async (userId) => {
  return await apiClient.get('/');
};


