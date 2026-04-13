const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, // true for 465, false for 587
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Sends a welcome email to a new user.
 */
const sendWelcomeEmail = async (email, fullName) => {
  const mailOptions = {
    from: `"Luminescent AI" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: '✨ Welcome to the Future of Careers, ' + fullName.split(' ')[0] + '!',
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=Inter:wght@400;600&display=swap');
          body { margin: 0; padding: 0; background-color: #0b101a; font-family: 'Inter', sans-serif; color: #94a3b8; }
          .wrapper { width: 100%; table-layout: fixed; background-color: #0b101a; padding-bottom: 40px; }
          .main { background-color: #0f172a; margin: 0 auto; width: 100%; max-width: 600px; border-spacing: 0; border-radius: 20px; border: 1px solid rgba(103, 232, 249, 0.1); overflow: hidden; margin-top: 40px; }
          .header { background: linear-gradient(135deg, #0b101a 0%, #1e1b4b 100%); padding: 40px; text-align: center; border-bottom: 1px solid rgba(103, 232, 249, 0.1); }
          .logo { font-family: 'Outfit', sans-serif; font-size: 24px; font-weight: 700; color: #ffffff; letter-spacing: -0.5px; }
          .logo span { background: linear-gradient(90deg, #67e8f9, #a5b4fc); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
          .content { padding: 40px; }
          h1 { font-family: 'Outfit', sans-serif; font-size: 28px; color: #ffffff; margin-bottom: 20px; letter-spacing: -0.5px; }
          p { line-height: 1.6; font-size: 16px; margin-bottom: 25px; }
          .cta-container { text-align: center; padding: 20px 0; }
          .cta-button { background: linear-gradient(90deg, #67e8f9, #a5b4fc); color: #0f172a !important; padding: 16px 32px; border-radius: 12px; text-decoration: none; font-weight: 700; display: inline-block; box-shadow: 0 10px 20px -5px rgba(103, 232, 249, 0.3); }
          .features { margin-top: 40px; padding-top: 30px; border-top: 1px solid rgba(255, 255, 255, 0.05); }
          .feature-item { margin-bottom: 15px; font-size: 14px; color: #cbd5e1; }
          .footer { padding: 40px; text-align: center; font-size: 12px; color: #475569; }
        </style>
      </head>
      <body>
        <div class="wrapper">
          <table class="main">
            <tr>
              <td class="header">
                <div class="logo">Luminescent <span>AI</span></div>
              </td>
            </tr>
            <tr>
              <td class="content">
                <h1>The Lab is Ready, ${fullName.split(' ')[0]}!</h1>
                <p>We are thrilled to have you join our high-performance ecosystem. Your journey to an architected career starts right here.</p>
                
                <p>Welcome to the premium suite where AI meets professional design. Everything you need to build, optimize, and export world-class resumes is now at your fingertips.</p>
                
                <div class="cta-container">
                  <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}" class="cta-button">Access Your Workstation</a>
                </div>

                <div class="features">
                  <div class="feature-item">🚀 <strong>Architectural Design</strong>: Professional, premium-grade PDF outputs.</div>
                  <div class="feature-item">🧠 <strong>Neural Insights</strong>: AI-powered resume optimization.</div>
                  <div class="feature-item">🛡️ <strong>Social Sync</strong>: Secure, one-click login via Google and LinkedIn.</div>
                </div>
              </td>
            </tr>
            <tr>
              <td class="footer">
                &copy; 2026 Luminescent AI Studio. All rights reserved.<br>
                Silicon Valley, CA • High-Performance Career Engineering
              </td>
            </tr>
          </table>
        </div>
      </body>
      </html>
    `,
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Welcome email sent to:', email);
    return info;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error);
    // Don't throw error to avoid breaking the auth flow if email fails
    return null;
  }
};

module.exports = {
  sendWelcomeEmail,
};
