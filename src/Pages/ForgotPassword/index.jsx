import React from 'react'
import PrimaryInput from '../../Components/PrimaryInput';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';
import Form from '../../Components/Auth/Form';
import FormBtn from '../../Components/Auth/FormBtn';

const ForgotPassword = () => {
  
  const navigate = useNavigate();
  const { data, setData, post, errors, processing } = useFire({
    email: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    post({
      url: `${baseURL}/request-for-otp`,
      onSuccess: (res) => {
        console.log('forget password successfully', res);
        Snackbar(res.data.data.message, { variant: 'success' });
        location.setItem('otp-verified', true);
        navigate('/verify-otp');
      },

      onError: (err) => {
        console.log('forget password error', err);
        Snackbar(err.message || "forget password Failed", { variant: 'error' });
      }
    });


  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setData(name, value);
  }  

    return (
      <>
            <Form onSubmit={handleSubmit} processing={processing}>
              <div style={{padding:'30px 0'}}>
            <div className="login-form-heading">
              <h2>Forget Password</h2>
              <p>Get OTP to reset your password</p>
            </div>

            {/* email  */}
            <div className="register-fields-div" style={{marginBottom: '20px'}}>
              <p>Email address:</p>
              <PrimaryInput 
              type="email" 
              placeholder="Enter Email" 
              name="email"
              value={data.email}
              onChange={handleInputChange}
              />
            </div>

            <FormBtn processing={processing} text={'GET OTP'}/>

            <div className='login-account'>
              <p>Don't won't to forget password
                <Link to="/login" className='link-class'>
                  <span> Login</span>
                </Link>
              </p>
            </div>
            </div>
          </Form>
      </>
    )
  }

  export default ForgotPassword