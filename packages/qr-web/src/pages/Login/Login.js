import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login">
      <div className="login__background" />
      <div className="login__box">
        <div className="login__box__left"></div>
        <div className="login__box__right">
          <h2>Sign in</h2>
          <div className="login__box__right__input">
            <label>Username</label>
            <input type="text" placeholder="Enter Username" />
          </div>
          <div className="login__box__right__input">
            <label>Password</label>
            <input type="password" placeholder="Enter Password" />
          </div>
          <button>Sign in</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
