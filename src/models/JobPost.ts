// models/JobPost.ts
import mongoose from 'mongoose';

const JobPostSchema = new mongoose.Schema({
  title: String,
  description: String,
  url: String,
  company: String,
  logo: String,
  tags: [String],
  source: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.JobPost || mongoose.model('JobPost', JobPostSchema);
