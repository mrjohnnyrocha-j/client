// components/UserSignInForm/UserSignInForm.tsx

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import styles from './UserSignInForm.module.css';

const UserSignInForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const responseBody = await response.json();

      if (!response.ok) {
        console.error('Login error:', responseBody);
        throw new Error(responseBody.error || 'Unknown error');
      }

      localStorage.setItem('token', responseBody.token);
      router.push('/');
    } catch (error) {
      console.error('Error during login:', error);
      setError((error as Error).message);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  return (
    <div className={styles.formContainer}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>Sign In</button>
      </form>
    </div>
  );
};

export default UserSignInForm;
