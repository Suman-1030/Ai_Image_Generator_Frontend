import React, { useState } from 'react';
import { Api } from './Data_path';

function Register({loginHandler}) {
  const [Username, setUsername] = useState('');
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');

  const Submithandler = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${Api}/User/reg`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Username, Email, Password }),
      });

      const Data = await response.json();

      if (response.ok) {
        alert('User registered successfully');
        loginHandler()
      } else {
        if (response.status === 400 && Data.msg === 'Email already registered') {
          alert('Email already registered');
        } else if (response.status === 500 && Data.msg === 'Registration failed') {
          alert('Registration failed');
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
    <div className="register-container">
    <form onSubmit={Submithandler} className="register-form">
      <h2>📝 Create Your Account</h2>
  
      <label className="register-label">Username</label>
      <input
        type="text"
        value={Username}
        name="Username"
        placeholder="👤 Enter your username"
        onChange={(e) => setUsername(e.target.value)}
        className="register-input"
      />
  
      <label className="register-label">Email</label>
      <input
        type="email"
        value={Email}
        name="Email"
        placeholder="📧 Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        className="register-input"
      />
  
      <label className="register-label">Password</label>
      <input
        type="password"
        value={Password}
        name="Password"
        placeholder="🔑 Create a password"
        onChange={(e) => setPassword(e.target.value)}
        className="register-input"
      />
  
      <button type="submit" className="register-button">✅ Register</button>
  
      <p className="register-hint">
        Already have an account? <span onClick={loginHandler}>Login here</span>
      </p>
    </form>
  </div>  

  );
}

export default Register;
