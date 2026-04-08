import React from 'react';
import { Bot, Youtube, Twitter, Linkedin, Github, Mail } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import LayoutContainer from './LayoutContainer';

const Footer = () => {
  const navigate = useNavigate();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'Product',
      links: [
        { name: 'Features', href: '#features' },
        { name: 'Templates', href: '#templates' },
        { name: 'Pricing', href: '#pricing' },
        { name: 'Cover Letter Builder', href: '#' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Help Center', href: '#' },
        { name: 'Resume Guide', href: '#' },
        { name: 'Interview Tips', href: '#' },
        { name: 'Blog', href: '#' },
      ]
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '#' },
        { name: 'Careers', href: '#' },
        { name: 'Privacy Policy', href: '#' },
        { name: 'Terms of Service', href: '#' },
      ]
    }
  ];

  const socialIcons = [
    { icon: Twitter, href: '#' },
    { icon: Linkedin, href: '#' },
    { icon: Github, href: '#' },
    { icon: Youtube, href: '#' },
  ];

  return (
    <footer className="pt-24 pb-12 bg-black/40 border-t border-white/5">
      <LayoutContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-20">
          {/* Brand Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Bot className="w-6 h-6 text-primary" />
              </div>
              <span className="font-outfit font-bold text-xl text-white">
                AI Resume Builder
              </span>
            </div>
            <p className="text-text-muted leading-relaxed max-w-sm mb-8">
              Empowering job seekers with the world's most intelligent resume builder. 
              Get hired faster with ATS-optimized, professional resumes tailored by AI.
            </p>
            <div className="flex items-center gap-4">
              {socialIcons.map((social, i) => (
                <a 
                  key={i} 
                  href={social.href} 
                  className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary/20 hover:text-primary transition-all duration-300"
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h4 className="text-white font-bold mb-6">{group.title}</h4>
              <ul className="space-y-4">
                {group.links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-text-muted hover:text-primary transition-colors duration-300 flex items-center"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden">
          <p className="text-sm text-text-muted">
            &copy; {currentYear} AI Resume Builder. All rights reserved. Made by professionals for professionals.
          </p>
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-text-muted hover:text-white transition-colors cursor-pointer">
              <Mail className="w-4 h-4" />
              <span className="text-sm">support@airesumebuilder.com</span>
            </div>
          </div>
        </div>
      </LayoutContainer>
    </footer>
  );
};

export default Footer;
