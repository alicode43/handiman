import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    unique: true,
  },
  password: {
    type: String,
    required: true,
    match: [
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
      'Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character',
    ],
  },
  role: {
    type: String,
    required: true,
    enum: ['jobSeeker', 'jobProvider'],
    default: 'jobSeeker',
  },
});

const User = mongoose.model("User", userSchema);

export default User;