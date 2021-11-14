import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from '../../auth/account';
import AuthService from '../../services/auth.service';
import TokenService from '../../services/token.service';
import './Login.css';

function Login({ history }) {
  const { getUserInfo } = useAuth();
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    TokenService.removeUser();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    const res = await AuthService.login(user, password);
    if (res.status === 200) {
      getUserInfo(res.data.privateKey);
      toast.success('Login success!');
      setLoading(false);
      setTimeout(() => {
        history.push('/');
      }, 1000);
    } else {
      toast.error(res.data);
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__background" />
      <div className="login__box">
        <div className="login__box__left"></div>
        <form className="login__box__right">
          <h2>Sign in</h2>
          <div className="login__box__right__input">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter Username"
              onChange={(event) => setUser(event.target.value)}
            />
          </div>
          <div className="login__box__right__input">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter Password"
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button onClick={onSubmit}>
            {loading ? 'Loading...' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
