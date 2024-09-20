import React from 'react'
import './index.scss'
import PrimaryInput from '../../Components/PrimaryInput';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';
import Form from '../../Components/Auth/Form';
import FormBtn from '../../Components/Auth/FormBtn';
import SocialLinkComponent from '../../Components/Auth/SocialLinks/SocialLinksComponent';

const Register = () => {

  const navigate = useNavigate();
  const { data, setData, post, errors, processing } = useFire({
    email: '',
    username: '',
    password: ''
  });
  
  const handleSubmit = (event) => {
    event.preventDefault();
    if(processing) return;
    post({
      url: `${baseURL}/register`,
      onSuccess: (res) => {
        console.log('Register successfully', res);
        navigate('/login');
      },
      onError: (error) => {
        console.log(error);
        Snackbar(error.message || 'Registration failed', { variant: 'error' });
      },
    });
  };
  

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setData(name, value);
  };
  

    return (
      <>
          <Form onSubmit={handleSubmit} processing={processing}> 

            <div className="login-form-heading">
              <h2>Create an Account</h2>
              <p>Sign up with your social media account or email address</p>
            </div>

            {/* social media icons  */}
           <SocialLinkComponent/>

            <div className="or-div">
              <img src='/images/line.png' />
              <span>or</span>
              <img src='/images/line.png' />
            </div>


            {/* email  field*/}
            <div className="register-fields-div">
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

            {/* username  field*/}
            <div className="register-fields-div">
              <p>Username:</p>
              <PrimaryInput 
              type="text" 
              placeholder="Enter Email"
              name="username"
              value={data.username}
              onChange={handleInputChange}
              />
              {errors.username && <p className="error">{errors.username}</p>}
            </div>

            {/* password  field*/}
            <div className="register-fields-div">
              <div>
                <p>Password:</p>
               <Link className='link-class' to='/forget-password'>
               <span>Forget Password?</span>
               </Link> 
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

            {/* Remember Password */}
            <div className="remember-flex">
              <input type="checkbox" />
              <span>I accept terms and conditions</span>
            </div>

          <FormBtn processing={processing} text={"Sign Up"}/>

            <div className='login-account'>
              <p>Already have an account?
                <Link to="/login" className='link-class'>
                  <span> Login</span>
                </Link>
              </p>
            </div>

          </Form>
      </>
    )
  }

  export default Register