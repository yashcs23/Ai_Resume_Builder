import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Download, CheckCircle, Bot } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from './LayoutContainer';

const TypewriterText = ({ text, delay = 0 }) => {
  const [currentText, setCurrentText] = useState('');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[index]);
        setIndex(prev => prev + 1);
      }, 50 + Math.random() * 50);
      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <span className="font-mono text-emerald-400">{currentText}<span className="animate-pulse">_</span></span>;
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
      <LayoutContainer className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 xl:gap-24 items-center">
          {/* Content Left */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-6"
            >
              <Sparkles className="w-4 h-4" />
              AI-Powered Resume Creation
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-outfit font-extrabold text-white leading-[1.1] mb-8">
              Build Your Resume with <br />
              <span className="text-gradient-primary">AI in Minutes</span>
            </h1>
            
            <p className="text-lg md:text-xl text-text-muted leading-relaxed mb-10 max-w-xl">
              Create ATS-friendly, professional resumes effortlessly using advanced AI. 
              Build, edit, optimize, and land your dream job faster.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 mb-10">
              <button 
                onClick={() => navigate('/signup')}
                className="w-full sm:w-auto bg-primary hover:bg-secondary text-white font-bold px-8 py-4 rounded-full shadow-2xl shadow-primary/40 hover:shadow-secondary/40 transition-all duration-300 flex items-center justify-center gap-2 group"
              >
                Build My Resume
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="w-full sm:w-auto glass-card text-white font-bold px-8 py-4 rounded-full flex items-center justify-center gap-2 hover:bg-white/10">
                View Templates
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { icon: CheckCircle, text: 'ATS Friendly' },
                { icon: Bot, text: 'AI Powered' },
                { icon: Download, text: 'Instant PDF' },
                { icon: Sparkles, text: 'Free to start' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-2 text-text-muted text-sm font-medium">
                  <item.icon className="w-4 h-4 text-accent" />
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Visual Right / Product Preview */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 10 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            {/* Dashboard Mockup */}
            <div className="relative z-10 glass-card rounded-3xl overflow-hidden shadow-2xl shadow-black/50 border border-white/10 group">
              <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="px-3 py-1 rounded bg-white/5 border border-white/10 text-[10px] text-text-muted font-mono uppercase">
                  ai_resume_builder_v2.0
                </div>
              </div>
              
              <div className="p-8 bg-bg-card/40 backdrop-blur-3xl lg:h-[450px]">
                {/* AI Terminal Simulation */}
                <div className="bg-black/40 rounded-xl p-6 font-mono text-sm border border-white/5 h-full overflow-hidden">
                  <div className="flex items-center gap-3 mb-4 text-xs text-white/40">
                    <Bot className="w-4 h-4" />
                    System initialized. Starting AI Resume Generation...
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <span className="text-primary font-bold">{'>'}</span>
                      <TypewriterText text="Analyzing Job Description: Senior Frontend Engineer..." />
                    </div>
                    <div className="flex gap-3">
                      <span className="text-secondary font-bold">{'>'}</span>
                      <TypewriterText text="Extracting key skills: React, Tailwind, Framer Motion..." delay={1500} />
                    </div>
                    <div className="flex gap-3">
                      <span className="text-accent font-bold">{'>'}</span>
                      <TypewriterText text="Optimizing experience section for ATS matching (98% confidence)..." delay={3000} />
                    </div>
                    
                    {/* Visual Resume Card within terminal */}
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 4 }}
                      className="mt-6 p-4 bg-white/5 border border-white/10 rounded-lg"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10 rounded bg-white/10" />
                        <div className="flex-1 space-y-2">
                          <div className="h-2 w-32 bg-white/20 rounded-full" />
                          <div className="h-2 w-20 bg-white/10 rounded-full" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="h-1.5 w-full bg-white/5 rounded-full" />
                        <div className="h-1.5 w-full bg-white/5 rounded-full" />
                        <div className="h-1.5 w-3/4 bg-white/5 rounded-full" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Glows */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/30 rounded-full blur-[80px] animate-pulse-slow" />
            <div className="absolute -bottom-12 -left-12 w-32 h-32 bg-secondary/20 rounded-full blur-[60px] animate-pulse-slow delay-75" />
          </motion.div>
        </div>
      </LayoutContainer>
    </section>
  );
};

export default Hero;
