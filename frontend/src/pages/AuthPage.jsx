// src/pages/AuthPage.jsx
import React, { useState, useRef, useEffect } from 'react';
import axios from '../utils/axios';
import { toast } from 'react-toastify';
import FormInput from '../components/FormInput';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

function AuthPage() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [login, setLogin] = useState(true);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const firstInputRef = useRef(null);

  useEffect(() => {
    firstInputRef.current?.focus();
  }, [login]);

  const validate = () => {
    const newErrors = {};
    const trimmedEmail = form.email.trim();
    const trimmedName = form.name.trim();

    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!form.password || form.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!login && !trimmedName) {
      newErrors.name = 'Name is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const url = login ? '/auth/login' : '/auth/register';

    try {
      setLoading(true);
      await axios.post(url, form, { withCredentials: true });

      toast.success(`${login ? 'Login' : 'Register'} successful!`);

      if (login) {
        navigate('/home');
      } else {
        setLogin(true);
        setForm({ name: '', email: '', password: '' });
      }
    } catch (err) {
      console.log(err);
      
      toast.error(err.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>{login ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} noValidate>
        {!login && (
          <FormInput
            label="Name"
            name="name"
            id="name"
            value={form.name}
            onChange={handleInputChange}
            error={errors.name}
            inputRef={firstInputRef}
          />
        )}
        <FormInput
          label="Email"
          name="email"
          id="email"
          value={form.email}
          onChange={handleInputChange}
          error={errors.email}
          inputRef={login ? firstInputRef : null}
        />
        <FormInput
          label="Password"
          name="password"
          id="password"
          type="password"
          value={form.password}
          onChange={handleInputChange}
          error={errors.password}
        />
        <button className="primary-btn" type="submit" disabled={loading}>
          {loading ? 'Please wait...' : login ? 'Login' : 'Register'}
        </button>
      </form>

      <button
        className="toggle-btn"
        onClick={() => setLogin(!login)}
        disabled={loading}
        style={{ marginTop: '1rem' }}
      >
        Switch to {login ? 'Register' : 'Login'}
      </button>
    </div>
  );
}

export default AuthPage;
