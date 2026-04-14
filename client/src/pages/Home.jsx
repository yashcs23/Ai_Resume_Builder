import React from 'react';
import { motion } from 'framer-motion';
import { Bot, ArrowRight, CheckCircle, Sparkles, Star } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Modular Components
import Navbar from '../components/home/Navbar';
import Hero from '../components/home/Hero';
import Features from '../components/home/Features';
import StepFlow from '../components/home/StepFlow';
import TemplateShowcase from '../components/home/TemplateShowcase';
import Pricing from '../components/home/Pricing';
import FAQ from '../components/home/FAQ';
import Footer from '../components/home/Footer';
import BackgroundGlow from '../components/home/BackgroundGlow';
import LayoutContainer from '../components/home/LayoutContainer';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-bg-main text-text-main overflow-x-hidden">
      {/* Immersive Background */}
      <BackgroundGlow />

      {/* Navigation */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <Hero />

        {/* Features Section */}
        <Features />

        {/* Step-by-Step Flow */}
        <StepFlow />

        {/* Template Preview Showcase */}
        <TemplateShowcase />

        {/* Why Choose Us Section */}
        <section className="py-24 relative overflow-hidden">
          <LayoutContainer>
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
              <div className="order-2 lg:order-1">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="glass-card rounded-[3rem] p-10 relative z-10 border-white/5 overflow-hidden">
                    <div className="absolute inset-0 bg-primary/5 blur-3xl" />
                    <div className="grid grid-cols-2 gap-6 relative z-10">
                      {[
                        { label: 'Success Rate', val: '95%', color: 'text-primary' },
                        { label: 'Resumes Built', val: '10k+', color: 'text-accent' },
                        { label: 'Time Saved', val: '4h', color: 'text-secondary' },
                        { label: 'User Rating', val: '4.9/5', color: 'text-primary' },
                      ].map((stat, i) => (
                        <div key={i} className="p-6 bg-white/5 rounded-2xl border border-white/5 text-center">
                          <h4 className={`text-3xl font-extrabold ${stat.color} mb-2`}>{stat.val}</h4>
                          <p className="text-xs text-text-muted font-bold uppercase tracking-wider">{stat.label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Decorative blobs */}
                  <div className="absolute -top-10 -left-10 w-40 h-40 bg-primary/20 rounded-full blur-[80px]" />
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-secondary/20 rounded-full blur-[80px]" />
                </motion.div>
              </div>

              <div className="order-1 lg:order-2">
                <h2 className="text-4xl md:text-5xl font-outfit font-bold text-white mb-8 leading-tight">
                  Why Choose <br /> <span className="text-gradient-primary">AI Resume Builder?</span>
                </h2>
                <div className="space-y-6">
                  {[
                    { title: 'Saves Hours of Work', desc: 'Dont stare at a blank page. Let AI write your first draft in seconds.' },
                    { title: 'Beat the Recruiting Bots', desc: 'Designed specifically to parse perfectly in every major ATS platform.' },
                    { title: 'Recruiter Approved', desc: 'Phrasing built on guidelines from top tech recruiters and HR pros.' },
                  ].map((benefit, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="flex gap-4 p-6 glass-card rounded-2xl"
                    >
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="text-xl font-bold text-white mb-2">{benefit.title}</h4>
                        <p className="text-text-muted text-sm leading-relaxed">{benefit.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </LayoutContainer>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-white/[0.01]">
          <LayoutContainer>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">What Our Users Say</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { name: 'Sarah Jenkins', role: 'Software Engineer', text: 'I was struggling to put my experience into words. The AI generated perfect bullet points!' },
                { name: 'Michael Rossi', role: 'Product Manager', text: 'The ATS-friendly designs are a game changer. I got way more callbacks.' },
                { name: 'Amanda Lee', role: 'Graphic Designer', text: 'The creative templates are stunning. Best resume tool I have ever used.' },
              ].map((t, i) => (
                <div key={i} className="glass-card p-10 rounded-[2.5rem]">
                  <div className="flex gap-1 mb-6">
                    {[1,2,3,4,5].map(s => <Star key={s} size={16} fill="currentColor" className="text-yellow-500" />)}
                  </div>
                  <p className="text-text-muted italic mb-8 leading-relaxed">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-secondary" />
                    <div>
                      <h5 className="font-bold text-white text-sm">{t.name}</h5>
                      <span className="text-xs text-text-muted">{t.role}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </LayoutContainer>
        </section>

        {/* Pricing Section */}
        <Pricing />

        {/* FAQ Section */}
        <FAQ />

        {/* Final CTA */}
        <section className="py-24">
          <LayoutContainer>
            <div className="relative glass-card rounded-[4rem] p-12 md:p-24 overflow-hidden text-center border-primary/20">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] pointer-events-none" />
              
              <div className="relative z-10 max-w-2xl mx-auto">
                <h2 className="text-4xl md:text-6xl font-outfit font-bold text-white mb-8 leading-tight">
                  Ready to Land Your <br />
                  <span className="text-gradient-primary">Dream Job?</span>
                </h2>
                <p className="text-xl text-text-muted mb-12 max-w-md mx-auto">
                  Join 10,000+ professionals building their future with AI.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button 
                    onClick={() => navigate('/signup')}
                    className="w-full sm:w-auto bg-primary hover:bg-secondary text-white font-bold px-10 py-5 rounded-full shadow-2xl shadow-primary/40 transition-all duration-300"
                  >
                    Get Started Free
                  </button>
                  <button className="w-full sm:w-auto glass-card px-10 py-5 rounded-full text-white font-bold hover:bg-white/10 transition-colors">
                    Explore Templates
                  </button>
                </div>
              </div>
            </div>
          </LayoutContainer>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default HomePage;
