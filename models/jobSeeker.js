import mongoose from "mongoose";

const jobSeekerSchema = new mongoose.Schema({
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
  workType: {
    type: String,
    required: true,
  },
  experience: {
    type: Number,
    required: true,
  },
  govtID: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  contactNumber: {
    type: Number,
    required: true,
    match: [/^[6-9]\d{9}$/, 'Please enter a valid Indian contact number'],
  },
  available: {
    type: Boolean,
    default: true,
  },
  verify: {
    type: Boolean,
    default: false,
  },
});

const User = mongoose.model("User", jobSeekerSchema);

export default User;