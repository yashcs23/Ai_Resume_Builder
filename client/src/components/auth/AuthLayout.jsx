import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Sparkles, CheckCircle, ShieldCheck } from 'lucide-react';

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-bg-main flex items-center justify-center p-4 md:p-6 lg:p-8 font-inter overflow-hidden relative">
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 blur-[120px] rounded-full animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/20 blur-[120px] rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center z-10">
        
        {/* Left Branding Panel (Desktop Only) */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="hidden lg:flex flex-col justify-center space-y-8"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl border border-primary/20 shadow-[0_0_20px_rgba(99,102,241,0.3)]">
              <Bot className="w-8 h-8 text-primary" />
            </div>
            <span className="text-2xl font-bold font-outfit text-text-main tracking-tight">AI Resume Builder</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl font-extrabold font-outfit text-text-main leading-tight">
              Build Your Resume <br />
              <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">with AI in Minutes</span>
            </h1>
            <p className="text-lg text-text-muted max-w-md">
              Join thousands of professionals landing their dream jobs with our modern, ATS-friendly AI generator.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {[
              { icon: Sparkles, text: "AI-Powered Writing", sub: "Optimized for impact" },
              { icon: ShieldCheck, text: "ATS-Friendly Templates", sub: "Passed by recruiters" },
              { icon: CheckCircle, text: "Instant Resume Export", sub: "One-click PDF download" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-2xl bg-bg-card/40 border border-white/5 backdrop-blur-sm hover:border-primary/30 transition-colors group"
              >
                <div className="p-2 bg-primary/5 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h4 className="text-text-main font-semibold leading-tight">{item.text}</h4>
                  <p className="text-text-muted text-sm">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex items-center gap-2 text-sm text-text-muted pl-2">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full border-2 border-bg-main bg-bg-secondary flex items-center justify-center text-[10px] font-bold">
                  JS
                </div>
              ))}
            </div>
            <span>Trusted by 10,000+ professionals worldwide</span>
          </div>
        </motion.div>

        {/* Right Auth Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-[480px] mx-auto"
        >
          <div className="bg-bg-glass backdrop-blur-xl border border-white/10 rounded-[32px] p-8 md:p-10 shadow-2xl relative overflow-hidden group">
            {/* Subtle card glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/10 blur-[60px] rounded-full group-hover:bg-primary/20 transition-all duration-500"></div>
            
            <div className="relative z-10">
              <div className="lg:hidden flex items-center gap-2 mb-8 justify-center">
                <Bot className="w-8 h-8 text-primary" />
                <span className="text-xl font-bold font-outfit text-text-main">AI Resume Builder</span>
              </div>
              
              <div className="mb-8">
                <h2 className="text-3xl font-bold font-outfit text-text-main mb-2">{title}</h2>
                <p className="text-text-muted">{subtitle}</p>
              </div>

              {children}
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-6 text-sm text-text-muted">
            <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-primary transition-colors">Help Center</a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AuthLayout;
