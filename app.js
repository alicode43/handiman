import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from 'passport';
import authRoutes from './routes/auth.js';
import './config/passport.js'; // Import the passport configuration
import dotenv from 'dotenv';
import home from './routes/home.js';
import { ensureAuthenticated } from './middleware/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log(err));

// Express Session
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/auth', authRoutes);
app.use('/', ensureAuthenticated, home);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
