import React from 'react'
import PrimaryInput from '../../Components/PrimaryInput';
import PrimaryBtn from '../../Components/PrimaryBtn';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';
import { useUser } from '../../context/context';
import Loading from '../../Components/Loading';

const ForgotPassword = () => {
  
  const navigate = useNavigate();
  const {setLoading} = useUser();
  const { data, setData, post, errors, onSuccess } = useFire({
    email: '',
  });

  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    post({
      url: `${baseURL}/request-for-otp`,
      onSuccess: (res) => {
        console.log('forget password successfully', res);
        Snackbar(res.data.data.message, { variant: 'success' });
        navigate('/verify-otp');
        setLoading(false);
      },

      onError: (err) => {
        console.log('forget password error', err);
        Snackbar(err.error || "forget password Failed", { variant: 'error' });
        setLoading(false);
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
      <Loading/>
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

            <div style={{ width: '100%' }}>
              <button
                type="submit"
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  backgroundColor: '#3749A6',
                  border: 'none',
                  padding: '10px 20px',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                }}
              >
                GET OTP
              </button>
            </div>


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