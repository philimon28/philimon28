import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema(
  {
    /* user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },*/
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    job_category: {
      type: [String],
      required: true,
    },
    job_type: {
      type: String,
      required: true,
      trim: true,
    },
    job_experience: {
      type: String,
      required: true,
    },
    job_vacancy: {
      type: Number,
      required: true,
    },
    job_deadline: {
      type: Date,
      required: true,
    },

    salary: {
      type: [Number],
      required: true,
    },

    is_visible: {
      type: Boolean,
      default: true,
    },

    status: {
      type: String,
      enum: ['active', 'draft', 'inactive'],
      default: 'active',
    },

    job_location: {
      type: String,
      enum: ['onsite', 'remote', 'hybrid'],
      default: 'onsite',
    },

    job_skills: {
      type: [String],
      required: true,
    },

    english_level: {
      type: String,
      enum: ['basic', 'conversational', 'fluent', 'native'],
      default: 'basic',
    },

    other_lsanguages: {
      type: [String],
      required: false,
    },

    compensation: {
      type: String,
      enum: ['hourly', 'monthly', 'contractual'],
      required: true,
    },
  },
  { timestamps: true },
);

const Job = mongoose.models.Job || mongoose.model('Job', JobSchema);

export default Job;

/// User, Company, Proposal, Payment, Message, File
