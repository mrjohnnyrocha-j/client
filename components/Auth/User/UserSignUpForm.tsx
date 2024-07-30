import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import ReCAPTCHA from '../ReCAPTCHA/ReCAPTCHA';
import GoogleProvider from '../AuthProviders/GoogleProvider';
import GitHubProvider from '../AuthProviders/GitHubProvider';
import XProvider from '../AuthProviders/XProvider';
import SlackProvider from '../AuthProviders/SlackProvider';
import styles from './UserSignUpForm.module.css';

const UserSignUpForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    companyName: '',
    password: '',
    repeatPassword: '',
  });
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<{ resetCaptcha: () => void }>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!captchaToken) {
      alert('Please complete the CAPTCHA');
      if (recaptchaRef.current) {
        recaptchaRef.current.resetCaptcha();
      }
      return;
    }

    const { firstName, lastName, email, password, repeatPassword, companyName } = formData;

    if (!firstName || !lastName || !email || !password) {
      alert('All required fields must be filled');
      return;
    }

    if (password !== repeatPassword) {
      alert('Passwords do not match');
      return;
    }

    const body = { email, password, firstName, lastName, companyName, captchaToken };

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      const responseBody = await response.json();
      if (!response.ok) {
        throw new Error(responseBody.error || 'Unknown error');
      }

      router.push('/auth/sign-in');
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert('Unknown error occurred');
      }
    }
  };

  const onCaptchaSolved = (token: string | null) => {
    setCaptchaToken(token);
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.oauthButtons}>
        <GoogleProvider />
        <GitHubProvider />
        <XProvider />
        <SlackProvider />
      </div>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputGroup}>
          <label>First Name</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Last Name</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.inputGroup}>
          <label>Username (Optional)</label>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
        </div>
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
          <label>Company Name (Optional)</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
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
        <div className={styles.inputGroup}>
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeatPassword"
            value={formData.repeatPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className={styles.captcha}>
          <ReCAPTCHA onSolved={onCaptchaSolved} ref={recaptchaRef} />
        </div>
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

export default UserSignUpForm;
