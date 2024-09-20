import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useFire, { baseURL } from '../../Fire/useFire';
import { Snackbar } from '../../Utils/SnackbarUtils';
import { MuiOtpInput } from 'mui-one-time-password-input';
import FormBtn from '../../Components/Auth/FormBtn';
import Form from '../../Components/Auth/Form'

const VerifyOtp = () => {
  const navigate = useNavigate();

  const [timer, setTimer] = useState(600);
  const [showResend, setShowResend] = useState(false);
  const {data, setData, post, processing} = useFire({ otp: '' });

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
    setData('otp', value);
  };


  const handleSubmit = (event) => {
    event.preventDefault();
    post({
      url: `${baseURL}/verify-otp`,
     
      onSuccess: (res) => {
        console.log('OTP Verified Successfully', res);
        Snackbar(res.data.message, { variant: 'success' });
        localStorage.setItem('reset-token', true)
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
          <Form onSubmit={handleSubmit} >
            <div style={{padding:'30px 0'}}>
            <div className="login-form-heading">
              <h2>Verify OTP</h2>
              <p>Verify your OTP to reset your password</p>
            </div>

            <div className="register-fields-div" style={{ marginBottom: '20px' }}>
              <p>Enter OTP:</p>
              <MuiOtpInput value={data.otp} onChange={handleChange} length={6} />
            </div>

            <FormBtn text={"Verify OTP"} processing={processing}/>

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
            </div>
          </Form>
    </>
  );
};

export default VerifyOtp;
