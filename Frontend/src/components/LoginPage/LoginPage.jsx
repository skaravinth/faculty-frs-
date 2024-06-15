import React from 'react';
import './LoginPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import authImage from '../../../assets/images/auth.png';
import logoImage from '../../../assets/images/logo.png';

const LoginPage = () => {
  // Function to handle Google sign-in
  const handleGoogleSignIn = () => {
    // Implement Google sign-in functionality here
    console.log('Signing in with Google...');
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <div className='left'>
          <h1 className="login-title">Faculty Worklog</h1>
          <p className="login-subtitle">
          A teacher is a great listener of knowledge, prosperity, and light, from which we can benefit greatly throughout our life
          </p>
          <div className="login-illustration">
            <img src={authImage} alt="Illustration" />
          </div>
        </div>
      </div>
      <div className="login-right">
        <img src={logoImage} alt="Logo" className="login-logo" />
        <div className="login-signin">Sign In</div>
        <div className="login-access">Get access to your account</div>
        <hr className="divider" />
        <form className="login-form">
          <button type="button" className="login-button-google" onClick={handleGoogleSignIn}>
            <FontAwesomeIcon icon={faGoogle} className="google-icon" />
            Sign in with Google
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
