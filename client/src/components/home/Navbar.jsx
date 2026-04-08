import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, Menu, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LayoutContainer from './LayoutContainer';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'Templates', href: '#templates' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Pricing', href: '#pricing' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled ? 'py-4' : 'py-6'
      }`}
    >
      <LayoutContainer>
        <div className={`relative flex items-center justify-between rounded-full transition-all duration-500 px-6 py-2 ${
          isScrolled ? 'bg-bg-glass backdrop-blur-xl border border-white/10 shadow-lg shadow-black/20' : 'bg-transparent'
        }`}>
          {/* Logo */}
          <div 
            className="flex items-center gap-2 cursor-pointer group"
            onClick={() => navigate('/')}
          >
            <div className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
              <Bot className="w-6 h-6 text-primary" />
            </div>
            <span className="font-outfit font-bold text-xl tracking-tight text-white">
              AI Resume Builder
            </span>
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-text-muted hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={() => navigate('/login')}
              className="text-sm font-semibold text-white/80 hover:text-white transition-colors px-4"
            >
              Log In
            </button>
            <button 
              onClick={() => navigate('/signup')}
              className="bg-primary hover:bg-secondary text-white text-sm font-bold px-6 py-2.5 rounded-full shadow-lg shadow-primary/25 hover:shadow-secondary/25 transition-all duration-300 hover:-translate-y-0.5"
            >
              Sign Up Free
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-white hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </LayoutContainer>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 mt-4 px-6 md:hidden"
          >
            <div className="bg-bg-card/95 backdrop-blur-2xl border border-white/10 rounded-3xl p-6 shadow-2xl">
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a 
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-lg font-medium text-text-muted hover:text-white p-2 transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <div className="h-px bg-white/10 my-2" />
                <button 
                  onClick={() => { navigate('/login'); setMobileMenuOpen(false); }}
                  className="text-left py-2 text-white/80 font-medium"
                >
                  Log In
                </button>
                <button 
                  onClick={() => { navigate('/signup'); setMobileMenuOpen(false); }}
                  className="bg-primary text-white font-bold py-4 rounded-2xl text-center shadow-lg shadow-primary/20"
                >
                  Sign Up Free
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
