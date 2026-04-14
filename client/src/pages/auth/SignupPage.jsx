import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mail, User, Chrome, Linkedin, CheckCircle, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';
import PasswordField from '../../components/auth/PasswordField';
import AuthButton from '../../components/auth/AuthButton';
import SocialButton from '../../components/auth/SocialButton';

const SignupPage = () => {
  const [formData, setFormData] = useState({ 
    fullName: '', 
    email: '', 
    password: '', 
    confirmPassword: '',
    agreeTerms: false 
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  useEffect(() => {
    // Basic password strength calculation
    let strength = 0;
    if (formData.password.length >= 8) strength += 1;
    if (/[A-Z]/.test(formData.password)) strength += 1;
    if (/[0-9]/.test(formData.password)) strength += 1;
    if (/[^A-Za-z0-9]/.test(formData.password)) strength += 1;
    setPasswordStrength(strength);
  }, [formData.password]);

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName) newErrors.fullName = "Full name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8) newErrors.password = "Password must be at least 8 characters";
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to the terms";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      console.log('Account created successfully:', formData);
    }, 2000);
  };

  if (success) {
    return (
      <AuthLayout title="Account Created!" subtitle="Your journey to a perfect resume starts here.">
        <div className="flex flex-col items-center text-center space-y-6 py-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center border border-green-500/50"
          >
            <CheckCircle className="w-10 h-10 text-green-500" />
          </motion.div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-text-main">Check your email</h3>
            <p className="text-text-muted">We've sent a verification link to <span className="text-primary font-medium">{formData.email}</span></p>
          </div>
          <Link to="/login" className="w-full">
            <AuthButton>Back to Login</AuthButton>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Create Account" 
      subtitle="Join the future of resume building with AI"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <AuthInput
          label="Full Name"
          name="fullName"
          placeholder="John Doe"
          icon={User}
          value={formData.fullName}
          onChange={handleChange}
          error={errors.fullName}
          required
        />
        
        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="john@example.com"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <div className="space-y-2">
          <PasswordField
            label="Password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          {/* Strength Indicator */}
          {formData.password && (
            <div className="flex gap-1 px-1">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`h-1 flex-1 rounded-full transition-all duration-500 ${
                    step <= passwordStrength 
                      ? passwordStrength <= 2 ? 'bg-orange-500' : 'bg-green-500'
                      : 'bg-white/10'
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <PasswordField
          label="Confirm Password"
          name="confirmPassword"
          placeholder="••••••••"
          value={formData.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          required
        />

        <div className="flex items-start gap-2 px-1 py-2 cursor-pointer group">
          <input 
            type="checkbox" 
            name="agreeTerms"
            checked={formData.agreeTerms}
            onChange={handleChange}
            className="mt-1 w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-primary transition-all cursor-pointer" 
          />
          <div className="text-xs text-text-muted leading-relaxed">
            I agree to the <a href="#" className="text-primary hover:underline">Terms of Service</a> and <a href="#" className="text-primary hover:underline">Privacy Policy</a>
            {errors.agreeTerms && <p className="text-red-400 mt-1 font-medium">{errors.agreeTerms}</p>}
          </div>
        </div>

        <AuthButton loading={loading} type="submit">
          Create Account
        </AuthButton>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-[10px] uppercase">
            <span className="bg-bg-glass px-3 text-text-muted tracking-widest">Or sign up with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SocialButton icon={Chrome} onClick={() => console.log('Google signup')}>Google</SocialButton>
          <SocialButton icon={Linkedin} onClick={() => console.log('LinkedIn signup')}>LinkedIn</SocialButton>
        </div>

        <div className="flex justify-center items-center gap-2 text-xs text-text-muted pt-4">
          <Shield size={14} className="text-success" />
          <span>Secure AES-256 Encryption</span>
        </div>

        <p className="text-center text-sm text-text-muted mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-primary hover:text-secondary font-bold transition-colors">
            Log In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
};

export default SignupPage;
