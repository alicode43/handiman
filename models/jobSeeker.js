import mongoose from "mongoose";

const JobSeekerSchema = new mongoose.Schema({
  work: {
    type: [String],
    // required:true
  },
  contact: {
    type: Number,
    // required:true
  },

  experience: {
    type: Number,
    // required:true
  },
  rating: {
    type: Number,
  },
  location: {
    type: String,
  },
  verify: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
  },
  isProfileComplete: {
    type: Boolean,
    default: false,
  },
  availabe: {
    type: Boolean,
    default: false,
  },
  messages: {
    type: [String],
  },
  
});

const JobSeeker =
  mongoose.models.JobSeeker || mongoose.model("JobSeeker", JobSeekerSchema);
export default JobSeeker;
