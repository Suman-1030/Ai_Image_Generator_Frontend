import React, { useState } from 'react';
import { Api } from './Data_path';

function Login({registerHandler}) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const Submithandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Api}/User/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Email, Password }),
      });

      const Data = await response.json();

      if (response.ok) {
        alert('Login Successful');
        localStorage.setItem('token', Data.token); // Make sure to use 'token' instead of 'Token'
        localStorage.setItem('UserId', Data.userId); // Make sure to use 'userId' instead of 'Userid'
        localStorage.setItem('Username', Data.userName)
        window.location.reload();
      } else {
        if (response.status === 404 && Data.msg === 'You are not registered') {
          alert('You are not registered');
        } else if (response.status === 400 && Data.msg === 'Incorrect password') {
          alert('Incorrect password');
        } else {
          alert(Data.msg || 'Unknown error occurred');
        }
      }
    } catch (error) {
      console.log(error);
      alert('External error');
    }
  };

  return (
    <div className="login">
  <form onSubmit={Submithandler} className="login-form">
    <h2>🔐 Login to Your Account</h2>

    <label>Email</label>
    <input
      type="email"
      value={Email}
      name="Email"
      placeholder="📧 Enter your email"
      onChange={(e) => setEmail(e.target.value)}
    />

    <label>Password</label>
    <input
      type="password"
      value={Password}
      name="Password"
      placeholder="🔑 Enter your password"
      onChange={(e) => setPassword(e.target.value)}
    />

    <button type="submit">Submit</button>

    <p className="login-hint">Don't have an account? <span onClick={registerHandler}>Register here</span></p>
  </form>
</div>

  );
}

export default Login;
