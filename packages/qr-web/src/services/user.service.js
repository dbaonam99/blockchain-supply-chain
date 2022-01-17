import api from './api';

const getUserInfo = () => {
  return api.get('/users');
};

const getAll = () => {
  return api.post('/users/get-all');
};

const getByAddress = ({ address }) => {
  return api.get(`/users/get-by-address/${address}`);
};

const UserService = {
  getUserInfo,
  getAll,
  getByAddress,
};

export default UserService;
