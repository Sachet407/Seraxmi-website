import mongoose, { Schema, Document } from "mongoose";

export interface Project extends Document {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
}

const ProjectSchema: Schema<Project> = new Schema({
  title: {
    type: String,
    required: [true, 'Please provide a project title'],
    unique: true,
  },
  description: {
    type: String,
    required: [true, 'Please provide a project description'],
  },
  tags: {
    type: [String],
    required: [true, 'Please provide at least one tag'],
    validate: {
      validator: (tags: string[]) => tags.length > 0,
      message: 'At least one tag is required'
    }
  },
  imageUrl: {
    type: String,
    required: [true, 'Please provide an image URL'],
    match: [
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      'Please provide a valid URL'
    ]
  }
}, {
  timestamps: true // Adds createdAt and updatedAt fields automatically
});

const ProjectModel = (mongoose.models.Project as mongoose.Model<Project>) || 
  mongoose.model<Project>("Project", ProjectSchema);

export default ProjectModel;