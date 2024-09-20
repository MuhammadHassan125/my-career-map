import React from 'react';
import './index.scss';
import PrimaryInput from '../../Components/PrimaryInput';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import Form from '../../Components/Auth/Form';
import SocialLinkComponent from '../../Components/Auth/SocialLinks/SocialLinksComponent';
import FormBtn from '../../Components/Auth/FormBtn';
import AuthLayout from '../../Layouts/AuthLayout';

const Login = () => {
  const navigate = useNavigate();
  const { data, setData, errors, post, processing } = useFire({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    if (processing) return;
    post({
      url: `${baseURL}/login`,
      onSuccess: (res) => {
        localStorage.setItem('user-visited-dashboard', res.data.data.AuthToken);
        navigate('/');
      },
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };


  return (
    <>
          <Form onSubmit={handleLogin} processing={processing}>
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

            <FormBtn text={"Login"} processing={processing}/>
          </Form>

          <div className="or-div">
            <img src='/images/line.png' />
            <span>or</span>
            <img src='/images/line.png' />
          </div>

          {/* {/* here I am moving the social login buttons outside the form */}
          <SocialLinkComponent/>

          <div className='create-account'>
            <p>Don't have an account?
              <Link className='link-class' to="/register">
                <span>Create Account</span>
              </Link>
            </p>
          </div>
    </>
  );
};

export default Login;
