import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AuthInput = ({ 
  label, 
  type = "text", 
  placeholder, 
  icon: Icon, 
  error, 
  value, 
  onChange, 
  name,
  required = false
}) => {
  return (
    <div className="space-y-2 w-full">
      {label && (
        <label className="text-sm font-medium text-text-main/80 ml-1">
          {label} {required && <span className="text-primary">*</span>}
        </label>
      )}
      <div className="relative group">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted transition-colors group-focus-within:text-primary">
            <Icon size={18} />
          </div>
        )}
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} 
            rounded-2xl py-3.5 ${Icon ? 'pl-11' : 'pl-4'} pr-4 
            text-text-main placeholder:text-text-muted/50
            outline-none transition-all duration-300
            focus:bg-white/10 focus:border-primary/50 focus:ring-4 focus:ring-primary/10
            hover:border-white/20
          `}
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="text-xs text-red-400 ml-1"
          >
            {error}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AuthInput;
