import React from 'react'
import './index.scss'
import PrimaryInput from '../../Components/PrimaryInput'
import PrimaryBtn from '../../Components/PrimaryBtn'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const socialIcons = [
  { id: 2, src: "/images/google.png", alt: "google", link: "https://www.google.com" },
  { id: 2, src: "/images/outlook.png", alt: "google", link: "https://www.outlook.com" },
  { id: 1, src: "/images/linkedin.png", alt: "facebook", link: "https://www.linkedin.com" },
  { id: 1, src: "/images/facebook.png", alt: "facebook", link: "https://www.facebook.com" },
  { id: 3, src: "/images/instagram.png", alt: "twitter", link: "https://www.instagram.com" },
];

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem('user-visited-dashboard', '1');
    navigate('/')
  }

  return (
    <>
      <main className="login-section">
        {/* login form  */}
        <div className="login-form">

          <div className="login-form-heading">
            <img
              src="/images/logo.png"
              alt="logo"
              className="login-logo"
            />
            <h2>Login to Account</h2>
            <p>Please enter your email and password to continue</p>
          </div>

          {/* email  */}
          <div className="email-div">
            <p>Email address:</p>
            <PrimaryInput type="email" placeholder="Enter Email" />
          </div>

          {/* password  */}

          <div className="email-div">
            <div>
              <p>Password:</p>
              <span>Forget Password?</span>
            </div>
            <PrimaryInput type="password" placeholder="Password" />
          </div>

          {/* Remember Password */}
          <div className="remember-flex">
            <input type="checkbox" />
            <span>Remember Password</span>
          </div>

          <PrimaryBtn text="Login" onClick={handleSubmit} />

          <div className="or-div">
            <img src='/images/line.png' />
            <span>or</span>
            <img src='/images/line.png' />
          </div>

          {/* social media icons  */}
          <div className='login-social-icons'>
            {socialIcons.map((socialIcon, index) => (
              <div
                key={index}
                onClick={() => window.open(socialIcon.link)}
              >
                <img src={socialIcon.src} alt={socialIcon.alt}
                />
              </div>
            ))}
          </div>

          <div className='create-account'>
            <p>Don't have an account?
              <Link className='link-class' to="/register">
                <span>Create Account</span>
              </Link>
            </p>
          </div>

        </div>
      </main>
    </>
  )
}

export default Login