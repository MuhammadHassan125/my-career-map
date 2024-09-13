import React from 'react';
import './index.scss';
import { GoEye, GoEyeClosed } from "react-icons/go";

const PrimaryInput = ({ type, placeholder, value, onChange, ...restProps }) => {
  const [showPassword, setShowPassword] = React.useState(false);

  const handleTogglePassword = () => {
    setShowPassword(prev => !prev);
  };

  return (
    <div className='primary-input'>
      <input
        type={type === 'password' && !showPassword ? 'password' : 'text'}
        style={{ width: '100%', background: 'trnasparent', border: 'none', outline: 'none', padding: '2px' }}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        {...restProps}
      />

      {type === 'password' && (
        <div onClick={handleTogglePassword} style={{ cursor: 'pointer' }}>
          {showPassword ? <GoEye /> : <GoEyeClosed />}
        </div>
      )}
    </div>
  );
};

export default PrimaryInput;
