import api from './api';
import TokenService from './token.service';

const User = {
  async login(user, password) {
    return api
      .post('/users/login', {
        user,
        password,
      })
      .then((response) => {
        if (response.data.token) {
          TokenService.setUser(response.data);
        }
        return response;
      });
  },
  async logout() {
    TokenService.removeUser();
  },
  async register(user, password) {
    return api.post('/users/register', {
      user,
      password,
    });
  },
  getCurrentUser() {
    return TokenService.getUser();
  },
};

export default User;
