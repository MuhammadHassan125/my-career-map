import React from 'react'
import './index.scss'
import PrimaryInput from '../../Components/PrimaryInput';
import PrimaryBtn from '../../Components/PrimaryBtn';
import { Link, useNavigate } from 'react-router-dom';

const socialIcons = [
  { id: 2, src: "/images/google.png", alt: "google", link: "https://www.google.com" },
  { id: 2, src: "/images/outlook.png", alt: "google", link: "https://www.outlook.com" },
  { id: 1, src: "/images/linkedin.png", alt: "facebook", link: "https://www.linkedin.com" },
  { id: 1, src: "/images/facebook.png", alt: "facebook", link: "https://www.facebook.com" },
  { id: 3, src: "/images/instagram.png", alt: "twitter", link: "https://www.instagram.com" },
];

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = () => {
    localStorage.setItem('user-visited-dashboard', '1');
    navigate('/')
  }

  return (
    <>
      <main className="register-section">
        {/* register form  */}
        <div className="login-form">

          <div className="login-form-heading">
            <h2>Create an Account</h2>
            <p>Sign up with your social media account or email address</p>
          </div>

          {/* social media icons  */}
          <div className='signup-social-icons'>
            {socialIcons.map((socialIcon) => (
              <div
                onClick={() => window.open(socialIcon.link)}
              >
                <img key={socialIcon.id} src={socialIcon.src} alt={socialIcon.alt}
                />
              </div>
            ))}
          </div>

          <div className="or-div">
            <img src='/images/line.png' />
            <span>or</span>
            <img src='/images/line.png' />
          </div>


          {/* email  */}
          <div className="register-fields-div">
            <p>Email address:</p>
            <PrimaryInput type="email" placeholder="Enter Email" />
          </div>

          {/* username  */}
          <div className="register-fields-div">
            <p>Username:</p>
            <PrimaryInput type="email" placeholder="Enter Email" />
          </div>

          {/* password  */}

          <div className="register-fields-div">
            <div>
              <p>Password:</p>
              <span>Forget Password?</span>
            </div>
            <PrimaryInput type="password" placeholder="Password" />
          </div>

          {/* Remember Password */}
          <div className="remember-flex">
            <input type="checkbox" />
            <span>I accept terms and conditions</span>
          </div>

          <PrimaryBtn text="Sign Up" onClick={handleSubmit} />


          <div className='login-account'>
            <p>Already have an account?
              <Link to="/login" className='link-class'>
                <span> Login</span>
              </Link>
            </p>
          </div>

        </div>
      </main>
    </>
  )
}

export default Register