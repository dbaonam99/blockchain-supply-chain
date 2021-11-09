import api from './api';

const getUserInfo = () => {
  return api.get('/users');
};

const UserService = {
  getUserInfo,
};

export default UserService;
