import React, { forwardRef, useImperativeHandle, useRef } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

interface RecaptchaProps {
  onSolved: (token: string | null) => void;
}

const Recaptcha = forwardRef<{ resetCaptcha: () => void }, RecaptchaProps>(({ onSolved }, ref) => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  useImperativeHandle(ref, () => ({
    resetCaptcha: () => {
      recaptchaRef.current?.reset();
    },
  }));

  const handleChange = (token: string | null) => {
    onSolved(token);
  };

  return (
    <ReCAPTCHA
      ref={recaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!}
      onChange={handleChange}
    />
  );
});

Recaptcha.displayName = 'Recaptcha';

export default Recaptcha;
