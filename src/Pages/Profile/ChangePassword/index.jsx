import React from 'react';
import PrimaryInput from '../../../Components/PrimaryInput';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../../Fire/useFire';
import { Snackbar } from '../../../Utils/SnackbarUtils';

const ChangePassword = () => {
  const navigate = useNavigate();
  const { data, setData, errors, put } = useFire({ currentPassword: '', newPassword: '', confirmPassword:'' });

  const handleLogin = (e) => {
    const authToken = localStorage.getItem('user-visited-dashboard');
    e.preventDefault();
    put({
      url: `${baseURL}/change-profile-password`,

      headers:{
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      },

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
        console.log('change password Error', err);
        Snackbar(err.error, { variant: 'error' });
      }
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(name, value);
  };

  return (
    <>
    <main style={{width:'100%',  display:'flex', justifyContent:'center', alignItems:'center'}}>

    </main>
        <div className="login-form">
          <form  onSubmit={handleLogin}>
          <div className="login-form-heading">
            <img src="/images/logo.png" alt="logo" className="login-logo" />
            <h2>Change your password</h2>
            <p>Please enter your email and password to continue</p>
          </div>

          <div className="email-div">
            <p>Current Password:</p>
            <PrimaryInput
              type="password"
              placeholder="Current password"
              name="currentPassword"
              value={data.currentPassword}
              onChange={handleInputChange}
            />
            {/* {errors.email && <p className="error">{errors.email}</p>} */}
          </div>

          <div className="email-div">
            <div>
              <p>New Password:</p>
            </div>
            <PrimaryInput
              type="password"
              placeholder="New Password"
              name="newPassword"
              value={data.newPassword}
              onChange={handleInputChange}
            />
            {/* {errors.password && <p className="error">{errors.password}</p>} */}
          </div>

          <div className="email-div">
            <div>
              <p>Confirm Password:</p>
            </div>
            <PrimaryInput
              type="password"
              placeholder="Confirm Password"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleInputChange}
            />
            {/* {errors.password && <p className="error">{errors.password}</p>} */}
          </div>

         <div style={{width: '100%'}}>
          {/* <PrimaryBtn text="Login" /> */}
          <button 
          type="submit"
          style={{width: '100%', borderRadius: '10px', backgroundColor: '#3749A6', border: 'none', 
          padding: '10px 20px', color: 'white', fontSize: '14px', fontWeight: '500', cursor: 'pointer', hover: {opacity: '0.9'}}}
          >Change Password</button>
         </div>
          </form>
        </div>
    </>
  );
};

export default ChangePassword;
