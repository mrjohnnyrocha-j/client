// components/FriendlyCaptcha/FriendlyCaptcha.tsx

import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import styles from './FriendlyCaptcha.module.css';

interface FriendlyCaptchaProps {
  onSolved: (token: string) => void;
}

const FriendlyCaptcha = forwardRef<{ handleNewCaptchaChallenge: () => void }, FriendlyCaptchaProps>(
  ({ onSolved }, ref) => {
    const [widgetState, setWidgetState] = useState<string>('init');
    const [captchaToken, setCaptchaToken] = useState<string | null>(null);

    const handleNewCaptchaChallenge = () => {
      const widgetElement = document.querySelector('.frc-captcha') as HTMLElement;
      if (widgetElement) {
        widgetElement.innerHTML = ''; // Clear the inner HTML to force a re-render
        setTimeout(() => {
          widgetElement.innerHTML = `<div
            class="frc-captcha"
            data-sitekey="${process.env.NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITE_KEY}"
            data-callback="frc:widget.statechange"
            data-widget-mode="non-interactive"
          ></div>`;
          const script = document.createElement('script');
          script.src = 'https://unpkg.com/friendly-challenge/widget.module.min.js';
          script.type = 'module';
          document.head.appendChild(script);
        }, 0); // Re-add the captcha element and re-initialize the script
      }
    };

    useImperativeHandle(ref, () => ({
      handleNewCaptchaChallenge,
    }));

    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/friendly-challenge/widget.module.min.js';
      script.type = 'module';
      document.head.appendChild(script);

      const handleCaptchaCallback = (event: CustomEvent) => {
        const { state, response } = event.detail;
        setWidgetState(state);

        if (state === 'completed') {
          setCaptchaToken(response);
          onSolved(response);
        } else if (state === 'error' || state === 'expired') {
          setCaptchaToken(null);
          handleNewCaptchaChallenge();  // Trigger a new challenge on error or expiry
        }
      };

      window.addEventListener('frc:widget.statechange', handleCaptchaCallback as EventListener);

      return () => {
        window.removeEventListener('frc:widget.statechange', handleCaptchaCallback as EventListener);
        document.head.removeChild(script);
      };
    }, [onSolved]);

    const handleReset = () => {
      handleNewCaptchaChallenge();
    };

    return (
      <div className={styles.captchaContainer}>
        <div
          className="frc-captcha"
          data-sitekey={process.env.NEXT_PUBLIC_FRIENDLY_CAPTCHA_SITE_KEY}
          data-callback="frc:widget.statechange"
          data-widget-mode="non-interactive"
        ></div>
        <button onClick={handleReset} className={styles.resetButton}>
          Reset Captcha
        </button>
      </div>
    );
  }
);

export default FriendlyCaptcha;
