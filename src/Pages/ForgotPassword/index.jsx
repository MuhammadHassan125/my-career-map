import React from 'react'
import PrimaryInput from '../../Components/PrimaryInput';
import PrimaryBtn from '../../Components/PrimaryBtn';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';
const ForgotPassword = () => {
  const navigate = useNavigate();


  const { data, setData, post, errors, onSuccess } = useFire({
    email: '',
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    post({
      url: `${baseURL}/request-for-otp`,

      onSuccess: (res) => {
        console.log('forget password successfully', res);
        Snackbar(res.data.data.message, { variant: 'success' });
        navigate('/verify-otp');
      },

      onError: (err) => {
        console.log('forget password error', err);
        Snackbar(err.error || "forget password Failed", { variant: 'error' });
      }
    });


  };

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setData(name, value);
  }

  console.log(errors,'rrrr');
  

    return (
      <>
        <main className="register-section">
          {/* register form  */}
          <form className="login-form" onSubmit={handleSubmit} style={{paddingTop: '50px', paddingBottom: '50px'}}>

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

            <PrimaryBtn text="GET OTP" onClick={handleSubmit} />


            <div className='login-account'>
              <p>Don't won't to forget password
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

  export default ForgotPassword