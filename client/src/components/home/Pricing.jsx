import React from 'react';
import { motion } from 'framer-motion';
import { Check, Zap, Star, Shield } from 'lucide-react';
import LayoutContainer from './LayoutContainer';

const plans = [
  {
    name: 'Free',
    price: '$0',
    desc: 'Perfect for getting started and exploring AI.',
    features: ['1 AI Resume Generator', 'Basic ATS Scanning', 'PDF Export (Standard)', '1 Template Style'],
    button: 'Start for Free',
    isPopular: false
  },
  {
    name: 'Pro',
    price: '$12',
    period: '/mo',
    desc: 'Power features for active job seekers.',
    features: ['Unlimited AI Generation', 'Advanced ATS Optimizer', 'Premium Templates', 'Cover Letter Builder', 'Priority Support'],
    button: 'Upgrade to Pro',
    isPopular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    desc: 'Advanced solutions for teams and agencies.',
    features: ['Custom AI Training', 'Bulk Resume Generation', 'Team Collaboration', 'API Access', 'Dedicated Account Manager'],
    button: 'Contact Sales',
    isPopular: false
  }
];

const Pricing = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      <LayoutContainer className="relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-6">Simple, <span className="text-gradient-primary">Transparent Pricing</span></h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">Choose the perfect plan to accelerate your career growth.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative glass-card p-10 rounded-[2.5rem] flex flex-col ${
                plan.isPopular ? 'border-primary shadow-2xl shadow-primary/20 bg-primary/5' : ''
              }`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-white mb-2">{plan.name}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-extrabold text-white">{plan.price}</span>
                  {plan.period && <span className="text-text-muted font-medium">{plan.period}</span>}
                </div>
                <p className="mt-4 text-sm text-text-muted">{plan.desc}</p>
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-text-main/80">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className={`w-full py-4 rounded-2xl font-bold transition-all duration-300 ${
                plan.isPopular 
                ? 'bg-primary text-white hover:bg-secondary shadow-lg shadow-primary/25' 
                : 'bg-white/5 text-white hover:bg-white/10 border border-white/10'
              }`}>
                {plan.button}
              </button>
            </motion.div>
          ))}
        </div>
      </LayoutContainer>
      
      {/* Background Decor */}
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none" />
    </section>
  );
};

export default Pricing;
