import React, { useState, useEffect } from 'react';
import { 
  Bot, 
  FileText, 
  Sparkles, 
  Layout, 
  Download, 
  Edit3, 
  CheckCircle, 
  ArrowRight, 
  Menu, 
  X,
  Star
} from 'lucide-react';
import './Home.css';

const HomePage = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="home-container">
      {/* NAVBAR */}
      <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        <div className="navbar-content">
          <div className="logo">
            <Bot className="logo-icon" />
            <span>AI Resume Builder</span>
          </div>
          
          <div className="nav-links desktop-only">
            <a href="#features">Features</a>
            <a href="#templates">Templates</a>
            <a href="#how-it-works">How it Works</a>
            <a href="#pricing">Pricing</a>
          </div>

          <div className="nav-actions desktop-only">
            <button className="btn-login">Log In</button>
            <button className="btn-primary btn-sm">Sign Up Free</button>
          </div>

          <button 
            className="mobile-menu-btn mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <a href="#features" onClick={() => setMobileMenuOpen(false)}>Features</a>
            <a href="#templates" onClick={() => setMobileMenuOpen(false)}>Templates</a>
            <a href="#how-it-works" onClick={() => setMobileMenuOpen(false)}>How it Works</a>
            <a href="#pricing" onClick={() => setMobileMenuOpen(false)}>Pricing</a>
            <div className="mobile-menu-actions">
              <button className="btn-login w-full">Log In</button>
              <button className="btn-primary w-full">Sign Up Free</button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION */}
      <section className="hero">
        <div className="hero-background">
          <div className="glow glow-1"></div>
          <div className="glow glow-2"></div>
        </div>
        <div className="hero-content">
          <div className="badge">
            <Sparkles size={16} />
            <span>AI-Powered Resume Creation</span>
          </div>
          <h1 className="hero-title">
            Build Your Resume with <span className="highlight">AI in Minutes</span>
          </h1>
          <p className="hero-subtitle">
            Create ATS-friendly, professional resumes effortlessly using advanced AI. Get hired faster with perfectly tailored content.
          </p>
          <div className="hero-actions">
            <button className="btn-primary btn-lg">
              Build My Resume <ArrowRight size={20} />
            </button>
            <button className="btn-secondary btn-lg">
              View Templates
            </button>
          </div>
          <div className="trust-indicators">
            <span>✓ No design skills needed</span>
            <span>✓ Free to start</span>
            <span>✓ Instant download</span>
          </div>
        </div>

        <div className="hero-visual">
          <div className="mockup-container">
            <div className="mockup-header">
              <div className="dots">
                <span></span><span></span><span></span>
              </div>
            </div>
            <div className="mockup-body">
              <div className="resume-skeleton">
                <div className="skeleton-header">
                  <div className="skel-avatar"></div>
                  <div className="skel-lines">
                    <div className="skel-line w-60"></div>
                    <div className="skel-line w-40"></div>
                  </div>
                </div>
                <div className="skeleton-content">
                  <div className="skel-block">
                    <div className="skel-line w-30 bold"></div>
                    <div className="skel-line w-full"></div>
                    <div className="skel-line w-90"></div>
                  </div>
                  <div className="skel-block">
                    <div className="skel-line w-30 bold"></div>
                    <div className="skel-line w-full"></div>
                    <div className="skel-line w-80"></div>
                    <div className="skel-line w-full"></div>
                  </div>
                </div>
              </div>
              <div className="ai-typing-indicator">
                <Bot size={20} />
                <span className="typing-text">AI is optimizing your exact experience...</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section id="features" className="features">
        <div className="section-head">
          <h2>Powerful Free Features</h2>
          <p>Everything you need to land your dream job, powered by intelligent algorithms.</p>
        </div>
        <div className="features-grid">
          <div className="feature-card">
            <div className="icon-wrapper"><Bot /></div>
            <h3>AI Generator</h3>
            <p>Automatically generate professional bullet points tailored to your role.</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper"><CheckCircle /></div>
            <h3>ATS Optimization</h3>
            <p>Ensure your resume passes Applicant Tracking Systems with keyword matching.</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper"><Sparkles /></div>
            <h3>Smart Suggestions</h3>
            <p>Get real-time feedback and suggestions to improve your resume content.</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper"><Layout /></div>
            <h3>Multiple Templates</h3>
            <p>Choose from a variety of modern, recruiter-approved templates.</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper"><Edit3 /></div>
            <h3>Easy Editing</h3>
            <p>Intuitive interface to quickly modify, reorder, and refine your details.</p>
          </div>
          <div className="feature-card">
            <div className="icon-wrapper"><Download /></div>
            <h3>Instant PDF</h3>
            <p>Download a pixel-perfect PDF version of your resume in one click.</p>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-head">
          <h2>How It Works</h2>
          <p>Get your perfect resume in three simple steps.</p>
        </div>
        <div className="steps-container">
          <div className="step">
            <div className="step-number">1</div>
            <h3>Enter Details</h3>
            <p>Provide your basic info, past roles, and skills. Or upload an old resume.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">2</div>
            <h3>AI Generates</h3>
            <p>Our AI crafts tailored, impactful bullet points and formats everything.</p>
          </div>
          <div className="step-connector"></div>
          <div className="step">
            <div className="step-number">3</div>
            <h3>Export & Apply</h3>
            <p>Review, select a stunning design, and download your ready-to-use PDF.</p>
          </div>
        </div>
      </section>

      {/* TEMPLATES SHOWCASE */}
      <section id="templates" className="templates">
        <div className="section-head">
          <h2>Professional Templates</h2>
          <p>Designs that catch the eye and pass the ATS parse.</p>
        </div>
        <div className="templates-grid">
          <div className="template-card">
            <div className="template-img template-1"></div>
            <div className="template-info">
              <h4>Modern Minimal</h4>
              <span>Free</span>
            </div>
          </div>
          <div className="template-card">
            <div className="template-img template-2"></div>
            <div className="template-info">
              <h4>Executive Pro</h4>
              <span>Premium</span>
            </div>
          </div>
          <div className="template-card">
            <div className="template-img template-3"></div>
            <div className="template-info">
              <h4>Creative Tech</h4>
              <span>Free</span>
            </div>
          </div>
        </div>
        <div className="center-btn">
          <button className="btn-secondary">View All Templates</button>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="why-us">
        <div className="why-us-content">
          <h2>Why Choose AI Resume Builder?</h2>
          <ul className="benefits-list">
            <li>
              <CheckCircle className="benefit-icon" />
              <div>
                <h4>Save Hours of Time</h4>
                <p>Don't stare at a blank page. Let AI write the first draft for you instantly.</p>
              </div>
            </li>
            <li>
              <CheckCircle className="benefit-icon" />
              <div>
                <h4>Beat the Bots</h4>
                <p>Designed specifically to parse perfectly in every major ATS platform.</p>
              </div>
            </li>
            <li>
              <CheckCircle className="benefit-icon" />
              <div>
                <h4>Recruiter Approved</h4>
                <p>Templates and phrasing built on guidelines from top tech recruiters.</p>
              </div>
            </li>
          </ul>
        </div>
        <div className="why-us-visual">
          <div className="stat-card floating-1">
            <h3>10,000+</h3>
            <p>Resumes Created</p>
          </div>
          <div className="stat-card floating-2">
            <h3>95%</h3>
            <p>Interview Success Rate</p>
          </div>
          <div className="stat-card floating-3">
            <h3>4.9/5</h3>
            <p>User Rating</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials">
        <div className="section-head">
          <h2>What Our Users Say</h2>
        </div>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <div className="stars">
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
            </div>
            <p>"I was struggling to put my experience into words. The AI generated perfect bullet points that landed me an interview at Google!"</p>
            <div className="user-info">
              <div className="avatar">SJ</div>
              <div>
                <h5>Sarah Jenkins</h5>
                <span>Software Engineer</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
            </div>
            <p>"The ATS-friendly designs are a game changer. I've gotten so many more callbacks since switching my resume layout."</p>
            <div className="user-info">
              <div className="avatar">MR</div>
              <div>
                <h5>Michael Rossi</h5>
                <span>Product Manager</span>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <div className="stars">
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
              <Star fill="#f59e0b" color="#f59e0b" size={16}/>
            </div>
            <p>"I made my resume in under 15 minutes. It looks unbelievably professional. Highly recommend to any college student."</p>
            <div className="user-info">
              <div className="avatar">AL</div>
              <div>
                <h5>Amanda Lee</h5>
                <span>Recent Graduate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="final-cta">
        <div className="cta-content">
          <h2>Start Building Your Resume Today</h2>
          <p>Join thousands of professionals landing their dream jobs with our AI Resume Builder.</p>
          <button className="btn-primary btn-lg">
            Get Started Free <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo">
              <Bot className="logo-icon" />
              <span>AI Resume Builder</span>
            </div>
            <p>Empowering careers through artificial intelligence.</p>
          </div>
          <div className="footer-links">
            <div className="link-group">
              <h4>Product</h4>
              <a href="#">Templates</a>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
            </div>
            <div className="link-group">
              <h4>Resources</h4>
              <a href="#">Blog</a>
              <a href="#">Career Guide</a>
              <a href="#">Help Center</a>
            </div>
            <div className="link-group">
              <h4>Company</h4>
              <a href="#">About</a>
              <a href="#">Contact</a>
              <a href="#">Privacy Policy</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} AI Resume Builder. All rights reserved.</p>
          <div className="social-links">
            {/* Social icons could go here */}
            <a href="#">Twitter</a>
            <a href="#">LinkedIn</a>
            <a href="#">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
