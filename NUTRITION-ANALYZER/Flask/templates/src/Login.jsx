import { useState } from 'react';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { app } from './firebaseClient';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleLogin = async () => {
    setLoading(true);
  
    if (!email || !password) {
      setMsg('Email and password are required');
      setLoading(false);
      return;
    }
  
    const auth = getAuth(app);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      nav('/');
    } catch (error) {
      setMsg(error.message);
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button onClick={handleLogin} disabled={loading}>
          {loading ? 'Logging In...' : 'Log In'}
        </button>
        <p className="msg">{msg}</p>
        <p className="signup-link">
          New User?{' '}
          <span onClick={() => nav('/signup')}>Sign Up</span>
        </p>
      </div>
    </div>
  );
}
