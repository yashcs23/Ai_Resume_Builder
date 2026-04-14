import React, { useState } from 'react';
import { Eye, EyeOff, Lock } from 'lucide-react';
import AuthInput from './AuthInput';

const PasswordField = ({ label, placeholder, error, value, onChange, name, required }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative group">
      <AuthInput
        label={label}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        icon={Lock}
        error={error}
        value={value}
        onChange={onChange}
        name={name}
        required={required}
      />
      <button
        type="button"
        onClick={() => setShowPassword(!showPassword)}
        className="absolute right-4 top-[42px] text-text-muted hover:text-text-main transition-colors p-1"
      >
        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
      </button>
    </div>
  );
};

export default PasswordField;
