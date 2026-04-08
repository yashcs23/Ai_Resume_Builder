import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Cpu, PenTool, CheckCircle2 } from 'lucide-react';

import LayoutContainer from './LayoutContainer';

const steps = [
  {
    icon: UserPlus,
    title: 'Enter Details',
    desc: 'Provide your basic info, past roles, and skills. Or simply upload an old resume.',
  },
  {
    icon: Cpu,
    title: 'AI Generates',
    desc: 'Our AI crafts tailored, impactful bullet points and formats everything for you.',
  },
  {
    icon: PenTool,
    title: 'Customize',
    desc: 'Review, select a stunning design, and download your ready-to-use professional PDF.',
  },
];

const StepFlow = () => {
  return (
    <section id="how-it-works" className="py-24">
      <LayoutContainer>
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-6">How It Works</h2>
          <p className="text-lg text-text-muted">Get your perfect resume in three simple steps.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-12 relative">
          {/* Connection Lines (Desktop) */}
          <div className="hidden md:block absolute top-[60px] left-[20%] right-[20%] h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative z-10 flex flex-col items-center text-center group"
            >
              <div className="w-28 h-28 rounded-full bg-bg-card border-2 border-primary/20 flex items-center justify-center mb-8 group-hover:border-primary group-hover:shadow-[0_0_30px_rgba(99,102,241,0.3)] transition-all duration-500 relative">
                <div className="absolute inset-0 rounded-full bg-primary/5 animate-pulse-slow" />
                <step.icon className="w-10 h-10 text-primary group-hover:scale-110 transition-transform duration-500" />
                
                {/* Step Number Badge */}
                <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shadow-lg">
                  {index + 1}
                </div>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-primary transition-colors">{step.title}</h3>
              <p className="text-text-muted leading-relaxed max-w-[260px]">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default StepFlow;
