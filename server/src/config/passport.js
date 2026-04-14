const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;
const User = require('../models/User');
const { sendWelcomeEmail } = require('../services/emailService');

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_ID !== 'ADD_YOUR_GOOGLE_CLIENT_ID_HERE') {
  console.log('✅ Google Auth Strategy Initialized');
} else {
  console.warn('⚠️ Google Auth Strategy using DUMMY_ID - Check .env file');
}

// --- Google Strategy ---
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID || 'DUMMY_ID',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || 'DUMMY_SECRET',
    callbackURL: "/api/auth/google/callback",
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // 1. Check if user already exists with this googleId
      let user = await User.findOne({ googleId: profile.id });

      if (!user) {
        // 2. Check if user exists with the same email (account linking)
        user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // Link googleId to existing account
          user.googleId = profile.id;
          await user.save();
        } else {
          // 3. Create new user
          user = await User.create({
            fullName: profile.displayName,
            email: profile.emails[0].value,
            googleId: profile.id
          });
          // Send Welcome Email
          sendWelcomeEmail(user.email, user.fullName);
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

// --- LinkedIn Strategy ---
passport.use(new LinkedInStrategy({
    clientID: process.env.LINKEDIN_CLIENT_ID || 'DUMMY_ID',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || 'DUMMY_SECRET',
    callbackURL: "/api/auth/linkedin/callback",
    scope: ['r_emailaddress', 'r_liteprofile'],
    proxy: true
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      
      // 1. Check if user already exists with this linkedinId
      let user = await User.findOne({ linkedinId: profile.id });

      if (!user) {
        // 2. Account Linking by email
        user = await User.findOne({ email });

        if (user) {
          user.linkedinId = profile.id;
          await user.save();
        } else {
          // 3. Create new user
          user = await User.create({
            fullName: profile.displayName,
            email: email,
            linkedinId: profile.id
          });
          // Send Welcome Email
          sendWelcomeEmail(user.email, user.fullName);
        }
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

module.exports = passport;
