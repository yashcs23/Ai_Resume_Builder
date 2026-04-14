import React from 'react';
import { motion } from 'framer-motion';
import { Layout, Eye } from 'lucide-react';

import LayoutContainer from './LayoutContainer';

const templates = [
  {
    name: 'Modern Minimal',
    tag: 'Free',
    gradient: 'from-slate-50 to-slate-200',
    desc: 'Clean and distraction-free design for tech professionals.'
  },
  {
    name: 'Executive Pro',
    tag: 'Popular',
    gradient: 'from-indigo-900 to-slate-900',
    desc: 'Bold and authoritative layout for management roles.'
  },
  {
    name: 'Creative Tech',
    tag: 'New',
    gradient: 'from-sky-100 to-blue-200',
    desc: 'Dynamic and innovative style for designers and developers.'
  }
];

const TemplateShowcase = () => {
  return (
    <section id="templates" className="py-24 bg-white/[0.02]">
      <LayoutContainer>
        <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
          <div className="text-left">
            <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-6">Professional Templates</h2>
            <p className="text-lg text-text-muted max-w-xl">Designs that catch the recruiter's eye and pass the ATS parse perfectly.</p>
          </div>
          <button className="glass-card px-8 py-3 rounded-full text-white font-bold hover:bg-white/10 transition-colors">
            View All Templates
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
          {templates.map((template, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className={`relative h-[480px] rounded-[2.5rem] bg-gradient-to-br ${template.gradient} border border-white/10 overflow-hidden mb-6 shadow-2xl`}>
                {/* Skeleton Preview */}
                <div className="absolute inset-x-8 top-12 bottom-0 bg-white shadow-2xl rounded-t-xl p-8 transform group-hover:translate-y-[-10px] transition-transform duration-500">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-slate-200 rounded-full" />
                    <div className="flex-1 space-y-2">
                      <div className="h-2 w-24 bg-slate-200 rounded-full" />
                      <div className="h-2 w-16 bg-slate-100 rounded-full" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-2 w-full bg-slate-100 rounded-full" />
                    <div className="h-2 w-full bg-slate-100 rounded-full" />
                    <div className="h-2 w-3/4 bg-slate-100 rounded-full" />
                    <div className="pt-4 space-y-2">
                      <div className="h-2 w-20 bg-slate-200 rounded-full" />
                      <div className="h-2 w-full bg-slate-50 rounded-full" />
                    </div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-white text-bg-main font-bold px-8 py-3 rounded-full flex items-center gap-2 shadow-2xl">
                    <Eye className="w-5 h-5" />
                    Preview Template
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-4">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1">{template.name}</h3>
                  <p className="text-sm text-text-muted">{template.desc}</p>
                </div>
                <span className="text-xs px-3 py-1 bg-primary/20 text-primary border border-primary/20 rounded-full font-bold">
                  {template.tag}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </LayoutContainer>
    </section>
  );
};

export default TemplateShowcase;
