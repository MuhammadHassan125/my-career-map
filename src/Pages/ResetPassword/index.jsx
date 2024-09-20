import React from 'react'
import PrimaryInput from '../../Components/PrimaryInput';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';
import Form from '../../Components/Auth/Form';
import FormBtn from '../../Components/Auth/FormBtn';
const ResetPassword = () => {
  const navigate = useNavigate();

  const { data, setData, post, errors, processing } = useFire({
    email: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    if(processing) return;
    post({
      url: `${baseURL}/reset-password`,
      onSuccess: (res) => {
        console.log(res)
        // Snackbar(res.data.message, { variant: 'success' });
        navigate('/login');
      },

      onError: (err) => {
        Snackbar(err.error, { variant: 'error' });
      }
    });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setData(name, value);
  }


  return (
    <>
        <div style={{ padding: '30px 0' }}>
          <Form onSubmit={handleSubmit} processing={processing}
          >
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

          <FormBtn text={"Reset Password"} processing={processing}/>
          
          <div className='login-account'>
            <p>Don't won't to reset your password
              <Link to="/login" className='link-class'>
                <span> Login</span>
              </Link>
            </p>
          </div>
          </Form>
          </div>
    </>
  )
}

export default ResetPassword