import React from 'react';
import './index.scss';
import PrimaryInput from '../../Components/PrimaryInput';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';
import GoogleBtn from '../../Components/Auth/SocialLinks/Login/GoogleBtn';
import OutlookBtn from '../../Components/Auth/SocialLinks/Login/OutlookBtn';
import LinkedinBtn from '../../Components/Auth/SocialLinks/Login/LinkedinBtn';
import FacebookBtn from '../../Components/Auth/SocialLinks/Login/FacebookBtn';
import InstagramBtn from '../../Components/Auth/SocialLinks/Login/InstagramBtn';
import {useUser} from '../../context/context';
import Loading from '../../Components/Loading';

const Login = () => {
  const navigate = useNavigate();
  const { data, setData, errors, post } = useFire({ email: '', password: '' });
  const { gettingProfileInfo, handleLoginSuccess, setLoading } = useUser();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true); 
    post({
      url: `${baseURL}/login`,
      onSuccess: (res) => {
        console.log('Login Success', res);
        if (res.data.data.AuthToken || res.data.status === true) {
          handleLoginSuccess(res.data.data.AuthToken);
          Snackbar(res.data.message, { variant: 'success',  style: { backgroundColor:'var(--primary-btn-color)' } });
          gettingProfileInfo();
          navigate('/');
        } else {
          Snackbar(errors || "Login Failed", { variant: 'error' });
        }
        setLoading(false);
      },
      onError: (err) => {
        console.log('Login Error', err);
        Snackbar(err.message || "Login Failed", { variant: 'error' });
        setLoading(false); 
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };


  return (
    <>
     <Loading/>
      <main className="login-section">
        <div className="login-form">
          <form onSubmit={handleLogin}>
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

            <div style={{ width: '100%' }}>
              <button
                type="submit"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  backgroundColor: 'var(--primary-btn-color)',
                  border: 'none',
                  padding: '10px 20px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                Login
              </button>
            </div>
          </form>

          <div className="or-div">
            <img src='/images/line.png' />
            <span>or</span>
            <img src='/images/line.png' />
          </div>

          {/* Move the social login buttons outside the form */}
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
        </div>
      </main>
    </>
  );
};

export default Login;
