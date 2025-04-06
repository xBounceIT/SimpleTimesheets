import React, { useState } from 'react';
import axios from 'axios';

export function LoginForm({ onLogin }: { onLogin: (token: string, role: string) => void }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/auth/login', { email, password }, { withCredentials: true });
      const meRes = await axios.get('http://localhost:3000/auth/me', { withCredentials: true });
      const payload = meRes.data;
      const role = payload?.role ?? 'USER';
      onLogin('cookie', role);
    } catch (err) {
      alert('Login failed');
    }
  }

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>
        
        <div className="form-field">
          <label htmlFor="email">Username</label>
          <input 
            id="email"
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="email"
            required
            placeholder="mario.rossi"
          />
        </div>
        
        <div className="form-field">
          <label htmlFor="password">Password</label>
          <div className="password-input-container">
            <input 
              id="password"
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              type={showPassword ? "text" : "password"}
              placeholder="password"
              required
            />
            <button 
              type="button" 
              className="show-password-button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        
        <button type="submit" className="login-button">Sign in</button>
      </form>
    </div>
  );
}
