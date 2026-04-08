import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const AuthButton = ({ children, onClick, loading, disabled, type = "button", className = "" }) => {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`
        relative w-full py-4 px-6 rounded-2xl font-bold text-white
        bg-gradient-to-r from-primary to-secondary
        hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]
        active:scale-[0.98] transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
        overflow-hidden group ${className}
      `}
    >
      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
      
      <div className="relative z-10 flex items-center justify-center gap-2">
        {loading && <Loader2 className="w-5 h-5 animate-spin" />}
        {children}
      </div>
    </button>
  );
};

export default AuthButton;
