import express from 'express';
import bcrypt from 'bcrypt';
import User from '../models/user.js'; // Adjust the path as necessary

const registerRoute = express.Router();

registerRoute.post('/', async (req, res) => {
    const { name, email, password, role } = req.body;
    const user = await User.findOne({ email: email });
    if (user) {
        res.status(400).json({ message: 'User already exists' });
    } else {
        try {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new User({ name, email, password: hashedPassword, role });
            await newUser.save();
            res.status(201).json({ message: 'User registered successfully' });
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
});

export default registerRoute;