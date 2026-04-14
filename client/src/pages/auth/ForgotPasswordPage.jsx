import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import AuthLayout from '../../components/auth/AuthLayout';
import AuthInput from '../../components/auth/AuthInput';
import AuthButton from '../../components/auth/AuthButton';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format');
      return;
    }

    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  if (success) {
    return (
      <AuthLayout title="Check Your Email" subtitle="Password reset link sent successfully">
        <div className="flex flex-col items-center text-center space-y-6 py-8">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center border border-primary/50"
          >
            <Send className="w-10 h-10 text-primary" />
          </motion.div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold text-text-main">Email Sent!</h3>
            <p className="text-text-muted">We've sent recovery instructions to<br /><span className="text-text-main font-semibold">{email}</span></p>
          </div>
          <Link to="/login" className="w-full">
            <AuthButton className="bg-white/10 text-text-main hover:bg-white/20 border border-white/10 shadow-none">
              Back to Login
            </AuthButton>
          </Link>
          <button 
            onClick={() => setSuccess(false)}
            className="text-sm text-text-muted hover:text-primary transition-colors"
          >
            Didn't receive the email? Try again
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout 
      title="Forgot Password?" 
      subtitle="No worries, we'll send you reset instructions."
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="Enter your email"
          icon={Mail}
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError('');
          }}
          error={error}
          required
        />

        <AuthButton loading={loading} type="submit">
          Send Reset Link
        </AuthButton>

        <Link to="/login" className="flex items-center justify-center gap-2 text-sm text-text-muted hover:text-text-main transition-colors group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Login</span>
        </Link>
      </form>
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
