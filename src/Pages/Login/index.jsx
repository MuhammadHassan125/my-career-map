import React from 'react';
import './index.scss';
import PrimaryInput from '../../Components/PrimaryInput';
import PrimaryBtn from '../../Components/PrimaryBtn';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';
import GoogleBtn from '../../Components/Auth/SocialLinks/Login/GoogleBtn';
import OutlookBtn from '../../Components/Auth/SocialLinks/Login/OutlookBtn';
import LinkedinBtn from '../../Components/Auth/SocialLinks/Login/LinkedinBtn';
import FacebookBtn from '../../Components/Auth/SocialLinks/Login/FacebookBtn';
import InstagramBtn from '../../Components/Auth/SocialLinks/Login/InstagramBtn';

const socialIcons = [
  { id: 2, src: "/images/google.png", alt: "google", link: "https://www.google.com" },
  { id: 2, src: "/images/outlook.png", alt: "outlook", link: "https://www.outlook.com" },
  { id: 1, src: "/images/linkedin.png", alt: "linkedin", link: "https://www.linkedin.com" },
  { id: 1, src: "/images/facebook.png", alt: "facebook", link: "https://www.facebook.com" },
  { id: 3, src: "/images/instagram.png", alt: "instagram", link: "https://www.instagram.com" },
];

const Login = () => {
  const navigate = useNavigate();
  const { data, setData, errors, post } = useFire({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    post({
      url: `${baseURL}/login`,
      onSuccess: (res) => {
        console.log('Login Success', res);
        if (res.data.data.AuthToken || res.data.status === true) {
          localStorage.setItem('user-visited-dashboard', res.data.data.AuthToken);
          Snackbar(res.data.message, { variant: 'success' });
          navigate('/');
        } else {
          Snackbar(errors || "Login Failed", { variant: 'error' });
        }
      },

      onError: (err) => {
        console.log('Login Error', err);
        Snackbar(err.message, { variant: 'error' });
      }
    });

  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  return (
    <>
      <main className="login-section">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="login-form-heading">
            <img src="/images/logo.png" alt="logo" className="login-logo" />
            <h2>Login to Account</h2>
            <p>Please enter your email and password to continue</p>
          </div>

          <div className="email-div">
            <p>Email address:</p>
            <PrimaryInput
              type="email"
              placeholder="Enter Email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>

          <div className="email-div">
            <div>
              <p>Password:</p>
              <Link className='link-class' to="/forget-password"><span>Forget Password?</span></Link>
            </div>
            <PrimaryInput
              type="password"
              placeholder="Password"
              name="password"
              value={data.password}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <div className="remember-flex">
            <input type="checkbox" />
            <span>Remember Password</span>
          </div>

          <PrimaryBtn text="Login" />

          <div className="or-div">
            <img src='/images/line.png' />
            <span>or</span>
            <img src='/images/line.png' />
          </div>

          {/* <div className='login-social-icons'>
            {socialIcons.map((socialIcon, index) => (
              <div key={index} onClick={() => window.open(socialIcon.link)}>
                <img src={socialIcon.src} alt={socialIcon.alt} />
              </div>
            ))}
          </div> */}

          <div className='signup-social-icons'>
            <div className='social-icons-div'>
              <GoogleBtn />
            </div>
            <div className='social-icons-div'>
              <OutlookBtn />
            </div>
            <div className='social-icons-div'>
              <LinkedinBtn />
            </div>
            <div className='social-icons-div'>
              <FacebookBtn />
            </div>
            <div className='social-icons-div'>
              <InstagramBtn />
            </div>

          </div>

          <div className='create-account'>
            <p>Don't have an account?
              <Link className='link-class' to="/register">
                <span>Create Account</span>
              </Link>
            </p>
          </div>
        </form>
      </main>
    </>
  );
};

export default Login;
