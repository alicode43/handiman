import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import dotenv from 'dotenv';
dotenv.config();

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

// Local Strategy
passport.use(new LocalStrategy(
    { usernameField: 'email' },
    async (email, password, done) => {
        try {
            const user = await User.findOne({ email });
            if (!user) return done(null, false, { message: 'Incorrect email' });

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) return done(null, false, { message: 'Incorrect password' });

            return done(null, user);
        } catch (err) {
            return done(err);
        }
    }
));

// Google Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;
    try {
        let user = await User.findOne({ googleId: id });
        if (!user) {
            
            user = new User({ googleId: id,name: displayName, email: emails[0].value });
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err);
    }
}));

// Facebook Strategy
passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: '/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'emails']
}, async (accessToken, refreshToken, profile, done) => {
    const { id, displayName, emails } = profile;
    try {
        let user = await User.findOne({ facebookId: id });
        if (!user) {
            user = new User({ facebookId: id, displayName, email: emails ? emails[0].value : '' });
            await user.save();
        }
        done(null, user);
    } catch (err) {
        done(err);
    }
}));
