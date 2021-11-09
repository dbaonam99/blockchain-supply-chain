import React, { useState, useEffect } from 'react';
import AuthService from '../../services/auth.service';
import TokenService from '../../services/token.service';
import './Login.css';

function Login({ history }) {
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [status, setStatus] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    TokenService.removeUser();
  }, []);

  const onSubmit = async () => {
    setLoading(true);
    const res = await AuthService.login(user, password);
    if (res.status === 200) {
      setStatus({ type: 'success', message: 'Login success!' });
      setLoading(false);
      setTimeout(() => {
        history.push('/');
      }, 1000);
    } else {
      setStatus({ type: 'error', message: res.data });
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <div className="login__background" />
      <div className="login__box">
        <div className="login__box__left"></div>
        <div className="login__box__right">
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
          <div
            className="status"
            style={{ color: status.type === 'success' ? 'green' : 'red' }}
          >
            {status?.message}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
