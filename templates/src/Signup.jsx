import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from './firebaseClient';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const handleSignup = async () => {
    setLoading(true);
    if (!email || !password) {
      setMsg('Email and password are required');
      setLoading(false);
      return;
    }
    
    const auth = getAuth();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMsg('Signup successful!');
      setTimeout(() => nav('/login'), 2000);
    } catch (error) {
      setMsg(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2>Create Account</h2>
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
        />
        <button onClick={handleSignup} disabled={loading}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
        <p className="msg">{msg}</p>
        <p className="login-link">
          Already have an account?{' '}
          <span onClick={() => nav('/login')}>Log In</span>
        </p>
      </div>
    </div>
  );
}
