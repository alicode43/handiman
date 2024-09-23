import express from 'express';
import passport from 'passport';
import bcrypt from 'bcryptjs';
import User from '../models/user.js';
import jobProvider from '../models/jobProvider.js';
import JobSeeker from '../models/jobSeeker.js';

const router = express.Router();

// Sign-up route 
router.post('/signup', async (req, res) => {
    const { email, password,  role,  name } = req.body;
    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        let profile;
        if (role === 'jobSeeker') {
            const  newJobSeeker = new JobSeeker({});
            await  newJobSeeker.save();
            profile =  newJobSeeker._id;
        } else if (role === 'jobProvider') {
            const newJobProvider = new jobProvider({});
            await newJobProvider.save();
            profile = newJobProvider._id;
        }

        user = new User({ email, password: hashedPassword, name, role, profile });

        await user.save();

        res.status(201).json({ msg: 'User created successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Sign-in route (Local)
router.post('/signin', passport.authenticate('local', { failureRedirect: '/auth/signin' }), (req, res) => {
    res.json({ msg: 'Logged in successfully', user: req.user });
});

// Google Auth Routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/auth/signin' }), (req, res) => {
    res.redirect('/dashboard');
});

// Logout
router.get('/logout', (req, res) => {
    req.logout(() => {
        res.json({ msg: 'Logged out successfully' });
    });
});

export default router;
