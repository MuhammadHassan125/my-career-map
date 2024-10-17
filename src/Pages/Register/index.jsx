import React from 'react'
import './index.scss'
import PrimaryInput from '../../Components/PrimaryInput';
import PrimaryBtn from '../../Components/PrimaryBtn';
import { Link, useNavigate } from 'react-router-dom';
import InstagramBtn from '../../Components/Auth/SocialLinks/Login/InstagramBtn';
import GoogleBtn from '../../Components/Auth/SocialLinks/Login/GoogleBtn';
import FacebookBtn from '../../Components/Auth/SocialLinks/Login/FacebookBtn';
import LinkedinBtn from '../../Components/Auth/SocialLinks/Login/LinkedinBtn';
import OutlookBtn from '../../Components/Auth/SocialLinks/Login/OutlookBtn';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';

const socialIcons = [
  // { id: 2, src: "/images/google.png", alt: "google", link: "https://www.google.com" },
  // { id: 2, src: "/images/outlook.png", alt: "google", link: "https://www.outlook.com" },
  // { id: 1, src: "/images/linkedin.png", alt: "facebook", link: "https://www.linkedin.com" },
  // { id: 1, src: "/images/facebook.png", alt: "facebook", link: "https://www.facebook.com" },
  // { id: 3, src: "/images/instagram.png", alt: "twitter", link: "https://www.instagram.com" },
];

const Register = () => {
  const navigate = useNavigate();


  const { data, setData, post, setErrors, errors } = useFire({
    email: '',
    username: '',
    password: ''
  });
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors({}); // Clear errors
    post({
      url: `${baseURL}/register`,
      onSuccess: (res) => {
        console.log('Register successfully', res);
        if (res.status >= 200 && res.status < 300) {
          Snackbar(res.data.message, { variant: 'success',  style: { backgroundColor:'var(--primary-btn-color)' } });
          navigate('/login');
        } else {
          Snackbar(res.data.message || 'Registration failed', { variant: 'error' });
        }
      },
      onError: (error) => {
        console.log(error);
        Snackbar(error.response.data.message || 'Registration failed', { variant: 'error' });
      },
    });
  };
  

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setData(name, value);
  }
  

    return (
      <>
        <main className="register-section">
          {/* register form  */}
          <form className="login-form" onSubmit={handleSubmit}>

            <div className="login-form-heading">
              <h2>Create an Account</h2>
              <p>Sign up with your social media account or email address</p>
            </div>

            {/* social media icons  */}
            <div className='signup-social-icons'>
              {/* {socialIcons.map((socialIcon) => (
              <div
                className='social-icons-div'
                onClick={() => window.open(socialIcon.link)}
              >
                <img key={socialIcon.id} src={socialIcon.src} alt={socialIcon.alt}
                />
              </div>
            ))} */}

              <div className='social-icons-div'>
                <OutlookBtn />
              </div>


              <div className='social-icons-div'>
                <LinkedinBtn />
              </div>

              <div className='social-icons-div'>
                {/* <GoogleBtn/> */}
                <FacebookBtn />
              </div>
              <div className='social-icons-div'>
                <GoogleBtn />
              </div>

              <div className='social-icons-div'>
                <InstagramBtn />
              </div>

            </div>

            <div className="or-div">
              <img src='/images/line.png' />
              <span>or</span>
              <img src='/images/line.png' />
            </div>


            {/* email  */}
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

            {/* username  */}
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

            {/* password  */}

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

            {/* <PrimaryBtn text="Sign Up" onClick={handleSubmit} /> */}
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
                Sign Up
              </button>
            </div>


            <div className='login-account'>
              <p>Already have an account?
                <Link to="/login" className='link-class'>
                  <span> Login</span>
                </Link>
              </p>
            </div>

          </form>
        </main>
      </>
    )
  }

  export default Register