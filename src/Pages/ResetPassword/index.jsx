import React from 'react'
import PrimaryInput from '../../Components/PrimaryInput';
import PrimaryBtn from '../../Components/PrimaryBtn';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';
import {useUser} from '../../context/context';
import Loading from '../../Components/Loading';
const ResetPassword = () => {
  const navigate = useNavigate();

  const {setLoading} = useUser();
  const { data, setData, post, errors, onSuccess, onError } = useFire({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    post({
      url: `${baseURL}/reset-password`,
      onSuccess: (res) => {
        console.log(res)
        Snackbar(res.data.message, { variant: 'success' });
        navigate('/login');
        setLoading(false);
      },

      onError: (err) => {
        console.log(err);
        Snackbar(err.error, { variant: 'error' });
        setLoading(false);
      }
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData(name, value);
  }

  console.log(errors, 'rrrr');


  return (
    <>
    <Loading/>
      <main className="register-section">
        {/* register form  */}
        <form className="login-form" onSubmit={handleSubmit} style={{ paddingTop: '50px', paddingBottom: '50px' }}>

          <div className="login-form-heading">
            <h2>Reset Password</h2>
            <p>Reset password your forget password</p>
          </div>

          <div className="register-fields-div">
            <p>Email:</p>
            <PrimaryInput
              type="email"
              placeholder="Enter Email"
              name="email"
              value={data.email}
              onChange={handleInputChange}
            />
                          {errors.email && <p className="error">{errors.email}</p>}
          </div>

          {/* new Password  */}
          <div className="register-fields-div">
            <p>New Password:</p>
            <PrimaryInput
              type="password"
              placeholder="Enter Email"
              name="newPassword"
              value={data.newPassword}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          {/* confirm password  */}
          <div className="register-fields-div" style={{ marginBottom: '20px' }}>
            <p>Confirm Password:</p>
            <PrimaryInput
              type="password"
              placeholder="Enter Email"
              name="confirmPassword"
              value={data.confirmPassword}
              onChange={handleInputChange}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>

          <PrimaryBtn text="Reset Password" onClick={handleSubmit} />


          <div className='login-account'>
            <p>Don't won't to reset your password
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

export default ResetPassword