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
    required: function() {
      // Password is required if googleId is not present
      return !this.googleId;
    },
    // match: [
    //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
    //   'Password must be at least 6 characters long, contain one uppercase letter, one lowercase letter, one number, and one special character',
    // ],
  },
  role: {
    type: String,
    // required: true,
    enum: ['jobSeeker', 'jobProvider'],
    // default: 'jobSeeker',
  },
  profile: {
    type: mongoose.Schema.Types.ObjectId,
    refPath: 'role', // Reference path based on the role field
  },
  googleId: { type: String },
  facebookId: { type: String },
  // displayName: { type: String },
});
const User = mongoose.models.User || mongoose.model('User', userSchema);


export default User;