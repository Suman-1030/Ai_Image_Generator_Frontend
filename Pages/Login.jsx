import React, { useState } from 'react';
import { Api } from './Data_path';

function Login({ registerHandler }) {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [Loading, setLoading] = useState(false);

  const Submithandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${Api}/User/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ Email, Password }),
      });

      const Data = await response.json();

      if (response.ok) {
        alert('Login Successful');
        localStorage.setItem('token', Data.token);
        localStorage.setItem('UserId', Data.userId);
        localStorage.setItem('Username', Data.userName);
        window.location.reload();
      } else {
        // Reset password field
        setPassword('');
        // Handle specific backend messages
        if (response.status === 404 && Data.msg === 'You are not registered') {
          alert('You are not registered');
        } else if (response.status === 400 && Data.msg === 'Incorrect password') {
          alert('Incorrect password');
        } else {
          alert(Data.msg || 'Unknown error occurred');
        }
      }
    } catch (error) {
      console.error(error);
      alert('Network or server error');
    } finally {
      setLoading(false); // Ensure loading resets on both success and failure
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
          placeholder="📧 Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label>Password</label>
        <input
          type="password"
          value={Password}
          placeholder="🔑 Enter your password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">
          {Loading ? <p>Submitting...</p> : <p>Submit</p>}
        </button>

        <p className="login-hint">
          Don't have an account? <span onClick={registerHandler}>Register here</span>
        </p>
      </form>
    </div>
  );
}

export default Login;
