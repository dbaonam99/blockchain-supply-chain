import api from './api';

const getUserInfo = () => {
  return api.get('/users');
};

const getAll = () => {
  return api.post('/users/get-all');
};

const UserService = {
  getUserInfo,
  getAll,
};

export default UserService;
