// pages/auth/sign-in.tsx
import React, { useEffect, useState } from 'react';
import { getProviders, signIn } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import Separator from '../../components/General/Separator/Separator';
import styles from '../../styles/auth/sign-in.module.css';
import textStyles from '../../components/General/Text/Text.module.css';

const SignIn = () => {
  const [providers, setProviders] = useState(null);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const res : any = await getProviders();
      setProviders(res);
    })();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData, [name]: value
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/auth/sign-in', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.error || 'Unknown error');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      router.push('/');
    } catch (error: any) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.mainContent}>
        <div className={styles.signInPage}>
          <div className={styles.signInContainer}>
            <div className={styles.logoContainer}>
              <Image
                src="/assets/j_logo.png"
                alt="J Logo"
                width={100}
                height={100}
                className={styles.logo}
                priority
              />
            </div>
            <div className={styles.formContainer}>
              <div className={styles.oauthButtons}>
                {providers &&
                  Object.values(providers).map((provider: any) => (
                    <button
                      key={provider.name}
                      onClick={() => signIn(provider.id, { callbackUrl: '/' })}
                      className={styles.button}
                    >
                      <Image
                        src={`/assets/${provider.name.toLowerCase()}.svg`}
                        alt={provider.name}
                        width={20}
                        height={20}
                        priority
                      />
                      Sign in with {provider.name}
                    </button>
                  ))}
              </div>
              <Separator />
              <form onSubmit={handleSubmit}>
                <div className={styles.inputContainer}>
                  <label className={textStyles.highlighted}>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.inputContainer}>
                  <label className={textStyles.highlighted}>Password</label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <button type="submit" className={styles.authButton}>
                  Sign in
                  <div id="icon">
                    <img src="/assets/j_icon.png" alt="J Icon" className={styles.jIcon} />
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
