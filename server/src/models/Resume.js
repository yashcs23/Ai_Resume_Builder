const { Schema, model } = require('mongoose');

const educationSchema = new Schema(
  {
    school: { type: String, trim: true },
    degree: { type: String, trim: true },
    field: { type: String, trim: true },
    year: { type: String, trim: true }
  },
  { _id: false }
);

const experienceSchema = new Schema(
  {
    company: { type: String, trim: true },
    position: { type: String, trim: true },
    duration: { type: String, trim: true },
    description: { type: String, trim: true }
  },
  { _id: false }
);

const projectSchema = new Schema(
  {
    title: { type: String, trim: true },
    description: { type: String, trim: true },
    technologies: { type: String, trim: true }
  },
  { _id: false }
);

const resumeSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, trim: true },
    phone: { type: String, trim: true },
    summary: { type: String, trim: true },
    education: { type: [educationSchema], default: [] },
    skills: { type: [{ type: String, trim: true }], default: [] },
    experience: { type: [experienceSchema], default: [] },
    projects: { type: [projectSchema], default: [] },
    professionalSummary: { type: String, trim: true },
    experienceHighlights: { type: [{ type: String }], default: [] },
    optimizedResume: {
      type: Schema.Types.Mixed,
      default: {}
    }
  },
  { timestamps: true }
);

module.exports = model('Resume', resumeSchema);
