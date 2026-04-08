import React from 'react';
import { motion } from 'framer-motion';
import { Bot, CheckCircle, Sparkles, Layout, Edit3, Download, FileText, Zap, Shield } from 'lucide-react';
import LayoutContainer from './LayoutContainer';

const features = [
  {
    icon: Bot,
    title: 'AI Generator',
    description: 'Automatically generate professional bullet points tailored to your specific role and industry.',
    color: 'text-primary'
  },
  {
    icon: Zap,
    title: 'ATS Optimization',
    description: 'Ensure your resume passes Applicant Tracking Systems with intelligent keyword matching.',
    color: 'text-accent'
  },
  {
    icon: Sparkles,
    title: 'Smart Suggestions',
    description: 'Get real-time feedback and intelligent suggestions to improve your resume content instantly.',
    color: 'text-secondary'
  },
  {
    icon: Layout,
    title: 'Multiple Templates',
    description: 'Choose from a variety of modern, recruiter-approved templates for any career level.',
    color: 'text-primary'
  },
  {
    icon: Shield,
    title: 'Secure & Private',
    description: 'Your data is encrypted and secure. You have full control over your personal information.',
    color: 'text-accent'
  },
  {
    icon: Download,
    title: 'Instant PDF Export',
    description: 'Download a pixel-perfect, professionally formatted PDF version of your resume in one click.',
    color: 'text-secondary'
  }
];


const Features = () => {
  return (
    <section id="features" className="py-24 relative overflow-hidden">
      <LayoutContainer>
        <div className="text-center mb-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-outfit font-bold text-white mb-6"
          >
            Powerful <span className="text-gradient-primary">Free Features</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-text-muted max-w-2xl mx-auto"
          >
            Everything you need to land your dream job, powered by advanced artificial intelligence.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass-card p-10 rounded-3xl group"
            >
              <div className={`w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary/10 transition-colors`}>
                <feature.icon className={`w-7 h-7 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-text-muted leading-relaxed text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </LayoutContainer>
      
      {/* Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default Features;
