import React, { useEffect, useState } from 'react';
import PrimaryBtn from '../../Components/PrimaryBtn';
import { Link, useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';
import { MuiOtpInput } from 'mui-one-time-password-input';
import Fire from '../../Fire/Fire';

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(600); 
  const [showResend, setShowResend] = useState(false);

  // Start the countdown timer
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => {
        setTimer(timer - 1);
      }, 1000);

      return () => clearTimeout(countdown); 
    } else {
      setShowResend(true); 
    }
  }, [timer]);

  const handleChange = (value) => {
    setOtp(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    Fire.post({
      url: `${baseURL}/verify-otp`,
      data: {
        otp
      },

      onSuccess: (res) => {
        console.log('OTP Verified Successfully', res);
        Snackbar(res.data.message, { variant: 'success' });
        navigate('/reset-password');
      },

      onError: (error) => {
        console.log(error);
        Snackbar(error.error, { variant: 'error' });
      }
    });
  };

  const handleResendOtp = () => {
    Snackbar("Resent your OTP", { variant: 'warning' });
    setTimer(60); 
    setShowResend(false); 
    navigate('/forget-password')
  };

  return (
    <>
      <main className="register-section">
        <form className="login-form" onSubmit={handleSubmit} style={{ paddingTop: '50px', paddingBottom: '50px' }}>
          <div className="login-form-heading">
            <h2>Verify OTP</h2>
            <p>Verify your OTP to reset your password</p>
          </div>

          <div className="register-fields-div" style={{ marginBottom: '20px' }}>
            <p>Enter OTP:</p>
            <MuiOtpInput value={otp} onChange={handleChange} length={6} />
          </div>

          <PrimaryBtn text="Verify OTP" onClick={handleSubmit} />
          {/* Show timer or "Resend OTP" option */}
          {showResend ? (
            <div className="login-account">
              <p>Didn't receive an OTP?
                <span className='link-class' onClick={handleResendOtp}> Resend OTP</span>
              </p>
            </div>
          ) : (
            <div className="login-account">
              <p>OTP will expire in: <span>{timer} seconds</span></p>
              
            </div>

          )}


          {/* <div className='login-account'>
            <p>
              <Link to="/forget-password" className='link-class'>
                <span> Go back to Forget Password?</span>
              </Link>
            </p>
          </div> */}
        </form>
      </main>
    </>
  );
};

export default VerifyOtp;
