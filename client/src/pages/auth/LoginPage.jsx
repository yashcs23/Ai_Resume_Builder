import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, Github, Linkedin, Chrome, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';
import PasswordField from '../../components/auth/PasswordField';
import AuthButton from '../../components/auth/AuthButton';
import SocialButton from '../../components/auth/SocialButton';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Invalid email format";
    
    if (!formData.password) newErrors.password = "Password is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
      console.log('Logged in successfully:', formData);
    }, 2000);
  };

  return (
    <AuthLayout 
      title="Welcome Back" 
      subtitle="Sign in to your account to continue building"
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthInput
          label="Email Address"
          name="email"
          type="email"
          placeholder="name@company.com"
          icon={Mail}
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
          required
        />
        
        <div className="space-y-1">
          <PasswordField
            label="Password"
            name="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
            required
          />
          <div className="flex items-center justify-between px-1">
            <label className="flex items-center gap-2 cursor-pointer group">
              <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-primary transition-all cursor-pointer" />
              <span className="text-xs text-text-muted group-hover:text-text-main transition-colors">Remember me</span>
            </label>
            <Link to="/forgot-password" title="Recover your password" className="text-xs text-primary hover:text-secondary font-semibold transition-colors">
              Forgot password?
            </Link>
          </div>
        </div>

        <AuthButton loading={loading} type="submit" className="mt-2">
          Sign In
        </AuthButton>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-bg-glass px-3 text-text-muted">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SocialButton icon={Chrome} onClick={() => console.log('Google login')}>Google</SocialButton>
          <SocialButton icon={Linkedin} onClick={() => console.log('LinkedIn login')}>LinkedIn</SocialButton>
        </div>

        <p className="text-center text-sm text-text-muted mt-8">
          Don't have an account?{' '}
          <Link to="/signup" className="text-primary hover:text-secondary font-bold transition-colors">
            Sign up for free
          </Link>
        </p>
      </form>

      {/* Success Toast Placeholder */}
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={success ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
        className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-green-500/90 text-white px-6 py-3 rounded-full blur-none z-50 shadow-lg flex items-center gap-2"
      >
        <CheckCircle className="w-5 h-5" />
        <span>Welcome back! Logged in successfully.</span>
      </motion.div>
    </AuthLayout>
  );
};

export default LoginPage;
